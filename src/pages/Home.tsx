import { useState } from 'react';
import { TabBar } from '../components/ui/TabBar';
import { AlertForm } from '../components/alerts/AlertForm';
import type { AlertFormConfig } from '../components/alerts/AlertForm';
import {
  priceAlertConfig,
  percentAlertConfig,
  periodicAlertConfig,
  volumeAlertConfig,
  marketCapAlertConfig,
  cryptoBriefingAlertConfig,
  twitterDigestAlertConfig,
  customAlertConfig,
} from '../components/alerts/alertConfigs';

const marketTabs = ['Price', 'Percent', 'Periodic', 'Volume', 'Market Cap', 'Crypto Briefing', 'Twitter Digest', 'Custom'];

const marketConfigs: Record<string, AlertFormConfig> = {
  Price: priceAlertConfig,
  Percent: percentAlertConfig,
  Periodic: periodicAlertConfig,
  Volume: volumeAlertConfig,
  'Market Cap': marketCapAlertConfig,
  'Crypto Briefing': cryptoBriefingAlertConfig,
  'Twitter Digest': twitterDigestAlertConfig,
  Custom: customAlertConfig,
};

const popularRecipes = [
  { name: 'Morning Crypto Briefing', description: 'Start your day with overnight developments, top news, prices, and a portfolio summary.' },
  { name: 'Evening Market Recap', description: 'End-of-day summary of price action, news, and social sentiment.' },
  { name: 'Weekend Deep Dive', description: 'Weekly long-form analysis, research reports, and portfolio performance.' },
  { name: 'Commute Briefing', description: 'Timed podcast-style updates for your commute.' },
  { name: 'Lunch Break Check', description: 'Mid-day quick update on what happened while you were away.' },
  { name: 'Curated Twitter Digest', description: 'The best tweets from accounts you follow, summarized.' },
];

const recipeExamples = [
  { text: 'Notify me when BTC drops 10% in 24 hours.', tag: 'Live', live: true },
  { text: 'Tell me when ETH crosses $5,000.', tag: 'Live', live: true },
  { text: 'Every morning at 8am, brief me on overnight moves for tokens in my wallet.', tag: 'Soon', live: false },
  { text: 'Summarize today\'s Crypto Twitter sentiment on ETH, BTC, and SOL.', tag: 'Soon', live: false },
  { text: 'Send me a weekly email digest of Ethereum governance proposals.', tag: 'Soon', live: false },
  { text: 'Warn me immediately if a protocol I hold tokens in gets exploited or hacked.', tag: 'Soon', live: false },
];

const howItWorksSteps = [
  {
    number: '1',
    icon: '🎯',
    title: 'Pick what matters to you.',
    body: 'Tokens, price targets, percent moves, on-chain events — define the signals you care about.',
  },
  {
    number: '2',
    icon: '📬',
    title: 'Pick how you hear about it.',
    body: 'Email or push notification today. Telegram, audio briefings, and more coming soon.',
  },
  {
    number: '3',
    icon: '✅',
    title: 'AlphaRecipes watches 24/7 so you don\'t have to.',
    body: 'We monitor everything, filter the noise, and deliver only what you asked for — on time, every time.',
  },
];

export function Home() {
  const [activeTab, setActiveTab] = useState('Price');

  const scrollToBuilder = () => {
    document.getElementById('recipe-builder')?.scrollIntoView({ behavior: 'smooth' });
  };

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
            The crypto alpha that matters to you — sourced, filtered, and served your way.
          </p>
          <button
            type="button"
            onClick={scrollToBuilder}
            className="px-8 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors"
          >
            Start Cooking
          </button>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-4 text-center bg-surface/50">
        <div className="max-w-2xl mx-auto">
          <p className="text-2xl sm:text-3xl font-bold mb-4">
            Thousands of tokens. Hundreds of channels. Endless noise.
          </p>
          <p className="text-lg sm:text-xl text-text-muted mb-3">
            Buried somewhere in all of it are the signals that actually matter to you.
          </p>
          <p className="text-lg sm:text-xl text-text-muted">
            By the time you find them, the market's already moved.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            How AlphaRecipes Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {howItWorksSteps.map((step, i) => (
              <div key={step.number} className="flex flex-col items-center text-center relative">
                {i < howItWorksSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(100%-1rem)] w-8 border-t-2 border-dashed border-surface-border" />
                )}
                <div className="w-16 h-16 rounded-full bg-surface border border-surface-border flex items-center justify-center text-2xl mb-4">
                  {step.icon}
                </div>
                <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Step {step.number}</p>
                <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Can You Cook? */}
      <section className="py-16 px-4 bg-surface/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
            What Can You Cook?
          </h2>
          <p className="text-text-muted text-center mb-10 max-w-xl mx-auto">
            From real-time price alerts to AI-powered briefings — here's what AlphaRecipes can do.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipeExamples.map((recipe) => (
              <div
                key={recipe.text}
                onClick={recipe.live ? scrollToBuilder : undefined}
                className={`relative p-5 bg-surface border border-surface-border rounded-xl transition-colors ${
                  recipe.live
                    ? 'hover:border-primary cursor-pointer'
                    : 'opacity-80 cursor-default'
                }`}
              >
                <span
                  className={`absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full ${
                    recipe.live
                      ? 'bg-primary/20 text-primary'
                      : 'bg-surface-light text-text-muted'
                  }`}
                >
                  {recipe.tag}
                </span>
                <p className="text-sm text-text-muted pr-12">"{recipe.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cook Your Own Recipe */}
      <section id="recipe-builder" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Cook Your Own Recipe
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
      <section className="py-16 px-4 bg-surface/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Popular Recipes
          </h2>
          <p className="text-text-muted text-center mb-8 max-w-xl mx-auto">
            Pre-built recipes loved by the community. One click to subscribe.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularRecipes.map((recipe) => (
              <div
                key={recipe.name}
                className="relative p-5 bg-surface border border-surface-border rounded-xl opacity-80"
              >
                <span className="absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full bg-surface-light text-text-muted">
                  Soon
                </span>
                <h3 className="text-base font-semibold mb-2 pr-12">{recipe.name}</h3>
                <p className="text-sm text-text-muted">{recipe.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
