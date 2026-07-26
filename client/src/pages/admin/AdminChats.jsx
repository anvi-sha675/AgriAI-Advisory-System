import { useEffect, useState, useCallback } from "react";
import { Search, MessageCircle, Eye } from "lucide-react";
import Modal from "../../components/ui/Modal";
import { Loader } from "../../components/ui/Loader";
import { api } from "../../utils/api";

export default function AdminChats() {
  const [query, setQuery] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get("/admin/chats");
      setChats(data.chats || []);
    } catch (err) {
      setError(err.message || "Couldn't load chat logs.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!selectedId) {
      setSelected(null);
      return;
    }
    setDetailLoading(true);
    api
      .get(`/admin/chats/${selectedId}`)
      .then((data) => setSelected(data.chat))
      .catch(() => setSelected(null))
      .finally(() => setDetailLoading(false));
  }, [selectedId]);

  const filtered = chats.filter(
    (q) =>
      q.title?.toLowerCase().includes(query.toLowerCase()) ||
      q.userName?.toLowerCase().includes(query.toLowerCase()),
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
            placeholder="Search by user or title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="card">
          <Loader label="Loading chat logs..." />
        </div>
      ) : error ? (
        <div className="card py-10 text-center">
          <p className="text-sm text-red-500 mb-3">{error}</p>
          <button
            onClick={load}
            className="text-sm font-medium text-primary-700 dark:text-secondary-400 hover:underline"
          >
            Try again
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card py-10 text-center text-sm text-gray-500 dark:text-gray-400">
          {query ? "No chats match your search." : "No chats yet."}
        </div>
      ) : (
        <div className="card divide-y divide-gray-100 dark:divide-gray-800">
          {filtered.map((q) => (
            <div key={q.id} className="flex items-center gap-4 p-4 sm:p-5">
              <div className="h-10 w-10 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center shrink-0">
                <MessageCircle className="h-4.5 w-4.5 text-primary-700 dark:text-secondary-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-ink dark:text-gray-100">
                    {q.userName}
                  </p>
                  <span className="text-xs text-gray-400">
                    {q.messageCount} messages
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">
                  {q.title || q.lastMessage?.content}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(q.updatedAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedId(q.id)}
                className="text-gray-400 hover:text-primary-700 dark:hover:text-secondary-400 p-2 shrink-0"
                aria-label="View conversation"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={!!selectedId}
        onClose={() => setSelectedId(null)}
        title="Conversation Details"
        size="lg"
      >
        {detailLoading ? (
          <Loader label="Loading conversation..." />
        ) : !selected ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
            Couldn't load this conversation.
          </p>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">User</span>
              <span className="font-medium text-ink dark:text-gray-100">
                {selected.userName} &middot; {selected.userEmail}
              </span>
            </div>
            <div className="max-h-96 overflow-y-auto scrollbar-thin space-y-3">
              {(selected.messages || []).map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-ink dark:text-gray-100 ml-auto max-w-[85%]"
                      : "bg-primary-50 dark:bg-primary-950/40 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-ink dark:text-gray-100 max-w-[85%]"
                  }
                >
                  {m.content}
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
