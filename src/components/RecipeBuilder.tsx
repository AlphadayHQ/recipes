import { useState } from "react";
import { TabBar } from "./ui/TabBar";
import { AlertForm } from "./alerts/AlertForm";
import type { AlertFormConfig } from "./alerts/AlertForm";
import {
  priceAlertConfig,
  percentAlertConfig,
  periodicAlertConfig,
  volumeAlertConfig,
  marketCapAlertConfig,
  cryptoBriefingAlertConfig,
  twitterDigestAlertConfig,
  customAlertConfig,
} from "./alerts/alertConfigs";

const marketTabs = [
  "Price",
  "Percent",
  "Periodic",
  "Volume",
  "Market Cap",
  "Crypto Briefing",
  "Twitter Digest",
  "Custom",
];

const marketConfigs: Record<string, AlertFormConfig> = {
  Price: priceAlertConfig,
  Percent: percentAlertConfig,
  Periodic: periodicAlertConfig,
  Volume: volumeAlertConfig,
  "Market Cap": marketCapAlertConfig,
  "Crypto Briefing": cryptoBriefingAlertConfig,
  "Twitter Digest": twitterDigestAlertConfig,
  Custom: customAlertConfig,
};

function RecipeBuilder() {
  const [activeTab, setActiveTab] = useState("Price");

  return (
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
  );
}

export default RecipeBuilder;
