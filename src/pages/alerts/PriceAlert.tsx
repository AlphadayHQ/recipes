import { AlertForm } from '../../components/alerts/AlertForm';
import { AlertList } from '../../components/alerts/AlertList';
import type { AlertFormConfig } from '../../components/alerts/AlertForm';

const config: AlertFormConfig = {
  type: 'price',
  showCoin: true,
  showDirection: true,
  directionOptions: ['above', 'below'],
  showThreshold: true,
  thresholdLabel: 'Target Price',
  thresholdPlaceholder: 'e.g. 70000',
  showCooldown: true,
};

export function PriceAlert() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Price Alert</h1>
        <p className="text-text-muted">
          Get notified when a cryptocurrency reaches your target price. Set alerts for any coin on any supported exchange.
        </p>
      </div>

      <AlertForm config={config} />
      <AlertList type="price" />

      <div className="bg-surface border border-surface-border rounded-xl p-6">
        <h3 className="font-semibold mb-3">How Price Alerts Work</h3>
        <ul className="text-sm text-text-muted space-y-2 list-disc pl-5">
          <li>Choose a coin and set whether you want to be alerted when the price goes above or below your target</li>
          <li>Select your preferred notification method (Email or Push)</li>
          <li>Set a cooldown to avoid repeated alerts</li>
        </ul>
      </div>
    </div>
  );
}
