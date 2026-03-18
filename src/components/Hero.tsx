import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-anim", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.1
      });
      
      gsap.to(".pulse-dot", {
        opacity: 0.2,
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="relative h-dvh w-full flex items-end pb-24 px-8 md:px-16 overflow-hidden">
      {/* Background Image & Gradient */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/landing-hero-bg.jpeg" 
          alt="AlphaRecipes Intelligence Background" 
          className="w-full h-full object-cover opacity-40 mix-blend-luminosity grayscale-50 contrast-125"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/60 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start gap-6">
        <div className="flex flex-col">
          <h1 className="hero-anim font-display font-bold text-5xl md:text-6xl text-white tracking-tight">
            FRESH ALPHA.
          </h1>
          <h2 className="hero-anim font-display font-bold text-[4.5rem] leading-none md:text-[8rem] tracking-tighter text-white mt-2">
            <span className="text-primary">COOKED</span> DAILY.
          </h2>
        </div>
        
        <p className="hero-anim font-sans text-lg md:text-xl text-text-muted max-w-xl font-medium mt-3">
          Custom crypto alerts and intelligent briefings — the alpha that matters to you, delivered your way. Trusted by power users.
        </p>

        <button className="hero-anim btn-primary mt-6 px-8 py-4 rounded-xl text-lg flex items-center justify-center gap-3 w-full md:w-auto">
          Start cooking
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Market Pulse Widget */}
      <div className="absolute bottom-8 right-8 z-10 flex items-center gap-3 bg-surface/80 backdrop-blur-md border border-surface-border px-4 py-2 rounded-lg">
        <div className="pulse-dot w-2 h-2 rounded-full bg-primary"></div>
        <span className="font-mono text-xs text-text-muted tracking-wider uppercase">Markets Open</span>
      </div>
    </section>
  );
}
