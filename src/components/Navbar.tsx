import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.4);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full px-6 py-3 flex items-center justify-between gap-8 md:gap-16 w-[92%] max-w-5xl ${isScrolled ? "bg-surface/80 backdrop-blur-md border border-surface-border shadow-lg shadow-black/40" : "bg-transparent border border-transparent"}`}
    >
      <div className="flex items-center gap-2">
        <span className="font-display font-bold text-xl tracking-tight text-text">
          AlphaRecipes
        </span>
        <div className="w-2 h-2 rounded-full bg-primary"></div>
      </div>

      <div className="hidden md:flex items-center gap-8 font-sans text-sm font-semibold text-text-muted">
        <a href="#features" className="hover:text-text transition-colors">
          Features
        </a>
        <a href="#manifesto" className="hover:text-text transition-colors">
          Manifesto
        </a>
        <a href="#how" className="hover:text-text transition-colors">
          How it Works
        </a>
        <a href="#metrics" className="hover:text-text transition-colors">
          Metrics
        </a>
      </div>

      <button className="btn-primary px-5 py-2.5 rounded-xl text-sm hidden md:block">
        Start cooking
      </button>

      {/* Mobile nav placeholder icon */}
      <button title="menu" className="md:hidden text-text">
        <Menu size={20} />
      </button>
    </nav>
  );
}
