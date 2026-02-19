import { useState } from 'react';
import type { AlertType, NotificationMethod } from '../../store/useStore';
import { useStore } from '../../store/useStore';
import { CoinSelector } from '../selectors/CoinSelector';
import { ExchangeSelector } from '../selectors/ExchangeSelector';
import { useMarketData } from '../../hooks/useMarketData';
import { createPriceAlert, createPercentageAlert, createPeriodicAlert } from '../../api/alertApi';

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

const currencyLabels: Record<string, string> = {
  USD: 'Dollars (USD)',
  BTC: 'Bitcoin (BTC)',
  ETH: 'Ether (ETH)',
  EUR: 'Euros (EUR)',
  GBP: 'Pounds (GBP)',
};

const currencyOptions = ['USD', 'BTC', 'ETH', 'EUR', 'GBP'];
const frequencyOptions = ['Hourly', 'Daily', 'Weekly'];
const timeWindowOptions = ['24h', '7d'];

const notificationOptions: { id: NotificationMethod; label: string }[] = [
  { id: 'email', label: 'Email' },
  { id: 'push', label: 'Push Notification' },
];

const inlineSelectClass =
  'bg-transparent border-0 border-b-2 border-primary text-primary font-semibold cursor-pointer text-lg px-1 py-0 focus:outline-none hover:border-primary/70 transition-colors';

const inlineInputClass =
  'bg-transparent border-0 border-b-2 border-primary text-primary font-semibold text-lg px-1 py-0 focus:outline-none hover:border-primary/70 transition-colors w-28 text-center';

interface AlertFormProps {
  config: AlertFormConfig;
}

export function AlertForm({ config }: AlertFormProps) {
  const addAlert = useStore((s) => s.addAlert);
  const addToast = useStore((s) => s.addToast);
  const authToken = useStore((s) => s.authToken);
  const { coins } = useMarketData();

  const [coin, setCoin] = useState('BTC');
  const [exchange, setExchange] = useState('');
  const [condition, setCondition] = useState(config.directionOptions?.[0] ?? 'above');
  const [threshold, setThreshold] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [notificationMethod, setNotificationMethod] = useState<NotificationMethod>('email');
  const [cooldown, setCooldown] = useState('1h');
  const [note, setNote] = useState('');
  const [oneTime, setOneTime] = useState(false);
  const [frequency, setFrequency] = useState('Daily');
  const [timeWindow, setTimeWindow] = useState('24h');

  const directions = config.directionOptions ?? ['above', 'below'];
  const selectedCoin = coins.find((c) => c.symbol === coin);
  const isPeriodicStyle = config.showFrequency && !config.showDirection;
  const isPercentStyle = config.showTimeWindow;

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const coinSlug = coins.find((c) => c.symbol === coin)?.id ?? coin.toLowerCase();

    // POST to backend API for supported alert types
    if (['price', 'percent', 'periodic'].includes(config.type) && authToken?.value) {
      setSubmitting(true);
      try {
        if (config.type === 'price') {
          await createPriceAlert(authToken.value, {
            coinSlug,
            direction: condition,
            threshold: Number(threshold),
            cooldown: cooldown || undefined,
            notificationMethod,
          });
        } else if (config.type === 'percent') {
          await createPercentageAlert(authToken.value, {
            coinSlug,
            direction: condition,
            timeWindow,
            threshold: Number(threshold),
            cooldown: cooldown || undefined,
            notificationMethod,
          });
        } else if (config.type === 'periodic') {
          await createPeriodicAlert(authToken.value, {
            coinSlug,
            direction: condition,
            threshold: Number(threshold),
            frequency,
            cooldown: cooldown || undefined,
            notificationMethod,
          });
        }
      } catch (err) {
        addToast(
          err instanceof Error ? err.message : 'Failed to create alert',
          'error'
        );
        setSubmitting(false);
        return;
      }
      setSubmitting(false);
    }

    addAlert({
      type: config.type,
      coin: config.showCoin ? coin : undefined,
      exchange: config.showExchange && exchange ? exchange : undefined,
      condition: config.showDirection ? (condition as 'above' | 'below' | 'rises' | 'drops' | 'change') : undefined,
      threshold: config.showThreshold && threshold ? Number(threshold) : undefined,
      currency: config.showCurrency ? currency : undefined,
      notificationMethods: [notificationMethod],
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
    <form onSubmit={handleSubmit} className="bg-surface border border-surface-border rounded-xl p-8">
      <p className="text-lg leading-[3] text-text flex flex-wrap items-baseline gap-x-1.5">
        {/* --- Periodic style: "Send me a [Daily] [Email] update about [coin] in [currency] on [exchange]." --- */}
        {isPeriodicStyle && (
          <>
            <span>Send me a</span>
            <select
              title="Select Frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className={inlineSelectClass}
            >
              {frequencyOptions.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            <select
              title="Select Notification Method"
              value={notificationMethod}
              onChange={(e) => setNotificationMethod(e.target.value as NotificationMethod)}
              className={inlineSelectClass}
            >
              {notificationOptions.map((m) => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
            <span>update about</span>
            {config.showCoin && <CoinSelector value={coin} onChange={setCoin} coins={coins} variant="inline" />}
            {config.showCurrency && (
              <>
                <span>in</span>
                <select
                  title="Select Currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className={inlineSelectClass}
                >
                  {currencyOptions.map((c) => (
                    <option key={c} value={c}>{currencyLabels[c] ?? c}</option>
                  ))}
                </select>
              </>
            )}
            {config.showExchange && (
              <>
                <span>on</span>
                <ExchangeSelector value={exchange} onChange={setExchange} variant="inline" />
              </>
            )}
            <span>.</span>
          </>
        )}

        {/* --- Percent style: "Send me an [Email] as soon as [coin] [rises] by [threshold]% within [timeWindow] on [exchange]." --- */}
        {!isPeriodicStyle && isPercentStyle && (
          <>
            <span>Send me an</span>
            <select
              title="Select Notification Method"
              value={notificationMethod}
              onChange={(e) => setNotificationMethod(e.target.value as NotificationMethod)}
              className={inlineSelectClass}
            >
              {notificationOptions.map((m) => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
            <span>as soon as</span>
            {config.showCoin && <CoinSelector value={coin} onChange={setCoin} coins={coins} variant="inline" />}
            {config.showDirection && (
              <select
                title="Select Condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className={inlineSelectClass}
              >
                {directions.map((d) => (
                  <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                ))}
              </select>
            )}
            {config.showThreshold && (
              <>
                <span>by</span>
                <input
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  placeholder={config.thresholdPlaceholder ?? '0.00'}
                  className={inlineInputClass}
                  required
                  step="any"
                />
                <span>%</span>
              </>
            )}
            <span>within</span>
            <select
              title="Select Time Window"
              value={timeWindow}
              onChange={(e) => setTimeWindow(e.target.value)}
              className={inlineSelectClass}
            >
              {timeWindowOptions.map((tw) => (
                <option key={tw} value={tw}>{tw}</option>
              ))}
            </select>
            {config.showExchange && (
              <>
                <span>on</span>
                <ExchangeSelector value={exchange} onChange={setExchange} variant="inline" />
              </>
            )}
            <span>.</span>
          </>
        )}

        {/* --- Default style (price, volume, marketcap, dominance, funding, stock, periodic with condition): --- */}
        {!isPeriodicStyle && !isPercentStyle && (
          <>
            <span>Send me a</span>
            {config.showFrequency && (
              <select
                title="Select Frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className={inlineSelectClass}
              >
                {frequencyOptions.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            )}
            <select
              title="Select Notification Method"
              value={notificationMethod}
              onChange={(e) => setNotificationMethod(e.target.value as NotificationMethod)}
              className={inlineSelectClass}
            >
              {notificationOptions.map((m) => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
            {config.showFrequency ? <span>when</span> : <span>as soon as</span>}
            {config.showCoin && <CoinSelector value={coin} onChange={setCoin} coins={coins} variant="inline" />}
            {config.showDirection && (
              <>
                <span>goes</span>
                <select
                  title="Select Condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className={inlineSelectClass}
                >
                  {directions.map((d) => (
                    <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                  ))}
                </select>
              </>
            )}
            {config.showThreshold && (
              <>
                <span>the price of</span>
                <input
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  placeholder={config.thresholdPlaceholder ?? '0.00'}
                  className={inlineInputClass}
                  required
                  step="any"
                />
              </>
            )}
            {config.showCurrency && (
              <select
                title="Select Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={inlineSelectClass}
              >
                {currencyOptions.map((c) => (
                  <option key={c} value={c}>{currencyLabels[c] ?? c}</option>
                ))}
              </select>
            )}
            {config.showExchange && (
              <>
                <span>on</span>
                <ExchangeSelector value={exchange} onChange={setExchange} variant="inline" />
              </>
            )}
            <span>.</span>
          </>
        )}
      </p>

      {/* Current price info */}
      {config.showCoin && selectedCoin && (
        <p className="text-sm text-text-muted mt-2">
          The price of {coin} is currently{' '}
          <span className="font-semibold text-text">
            {selectedCoin.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>{' '}
          {currency}.
        </p>
      )}

      {/* Additional options row */}
      {(config.showCooldown || config.showOneTime || config.showNote) && (
        <div className="mt-6 flex flex-wrap gap-4 items-end">
          {config.showCooldown && (
            <div>
              <label className="block text-xs text-text-muted mb-1">Cooldown</label>
              <select
                title="Select Cooldown"
                value={cooldown}
                onChange={(e) => setCooldown(e.target.value)}
                className="px-3 py-1.5 bg-surface-light border border-surface-border rounded-lg text-sm text-text cursor-pointer focus:outline-none focus:border-primary transition-colors"
              >
                {cooldownOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          )}

          {config.showOneTime && (
            <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer py-1.5">
              <input
                type="checkbox"
                checked={oneTime}
                onChange={(e) => setOneTime(e.target.checked)}
                className="accent-primary"
              />
              One-time alert
            </label>
          )}

          {config.showNote && (
            <div className="flex-1 min-w-48">
              <label className="block text-xs text-text-muted mb-1">Note (optional)</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note to this alert"
                className="w-full px-3 py-1.5 bg-surface-light border border-surface-border rounded-lg text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Creating...' : 'Create Alert'}
      </button>
    </form>
  );
}
