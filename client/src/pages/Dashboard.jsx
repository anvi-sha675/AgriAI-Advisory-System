import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  ScanSearch,
  History,
  Sprout,
  FlaskConical,
  CloudSun,
  Mic,
  ArrowRight,
  Clock,
  Bookmark as BookmarkIcon,
} from "lucide-react";
import StatsCard from "../components/feature/StatsCard";
import WeatherCard from "../components/feature/WeatherCard";
import { CardSkeleton } from "../components/ui/Skeleton";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";

const activityIcons = { chat: MessageCircle, disease: ScanSearch };

const quickActions = [
  { label: "Ask AgriAI", to: "/chat", icon: MessageCircle, accent: "primary" },
  {
    label: "Detect Disease",
    to: "/disease-detection",
    icon: ScanSearch,
    accent: "secondary",
  },
  {
    label: "Crop Recommendation",
    to: "/crop-recommendation",
    icon: Sprout,
    accent: "accent",
  },
  {
    label: "Soil Health",
    to: "/soil-health",
    icon: FlaskConical,
    accent: "primary",
  },
  { label: "Weather", to: "/weather", icon: CloudSun, accent: "accent" },
  {
    label: "Voice Assistant",
    to: "/voice-assistant",
    icon: Mic,
    accent: "secondary",
  },
];

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [activityError, setActivityError] = useState(null);

  useEffect(() => {
    api
      .get("/weather")
      .then(setWeather)
      .catch(() => setWeather(null))
      .finally(() => setLoadingWeather(false));
  }, []);

  useEffect(() => {
    setLoadingActivity(true);
    setActivityError(null);
    Promise.all([
      api.get("/chat"),
      api.get("/disease-detection"),
      api.get("/bookmarks"),
    ])
      .then(([chats, diseases, bookmarks]) => {
        setStats({
          chats: chats.total || 0,
          diseaseScans: diseases.total || 0,
          bookmarks: bookmarks.total || 0,
        });

        const chatActivities = (chats.items || []).slice(0, 5).map((c) => ({
          id: `chat-${c.id}`,
          type: "chat",
          title: c.title,
          time: c.date,
        }));
        const diseaseActivities = (diseases.results || [])
          .slice(0, 5)
          .map((d) => ({
            id: `disease-${d._id || d.id}`,
            type: "disease",
            title: `Detected ${d.disease} on ${d.crop}`,
            time: d.createdAt,
          }));

        const combined = [...chatActivities, ...diseaseActivities]
          .sort((a, b) => new Date(b.time) - new Date(a.time))
          .slice(0, 6);
        setActivities(combined);
      })
      .catch((err) =>
        setActivityError(err.message || "Couldn't load your recent activity."),
      )
      .finally(() => setLoadingActivity(false));
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-primary-700 p-6 sm:p-8 text-white">
        <div className="absolute inset-0 bg-furrow text-primary-600 opacity-40" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold">
              Welcome back, {user?.name?.split(" ")[0] || "Farmer"} 🌱
            </h1>
            <p className="text-primary-100 mt-1.5 text-sm sm:text-base">
              Here's what's happening with your farm advisory today.
            </p>
          </div>
          <Link to="/chat">
            <button className="btn bg-white text-primary-700 hover:bg-primary-50 px-5 py-2.5 text-sm shrink-0">
              <MessageCircle className="h-4 w-4" /> Ask a question
            </button>
          </Link>
        </div>
      </div>

      {/* Stats — real per-user counts */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats === null ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            <StatsCard
              icon={MessageCircle}
              label="AI Conversations"
              value={stats.chats}
              accent="primary"
            />
            <StatsCard
              icon={ScanSearch}
              label="Disease Scans"
              value={stats.diseaseScans}
              accent="secondary"
            />
            <StatsCard
              icon={BookmarkIcon}
              label="Saved Schemes"
              value={stats.bookmarks}
              accent="accent"
            />
          </>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 card p-6">
          <h2 className="font-display text-lg font-semibold text-ink dark:text-gray-100 mb-5">
            Quick Actions
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-primary-300 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-200 text-center"
              >
                <div className="h-11 w-11 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center">
                  <action.icon className="h-5 w-5 text-primary-700 dark:text-secondary-400" />
                </div>
                <span className="text-xs font-medium text-ink dark:text-gray-100">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Weather */}
        {loadingWeather ? (
          <CardSkeleton />
        ) : weather ? (
          <WeatherCard weather={weather} compact />
        ) : (
          <div className="card p-6 flex items-center justify-center text-center min-h-[180px]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Couldn't load weather right now.
            </p>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activities — composed from real chat + disease-detection history */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg font-semibold text-ink dark:text-gray-100">
              Recent Activities
            </h2>
            <Link
              to="/history"
              className="text-sm font-medium text-primary-700 dark:text-secondary-400 flex items-center gap-1 hover:gap-1.5 transition-all"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {loadingActivity ? (
            <div className="py-4">
              <CardSkeleton />
            </div>
          ) : activityError ? (
            <p className="text-sm text-red-500 py-6 text-center">
              {activityError}
            </p>
          ) : activities.length === 0 ? (
            <div className="text-center py-8">
              <History className="h-8 w-8 text-gray-300 dark:text-gray-700 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No activity yet — try asking AgriAI a question.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {activities.map((activity) => {
                const Icon = activityIcons[activity.type] || MessageCircle;
                return (
                  <div
                    key={activity.id}
                    className="flex items-center gap-3 py-3 border-b border-gray-50 dark:border-gray-800/60 last:border-none"
                  >
                    <div className="h-9 w-9 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary-700 dark:text-secondary-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-ink dark:text-gray-100 truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3" /> {timeAgo(activity.time)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="card p-6">
          <h2 className="font-display text-lg font-semibold text-ink dark:text-gray-100 mb-4">
            Crop Recommendation
          </h2>
          <div className="rounded-xl bg-secondary-50 dark:bg-secondary-950/30 p-4">
            <Sprout className="h-5 w-5 text-secondary-600 dark:text-secondary-400 mb-2" />
            <p className="text-sm text-ink dark:text-gray-100 leading-relaxed">
              Get a fresh recommendation based on your soil type, season, and
              location.
            </p>
            <Link
              to="/crop-recommendation"
              className="text-sm font-medium text-primary-700 dark:text-secondary-400 flex items-center gap-1 mt-3 hover:gap-1.5 transition-all"
            >
              Get recommendation <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
