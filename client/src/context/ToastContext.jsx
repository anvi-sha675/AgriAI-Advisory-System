import { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message, type = "success") => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => removeToast(id), 3800);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-[calc(100%-2rem)] sm:w-auto sm:max-w-sm">
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function Toast({ toast, onClose }) {
  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-secondary-500 shrink-0" />,
    error: <XCircle className="h-5 w-5 text-red-500 shrink-0" />,
    info: <Info className="h-5 w-5 text-accent-500 shrink-0" />,
  };
  return (
    <div className="card flex items-start gap-3 px-4 py-3 animate-slideIn">
      {icons[toast.type] || icons.info}
      <p className="text-sm text-ink dark:text-gray-100 flex-1">
        {toast.message}
      </p>
      <button
        onClick={onClose}
        aria-label="Dismiss notification"
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
