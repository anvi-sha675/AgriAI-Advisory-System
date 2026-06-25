import { useState } from "react";
import { Search, MessageCircle, Eye } from "lucide-react";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import { adminRecentQueries } from "../../utils/mockData";

const categoryColor = {
  Disease: "red",
  Fertilizer: "earth",
  Pest: "secondary",
  Weather: "accent",
};

export default function AdminChats() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const filtered = adminRecentQueries.filter((q) =>
    q.query.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="font-display text-xl font-semibold text-ink dark:text-gray-100">
          Chat Logs
        </h2>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            className="input-field pl-10 w-64"
            placeholder="Search chats..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="card divide-y divide-gray-100 dark:divide-gray-800">
        {filtered.map((q) => (
          <div key={q.id} className="flex items-center gap-4 p-4 sm:p-5">
            <div className="h-10 w-10 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center shrink-0">
              <MessageCircle className="h-4.5 w-4.5 text-primary-700 dark:text-secondary-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-ink dark:text-gray-100">
                  {q.user}
                </p>
                <Badge
                  variant={categoryColor[q.category] || "gray"}
                  className="text-[10px]"
                >
                  {q.category}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">
                {q.query}
              </p>
              <p className="text-xs text-gray-400 mt-1">{q.time}</p>
            </div>
            <button
              onClick={() => setSelected(q)}
              className="text-gray-400 hover:text-primary-700 dark:hover:text-secondary-400 p-2 shrink-0"
              aria-label="View conversation"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Conversation Details"
        size="lg"
      >
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">User</span>
              <span className="font-medium text-ink dark:text-gray-100">
                {selected.user}
              </span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-ink dark:text-gray-100 ml-auto max-w-[85%]">
              {selected.query}
            </div>
            <div className="bg-primary-50 dark:bg-primary-950/40 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-ink dark:text-gray-100 max-w-[85%]">
              This is a moderated view of the AI's response for quality
              monitoring purposes, categorized under{" "}
              <strong>{selected.category}</strong>.
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
