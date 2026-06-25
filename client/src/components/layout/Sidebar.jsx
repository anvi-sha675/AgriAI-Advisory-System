import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MessageCircle,
  History,
  ScanSearch,
  Sprout,
  FlaskConical,
  CloudSun,
  Mic,
  BarChart3,
  Bookmark,
  Landmark,
  Bell,
  User,
  Settings,
  X,
} from "lucide-react";
import Logo from "./Logo";
import { cn } from "../../utils/helpers";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "AI Advisory Chat", to: "/chat", icon: MessageCircle },
  { label: "Chat History", to: "/history", icon: History },
  { label: "Disease Detection", to: "/disease-detection", icon: ScanSearch },
  { label: "Crop Recommendation", to: "/crop-recommendation", icon: Sprout },
  { label: "Soil Health Advisor", to: "/soil-health", icon: FlaskConical },
  { label: "Weather", to: "/weather", icon: CloudSun },
  { label: "Voice Assistant", to: "/voice-assistant", icon: Mic },
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
  { label: "Bookmarks", to: "/bookmarks", icon: Bookmark },
  { label: "Government Schemes", to: "/government-schemes", icon: Landmark },
];

const bottomItems = [
  { label: "Notifications", to: "/notifications", icon: Bell },
  { label: "Profile", to: "/profile", icon: User },
  { label: "Settings", to: "/settings", icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-72 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <Logo />
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-gray-600"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-700 text-white shadow-soft"
                    : "text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-950/40 hover:text-primary-700 dark:hover:text-secondary-400",
                )
              }
            >
              <item.icon className="h-4.5 w-4.5 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-gray-100 dark:border-gray-800 space-y-1 shrink-0">
          {bottomItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-700 text-white shadow-soft"
                    : "text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-950/40 hover:text-primary-700 dark:hover:text-secondary-400",
                )
              }
            >
              <item.icon className="h-4.5 w-4.5 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
}
