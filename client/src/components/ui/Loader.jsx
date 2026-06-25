import { Sprout } from "lucide-react";
import { cn } from "../../utils/helpers";

export function Loader({ size = "md", label }) {
  const sizes = { sm: "h-4 w-4", md: "h-7 w-7", lg: "h-10 w-10" };
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <Sprout
        className={cn(sizes[size], "text-primary-600 animate-pulseSoft")}
      />
      {label && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      )}
    </div>
  );
}

export function Skeleton({ className = "" }) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg",
        className,
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="card p-5 space-y-3">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}

export function ChatBubbleSkeleton() {
  return (
    <div className="flex items-start gap-3 max-w-md">
      <Skeleton className="h-8 w-8 rounded-full shrink-0" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}
