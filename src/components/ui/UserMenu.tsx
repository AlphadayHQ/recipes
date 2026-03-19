import { useEffect, useRef, useState } from 'react';
import { User, LogOut } from 'lucide-react';

interface UserMenuProps {
  email: string;
  onLogout: () => void;
}

export function UserMenu({ email, onLogout }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        title="Account"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-light border border-surface-border text-text hover:bg-surface-border transition-colors"
      >
        <User size={16} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-surface border border-surface-border rounded-xl shadow-xl shadow-black/40 overflow-hidden">
          <div className="px-4 py-3 border-b border-surface-border">
            <p className="text-sm font-medium text-text truncate">{email}</p>
          </div>
          <button
            onClick={() => { setOpen(false); onLogout(); }}
            className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-text-muted hover:text-danger hover:bg-danger/10 transition-colors"
          >
            <LogOut size={14} />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
