const popularRecipes = [
  {
    name: "Morning Crypto Briefing",
    description:
      "Start your day with overnight developments, top news, prices, and a portfolio summary.",
  },
  {
    name: "Evening Market Recap",
    description:
      "End-of-day summary of price action, news, and social sentiment.",
  },
  {
    name: "Weekend Deep Dive",
    description:
      "Weekly long-form analysis, research reports, and portfolio performance.",
  },
  {
    name: "Commute Briefing",
    description: "Timed podcast-style updates for your commute.",
  },
  {
    name: "Lunch Break Check",
    description:
      "Mid-day quick update on what happened while you were away.",
  },
  {
    name: "Curated Twitter Digest",
    description:
      "The best tweets from accounts you follow, summarized.",
  },
];

function PopularRecipes() {
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
            <div
              key={recipe.name}
              className="relative p-5 bg-surface border border-surface-border rounded-xl opacity-80"
            >
              <span className="absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full bg-surface-light text-text-muted">
                Soon
              </span>
              <h3 className="text-base font-semibold mb-2 pr-12">
                {recipe.name}
              </h3>
              <p className="text-sm text-text-muted">{recipe.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularRecipes;
