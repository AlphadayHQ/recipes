import { create } from 'zustand';
import seedAlerts from '../mocks/alerts.json';

export type AlertType =
  | 'price'
  | 'percent'
  | 'periodic'
  | 'volume'
  | 'funding-rate'
  | 'market-cap'
  | 'dominance'
  | 'stock'
  | 'listing'
  | 'wallet'
  | 'wallet-balance'
  | 'whale'
  | 'gas'
  | 'mempool'
  | 'blockchain';

export type NotificationMethod =
  | 'email'
  | 'sms'
  | 'phone'
  | 'push'
  | 'webhook'
  | 'telegram'
  | 'discord'
  | 'slack';

export interface Alert {
  id: string;
  type: AlertType;
  coin?: string;
  exchange?: string;
  condition?: 'above' | 'below' | 'rises' | 'drops' | 'change';
  threshold?: number;
  currency?: string;
  notificationMethods: NotificationMethod[];
  cooldown?: string;
  note?: string;
  oneTime?: boolean;
  isActive: boolean;
  createdAt: string;
  walletAddress?: string;
  chain?: string;
  gasSpeed?: string;
  frequency?: string;
  timeWindow?: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppState {
  // Auth
  isAuthenticated: boolean;
  user: { email: string } | null;
  login: (email: string) => void;
  logout: () => void;

  // Alerts
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id' | 'createdAt'>) => void;
  updateAlert: (id: string, patch: Partial<Alert>) => void;
  deleteAlert: (id: string) => void;
  toggleAlert: (id: string) => void;

  // Toasts
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

let toastCounter = 0;

export const useStore = create<AppState>((set) => ({
  // Auth
  isAuthenticated: false,
  user: null,
  login: (email) => set({ isAuthenticated: true, user: { email } }),
  logout: () => set({ isAuthenticated: false, user: null }),

  // Alerts
  alerts: seedAlerts as Alert[],
  addAlert: (alert) =>
    set((state) => ({
      alerts: [
        ...state.alerts,
        {
          ...alert,
          id: `alert-${Date.now()}`,
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  updateAlert: (id, patch) =>
    set((state) => ({
      alerts: state.alerts.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    })),
  deleteAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
    })),
  toggleAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === id ? { ...a, isActive: !a.isActive } : a
      ),
    })),

  // Toasts
  toasts: [],
  addToast: (message, type = 'success') => {
    const id = `toast-${++toastCounter}`;
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 3000);
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
