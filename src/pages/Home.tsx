import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TabBar } from '../components/ui/TabBar';
import { AlertForm } from '../components/alerts/AlertForm';
import type { AlertFormConfig } from '../components/alerts/AlertForm';
const marketTabs = ['Price', 'Percent', 'Periodic', 'Volume', 'Market Cap', 'Crypto Briefing', 'Twitter Digest'];

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
  'Crypto Briefing': {
    type: 'crypto-briefing',
    showFrequency: true,
    showNote: true,
  },
  'Twitter Digest': {
    type: 'twitter-digest',
    showFrequency: true,
    showNote: true,
  },
};

const popularRecipes = [
  { name: 'Morning Crypto Briefing', description: 'Start day with overnight developments, top news, prices, portfolio summary' },
  { name: 'Evening Market Recap', description: 'End-of-day summary of price action, news, social sentiment' },
  { name: 'Weekend Deep Dive', description: 'Weekly long-form analysis, research reports, portfolio performance' },
  { name: 'Commute Briefing', description: 'Timed podcast-style updates for commute times' },
  { name: 'Lunch Break Check', description: 'Mid-day quick update on what happened while at work' },
  { name: 'Curated Twitter Digest', description: 'Best tweets from followed accounts' },
];

const notList = [
  'Not another noisy signal group.',
  'Not recycled Twitter threads.',
  'Not 50 alerts a day.',
];

const testimonials = [
  { quote: 'Paid for itself in one trade.', author: 'Early member' },
  { quote: 'Finally, a signal group that explains WHY.', author: 'Community member' },
];

export function Home() {
  const [activeTab, setActiveTab] = useState('Price');

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Fresh Alpha.
            <br />
            <span className="text-primary">Cooked Daily.</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-muted mb-8 max-w-2xl mx-auto">
            Actionable crypto alerts and sharp briefings — no noise, no fluff.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg no-underline transition-colors"
            >
              Get Today's Recipe
            </Link>
            <Link
              to="/signup"
              className="px-8 py-3 bg-surface-light hover:bg-surface border border-surface-border text-text font-semibold rounded-lg no-underline transition-colors"
            >
              Join the Kitchen
            </Link>
            <Link
              to="/alerts"
              className="px-8 py-3 bg-surface-light hover:bg-surface border border-surface-border text-text font-semibold rounded-lg no-underline transition-colors"
            >
              Start Cooking
            </Link>
          </div>
        </div>
      </section>

      {/* Hook */}
      <section className="py-20 px-4 text-center bg-surface/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
            The Crypto Market Moves Fast.
            <br />
            <span className="text-text-muted">Most People React Too Late.</span>
          </h2>
          <p className="text-lg sm:text-xl text-text-muted mb-8 max-w-2xl mx-auto">
            Recipes gives you the signals before the crowd.
          </p>
          <div className="max-w-3xl mx-auto text-center">
            <div className="space-y-3 mb-8">
              {notList.map((line) => (
                <p key={line} className="text-lg sm:text-xl text-text-muted">
                  {line}
                </p>
              ))}
            </div>
            <p className="text-xl sm:text-2xl font-bold text-primary">
              Just high-quality setups worth acting on.
            </p>
          </div>
        </div>
      </section>

      {/* Cook Your Own Alert */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Cook Your Own Alert
          </h2>
          <p className="text-text-muted text-center mb-8 max-w-xl mx-auto">
            Pick a recipe, set your ingredients, and let it cook.
          </p>
          <div className="mb-6">
            <TabBar
              tabs={marketTabs}
              active={activeTab}
              onChange={setActiveTab}
            />
          </div>
          <AlertForm key={activeTab} config={marketConfigs[activeTab]} />
        </div>
      </section>

      {/* Popular Recipes */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Popular Recipes
          </h2>
          <p className="text-text-muted text-center mb-8 max-w-xl mx-auto">
            Pre-built alerts loved by the community. One click to subscribe.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularRecipes.map((recipe) => (
              <div
                key={recipe.name}
                className="p-5 bg-surface border border-surface-border rounded-xl hover:border-primary transition-colors cursor-pointer"
              >
                <h3 className="text-base font-semibold mb-2">{recipe.name}</h3>
                <p className="text-sm text-text-muted">{recipe.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 bg-surface/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <blockquote
                key={t.quote}
                className="p-6 bg-surface border border-surface-border rounded-xl"
              >
                <p className="text-lg font-medium mb-3">"{t.quote}"</p>
                <cite className="text-sm text-text-muted not-italic">
                  — {t.author}
                </cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
