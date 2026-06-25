import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MessageCircle,
  Trash2,
  ChevronRight,
  History,
} from "lucide-react";
import { EmptyState } from "../components/ui/EmptyState";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import { chatHistoryList } from "../utils/mockData";
import { formatDate } from "../utils/helpers";
import { useToast } from "../context/ToastContext";

export default function ChatHistory() {
  const [query, setQuery] = useState("");
  const [chats, setChats] = useState(chatHistoryList);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const filtered = chats.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.preview.toLowerCase().includes(query.toLowerCase()),
  );

  const confirmDelete = () => {
    setChats((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    addToast("Conversation deleted.", "success");
    setDeleteTarget(null);
  };

  return (
    <div className="max-w-3xl">
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          className="input-field pl-10"
          placeholder="Search your conversations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={History}
            title="No conversations found"
            description={
              query
                ? "Try a different search term."
                : "Start a new chat to see your history here."
            }
            action={
              !query && (
                <Button onClick={() => navigate("/chat")} icon={MessageCircle}>
                  Start a New Chat
                </Button>
              )
            }
          />
        </div>
      ) : (
        <div className="card divide-y divide-gray-100 dark:divide-gray-800">
          {filtered.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center gap-4 p-4 sm:p-5 group"
            >
              <div className="h-11 w-11 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center shrink-0">
                <MessageCircle className="h-5 w-5 text-primary-700 dark:text-secondary-400" />
              </div>
              <button
                onClick={() => navigate(`/chat?id=${chat.id}`)}
                className="flex-1 min-w-0 text-left"
              >
                <p className="text-sm font-semibold text-ink dark:text-gray-100 truncate">
                  {chat.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                  {chat.preview}
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                  <span>{formatDate(chat.date)}</span>
                  <span>&middot;</span>
                  <span>{chat.messageCount} messages</span>
                </div>
              </button>
              <button
                onClick={() => setDeleteTarget(chat)}
                aria-label={`Delete conversation: ${chat.title}`}
                className="text-gray-300 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 transition-colors p-2 shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <ChevronRight className="h-4 w-4 text-gray-300 hidden sm:block shrink-0" />
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete conversation?"
        size="sm"
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This will permanently delete "
          <span className="font-medium text-ink dark:text-gray-200">
            {deleteTarget?.title}
          </span>
          ". This action cannot be undone.
        </p>
        <div className="flex gap-3 mt-6">
          <Button
            variant="ghost"
            fullWidth
            onClick={() => setDeleteTarget(null)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            fullWidth
            className="bg-red-600 hover:bg-red-700"
            onClick={confirmDelete}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
