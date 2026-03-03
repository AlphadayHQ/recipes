import { useState } from 'react';
import type { Alert } from '../../store/useStore';
import { useStore } from '../../store/useStore';

interface EditAlertModalProps {
  alert: Alert;
  onClose: () => void;
}

const cooldownOptions = [
  { value: '', label: 'None' },
  { value: '15m', label: '15 minutes' },
  { value: '30m', label: '30 minutes' },
  { value: '1h', label: '1 hour' },
  { value: '2h', label: '2 hours' },
  { value: '4h', label: '4 hours' },
  { value: '8h', label: '8 hours' },
  { value: '12h', label: '12 hours' },
  { value: '24h', label: '24 hours' },
  { value: '48h', label: '48 hours' },
  { value: '1w', label: '1 week' },
];

export function EditAlertModal({ alert, onClose }: EditAlertModalProps) {
  const updateAlert = useStore((s) => s.updateAlert);
  const addToast = useStore((s) => s.addToast);

  const [threshold, setThreshold] = useState(alert.threshold?.toString() ?? '');
  const [note, setNote] = useState(alert.note ?? '');
  const [cooldown, setCooldown] = useState(alert.cooldown ?? '');
  const [oneTime, setOneTime] = useState(alert.oneTime ?? false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAlert(alert.id, {
      ...(alert.threshold !== undefined && {
        threshold: threshold ? Number(threshold) : undefined,
      }),
      note: note || undefined,
      cooldown: cooldown || undefined,
      oneTime,
    });
    addToast('Alert updated');
    onClose();
  };

  const typeLabel = alert.type
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const thresholdSuffix =
    alert.type === 'percent' || alert.type === 'funding-rate' || alert.type === 'dominance'
      ? '%'
      : alert.currency
        ? alert.currency
        : '';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-surface border border-surface-border rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8">
        <button
          title="Close"
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text transition-colors bg-transparent border-none cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-semibold mb-1">Edit Alert</h2>
        <p className="text-sm text-text-muted mb-6">
          {typeLabel} alert{alert.coin ? ` · ${alert.coin}` : ''}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {alert.threshold !== undefined && (
            <div>
              <label className="block text-sm text-text-muted mb-1">
                Threshold{thresholdSuffix ? ` (${thresholdSuffix})` : ''}
              </label>
              <input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                step="any"
                className="w-full px-3 py-2 bg-surface-light border border-surface-border rounded-lg text-sm text-text focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-text-muted mb-1">Cooldown</label>
            <select
              value={cooldown}
              onChange={(e) => setCooldown(e.target.value)}
              className="w-full px-3 py-2 bg-surface-light border border-surface-border rounded-lg text-sm text-text focus:outline-none focus:border-primary transition-colors cursor-pointer"
            >
              {cooldownOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-text-muted mb-1">Note</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional note about this alert"
              className="w-full px-3 py-2 bg-surface-light border border-surface-border rounded-lg text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer select-none">
            <input
              type="checkbox"
              checked={oneTime}
              onChange={(e) => setOneTime(e.target.checked)}
              className="accent-primary"
            />
            One-time alert (auto-delete after triggering)
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-surface-border text-text-muted hover:text-text transition-colors bg-transparent cursor-pointer text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium transition-colors border-none cursor-pointer text-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
