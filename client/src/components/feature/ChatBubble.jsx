import { Sprout, User, Volume2, VolumeX, Bookmark } from "lucide-react";
import { cn, formatTime } from "../../utils/helpers";
import { useBookmarks } from "../../context/BookmarksContext";
import { useToast } from "../../context/ToastContext";
import { useSpeechSynthesis } from "../../hooks/useSpeechSynthesis";

export default function ChatBubble({ message }) {
  const isUser = message.role === "user";
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { addToast } = useToast();
  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis();

  const bookmarkId = `chat-${message.id}`;
  const saved = isBookmarked(bookmarkId);

  const handleBookmark = () => {
    const added = toggleBookmark({
      id: bookmarkId,
      type: "chat",
      title: message.reply?.slice(0, 60) || "AI response",
      summary: message.reply,
      tags: [
        ...(message.causes?.length ? ["causes"] : []),
        ...(message.treatment?.length ? ["treatment"] : []),
        ...(message.prevention?.length ? ["prevention"] : []),
      ],
      sourcePath: "/chat",
    });
    addToast(
      added ? "Saved to bookmarks." : "Removed from bookmarks.",
      added ? "success" : "info",
    );
  };

  const handleReadAloud = () => {
    if (!isSupported) {
      addToast("Read-aloud isn't supported in this browser.", "error");
      return;
    }
    if (isSpeaking) {
      stop();
      return;
    }
    const parts = [message.reply];
    if (message.causes?.length)
      parts.push("Possible causes:", message.causes.join(". "));
    if (message.treatment?.length)
      parts.push("Recommended action:", message.treatment.join(". "));
    if (message.prevention?.length)
      parts.push("Prevention:", message.prevention.join(". "));
    speak(parts.filter(Boolean).join(". "));
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 max-w-[85%] sm:max-w-[75%] animate-fadeUp",
        isUser && "ml-auto flex-row-reverse",
      )}
    >
      <div
        className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
          isUser
            ? "bg-primary-700 text-white"
            : "bg-secondary-100 text-primary-700 dark:bg-secondary-950/40 dark:text-secondary-400",
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Sprout className="h-4 w-4" />}
      </div>
      <div
        className={cn(
          "rounded-2xl px-4 py-3",
          isUser
            ? "bg-primary-700 text-white rounded-tr-sm"
            : "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-tl-sm shadow-soft",
        )}
      >
        <p
          className={cn(
            "text-sm leading-relaxed",
            isUser ? "text-white" : "text-ink dark:text-gray-100",
          )}
        >
          {message.reply || message.content}
        </p>

        {message.causes?.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">
              Possible causes
            </p>
            <ul className="space-y-1">
              {message.causes.map((c, i) => (
                <li
                  key={i}
                  className="text-xs text-gray-600 dark:text-gray-400 flex gap-1.5"
                >
                  <span className="text-secondary-500">•</span> {c}
                </li>
              ))}
            </ul>
          </div>
        )}

        {message.treatment?.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">
              Recommended action
            </p>
            <ul className="space-y-1">
              {message.treatment.map((t, i) => (
                <li
                  key={i}
                  className="text-xs text-gray-600 dark:text-gray-400 flex gap-1.5"
                >
                  <span className="text-accent-500">•</span> {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {message.prevention?.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">
              Prevention
            </p>
            <ul className="space-y-1">
              {message.prevention.map((p, i) => (
                <li
                  key={i}
                  className="text-xs text-gray-600 dark:text-gray-400 flex gap-1.5"
                >
                  <span className="text-primary-500">•</span> {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between mt-2 gap-2">
          <span
            className={cn(
              "text-[11px]",
              isUser ? "text-primary-100" : "text-gray-400",
            )}
          >
            {message.timestamp ? formatTime(message.timestamp) : ""}
          </span>
          {!isUser && (
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleBookmark}
                className={cn(
                  "transition-colors",
                  saved
                    ? "text-secondary-600 dark:text-secondary-400"
                    : "text-gray-400 hover:text-primary-600 dark:hover:text-primary-400",
                )}
                aria-label={saved ? "Remove bookmark" : "Save to bookmarks"}
                aria-pressed={saved}
              >
                <Bookmark
                  className={cn("h-3.5 w-3.5", saved && "fill-current")}
                />
              </button>
              <button
                onClick={handleReadAloud}
                className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label={
                  isSpeaking ? "Stop reading aloud" : "Read response aloud"
                }
                aria-pressed={isSpeaking}
              >
                {isSpeaking ? (
                  <VolumeX className="h-3.5 w-3.5 text-primary-600 dark:text-primary-400" />
                ) : (
                  <Volume2 className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-full bg-secondary-100 dark:bg-secondary-950/40 flex items-center justify-center shrink-0">
        <Sprout className="h-4 w-4 text-primary-700 dark:text-secondary-400" />
      </div>
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl rounded-tl-sm px-4 py-3.5 shadow-soft">
        <div className="flex gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
