import { cn } from "../../utils/helpers";

const variants = {
  primary:
    "bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300",
  secondary:
    "bg-secondary-50 text-primary-700 dark:bg-secondary-950/40 dark:text-secondary-300",
  accent:
    "bg-accent-50 text-accent-700 dark:bg-accent-950/40 dark:text-accent-300",
  earth: "bg-earth-100 text-earth-600 dark:bg-earth-950/30 dark:text-earth-400",
  gray: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
  red: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-300",
};

export default function Badge({
  children,
  variant = "primary",
  className = "",
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
