import { useNavigate } from "react-router-dom";
import {
  Bookmark,
  MessageCircle,
  ScanSearch,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { EmptyState } from "../components/ui/EmptyState";
import Badge from "../components/ui/Badge";
import { useBookmarks } from "../context/BookmarksContext";
import { useToast } from "../context/ToastContext";
import { formatDate } from "../utils/helpers";

const typeIcons = { chat: MessageCircle, disease: ScanSearch };
const typeLabels = {
  chat: "AI Chat Response",
  disease: "Disease Detection Result",
};

export default function Bookmarks() {
  const { bookmarks, removeBookmark } = useBookmarks();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    removeBookmark(id);
    addToast("Removed from bookmarks.", "info");
  };

  return (
    <div className="max-w-3xl space-y-5">
      <div>
        <h2 className="font-display text-xl font-semibold text-ink dark:text-gray-100">
          Saved Responses
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          AI chat answers and disease detection results you've bookmarked for
          later.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={Bookmark}
            title="No bookmarks yet"
            description="Tap the bookmark icon on any AI chat response or disease detection result to save it here."
          />
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((item) => {
            const Icon = typeIcons[item.type] || Bookmark;
            return (
              <div key={item.id} className="card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center shrink-0">
                      <Icon className="h-4.5 w-4.5 text-primary-700 dark:text-secondary-400" />
                    </div>
                    <div>
                      <Badge
                        variant={item.type === "chat" ? "secondary" : "accent"}
                        className="text-[10px]"
                      >
                        {typeLabels[item.type] || "Saved item"}
                      </Badge>
                      <p className="text-xs text-gray-400 mt-1">
                        Saved {formatDate(item.savedAt)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    aria-label="Remove bookmark"
                    className="text-gray-300 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 transition-colors p-1.5 shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {item.title && (
                  <h3 className="font-semibold text-sm text-ink dark:text-gray-100 mt-3">
                    {item.title}
                  </h3>
                )}
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5 leading-relaxed">
                  {item.summary}
                </p>

                {item.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="gray" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {item.sourcePath && (
                  <button
                    onClick={() => navigate(item.sourcePath)}
                    className="flex items-center gap-1 text-sm font-medium text-primary-700 dark:text-secondary-400 mt-3 hover:gap-1.5 transition-all"
                  >
                    Open in{" "}
                    {item.type === "chat" ? "AI Chat" : "Disease Detection"}{" "}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
