import { useEffect, useState, useCallback } from "react";
import {
  Bell,
  CloudRain,
  Bug,
  MessageCircle,
  Megaphone,
  Info,
  CheckCheck,
} from "lucide-react";
import { EmptyState } from "../components/ui/EmptyState";
import { Loader } from "../components/ui/Loader";
import { cn, formatDate } from "../utils/helpers";
import { useToast } from "../context/ToastContext";
import { api } from "../utils/api";

const typeIcons = {
  weather: CloudRain,
  pest: Bug,
  chat: MessageCircle,
  scheme: Megaphone,
  system: Info,
};
const typeLabels = {
  weather: "Weather",
  pest: "Pest Alert",
  chat: "AI Chat",
  scheme: "Govt. Scheme",
  system: "System",
};

const filters = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "weather", label: "Weather" },
  { key: "pest", label: "Pest Alerts" },
  { key: "chat", label: "AI Chat" },
  { key: "scheme", label: "Schemes" },
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const { addToast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get("/notifications");
      setNotifications(data.notifications || []);
    } catch (err) {
      setError(err.message || "Couldn't load notifications.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = notifications.filter((n) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !n.read;
    return n.type === activeFilter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = async () => {
    const prev = notifications;
    setNotifications((p) => p.map((n) => ({ ...n, read: true }))); // optimistic
    try {
      await api.patch("/notifications/mark-all-read", {});
    } catch (err) {
      setNotifications(prev); // revert on failure
      addToast(err.message || "Couldn't mark all as read.", "error");
    }
  };

  const toggleRead = async (n) => {
    const nextRead = !n.read;
    setNotifications((prev) =>
      prev.map((x) => (x.id === n.id ? { ...x, read: nextRead } : x)),
    ); // optimistic
    if (!nextRead) return;
    try {
      await api.patch(`/notifications/${n.id}/read`, {});
    } catch (err) {
      setNotifications((prev) =>
        prev.map((x) => (x.id === n.id ? { ...x, read: n.read } : x)),
      ); // revert
      addToast(err.message || "Couldn't update notification.", "error");
    }
  };

  return (
    <div className="max-w-3xl space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink dark:text-gray-100">
            Notifications
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "You're all caught up."}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-sm font-medium text-primary-700 dark:text-secondary-400 hover:underline"
          >
            <CheckCheck className="h-4 w-4" /> Mark all read
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-colors shrink-0",
              activeFilter === f.key
                ? "bg-primary-700 text-white border-primary-700"
                : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary-300",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="card">
          <Loader label="Loading notifications..." />
        </div>
      ) : error ? (
        <div className="card py-10 text-center">
          <p className="text-sm text-red-500 mb-3">{error}</p>
          <button
            onClick={load}
            className="text-sm font-medium text-primary-700 dark:text-secondary-400 hover:underline"
          >
            Try again
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={Bell}
            title="No notifications here"
            description="Try a different filter, or check back later."
          />
        </div>
      ) : (
        <div className="card divide-y divide-gray-100 dark:divide-gray-800">
          {filtered.map((n) => {
            const Icon = typeIcons[n.type] || Bell;
            return (
              <button
                key={n.id}
                onClick={() => toggleRead(n)}
                className={cn(
                  "w-full flex items-start gap-3 p-4 sm:p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors",
                  !n.read && "bg-primary-50/40 dark:bg-primary-950/20",
                )}
              >
                <div className="h-10 w-10 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center shrink-0">
                  <Icon className="h-4.5 w-4.5 text-primary-700 dark:text-secondary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-ink dark:text-gray-100">
                      {n.title}
                    </p>
                    <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400 shrink-0">
                      {typeLabels[n.type] || n.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {n.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1.5">
                    {formatDate(n.createdAt)}
                  </p>
                </div>
                {!n.read && (
                  <span
                    className="h-2 w-2 rounded-full bg-accent-500 shrink-0 mt-1.5"
                    aria-label="Unread"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
