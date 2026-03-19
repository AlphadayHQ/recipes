import { useState, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { useAuth } from "../hooks/useAuth";
import { useSubscriptions } from "../hooks/useSubscriptions";
import { AlertCard } from "../components/alerts/AlertCard";
import { EditAlertModal } from "../components/alerts/EditAlertModal";
import { NewAlertModal } from "../components/alerts/NewAlertModal";
import type { Alert, AlertType } from "../store/useStore";

const ALERT_TYPE_LABELS: Partial<Record<AlertType, string>> = {
  price: "Price",
  percent: "Percent",
  periodic: "Periodic",
  volume: "Volume",
  "funding-rate": "Funding Rate",
  "market-cap": "Market Cap",
  dominance: "Dominance",
  stock: "Stock",
  listing: "Listing",
  wallet: "Wallet",
  "wallet-balance": "Wallet Balance",
  whale: "Whale",
  gas: "Gas",
  mempool: "Mempool",
  blockchain: "Blockchain",
  "crypto-briefing": "Crypto Briefing",
  "twitter-digest": "Twitter Digest",
  custom: "Custom Alert",
};

const NEW_ALERT_OPTIONS = [
  { label: "Price Alert", type: "price" },
  { label: "Percent Alert", type: "percent" },
  { label: "Periodic Alert", type: "periodic" },
  { label: "Crypto Briefing", type: "crypto-briefing" },
  { label: "Twitter Digest", type: "twitter-digest" },
  { label: "Custom Alert", type: "custom" },
];

export function Dashboard() {
  const { isAuthenticated } = useAuth();
  const alerts = useStore((s) => s.alerts);
  const { loading, error } = useSubscriptions();

  const [typeFilter, setTypeFilter] = useState<AlertType | "all">("all");
  const [search, setSearch] = useState("");
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null);
  const [showNewDropdown, setShowNewDropdown] = useState(false);
  const [newAlertType, setNewAlertType] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowNewDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const activeCount = alerts.filter((a) => a.isActive).length;
  const pausedCount = alerts.filter((a) => !a.isActive).length;
  const presentTypes = [...new Set(alerts.map((a) => a.type))];

  const filtered = alerts.filter((a) => {
    if (typeFilter !== "all" && a.type !== typeFilter) return false;
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
    <div className="max-w-5xl mx-auto px-4 pt-32 pb-10 w-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <h1 className="text-3xl font-bold self-center">My Recipes</h1>

        <div className="relative w-full sm:w-auto" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowNewDropdown((v) => !v)}
            className="group flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-background font-semibold rounded-lg w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(250,162,2,0.3)] active:scale-95 active:shadow-none border-none cursor-pointer whitespace-nowrap"
          >
            <svg
              className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Alert
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${showNewDropdown ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            className={`absolute right-0 sm:right-0 left-0 sm:left-auto top-full mt-2 w-full sm:w-52 bg-surface-light border border-surface-border rounded-xl shadow-2xl py-1.5 z-50 origin-top transform transition-all duration-200 ${
              showNewDropdown
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {NEW_ALERT_OPTIONS.map((opt) => (
              <button
                key={opt.type}
                type="button"
                onClick={() => {
                  setShowNewDropdown(false);
                  setNewAlertType(opt.type);
                }}
                className="block w-full text-left px-4 py-2.5 text-sm text-text-muted hover:text-text hover:bg-surface bg-transparent border-none cursor-pointer transition-all duration-200 hover:pl-5"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse">
          {/* Stats skeleton */}
          <div className="grid grid-cols-3 gap-4 mb-8 w-full">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="bg-surface border border-surface-border rounded-xl p-5"
              >
                <div className="h-9 w-12 bg-surface-light rounded mb-1" />
                <div className="h-4 w-20 bg-surface-light rounded" />
              </div>
            ))}
          </div>

          {/* Filters skeleton */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex gap-2">
              {[64, 56, 80, 64].map((w, i) => (
                <div
                  key={i}
                  className="h-8 rounded-lg bg-surface-light"
                  style={{ width: w }}
                />
              ))}
            </div>
            <div className="sm:ml-auto h-8 w-full sm:w-56 bg-surface-light border border-surface-border rounded-lg" />
          </div>

          {/* Alert card skeletons */}
          <div className="space-y-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 bg-surface border border-surface-border rounded-xl"
              >
                <div className="w-10 h-6 rounded-full bg-surface-light" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-4 w-16 bg-surface-light rounded" />
                    <div className="h-5 w-14 bg-surface-light rounded-full" />
                  </div>
                  <div className="h-4 w-48 bg-surface-light rounded" />
                </div>
                <div className="hidden sm:flex gap-1">
                  <div className="h-5 w-12 bg-surface-light rounded" />
                  <div className="h-5 w-14 bg-surface-light rounded" />
                </div>
                <div className="h-7 w-7 bg-surface-light rounded" />
                <div className="h-7 w-7 bg-surface-light rounded" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8 w-full group/stats">
            <div className="bg-surface border border-surface-border rounded-xl p-5 group transition-all duration-300 hover:border-text-muted hover:bg-surface-light hover:-translate-y-1 hover:shadow-lg">
              <p className="text-3xl font-bold group-hover:scale-105 group-hover:text-primary transition-all transform origin-left">
                {alerts.length}
              </p>
              <p className="text-sm text-text-muted mt-1 group-hover:text-text transition-colors duration-300">
                Total Alerts
              </p>
            </div>
            <div className="bg-surface border border-surface-border rounded-xl p-5 group transition-all duration-300 hover:border-success/50 hover:bg-surface-light hover:-translate-y-1 hover:shadow-lg">
              <p className="text-3xl font-bold text-success group-hover:scale-105 transition-all transform origin-left drop-shadow-[0_0_8px_rgba(109,210,48,0)] group-hover:drop-shadow-[0_0_8px_rgba(109,210,48,0.4)]">
                {activeCount}
              </p>
              <p className="text-sm text-text-muted mt-1 group-hover:text-text transition-colors duration-300">
                Active
              </p>
            </div>
            <div className="bg-surface border border-surface-border rounded-xl p-5 group transition-all duration-300 hover:border-surface-border hover:bg-surface-light hover:-translate-y-1 hover:shadow-lg">
              <p className="text-3xl font-bold text-text-muted group-hover:scale-105 transition-all transform origin-left">
                {pausedCount}
              </p>
              <p className="text-sm text-text-muted mt-1 group-hover:text-text transition-colors duration-300">
                Paused
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setTypeFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border-none cursor-pointer ${
                  typeFilter === "all"
                    ? "bg-primary text-background"
                    : "bg-surface-light text-text-muted hover:text-text"
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
                      ? "bg-primary text-background"
                      : "bg-surface-light text-text-muted hover:text-text"
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
          {error ? (
            <div className="text-center py-20 text-error text-sm">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-text-muted">
              {alerts.length === 0 ? (
                <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="relative w-24 h-24 mb-8">
                    {/* Radar background pulse */}
                    <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-[ping_3s_ease-out_infinite]" />
                    <div className="absolute inset-2 rounded-full border-2 border-primary/40 animate-[ping_3s_ease-out_infinite_1.5s]" />
                    <div className="absolute inset-0 bg-surface-light rounded-full flex items-center justify-center z-10 shadow-[0_0_30px_rgba(250,162,2,0.1)]">
                      <svg
                        className="w-10 h-10 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-text mb-2">
                    Your radar is clear
                  </p>
                  <p className="text-base mb-8 max-w-sm text-text-muted">
                    Set up your first alert and we'll keep watch while you focus
                    on the big picture.
                  </p>

                  <button
                    type="button"
                    onClick={() => setNewAlertType("price")}
                    className="group relative inline-flex items-center justify-center px-6 py-3 bg-primary text-background font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(250,162,2,0.25)] active:scale-95 active:shadow-none border-none cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    <span className="relative flex items-center gap-2">
                      Deploy First Alert
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              ) : (
                <p className="text-sm">No alerts match your filter.</p>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onEdit={setEditingAlert}
                />
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

          {/* New alert modal */}
          {newAlertType && (
            <NewAlertModal
              alertType={newAlertType}
              onClose={() => setNewAlertType(null)}
            />
          )}
        </>
      )}
    </div>
  );
}
