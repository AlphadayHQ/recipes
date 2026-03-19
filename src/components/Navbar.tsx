import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.4);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[92%] max-w-5xl ${isScrolled || mobileOpen ? "bg-surface/80 backdrop-blur-md border border-surface-border shadow-lg shadow-black/40" : "bg-transparent border border-transparent"} ${mobileOpen ? "rounded-2xl" : "rounded-full"}`}
    >
      <div className="flex items-center justify-between gap-8 md:gap-16 px-6 py-3">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="AlphaRecipes Logo" className="h-8 w-auto mix-blend-screen" />
          <span className="font-display font-semibold text-xl tracking-tight text-text hidden sm:block">
            AlphaRecipes
          </span>
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

        <button
          title="menu"
          className="md:hidden text-text"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-surface-border px-6 py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-3 font-sans text-sm font-semibold text-text-muted">
            <a href="#features" className="hover:text-text transition-colors" onClick={() => setMobileOpen(false)}>
              Features
            </a>
            <a href="#manifesto" className="hover:text-text transition-colors" onClick={() => setMobileOpen(false)}>
              Manifesto
            </a>
            <a href="#how" className="hover:text-text transition-colors" onClick={() => setMobileOpen(false)}>
              How it Works
            </a>
            <a href="#metrics" className="hover:text-text transition-colors" onClick={() => setMobileOpen(false)}>
              Metrics
            </a>
          </div>
          <button className="btn-primary px-5 py-2.5 rounded-xl text-sm w-full" onClick={() => setMobileOpen(false)}>
            Start cooking
          </button>
        </div>
      )}
    </nav>
  );
}
