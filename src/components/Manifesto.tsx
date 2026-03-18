import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const container = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".manifesto-word", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.04,
        ease: "power3.out"
      });
      
      gsap.to(".parallax-bg", {
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: "20%",
        ease: "none"
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const topText = "Most platforms show you what happened.".split(" ");
  const bottomTextPart1 = "AlphaRecipes tells you".split(" ");
  const bottomTextPart2 = "what to watch next.".split(" ");

  return (
    <section 
      id="manifesto" 
      ref={container} 
      className="relative w-full py-40 px-8 md:px-16 bg-[#0d0d0d] overflow-hidden flex items-center justify-center min-h-[80vh]"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
          alt="Server infrastructure" 
          className="parallax-bg w-full h-[120%] object-cover opacity-[0.06] -top-[10%]"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center gap-8">
        <h3 className="font-sans text-xl md:text-3xl text-text-muted font-medium leading-relaxed flex flex-wrap justify-center gap-x-2">
          {topText.map((word, i) => (
            <span key={`top-${i}`} className="manifesto-word inline-block">{word}</span>
          ))}
        </h3>
        
        <h2 className="font-display font-bold text-4xl md:text-7xl text-text leading-tight flex flex-wrap justify-center gap-x-3 gap-y-2">
          {bottomTextPart1.map((word, i) => (
            <span key={`bot1-${i}`} className="manifesto-word inline-block">{word}</span>
          ))}
          <div className="flex gap-x-3 text-primary">
            {bottomTextPart2.map((word, i) => (
              <span key={`bot2-${i}`} className="manifesto-word inline-block">{word}</span>
            ))}
          </div>
        </h2>
      </div>
    </section>
  );
}
