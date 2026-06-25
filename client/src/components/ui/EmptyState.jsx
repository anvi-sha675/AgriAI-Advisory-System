import { AlertTriangle, Info, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "../../utils/helpers";

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      {Icon && (
        <div className="h-14 w-14 rounded-2xl bg-primary-50 dark:bg-primary-950 flex items-center justify-center mb-4">
          <Icon className="h-7 w-7 text-primary-600 dark:text-primary-400" />
        </div>
      )}
      <h3 className="text-base font-semibold text-ink dark:text-gray-100">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 max-w-sm">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

const alertStyles = {
  info: "bg-accent-50 border-accent-200 text-accent-700 dark:bg-accent-950/40 dark:border-accent-800 dark:text-accent-300",
  success:
    "bg-secondary-50 border-secondary-200 text-primary-800 dark:bg-secondary-950/40 dark:border-secondary-800 dark:text-secondary-300",
  warning:
    "bg-earth-50 border-earth-200 text-earth-600 dark:bg-earth-950/30 dark:border-earth-800 dark:text-earth-400",
  error:
    "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/40 dark:border-red-800 dark:text-red-300",
};

const alertIcons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
};

export function Alert({ type = "info", title, children, className = "" }) {
  const Icon = alertIcons[type];
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border px-4 py-3",
        alertStyles[type],
        className,
      )}
      role="alert"
    >
      <Icon className="h-5 w-5 shrink-0 mt-0.5" />
      <div className="text-sm">
        {title && <p className="font-semibold mb-0.5">{title}</p>}
        <div className="opacity-90">{children}</div>
      </div>
    </div>
  );
}
