import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileBarChart,
  X,
  ArrowLeft,
} from "lucide-react";
import Logo from "./Logo";
import { cn } from "../../utils/helpers";

const navItems = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, end: true },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Chats", to: "/admin/chats", icon: MessageSquare },
  { label: "Reports", to: "/admin/reports", icon: FileBarChart },
];

export default function AdminSidebar({ open, onClose }) {
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
          "fixed lg:sticky top-0 left-0 h-screen w-64 bg-primary-950 text-white z-50 flex flex-col transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-primary-900 shrink-0">
          <Logo textClassName="text-white" iconClassName="bg-secondary-500" />
          <button
            onClick={onClose}
            className="lg:hidden text-primary-300 hover:text-white"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-3 pt-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary-900 text-primary-200 text-[11px] font-semibold uppercase tracking-wide">
            Admin Panel
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary-500 text-white"
                    : "text-primary-200 hover:bg-primary-900 hover:text-white",
                )
              }
            >
              <item.icon className="h-4.5 w-4.5 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-primary-900 shrink-0">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-primary-200 hover:bg-primary-900 hover:text-white"
          >
            <ArrowLeft className="h-4.5 w-4.5" /> Exit Admin
          </NavLink>
        </div>
      </aside>
    </>
  );
}
