import { useStore } from '../../store/useStore';

export function ToastContainer() {
  const toasts = useStore((s) => s.toasts);
  const removeToast = useStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="relative flex flex-row items-stretch w-80 bg-surface border-2 border-surface-border shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden interactive-element animate-slide-in-right"
        >
          {/* Left dramatic color block */}
          <div
            className={`flex items-center justify-center w-16 shrink-0 ${
              toast.type === 'success'
                ? 'bg-success text-background'
                : toast.type === 'error'
                  ? 'bg-danger text-background'
                  : 'bg-primary text-background'
            }`}
          >
            {toast.type === 'success' ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
              </svg>
            ) : toast.type === 'error' ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <circle cx="12" cy="12" r="10" stroke="currentColor" />
                <path strokeLinecap="square" strokeLinejoin="miter" d="M12 8v4m0 4h.01" />
              </svg>
            )}
          </div>

          {/* Content block */}
          <div className="flex-1 py-4 px-5 pr-12 flex flex-col justify-center">
            <div
              className={`uppercase tracking-[0.2em] text-[10px] font-mono font-bold mb-1.5 ${
                toast.type === 'success'
                  ? 'text-success'
                  : toast.type === 'error'
                    ? 'text-danger'
                    : 'text-primary'
              }`}
            >
              {toast.type === 'success'
                ? 'Success'
                : toast.type === 'error'
                  ? 'Error'
                  : 'Alert'}
            </div>
            <div className="font-display font-bold text-text text-[15px] leading-snug">
              {toast.message}
            </div>
          </div>

          {/* Close Button - Architectural style */}
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="absolute top-0 right-0 w-10 h-10 flex items-center justify-center text-text-muted hover:text-text bg-surface hover:bg-surface-light border-l border-b border-surface-border transition-colors cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
