import { AlertForm } from '../../components/alerts/AlertForm';
import { AlertList } from '../../components/alerts/AlertList';
import type { AlertFormConfig } from '../../components/alerts/AlertForm';

const config: AlertFormConfig = {
  type: 'dominance',
  showDirection: true,
  directionOptions: ['above', 'below'],
  showThreshold: true,
  thresholdLabel: 'BTC Dominance (%)',
  thresholdPlaceholder: 'e.g. 50',
  showCooldown: true,
};

export function DominanceAlert() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">BTC Dominance Alert</h1>
        <p className="text-text-muted">
          Monitor Bitcoin's market dominance percentage. Track shifts in capital flow between BTC and altcoins.
        </p>
      </div>

      <AlertForm config={config} />
      <AlertList type="dominance" />

      <div className="bg-surface border border-surface-border rounded-xl p-6">
        <h3 className="font-semibold mb-3">How BTC Dominance Alerts Work</h3>
        <ul className="text-sm text-text-muted space-y-2 list-disc pl-5">
          <li>No coin or exchange selection needed — this is a market-wide metric</li>
          <li>Rising dominance often signals a "flight to safety" within crypto</li>
          <li>Falling dominance may indicate an altcoin rally</li>
        </ul>
      </div>
    </div>
  );
}
