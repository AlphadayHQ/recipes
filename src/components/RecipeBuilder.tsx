import { useEffect, useState } from "react";
import { TabBar } from "./ui/TabBar";
import { AlertForm } from "./alerts/AlertForm";
import type { AlertFormConfig } from "./alerts/AlertForm";
import {
  priceAlertConfig,
  percentAlertConfig,
  // periodicAlertConfig,
  // volumeAlertConfig,
  // marketCapAlertConfig,
  cryptoBriefingAlertConfig,
  twitterDigestAlertConfig,
  customAlertConfig,
} from "./alerts/alertConfigs";
import { useStore, type RecipePrefill } from "../store/useStore";

const marketTabs = [
  "Price",
  "Percent",
  // "Periodic",
  // "Volume",
  // "Market Cap",
  "Crypto Briefing",
  "Twitter Digest",
  "Custom",
];

const marketConfigs: Record<string, AlertFormConfig> = {
  Price: priceAlertConfig,
  Percent: percentAlertConfig,
  // Periodic: periodicAlertConfig,
  // Volume: volumeAlertConfig,
  // "Market Cap": marketCapAlertConfig,
  "Crypto Briefing": cryptoBriefingAlertConfig,
  "Twitter Digest": twitterDigestAlertConfig,
  Custom: customAlertConfig,
};

function RecipeBuilder() {
  const [activeTab, setActiveTab] = useState("Price");
  const [appliedPrefill, setAppliedPrefill] = useState<RecipePrefill | null>(null);
  const [formKey, setFormKey] = useState(0);

  // Subscribe to store for pendingRecipe changes (callback-based setState is the approved pattern)
  useEffect(() => {
    return useStore.subscribe((state) => {
      if (state.pendingRecipe) {
        const recipe = state.pendingRecipe;
        setAppliedPrefill(recipe);
        if (marketTabs.includes(recipe.tab)) {
          setActiveTab(recipe.tab);
        }
        setFormKey((k) => k + 1);
        state.setPendingRecipe(null);
      }
    });
  }, []);

  const handleTabChange = (tab: string) => {
    setAppliedPrefill(null);
    setActiveTab(tab);
  };

  const prefill =
    appliedPrefill?.tab === activeTab ? appliedPrefill : undefined;

  return (
    <section id="recipe-builder" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <p className="font-mono font-semibold text-xs md:text-sm text-primary uppercase tracking-[0.15em] mb-4">
            Protocol Configuration
          </p>
          <h2 className="font-display font-bold text-[clamp(2.5rem,4vw,3.5rem)] text-text leading-[1.05] tracking-tight mb-6 text-balance">
            Cook Your Own Recipe
          </h2>
          <p className="font-sans font-medium text-[clamp(1.125rem,2vw,1.25rem)] text-text-muted leading-relaxed max-w-[45ch] mx-auto text-balance">
            Pick a recipe, set your ingredients, and let it cook.
          </p>
        </div>
        <div className="mb-8 flex justify-center w-full">
          <TabBar
            tabs={marketTabs}
            active={activeTab}
            onChange={handleTabChange}
          />
        </div>
        <AlertForm
          key={`${activeTab}-${formKey}`}
          config={marketConfigs[activeTab]}
          prefill={prefill}
        />
      </div>
    </section>
  );
}

export default RecipeBuilder;
