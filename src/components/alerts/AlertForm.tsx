import { useState } from 'react';
import type { AlertType, NotificationMethod } from '../../store/useStore';
import { useStore } from '../../store/useStore';
import { CoinSelector } from '../selectors/CoinSelector';
import { ExchangeSelector } from '../selectors/ExchangeSelector';
import { NotificationMethodPicker } from './NotificationMethodPicker';

export interface AlertFormConfig {
  type: AlertType;
  showCoin?: boolean;
  showExchange?: boolean;
  showDirection?: boolean;
  directionOptions?: string[];
  showThreshold?: boolean;
  thresholdLabel?: string;
  thresholdPlaceholder?: string;
  showCurrency?: boolean;
  showCooldown?: boolean;
  showNote?: boolean;
  showOneTime?: boolean;
  showFrequency?: boolean;
  showTimeWindow?: boolean;
}

const cooldownOptions = [
  { value: '', label: 'No cooldown' },
  { value: '5m', label: '5 minutes' },
  { value: '15m', label: '15 minutes' },
  { value: '1h', label: '1 hour' },
  { value: '4h', label: '4 hours' },
  { value: '12h', label: '12 hours' },
  { value: '24h', label: '24 hours' },
];

const currencyOptions = ['USD', 'BTC', 'ETH', 'EUR', 'GBP'];
const frequencyOptions = ['Hourly', 'Daily', 'Weekly'];
const timeWindowOptions = ['1h', '4h', '24h', '7d'];

interface AlertFormProps {
  config: AlertFormConfig;
}

export function AlertForm({ config }: AlertFormProps) {
  const addAlert = useStore((s) => s.addAlert);
  const addToast = useStore((s) => s.addToast);

  const [coin, setCoin] = useState('BTC');
  const [exchange, setExchange] = useState('');
  const [condition, setCondition] = useState(config.directionOptions?.[0] ?? 'above');
  const [threshold, setThreshold] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [notificationMethods, setNotificationMethods] = useState<NotificationMethod[]>(['email']);
  const [cooldown, setCooldown] = useState('1h');
  const [note, setNote] = useState('');
  const [oneTime, setOneTime] = useState(false);
  const [frequency, setFrequency] = useState('Daily');
  const [timeWindow, setTimeWindow] = useState('24h');

  const directions = config.directionOptions ?? ['above', 'below'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (notificationMethods.length === 0) {
      addToast('Please select at least one notification method', 'error');
      return;
    }

    addAlert({
      type: config.type,
      coin: config.showCoin ? coin : undefined,
      exchange: config.showExchange && exchange ? exchange : undefined,
      condition: config.showDirection ? (condition as 'above' | 'below' | 'rises' | 'drops' | 'change') : undefined,
      threshold: config.showThreshold && threshold ? Number(threshold) : undefined,
      currency: config.showCurrency ? currency : undefined,
      notificationMethods,
      cooldown: config.showCooldown && cooldown ? cooldown : undefined,
      note: config.showNote && note ? note : undefined,
      oneTime: config.showOneTime ? oneTime : undefined,
      frequency: config.showFrequency ? frequency : undefined,
      timeWindow: config.showTimeWindow ? timeWindow : undefined,
      isActive: true,
    });

    addToast('Alert created successfully!');
    setThreshold('');
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface border border-surface-border rounded-xl p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {config.showCoin && (
          <CoinSelector value={coin} onChange={setCoin} />
        )}

        {config.showExchange && (
          <ExchangeSelector value={exchange} onChange={setExchange} />
        )}

        {config.showDirection && (
          <div>
            <label className="block text-sm text-text-muted mb-1">Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full px-3 py-2.5 bg-surface-light border border-surface-border rounded-lg text-sm text-text cursor-pointer focus:outline-none focus:border-primary transition-colors"
            >
              {directions.map((d) => (
                <option key={d} value={d}>
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}

        {config.showThreshold && (
          <div>
            <label className="block text-sm text-text-muted mb-1">
              {config.thresholdLabel ?? 'Threshold'}
            </label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              placeholder={config.thresholdPlaceholder ?? 'Enter value'}
              className="w-full px-3 py-2.5 bg-surface-light border border-surface-border rounded-lg text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
              required
              step="any"
            />
          </div>
        )}

        {config.showCurrency && (
          <div>
            <label className="block text-sm text-text-muted mb-1">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2.5 bg-surface-light border border-surface-border rounded-lg text-sm text-text cursor-pointer focus:outline-none focus:border-primary transition-colors"
            >
              {currencyOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        )}

        {config.showCooldown && (
          <div>
            <label className="block text-sm text-text-muted mb-1">Cooldown</label>
            <select
              value={cooldown}
              onChange={(e) => setCooldown(e.target.value)}
              className="w-full px-3 py-2.5 bg-surface-light border border-surface-border rounded-lg text-sm text-text cursor-pointer focus:outline-none focus:border-primary transition-colors"
            >
              {cooldownOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        )}

        {config.showFrequency && (
          <div>
            <label className="block text-sm text-text-muted mb-1">Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full px-3 py-2.5 bg-surface-light border border-surface-border rounded-lg text-sm text-text cursor-pointer focus:outline-none focus:border-primary transition-colors"
            >
              {frequencyOptions.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        )}

        {config.showTimeWindow && (
          <div>
            <label className="block text-sm text-text-muted mb-1">Time Window</label>
            <select
              value={timeWindow}
              onChange={(e) => setTimeWindow(e.target.value)}
              className="w-full px-3 py-2.5 bg-surface-light border border-surface-border rounded-lg text-sm text-text cursor-pointer focus:outline-none focus:border-primary transition-colors"
            >
              {timeWindowOptions.map((tw) => (
                <option key={tw} value={tw}>{tw}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {config.showNote && (
        <div>
          <label className="block text-sm text-text-muted mb-1">Note (optional)</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note to this alert"
            className="w-full px-3 py-2.5 bg-surface-light border border-surface-border rounded-lg text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      )}

      <NotificationMethodPicker value={notificationMethods} onChange={setNotificationMethods} />

      {config.showOneTime && (
        <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer">
          <input
            type="checkbox"
            checked={oneTime}
            onChange={(e) => setOneTime(e.target.checked)}
            className="accent-primary"
          />
          One-time alert (auto-delete after triggering)
        </label>
      )}

      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors border-none cursor-pointer"
      >
        Create Alert
      </button>
    </form>
  );
}
