import { AlertForm } from '../../components/alerts/AlertForm';
import { AlertList } from '../../components/alerts/AlertList';
import type { AlertFormConfig } from '../../components/alerts/AlertForm';

const config: AlertFormConfig = {
  type: 'funding-rate',
  showCoin: true,
  showExchange: true,
  showDirection: true,
  directionOptions: ['above', 'below'],
  showThreshold: true,
  thresholdLabel: 'Funding Rate (%)',
  thresholdPlaceholder: 'e.g. 0.1',
  showCooldown: true,
};

export function FundingRateAlert() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Funding Rate Alert</h1>
        <p className="text-text-muted">
          Monitor perpetual contract funding rates. Get alerted when rates indicate extreme market sentiment.
        </p>
      </div>

      <AlertForm config={config} />
      <AlertList type="funding-rate" />

      <div className="bg-surface border border-surface-border rounded-xl p-6">
        <h3 className="font-semibold mb-3">How Funding Rate Alerts Work</h3>
        <ul className="text-sm text-text-muted space-y-2 list-disc pl-5">
          <li>Set a funding rate threshold (e.g. above 0.1% or below -0.05%)</li>
          <li>High positive rates suggest overleveraged longs</li>
          <li>Negative rates suggest the market is heavily short</li>
        </ul>
      </div>
    </div>
  );
}
