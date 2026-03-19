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
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] w-[92%] max-w-5xl ${isScrolled || mobileOpen ? "bg-surface/80 backdrop-blur-md border border-surface-border shadow-lg shadow-black/40" : "bg-transparent border border-transparent"} ${mobileOpen ? "rounded-2xl" : "rounded-full"}`}
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
          className="md:hidden text-text relative w-5 h-5 flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`absolute transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${mobileOpen ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`}>
            <Menu size={20} />
          </span>
          <span className={`absolute transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${mobileOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`}>
            <X size={20} />
          </span>
        </button>
      </div>

      <div 
        className={`md:hidden grid transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          mobileOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-surface-border px-6 py-4 flex flex-col gap-4">
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
        </div>
      </div>
    </nav>
  );
}
