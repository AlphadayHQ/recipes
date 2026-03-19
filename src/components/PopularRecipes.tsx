import { useStore, type RecipePrefill } from "../store/useStore";

const popularRecipes: {
  name: string;
  description: string;
  prefill: RecipePrefill;
}[] = [
  {
    name: "Morning Crypto Briefing",
    description:
      "Start your day with overnight developments, top news, prices, and a portfolio summary.",
    prefill: {
      tab: "Crypto Briefing",
      preset: "morning",
      tone: "professional",
      topics: ["prices", "news", "events"],
      focusTags: "bitcoin, ethereum",
    },
  },
  {
    name: "Evening Market Recap",
    description:
      "End-of-day summary of price action, news, and social sentiment.",
    prefill: {
      tab: "Crypto Briefing",
      preset: "evening",
      tone: "professional",
      topics: ["prices", "news", "social"],
    },
  },
  {
    name: "Weekend Deep Dive",
    description:
      "Weekly long-form analysis, research reports, and portfolio performance.",
    prefill: {
      tab: "Crypto Briefing",
      preset: "weekend",
      tone: "technical",
      topics: ["prices", "news", "dao", "social", "events"],
      focusTags: "defi, layer2, bitcoin",
    },
  },
  {
    name: "Commute Briefing",
    description: "Timed podcast-style updates for your commute.",
    prefill: {
      tab: "Crypto Briefing",
      preset: "commute_time",
      tone: "brief",
      topics: ["prices", "news"],
    },
  },
  {
    name: "Lunch Break Check",
    description:
      "Mid-day quick update on what happened while you were away.",
    prefill: {
      tab: "Crypto Briefing",
      preset: "lunch_break",
      tone: "brief",
      topics: ["prices", "news"],
    },
  },
  {
    name: "Curated Twitter Digest",
    description:
      "The best tweets from accounts you follow, summarized.",
    prefill: {
      tab: "Twitter Digest",
      maxTweets: "15",
    },
  },
  {
    name: "BTC $100K Alert",
    description:
      "Get notified when Bitcoin crosses the $100,000 mark.",
    prefill: {
      tab: "Price",
      coin: "bitcoin",
    },
  },
  {
    name: "ETH Flash Crash Watch",
    description:
      "Alert when Ethereum drops 15% or more within 24 hours.",
    prefill: {
      tab: "Percent",
      coin: "ethereum",
    },
  },
  {
    name: "Stablecoin Depeg Monitor",
    description:
      "Custom query to watch for stablecoin depeg events across major pairs.",
    prefill: {
      tab: "Custom",
      coin: "tether",
      query: "if USDT depegs more than 1% from $1.00",
      frequency: "every 1 hour",
    },
  },
];

function PopularRecipes() {
  const setPendingRecipe = useStore((s) => s.setPendingRecipe);

  const handleRecipeClick = (prefill: RecipePrefill) => {
    setPendingRecipe(prefill);
    document.getElementById("recipe-builder")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="py-16 px-4 bg-surface/50">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <p className="font-mono font-semibold text-xs md:text-sm text-primary uppercase tracking-[0.15em] mb-4">
            Community Favorites
          </p>
          <h2 className="font-display font-bold text-[clamp(2.5rem,4vw,3.5rem)] text-text leading-[1.05] tracking-tight mb-6 text-balance">
            Popular Recipes
          </h2>
          <p className="font-sans font-medium text-[clamp(1.125rem,2vw,1.25rem)] text-text-muted leading-relaxed max-w-[45ch] mx-auto text-balance">
            Pre-built recipes loved by the community. One click to subscribe.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularRecipes.map((recipe) => (
            <button
              key={recipe.name}
              type="button"
              onClick={() => handleRecipeClick(recipe.prefill)}
              className="relative p-5 bg-surface border border-surface-border rounded-xl text-left hover:border-primary/40 hover:bg-surface-light transition-colors cursor-pointer"
            >
              <h3 className="text-base font-semibold mb-2">
                {recipe.name}
              </h3>
              <p className="text-sm text-text-muted">{recipe.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularRecipes;
