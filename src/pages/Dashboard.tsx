import { useState, useRef, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useAuth } from '../hooks/useAuth';
import { AlertCard } from '../components/alerts/AlertCard';
import { EditAlertModal } from '../components/alerts/EditAlertModal';
import type { Alert, AlertType } from '../store/useStore';

const ALERT_TYPE_LABELS: Partial<Record<AlertType, string>> = {
  price: 'Price',
  percent: 'Percent',
  periodic: 'Periodic',
  volume: 'Volume',
  'funding-rate': 'Funding Rate',
  'market-cap': 'Market Cap',
  dominance: 'Dominance',
  stock: 'Stock',
  listing: 'Listing',
  wallet: 'Wallet',
  'wallet-balance': 'Wallet Balance',
  whale: 'Whale',
  gas: 'Gas',
  mempool: 'Mempool',
  blockchain: 'Blockchain',
  'crypto-briefing': 'Crypto Briefing',
  'twitter-digest': 'Twitter Digest',
  'custom': 'Custom Alert',
};

const NEW_ALERT_OPTIONS = [
  { label: 'Price Alert', to: '/alerts/price' },
  { label: 'Percent Alert', to: '/alerts/percent' },
  { label: 'Periodic Alert', to: '/alerts/periodic' },
  { label: 'Volume Alert', to: '/alerts/volume' },
  { label: 'Funding Rate', to: '/alerts/funding-rate' },
  { label: 'Market Cap', to: '/alerts/market-cap' },
  { label: 'BTC Dominance', to: '/alerts/dominance' },
  { label: 'Stock / ETF', to: '/alerts/stock' },
  { label: 'Custom Alert', to: '/alerts/custom' },
];

export function Dashboard() {
  const { isAuthenticated, authEmail } = useAuth();
  const alerts = useStore((s) => s.alerts);

  const [typeFilter, setTypeFilter] = useState<AlertType | 'all'>('all');
  const [search, setSearch] = useState('');
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null);
  const [showNewDropdown, setShowNewDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowNewDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const activeCount = alerts.filter((a) => a.isActive).length;
  const pausedCount = alerts.filter((a) => !a.isActive).length;
  const presentTypes = [...new Set(alerts.map((a) => a.type))];

  const filtered = alerts.filter((a) => {
    if (typeFilter !== 'all' && a.type !== typeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        a.coin?.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q) ||
        a.note?.toLowerCase().includes(q) ||
        a.exchange?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">My Alerts</h1>
          {authEmail && (
            <p className="text-text-muted text-sm mt-1">{authEmail}</p>
          )}
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowNewDropdown((v) => !v)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors border-none cursor-pointer whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Alert
            <svg
              className={`w-3.5 h-3.5 transition-transform ${showNewDropdown ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showNewDropdown && (
            <div className="absolute right-0 top-full mt-1 w-52 bg-surface-light border border-surface-border rounded-xl shadow-2xl py-1.5 z-50">
              {NEW_ALERT_OPTIONS.map((opt) => (
                <Link
                  key={opt.to}
                  to={opt.to}
                  onClick={() => setShowNewDropdown(false)}
                  className="block px-4 py-2 text-sm text-text-muted hover:text-text hover:bg-surface no-underline transition-colors"
                >
                  {opt.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-surface border border-surface-border rounded-xl p-5">
          <p className="text-3xl font-bold">{alerts.length}</p>
          <p className="text-sm text-text-muted mt-1">Total Alerts</p>
        </div>
        <div className="bg-surface border border-surface-border rounded-xl p-5">
          <p className="text-3xl font-bold text-success">{activeCount}</p>
          <p className="text-sm text-text-muted mt-1">Active</p>
        </div>
        <div className="bg-surface border border-surface-border rounded-xl p-5">
          <p className="text-3xl font-bold text-text-muted">{pausedCount}</p>
          <p className="text-sm text-text-muted mt-1">Paused</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setTypeFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border-none cursor-pointer ${
              typeFilter === 'all'
                ? 'bg-primary text-white'
                : 'bg-surface-light text-text-muted hover:text-text'
            }`}
          >
            All ({alerts.length})
          </button>
          {presentTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTypeFilter(type)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border-none cursor-pointer ${
                typeFilter === type
                  ? 'bg-primary text-white'
                  : 'bg-surface-light text-text-muted hover:text-text'
              }`}
            >
              {ALERT_TYPE_LABELS[type] ?? type}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by coin, type, note…"
          className="sm:ml-auto px-3 py-1.5 bg-surface-light border border-surface-border rounded-lg text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors min-w-0 w-full sm:w-56"
        />
      </div>

      {/* Alert list */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-text-muted">
          {alerts.length === 0 ? (
            <>
              <div className="w-16 h-16 rounded-full bg-surface-light flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <p className="text-lg font-medium text-text mb-2">No alerts yet</p>
              <p className="text-sm mb-6">Create your first alert to get started</p>
              <Link
                to="/alerts/price"
                className="inline-block px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg no-underline font-medium transition-colors text-sm"
              >
                Create your first alert
              </Link>
            </>
          ) : (
            <p className="text-sm">No alerts match your filter.</p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((alert) => (
            <AlertCard key={alert.id} alert={alert} onEdit={setEditingAlert} />
          ))}
        </div>
      )}

      {/* Edit modal */}
      {editingAlert && (
        <EditAlertModal
          alert={editingAlert}
          onClose={() => setEditingAlert(null)}
        />
      )}
    </div>
  );
}
