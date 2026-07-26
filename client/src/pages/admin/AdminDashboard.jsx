import { useEffect, useState, useCallback } from "react";
import {
  Users,
  MessageCircle,
  Activity,
  ScanSearch,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";
import StatsCard from "../../components/feature/StatsCard";
import { Loader } from "../../components/ui/Loader";
import Badge from "../../components/ui/Badge";
import { api } from "../../utils/api";

const categoryColor = {
  Disease: "red",
  Fertilizer: "earth",
  Pest: "secondary",
  Weather: "accent",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentChats, setRecentChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get("/admin/stats");
      setStats(data.stats);
      setRecentChats(data.recentChats || []);
    } catch (err) {
      setError(err.message || "Couldn't load dashboard stats.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading)
    return (
      <div className="card">
        <Loader label="Loading admin dashboard..." />
      </div>
    );
  if (error) {
    return (
      <div className="card py-10 text-center">
        <p className="text-sm text-red-500 mb-3">{error}</p>
        <button
          onClick={load}
          className="text-sm font-medium text-primary-700 dark:text-secondary-400 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          icon={Users}
          label="Total Users"
          value={stats.totalUsers}
          accent="primary"
        />
        <StatsCard
          icon={MessageCircle}
          label="Total Messages"
          value={stats.totalMessages}
          accent="secondary"
        />
        <StatsCard
          icon={Activity}
          label="Active Users"
          value={stats.activeUsers}
          accent="accent"
        />
        <StatsCard
          icon={ScanSearch}
          label="Disease Reports"
          value={stats.totalDiseaseReports}
          accent="earth"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6 flex flex-col items-center justify-center text-center min-h-[240px]">
          <BarChart3 className="h-8 w-8 text-gray-300 dark:text-gray-700 mb-3" />
          <h3 className="font-display text-base font-semibold text-ink dark:text-gray-100">
            Query activity trend
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xs">
            Needs a backend endpoint that aggregates messages by day — not built
            yet, so no chart is shown here rather than a fake one.
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100">
              Recent Queries
            </h3>
            <Link
              to="/admin/chats"
              className="text-xs font-medium text-primary-700 dark:text-secondary-400 flex items-center gap-1"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          {recentChats.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">
              No queries yet.
            </p>
          ) : (
            <div className="space-y-3">
              {recentChats.map((q) => (
                <div
                  key={q.id}
                  className="border-b border-gray-50 dark:border-gray-800/60 pb-3 last:border-none last:pb-0"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium text-ink dark:text-gray-100">
                      {q.user}
                    </p>
                    {q.category && (
                      <Badge
                        variant={categoryColor[q.category] || "gray"}
                        className="text-[10px]"
                      >
                        {q.category}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                    {q.query}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {new Date(q.time).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
