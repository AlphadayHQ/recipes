import { AlertForm } from '../../components/alerts/AlertForm';
import { AlertList } from '../../components/alerts/AlertList';
import { marketCapAlertConfig } from '../../components/alerts/alertConfigs';

export function MarketCapAlert() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Market Cap Alert</h1>
        <p className="text-text-muted">
          Track market capitalization milestones. Know when a coin crosses key market cap thresholds.
        </p>
      </div>

      <AlertForm config={marketCapAlertConfig} />
      <AlertList type="market-cap" />

      <div className="bg-surface border border-surface-border rounded-xl p-6">
        <h3 className="font-semibold mb-3">How Market Cap Alerts Work</h3>
        <ul className="text-sm text-text-muted space-y-2 list-disc pl-5">
          <li>Set a market cap target in dollars</li>
          <li>Track coins approaching key milestones ($1B, $10B, etc.)</li>
          <li>No exchange needed — market cap is aggregated across all markets</li>
        </ul>
      </div>
    </div>
  );
}
