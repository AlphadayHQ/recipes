import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Configure Protocol",
    desc: "Set your monitoring parameters. Define the assets, networks, and technical thresholds that align with your required signals.",
    visual: (
      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg className="w-full h-full rotate-animation" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#3b3a3a" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#FAA202" strokeWidth="4" strokeDasharray="140" strokeDashoffset="40" className="gauge-arc" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="#242424" strokeWidth="8" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-primary font-mono text-sm">
          SET
        </div>
      </div>
    )
  },
  {
    num: "02",
    title: "Live Reconnaissance",
    desc: "Our isolated engine continuously scans on-chain states and exchange data, filtering noise from pure, actionable intelligence.",
    visual: (
      <div className="relative w-48 h-48 border border-surface-border rounded-full overflow-hidden flex items-center justify-center bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(#3b3a3a_1px,transparent_1px)] bg-size-[16px_16px] opacity-30"></div>
        <div className="radar-sweep absolute inset-0 origin-center">
          <div className="w-1/2 h-full bg-linear-to-r from-transparent to-primary/40" style={{ clipPath: 'polygon(100% 50%, 0 0, 0 100%)' }}></div>
        </div>
        <div className="absolute w-2 h-2 bg-primary rounded-full top-1/3 left-1/3 animate-ping"></div>
        <div className="absolute w-1.5 h-1.5 bg-primary rounded-full bottom-1/3 right-1/4 animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>
    )
  },
  {
    num: "03",
    title: "Instant Action",
    desc: "Receive the payload exactly when conditions are met. Zero latency between on-chain confirmation and your device.",
    visual: (
      <div className="relative w-full max-w-50 h-24 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
          <path 
            className="ekg-path"
            d="M0,30 L40,30 L50,10 L60,50 L70,30 L200,30" 
            fill="none" 
            stroke="#6DD230" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeDasharray="400"
            strokeDashoffset="400"
          />
        </svg>
      </div>
    )
  }
];

export default function HowItWorks() {
  const container = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.hiw-panel');

      panels.forEach((panel, i) => {
        // Animation logic
        gsap.to(panel.querySelector('.rotate-animation'), { rotation: 360, duration: 20, repeat: -1, ease: 'linear' });
        gsap.to(panel.querySelector('.radar-sweep'), { rotation: 360, duration: 4, repeat: -1, ease: 'linear' });
        
        gsap.to(panel.querySelector('.ekg-path'), { 
          strokeDashoffset: 0, 
          duration: 2, 
          repeat: -1, 
          ease: "linear",
        });

        if (i === panels.length - 1) return;

        gsap.to(panel, {
          scale: 0.92,
          opacity: 0.4,
          filter: "blur(12px)",
          scrollTrigger: {
            trigger: panel,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            scrub: true
          }
        });
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section id="how" ref={container} className="relative w-full bg-background flex flex-col pb-40">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 pt-32 pb-16">
        <h2 className="font-display font-bold text-4xl md:text-5xl text-text">The Signal Stack</h2>
      </div>

      {steps.map((step, i) => (
        <div key={i} className="hiw-panel h-screen w-full flex items-center justify-center top-0 z-10 px-4 md:px-8">
          <div className="w-full max-w-5xl bg-surface border border-surface-border rounded-4xl p-10 md:p-16 shadow-2xl flex flex-col md:flex-row items-center gap-12 md:gap-24 relative overflow-hidden">
            
            {/* Background texture per card */}
            <div className="absolute inset-0 bg-linear-to-br from-surface-light/30 to-transparent opacity-50 pointer-events-none"></div>

            <div className="flex-1 flex flex-col gap-6 relative z-10">
              <span className="font-mono text-xl md:text-2xl text-text-muted tracking-widest">{step.num}</span>
              <h3 className="font-display font-bold text-3xl md:text-4xl text-text">{step.title}</h3>
              <p className="font-sans text-lg md:text-xl text-text-muted leading-relaxed max-w-md">
                {step.desc}
              </p>
            </div>

            <div className="flex-1 flex items-center justify-center relative z-10 w-full md:w-auto h-48 md:h-full">
              {step.visual}
            </div>
            
          </div>
        </div>
      ))}
    </section>
  );
}
