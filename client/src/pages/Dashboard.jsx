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
} from "lucide-react";
import StatsCard from "../components/feature/StatsCard";
import WeatherCard from "../components/feature/WeatherCard";
import { CardSkeleton } from "../components/ui/Loader";
import { useAuth } from "../context/AuthContext";
import { dashboardStats, recentActivities } from "../utils/mockData";
import { getWeather } from "../services/aiService";

const statIcons = [MessageCircle, ScanSearch, ScanSearch, History];
const activityIcons = {
  chat: MessageCircle,
  disease: ScanSearch,
  weather: CloudSun,
  crop: Sprout,
};

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

export default function Dashboard() {
  const { user } = useAuth();
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  useEffect(() => {
    getWeather().then((w) => {
      setWeather(w);
      setLoadingWeather(false);
    });
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

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {dashboardStats.map((stat, i) => (
          <StatsCard
            key={stat.label}
            icon={statIcons[i]}
            {...stat}
            accent={["primary", "secondary", "accent", "primary"][i]}
          />
        ))}
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
        ) : (
          <WeatherCard weather={weather} compact />
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
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
          <div className="space-y-1">
            {recentActivities.map((activity) => {
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
                      <Clock className="h-3 w-3" /> {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Recommendation */}
        <div className="card p-6">
          <h2 className="font-display text-lg font-semibold text-ink dark:text-gray-100 mb-4">
            Recent Recommendation
          </h2>
          <div className="rounded-xl bg-secondary-50 dark:bg-secondary-950/30 p-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-secondary-700 dark:text-secondary-400">
              Crop suggestion
            </span>
            <p className="text-sm text-ink dark:text-gray-100 mt-2 leading-relaxed">
              Based on your loamy soil and the upcoming Kharif season,{" "}
              <strong>Soybean</strong> and <strong>Cotton</strong> show the
              strongest fit for your field.
            </p>
            <Link
              to="/crop-recommendation"
              className="text-sm font-medium text-primary-700 dark:text-secondary-400 flex items-center gap-1 mt-3 hover:gap-1.5 transition-all"
            >
              View details <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
