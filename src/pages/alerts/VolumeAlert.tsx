import { AlertForm } from '../../components/alerts/AlertForm';
import { AlertList } from '../../components/alerts/AlertList';
import type { AlertFormConfig } from '../../components/alerts/AlertForm';

const config: AlertFormConfig = {
  type: 'volume',
  showCoin: true,
  showExchange: true,
  showDirection: true,
  directionOptions: ['above', 'below'],
  showThreshold: true,
  thresholdLabel: 'Volume Threshold',
  thresholdPlaceholder: 'e.g. 5000000000',
  showCurrency: true,
  showCooldown: true,
};

export function VolumeAlert() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Volume Alert</h1>
        <p className="text-text-muted">
          Track trading volume for any coin. Get notified when volume exceeds or drops below your threshold.
        </p>
      </div>

      <AlertForm config={config} />
      <AlertList type="volume" />

      <div className="bg-surface border border-surface-border rounded-xl p-6">
        <h3 className="font-semibold mb-3">How Volume Alerts Work</h3>
        <ul className="text-sm text-text-muted space-y-2 list-disc pl-5">
          <li>Set a 24h volume threshold in your chosen currency</li>
          <li>Useful for detecting unusual market activity</li>
          <li>Combine with price alerts for a comprehensive strategy</li>
        </ul>
      </div>
    </div>
  );
}
