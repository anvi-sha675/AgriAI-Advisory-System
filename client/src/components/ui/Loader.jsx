import { Sprout } from "lucide-react";
import { cn } from "../../utils/helpers";

/**
 * Loader
 * @typedef {Object} LoaderProps
 * @property {"sm"|"md"|"lg"} [size="md"] - Size of the spinner icon.
 * @property {string} [label] - Optional caption rendered below the spinner.
 * @param {LoaderProps} props
 */
export function Loader({ size = "md", label }) {
  const sizes = { sm: "h-4 w-4", md: "h-7 w-7", lg: "h-10 w-10" };
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <Sprout className={cn(sizes[size], "text-primary-600 animate-pulseSoft")} />
      {label && <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>}
    </div>
  );
}

export default Loader;
