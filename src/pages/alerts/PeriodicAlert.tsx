import { AlertForm } from '../../components/alerts/AlertForm';
import { AlertList } from '../../components/alerts/AlertList';
import type { AlertFormConfig } from '../../components/alerts/AlertForm';

const config: AlertFormConfig = {
  type: 'periodic',
  showCoin: true,
  showExchange: true,
  showCurrency: true,
  showFrequency: true,
};

export function PeriodicAlert() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Periodic Price Alert</h1>
        <p className="text-text-muted">
          Receive scheduled price updates at regular intervals — hourly, daily, or weekly.
        </p>
      </div>

      <AlertForm config={config} />
      <AlertList type="periodic" />

      <div className="bg-surface border border-surface-border rounded-xl p-6">
        <h3 className="font-semibold mb-3">How Periodic Alerts Work</h3>
        <ul className="text-sm text-text-muted space-y-2 list-disc pl-5">
          <li>Choose a coin and your preferred currency</li>
          <li>Select a frequency: hourly, daily, or weekly</li>
          <li>Receive a price summary at each interval</li>
        </ul>
      </div>
    </div>
  );
}
