import { cn } from "../../utils/helpers";

/**
 * Skeleton
 * @typedef {Object} SkeletonProps
 * @property {string} [className] - Tailwind classes controlling size/shape (e.g. "h-4 w-1/3").
 * @param {SkeletonProps} props
 */
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
