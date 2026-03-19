import Hero from "../components/Hero";
import Problem from "../components/Problem";
import HowItWorks from "../components/HowItWorks";
import Metrics from "../components/Metrics";
import CTABlock from "../components/CTABlock";
import RecipeBuilder from "../components/RecipeBuilder";
import PopularRecipes from "../components/PopularRecipes";

export function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <Metrics />
      <CTABlock />
      <RecipeBuilder />
      <PopularRecipes />
    </>
  );
}
