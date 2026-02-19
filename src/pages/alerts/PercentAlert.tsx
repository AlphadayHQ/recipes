import { AlertForm } from '../../components/alerts/AlertForm';
import { AlertList } from '../../components/alerts/AlertList';
import { percentAlertConfig } from '../../components/alerts/alertConfigs';

export function PercentAlert() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Percentage Alert</h1>
        <p className="text-text-muted">
          Get notified when a coin rises or drops by a specified percentage within a time window.
        </p>
      </div>

      <AlertForm config={percentAlertConfig} />
      <AlertList type="percent" />

      <div className="bg-surface border border-surface-border rounded-xl p-6">
        <h3 className="font-semibold mb-3">How Percentage Alerts Work</h3>
        <ul className="text-sm text-text-muted space-y-2 list-disc pl-5">
          <li>Set a percentage threshold (e.g. 10% rise or drop)</li>
          <li>Choose a time window to monitor (24h or 7d)</li>
          <li>Great for catching sudden volatility or momentum shifts</li>
        </ul>
      </div>
    </div>
  );
}
