import { Outlet } from "react-router-dom";
import { MessageCircle, ScanSearch, CloudSun } from "lucide-react";
import Logo from "../components/layout/Logo";

const highlights = [
  { icon: MessageCircle, text: "Ask farming questions in your own language" },
  { icon: ScanSearch, text: "Detect crop diseases from a photo" },
  { icon: CloudSun, text: "Get weather-aware farming advice" },
];

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-surface dark:bg-gray-950">
      <div className="hidden lg:flex lg:w-1/2 bg-primary-800 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-furrow text-primary-700 opacity-30" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-secondary-500/20 blur-3xl" />
        <Logo
          textClassName="text-white"
          iconClassName="bg-secondary-500"
          className="relative z-10"
        />

        <div className="relative z-10">
          <h2 className="font-display text-3xl font-semibold text-white leading-tight mb-6">
            Farming guidance that speaks your language.
          </h2>
          <div className="space-y-4">
            {highlights.map((h) => (
              <div
                key={h.text}
                className="flex items-center gap-3 text-primary-100"
              >
                <span className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <h.icon className="h-4.5 w-4.5 text-secondary-400" />
                </span>
                <span className="text-sm">{h.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-primary-300">
          &copy; {new Date().getFullYear()} AgriAI Advisory System
        </p>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="lg:hidden flex items-center justify-center py-8">
          <Logo />
        </div>
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
        <p className="lg:hidden text-center text-xs text-gray-400 pb-6">
          &copy; {new Date().getFullYear()} AgriAI Advisory System
        </p>
      </div>
    </div>
  );
}
