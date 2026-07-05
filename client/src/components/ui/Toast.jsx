import { CheckCircle2, XCircle, Info, X } from "lucide-react";

/**
 * Toast
 * @typedef {Object} ToastProps
 * @property {Object} toast - The toast data object.
 * @property {string|number} toast.id - Unique id for this toast.
 * @property {string} toast.message - Message text to display.
 * @property {"success"|"error"|"info"} toast.type - Visual style / icon variant.
 * @property {() => void} onClose - Called when the dismiss (X) button is clicked.
 * @param {ToastProps} props
 */
export function Toast({ toast, onClose }) {
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

/**
 * @typedef {Object} ToastContainerProps
 * @property {Array<{id: string|number, message: string, type: string}>} toasts - Queued toasts to render.
 * @property {(id: string|number) => void} onDismiss - Called with a toast's id when it should be removed.
 * @param {ToastContainerProps} props
 */
export function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-[calc(100%-2rem)] sm:w-auto sm:max-w-sm">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onClose={() => onDismiss(t.id)} />
      ))}
    </div>
  );
}

export default Toast;
