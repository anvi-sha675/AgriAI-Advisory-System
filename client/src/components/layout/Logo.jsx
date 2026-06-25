import { Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/helpers";

export default function Logo({
  className = "",
  iconClassName = "",
  textClassName = "",
  to = "/",
}) {
  return (
    <Link to={to} className={cn("flex items-center gap-2 group", className)}>
      <span
        className={cn(
          "h-9 w-9 rounded-xl bg-primary-700 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105",
          iconClassName,
        )}
      >
        <Sprout className="h-5 w-5 text-white" />
      </span>
      <span
        className={cn(
          "font-display text-xl font-semibold text-ink dark:text-gray-100",
          textClassName,
        )}
      >
        Agri<span className="text-primary-700 dark:text-secondary-400">AI</span>
      </span>
    </Link>
  );
}
