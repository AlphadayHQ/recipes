import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import HowItWorks from "./components/HowItWorks";
import Metrics from "./components/Metrics";
import CTABlock from "./components/CTABlock";
import RecipeBuilder from "./components/RecipeBuilder";
import PopularRecipes from "./components/PopularRecipes";
import Footer from "./components/Footer";
import { AuthModal } from "./components/auth/AuthModal";
import { Dashboard } from "./pages/Dashboard";
// import { PriceAlert } from "./pages/alerts/PriceAlert";
// import { PercentAlert } from "./pages/alerts/PercentAlert";
// import { PeriodicAlert } from "./pages/alerts/PeriodicAlert";
// import { VolumeAlert } from "./pages/alerts/VolumeAlert";
// import { FundingRateAlert } from "./pages/alerts/FundingRateAlert";
// import { MarketCapAlert } from "./pages/alerts/MarketCapAlert";
// import { DominanceAlert } from "./pages/alerts/DominanceAlert";
// import { StockAlert } from "./pages/alerts/StockAlert";
// import { CustomAlert } from "./pages/alerts/CustomAlert";

function HomePage() {
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

function App() {
  return (
    <div className="bg-background min-h-screen text-text overflow-hidden flex flex-col relative w-full">
      <Navbar />
      <AuthModal />
      <div className="flex-1 w-full flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/alerts/price" element={<PriceAlert />} />
          <Route path="/alerts/percent" element={<PercentAlert />} />
          <Route path="/alerts/periodic" element={<PeriodicAlert />} />
          <Route path="/alerts/volume" element={<VolumeAlert />} />
          <Route path="/alerts/funding-rate" element={<FundingRateAlert />} />
          <Route path="/alerts/market-cap" element={<MarketCapAlert />} />
          <Route path="/alerts/dominance" element={<DominanceAlert />} />
          <Route path="/alerts/stock" element={<StockAlert />} />
          <Route path="/alerts/custom" element={<CustomAlert />} /> */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
