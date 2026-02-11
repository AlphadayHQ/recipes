import { AlertForm } from '../../components/alerts/AlertForm';
import { AlertList } from '../../components/alerts/AlertList';
import type { AlertFormConfig } from '../../components/alerts/AlertForm';

const config: AlertFormConfig = {
  type: 'stock',
  showCoin: true,
  showExchange: true,
  showDirection: true,
  directionOptions: ['above', 'below'],
  showThreshold: true,
  thresholdLabel: 'Target Price',
  thresholdPlaceholder: 'e.g. 250',
  showCurrency: true,
  showCooldown: true,
};

export function StockAlert() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Stock / ETF Alert</h1>
        <p className="text-text-muted">
          Set price alerts for crypto-related stocks and ETFs like MSTR, COIN, GBTC, and more.
        </p>
      </div>

      <AlertForm config={config} />
      <AlertList type="stock" />

      <div className="bg-surface border border-surface-border rounded-xl p-6">
        <h3 className="font-semibold mb-3">How Stock / ETF Alerts Work</h3>
        <ul className="text-sm text-text-muted space-y-2 list-disc pl-5">
          <li>Works just like price alerts, but for crypto-adjacent equities</li>
          <li>Track Bitcoin ETFs, mining stocks, and crypto exchange stocks</li>
          <li>Select a stock ticker and set your target price</li>
        </ul>
      </div>
    </div>
  );
}
