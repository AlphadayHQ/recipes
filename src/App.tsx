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
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
