import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  LogOut,
  User as UserIcon,
  Settings,
  CloudRain,
  Bug,
  MessageCircle,
  Megaphone,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { initialsFromName } from "../../utils/helpers";
import { notifications as initialNotifications } from "../../utils/mockData";
import { cn } from "../../utils/helpers";

const notificationIcons = {
  weather: CloudRain,
  pest: Bug,
  chat: MessageCircle,
  scheme: Megaphone,
};

export default function Topbar({ onMenuClick, title }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    addToast("You've been logged out.", "info");
    navigate("/");
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markOneRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-500 dark:text-gray-300"
          aria-label="Open menu"
        >
          <Menu className="h-5.5 w-5.5" />
        </button>
        {title && (
          <h1 className="text-lg font-semibold text-ink dark:text-gray-100 font-display">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="h-9 w-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="h-4.5 w-4.5" />
          ) : (
            <Moon className="h-4.5 w-4.5" />
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setNotifOpen((o) => !o)}
            aria-label="Notifications"
            aria-expanded={notifOpen}
            className="relative h-9 w-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
          >
            <Bell className="h-4.5 w-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent-500" />
            )}
          </button>

          {notifOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setNotifOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-900 rounded-xl shadow-lift border border-gray-100 dark:border-gray-800 z-20 animate-fadeUp overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                  <p className="text-sm font-semibold text-ink dark:text-gray-100">
                    Notifications
                  </p>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs font-medium text-primary-700 dark:text-secondary-400 hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto scrollbar-thin">
                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-8">
                      No notifications yet.
                    </p>
                  ) : (
                    notifications.map((n) => {
                      const Icon = notificationIcons[n.type] || Bell;
                      return (
                        <button
                          key={n.id}
                          onClick={() => markOneRead(n.id)}
                          className={cn(
                            "w-full flex items-start gap-3 px-4 py-3 text-left border-b border-gray-50 dark:border-gray-800/60 last:border-none hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors",
                            !n.read &&
                              "bg-primary-50/40 dark:bg-primary-950/20",
                          )}
                        >
                          <div className="h-8 w-8 rounded-lg bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center shrink-0">
                            <Icon className="h-4 w-4 text-primary-700 dark:text-secondary-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-ink dark:text-gray-100">
                              {n.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                              {n.message}
                            </p>
                            <p className="text-[11px] text-gray-400 mt-1">
                              {n.time}
                            </p>
                          </div>
                          {!n.read && (
                            <span className="h-2 w-2 rounded-full bg-accent-500 shrink-0 mt-1.5" />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>

                <button
                  onClick={() => {
                    setNotifOpen(false);
                    navigate("/notifications");
                  }}
                  className="w-full text-center text-sm font-medium text-primary-700 dark:text-secondary-400 py-2.5 border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
                >
                  View all notifications
                </button>
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-primary-700 text-white flex items-center justify-center text-xs font-semibold">
              {initialsFromName(user?.name || "Farmer")}
            </div>
            <span className="hidden sm:block text-sm font-medium text-ink dark:text-gray-100">
              {user?.name?.split(" ")[0] || "Farmer"}
            </span>
            <ChevronDown className="hidden sm:block h-4 w-4 text-gray-400" />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-lift border border-gray-100 dark:border-gray-800 py-1.5 z-20 animate-fadeUp">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <UserIcon className="h-4 w-4" /> Profile
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/settings");
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <Settings className="h-4 w-4" /> Settings
                </button>
                <div className="my-1 border-t border-gray-100 dark:border-gray-800" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
