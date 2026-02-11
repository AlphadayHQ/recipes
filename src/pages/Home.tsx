import { useState } from 'react';
import { Link } from 'react-router-dom';
import coins from '../mocks/coins.json';
import exchanges from '../mocks/exchanges.json';
import { TabBar } from '../components/ui/TabBar';
import { AlertForm } from '../components/alerts/AlertForm';
import type { AlertFormConfig } from '../components/alerts/AlertForm';
const marketTabs = ['Price', 'Percent', 'Periodic', 'Volume', 'Funding Rate', 'Market Cap', 'Dominance', 'Stock'];

const marketConfigs: Record<string, AlertFormConfig> = {
  Price: {
    type: 'price',
    showCoin: true,
    showExchange: true,
    showDirection: true,
    directionOptions: ['above', 'below'],
    showThreshold: true,
    thresholdLabel: 'Target Price',
    thresholdPlaceholder: 'e.g. 70000',
    showCurrency: true,
    showCooldown: true,
    showNote: true,
    showOneTime: true,
  },
  Percent: {
    type: 'percent',
    showCoin: true,
    showExchange: true,
    showDirection: true,
    directionOptions: ['rises', 'drops'],
    showThreshold: true,
    thresholdLabel: 'Percentage (%)',
    thresholdPlaceholder: 'e.g. 10',
    showCooldown: true,
    showTimeWindow: true,
  },
  Periodic: {
    type: 'periodic',
    showCoin: true,
    showExchange: true,
    showCurrency: true,
    showFrequency: true,
  },
  Volume: {
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
  },
  'Funding Rate': {
    type: 'funding-rate',
    showCoin: true,
    showExchange: true,
    showDirection: true,
    directionOptions: ['above', 'below'],
    showThreshold: true,
    thresholdLabel: 'Funding Rate (%)',
    thresholdPlaceholder: 'e.g. 0.1',
    showCooldown: true,
  },
  'Market Cap': {
    type: 'market-cap',
    showCoin: true,
    showDirection: true,
    directionOptions: ['above', 'below'],
    showThreshold: true,
    thresholdLabel: 'Market Cap ($)',
    thresholdPlaceholder: 'e.g. 1000000000000',
    showCurrency: true,
    showCooldown: true,
  },
  Dominance: {
    type: 'dominance',
    showDirection: true,
    directionOptions: ['above', 'below'],
    showThreshold: true,
    thresholdLabel: 'BTC Dominance (%)',
    thresholdPlaceholder: 'e.g. 50',
    showCooldown: true,
  },
  Stock: {
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
  },
};

const onChainTypes = [
  { label: 'Wallet Watch', to: '/alerts/wallet', description: 'Monitor wallet transactions' },
  { label: 'Wallet Balance', to: '/alerts/wallet-balance', description: 'Track balance thresholds' },
  { label: 'Whale Alert', to: '/alerts/whale', description: 'Detect large transfers' },
  { label: 'ETH Gas', to: '/alerts/gas', description: 'Low gas price notifications' },
  { label: 'Mempool', to: '/alerts/mempool', description: 'Bitcoin mempool monitoring' },
  { label: 'Blockchain', to: '/alerts/blockchain', description: 'Custom blockchain metrics' },
];

const features = [
  {
    title: '8+ Notification Channels',
    description: 'Email, SMS, Phone, Push, Webhook, Telegram, Discord, and Slack — your choice.',
  },
  {
    title: 'Wide Exchange Coverage',
    description: `Monitor prices across ${exchanges.length}+ exchanges including Binance, Coinbase, and Kraken.`,
  },
  {
    title: 'Set & Forget',
    description: 'Configure once, get alerted automatically. One-time or recurring — you decide.',
  },
];

export function Home() {
  const [activeTab, setActiveTab] = useState('Price');

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Crypto Alerts
            <br />
            <span className="text-primary">Made Simple</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-muted mb-8 max-w-2xl mx-auto">
            Set price alerts, track new listings, monitor wallets, and never miss a move.
            Get notified via Email, Telegram, Discord, and more.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg no-underline transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              to="/pricing"
              className="px-8 py-3 bg-surface-light hover:bg-surface border border-surface-border text-text font-semibold rounded-lg no-underline transition-colors"
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Alert Demo */}
      <section className="py-16 px-4 bg-surface/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Try It Out</h2>
          <p className="text-text-muted text-center mb-8 max-w-xl mx-auto">
            Create an alert right here — choose a type and configure it.
          </p>
          <div className="mb-6">
            <TabBar tabs={marketTabs} active={activeTab} onChange={setActiveTab} />
          </div>
          <AlertForm key={activeTab} config={marketConfigs[activeTab]} />
        </div>
      </section>

      {/* On-chain Alert Types */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">On-chain Alerts</h2>
          <p className="text-text-muted text-center mb-10 max-w-xl mx-auto">
            Monitor wallets, whale movements, gas prices, and blockchain metrics.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {onChainTypes.map((type) => (
              <Link
                key={type.to}
                to={type.to}
                className="block p-5 bg-surface border border-surface-border rounded-xl hover:border-primary/50 transition-colors no-underline group"
              >
                <h3 className="text-base font-semibold text-text group-hover:text-primary mb-2 transition-colors">
                  {type.label}
                </h3>
                <p className="text-sm text-text-muted">{type.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-surface/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="text-4xl font-bold text-primary">{coins.length}+</p>
              <p className="text-text-muted mt-1">Coins Tracked</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">{exchanges.length}+</p>
              <p className="text-text-muted mt-1">Exchanges Supported</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">8</p>
              <p className="text-text-muted mt-1">Notification Channels</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Why CryptoAlerts?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="p-6 bg-surface border border-surface-border rounded-xl">
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-sm text-text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
