import { AlertForm } from '../../components/alerts/AlertForm';
import { AlertList } from '../../components/alerts/AlertList';
import { customAlertConfig } from '../../components/alerts/alertConfigs';

export function CustomAlert() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Custom Alert</h1>
        <p className="text-text-muted">
          Get periodic digests of web search results for any query. Optionally filter by coin to track news and mentions across the web.
        </p>
      </div>

      <AlertForm config={customAlertConfig} />
      <AlertList type="custom" />

      <div className="bg-surface border border-surface-border rounded-xl p-6">
        <h3 className="font-semibold mb-3">How Custom Alerts Work</h3>
        <ul className="text-sm text-text-muted space-y-2 list-disc pl-5">
          <li>Enter a search query to monitor — e.g. "Bitcoin ETF approval" or "Ethereum upgrade"</li>
          <li>Optionally link it to a coin to scope results to that asset</li>
          <li>Choose a frequency (daily, weekly) and your preferred notification method</li>
          <li>Receive a digest of the latest relevant results on your chosen schedule</li>
        </ul>
      </div>
    </div>
  );
}
