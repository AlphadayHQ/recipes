import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Problem() {
  const container = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".problem-line", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.15,
        ease: "expo.out",
      });

      gsap.to(".parallax-bg-problem", {
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: "20%",
        ease: "none",
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="problem"
      ref={container}
      className="relative w-full py-40 px-8 md:px-16 bg-[#0d0d0d] overflow-hidden flex items-center justify-center min-h-[80vh]"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1641580529558-a96cf6efbc72?q=80&w=2000&auto=format&fit=crop"
          alt="Market noise"
          className="parallax-bg-problem absolute w-full h-[120%] object-cover opacity-[0.06] -top-[10%]"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center gap-12">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 md:gap-10 text-balance">
          <p className="problem-line font-semibold font-mono text-sm text-primary uppercase tracking-[0.15em]">
            Thousands of tokens. Hundreds of channels. Endless noise.
          </p>

          <h2 className="problem-line font-display font-bold text-[clamp(2.5rem,6vw,5rem)] text-text leading-[1.05] tracking-tight">
            The signals that matter{" "}
            <span className="text-text-muted">are buried.</span>
          </h2>

          <p className="problem-line font-mono text-[clamp(1.125rem,2vw,1.5rem)] text-text-muted font-medium leading-relaxed max-w-[56ch] mx-auto">
            By the time you see them, the market has moved.
          </p>
        </div>
      </div>
    </section>
  );
}
