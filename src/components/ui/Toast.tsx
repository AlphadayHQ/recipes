import { useStore } from '../../store/useStore';

export function ToastContainer() {
  const toasts = useStore((s) => s.toasts);
  const removeToast = useStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg shadow-lg text-sm flex items-center gap-3 min-w-[280px] ${
            toast.type === 'success'
              ? 'bg-success/20 border border-success/30 text-success'
              : toast.type === 'error'
                ? 'bg-danger/20 border border-danger/30 text-danger'
                : 'bg-primary/20 border border-primary/30 text-primary'
          }`}
        >
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-current opacity-60 hover:opacity-100 bg-transparent border-none cursor-pointer text-lg leading-none"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
