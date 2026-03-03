import type { Alert } from "../../store/useStore";
import { useStore } from "../../store/useStore";
import { Badge } from "../ui/Badge";

interface AlertCardProps {
  alert: Alert;
  onEdit?: (alert: Alert) => void;
}

export function AlertCard({ alert, onEdit }: AlertCardProps) {
  const toggleAlert = useStore((s) => s.toggleAlert);
  const deleteAlert = useStore((s) => s.deleteAlert);
  const addToast = useStore((s) => s.addToast);

  const handleDelete = () => {
    deleteAlert(alert.id);
    addToast("Alert deleted", "info");
  };

  const description = buildDescription(alert);

  return (
    <div className="flex items-center gap-4 p-4 bg-surface border border-surface-border rounded-xl">
      {/* Toggle */}
      <button
        type="button"
        title="Toggle alert"
        onClick={() => toggleAlert(alert.id)}
        className={`w-10 h-6 rounded-full relative transition-colors border-none cursor-pointer ${
          alert.isActive ? "bg-success" : "bg-surface-border"
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
            alert.isActive ? "left-4.5" : "left-0.5"
          }`}
        />
      </button>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {alert.coin && (
            <span className="font-semibold text-sm">{alert.coin}</span>
          )}
          <Badge status={alert.isActive ? "active" : "paused"} />
        </div>
        <p className="text-sm text-text-muted truncate">{description}</p>
        {alert.note && (
          <p className="text-xs text-text-muted mt-1 italic">{alert.note}</p>
        )}
      </div>

      {/* Methods */}
      <div className="hidden sm:flex gap-1">
        {alert.notificationMethods.map((m) => (
          <span
            key={m}
            className="text-xs px-2 py-0.5 bg-surface-light rounded text-text-muted"
          >
            {m}
          </span>
        ))}
      </div>

      {/* Edit */}
      {onEdit && (
        <button
          type="button"
          onClick={() => onEdit(alert)}
          className="p-1.5 text-text-muted hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
          title="Edit alert"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      )}

      {/* Delete */}
      <button
        type="button"
        onClick={handleDelete}
        className="p-1.5 text-text-muted hover:text-danger transition-colors bg-transparent border-none cursor-pointer"
        title="Delete alert"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}

function buildDescription(alert: Alert): string {
  const parts: string[] = [];

  if (alert.type === "price") {
    parts.push(
      `Price ${alert.condition} ${alert.threshold} ${alert.currency ?? "USD"}`,
    );
  } else if (alert.type === "percent") {
    parts.push(
      `${alert.condition === "rises" ? "Rises" : "Drops"} by ${alert.threshold}%`,
    );
    if (alert.timeWindow) parts.push(`in ${alert.timeWindow}`);
  } else if (alert.type === "periodic") {
    parts.push(`${alert.frequency} price update`);
  } else if (alert.type === "volume") {
    parts.push(
      `Volume ${alert.condition} ${formatNumber(alert.threshold ?? 0)} ${alert.currency ?? "USD"}`,
    );
  } else if (alert.type === "funding-rate") {
    parts.push(`Funding rate ${alert.condition} ${alert.threshold}%`);
  } else if (alert.type === "market-cap") {
    parts.push(
      `Market cap ${alert.condition} $${formatNumber(alert.threshold ?? 0)}`,
    );
  } else if (alert.type === "dominance") {
    parts.push(`BTC dominance ${alert.condition} ${alert.threshold}%`);
  } else if (alert.type === "stock") {
    parts.push(
      `Price ${alert.condition} ${alert.threshold} ${alert.currency ?? "USD"}`,
    );
  } else if (alert.type === "custom") {
    if (alert.query) parts.push(`Custom alert: "${alert.query}"`);
    if (alert.frequency) parts.push(`· ${alert.frequency}`);
  } else {
    parts.push(alert.type);
  }

  if (alert.exchange) parts.push(`on ${alert.exchange}`);
  if (alert.cooldown) parts.push(`(${alert.cooldown} cooldown)`);

  return parts.join(" ");
}

function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}
