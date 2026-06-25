import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Send, Plus, Mic, Image as ImageIcon, Sparkles, X } from "lucide-react";
import ChatBubble, { TypingIndicator } from "../components/feature/ChatBubble";
import { EmptyState } from "../components/ui/EmptyState";
import { sendChatMessage } from "../services/aiService";
import { chatHistoryList } from "../utils/mockData";
import { cn } from "../utils/helpers";
import { useToast } from "../context/ToastContext";

const suggestedPrompts = [
  "My tomato leaves have white spots",
  "Best crop for monsoon season?",
  "How to prevent fungal diseases?",
  "Wheat leaves turning yellow",
];

export default function Chat() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const activeChatId = searchParams.get("id");

  const [messages, setMessages] = useState(() => {
    const existing = chatHistoryList.find((c) => c.id === activeChatId);
    return existing ? existing.messages : [];
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef(null);
  const idCounterRef = useRef(0);

  useEffect(() => {
    if (!activeChatId) return;
    const existing = chatHistoryList.find((c) => c.id === activeChatId);
    setMessages(existing ? existing.messages : []);
    setSidebarOpen(false);
  }, [activeChatId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    const content = text ?? input;
    if (!content.trim()) return;
    idCounterRef.current += 1;
    const userMsg = {
      id: `u_${idCounterRef.current}`,
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    const aiMsg = await sendChatMessage(content);
    setIsTyping(false);
    setMessages((prev) => [...prev, aiMsg]);
  };

  const handleNewChat = () => {
    setMessages([]);
    setSidebarOpen(false);
    setSearchParams({}, { replace: true });
  };

  const handleSelectChat = (chatId) => {
    navigate(`/chat?id=${chatId}`);
  };

  const handleImageUploadClick = () => {
    addToast(
      "For photo-based diagnosis, use Disease Detection — taking you there now.",
      "info",
    );
    navigate("/disease-detection");
  };

  const handleVoiceInputClick = () => {
    navigate("/voice-assistant");
  };

  const renderHistoryList = (onItemClick) => (
    <>
      {chatHistoryList.map((chat) => (
        <button
          key={chat.id}
          onClick={() => {
            handleSelectChat(chat.id);
            onItemClick?.();
          }}
          className={cn(
            "w-full text-left px-3 py-2.5 rounded-xl transition-colors",
            chat.id === activeChatId
              ? "bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800"
              : "hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent",
          )}
        >
          <p
            className={cn(
              "text-sm font-medium truncate",
              chat.id === activeChatId
                ? "text-primary-700 dark:text-secondary-400"
                : "text-ink dark:text-gray-100",
            )}
          >
            {chat.title}
          </p>
          <p className="text-xs text-gray-400 truncate mt-0.5">
            {chat.preview}
          </p>
        </button>
      ))}
    </>
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-4 sm:-m-6 lg:-m-8">
      {/* Chat sidebar (desktop) */}
      <div className="hidden lg:flex flex-col w-72 border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <button onClick={handleNewChat} className="btn-primary w-full">
            <Plus className="h-4 w-4" /> New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 px-2 mb-2">
            Recent
          </p>
          {renderHistoryList()}
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-gray-900/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-gray-900 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-ink dark:text-gray-100">
                Chats
              </h3>
              <button onClick={() => setSidebarOpen(false)} aria-label="Close">
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <button onClick={handleNewChat} className="btn-primary w-full mb-3">
              <Plus className="h-4 w-4" /> New Chat
            </button>
            <div className="space-y-1 overflow-y-auto flex-1">
              {renderHistoryList(() => setSidebarOpen(false))}
            </div>
          </div>
        </div>
      )}

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 dark:text-gray-300"
              aria-label="Open chat history"
            >
              <Plus className="h-5 w-5" />
            </button>
            <Sparkles className="h-4 w-4 text-secondary-500" />
            <span className="text-sm font-medium text-ink dark:text-gray-100">
              {activeChatId
                ? chatHistoryList.find((c) => c.id === activeChatId)?.title ||
                  "AgriAI Advisory Chat"
                : "AgriAI Advisory Chat"}
            </span>
          </div>
          <button
            onClick={handleNewChat}
            className="hidden sm:flex btn-outline px-3 py-1.5 text-xs"
          >
            <Plus className="h-3.5 w-3.5" /> New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-4 sm:px-6 py-6 space-y-5">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <EmptyState
                icon={Sparkles}
                title="Ask AgriAI anything about your farm"
                description="Describe a crop issue, ask about the weather, or get cultivation tips — in your own words."
              />
              <div className="grid sm:grid-cols-2 gap-3 max-w-lg w-full px-4">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="text-left text-sm px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 hover:bg-primary-50/50 dark:hover:bg-primary-950/30 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
              {isTyping && <TypingIndicator />}
            </>
          )}
          <div ref={scrollRef} />
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-5 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-end gap-2 max-w-3xl mx-auto"
          >
            <button
              type="button"
              onClick={handleImageUploadClick}
              className="h-11 w-11 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-primary-700 hover:border-primary-300 shrink-0"
              aria-label="Upload image for diagnosis"
            >
              <ImageIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleVoiceInputClick}
              className="h-11 w-11 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-primary-700 hover:border-primary-300 shrink-0"
              aria-label="Switch to voice input"
            >
              <Mic className="h-5 w-5" />
            </button>
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Describe your farming question..."
              className="input-field flex-1 resize-none max-h-32"
            />
            <button
              type="submit"
              className="h-11 w-11 rounded-xl bg-primary-700 hover:bg-primary-800 text-white flex items-center justify-center shrink-0 transition-colors disabled:opacity-50"
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-2.5">
            AgriAI provides general guidance. For severe crop loss, please
            consult a local agricultural officer.
          </p>
        </div>
      </div>
    </div>
  );
}
