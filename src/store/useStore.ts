import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
  | 'blockchain'
  | 'crypto-briefing'
  | 'twitter-digest'
  | 'custom';

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
  query?: string;
  includePrices?: boolean;
  includeNews?: boolean;
  includeDao?: boolean;
  includeSocialSentiment?: boolean;
  includeEvents?: boolean;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export type AuthStatus =
  | 'guest'
  | 'selecting-method'
  | 'signing-in'
  | 'verifying-email'
  | 'verified';

export type AuthMethod = 'email' | 'google' | 'apple';

interface AppState {
  // Auth
  authToken: { value: string } | null;
  authStatus: AuthStatus;
  authMethod: AuthMethod | null;
  authEmail: string | null;

  setAuthToken: (token: { value: string } | null) => void;
  setAuthStatus: (status: AuthStatus) => void;
  setAuthMethod: (method: AuthMethod | null) => void;
  setAuthEmail: (email: string | null) => void;
  resetAuthState: () => void;

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

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Auth
      authToken: null,
      authStatus: 'guest',
      authMethod: null,
      authEmail: null,

      setAuthToken: (token) => set({ authToken: token }),
      setAuthStatus: (status) => set({ authStatus: status }),
      setAuthMethod: (method) => set({ authMethod: method }),
      setAuthEmail: (email) => set({ authEmail: email }),
      resetAuthState: () =>
        set({
          authToken: null,
          authStatus: 'guest',
          authMethod: null,
          authEmail: null,
        }),

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
          alerts: state.alerts.map((a) =>
            a.id === id ? { ...a, ...patch } : a
          ),
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
          set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
          }));
        }, 3000);
      },
      removeToast: (id) =>
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
    }),
    {
      name: 'cryptoalerts-auth',
      partialize: (state) => ({
        authToken: state.authToken,
        authStatus: state.authStatus,
        authEmail: state.authEmail,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && state.authStatus !== 'verified' && state.authStatus !== 'guest') {
          useStore.setState({ authStatus: 'guest' });
        }
      },
    }
  )
);
