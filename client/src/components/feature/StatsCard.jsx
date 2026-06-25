import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "../../utils/helpers";

export default function StatsCard({
  icon: Icon,
  label,
  value,
  change,
  trend = "up",
  accent = "primary",
}) {
  const accentClasses = {
    primary:
      "bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-400",
    accent:
      "bg-accent-50 text-accent-600 dark:bg-accent-950/40 dark:text-accent-400",
    secondary:
      "bg-secondary-50 text-primary-700 dark:bg-secondary-950/40 dark:text-secondary-400",
    earth:
      "bg-earth-100 text-earth-600 dark:bg-earth-950/30 dark:text-earth-400",
  };

  return (
    <div className="card p-5 animate-fadeUp">
      <div className="flex items-center justify-between mb-3">
        <div
          className={cn(
            "h-10 w-10 rounded-xl flex items-center justify-center",
            accentClasses[accent],
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        {change && (
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-semibold",
              trend === "up" ? "text-secondary-600" : "text-red-500",
            )}
          >
            {trend === "up" ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-ink dark:text-gray-100 font-mono">
        {value}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
    </div>
  );
}
