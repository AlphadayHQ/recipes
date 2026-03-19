import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
// import Features from "./components/Features";
// import Manifesto from "./components/Manifesto";
import HowItWorks from "./components/HowItWorks";
import Metrics from "./components/Metrics";
import CTABlock from "./components/CTABlock";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-background min-h-screen text-text overflow-hidden flex flex-col relative w-full">
      <Navbar />
      <div className="flex-1 w-full flex flex-col">
        <Hero />
        <Problem />
        {/* <Features /> */}
        {/* <Manifesto /> */}
        <HowItWorks />
        <Metrics />
        <CTABlock />
      </div>
      <Footer />
    </div>
  );
}

export default App;
