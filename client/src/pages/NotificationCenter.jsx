import { useState } from "react";
import {
  Bell,
  CloudRain,
  Bug,
  MessageCircle,
  Megaphone,
  CheckCheck,
} from "lucide-react";
import { EmptyState } from "../components/ui/EmptyState";
import { cn } from "../utils/helpers";
import { notifications as initialNotifications } from "../utils/mockData";

const typeIcons = {
  weather: CloudRain,
  pest: Bug,
  chat: MessageCircle,
  scheme: Megaphone,
};
const typeLabels = {
  weather: "Weather",
  pest: "Pest Alert",
  chat: "AI Chat",
  scheme: "Govt. Scheme",
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
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = notifications.filter((n) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !n.read;
    return n.type === activeFilter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const toggleRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)),
    );

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

      {filtered.length === 0 ? (
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
                onClick={() => toggleRead(n.id)}
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
                      {typeLabels[n.type]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {n.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1.5">{n.time}</p>
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
