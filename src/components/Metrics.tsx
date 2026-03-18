import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Metrics() {
  const container = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      const metrics = gsap.utils.toArray<HTMLElement>('.metric-number');
      metrics.forEach((metric) => {
        const targetValue = parseFloat(metric.getAttribute('data-value') ?? '0');
        const prefix = metric.getAttribute('data-prefix') || '';
        const suffix = metric.getAttribute('data-suffix') || '';

        gsap.to(metric, {
          scrollTrigger: {
            trigger: metric,
            start: "top 85%",
          },
          innerText: targetValue,
          duration: 2.5,
          snap: { innerText: metric.getAttribute('data-decimals') ? 0.1 : 1 },
          ease: "power2.out",
          onUpdate: function() {
            metric.innerHTML = `${prefix}${Number(metric.innerText).toLocaleString()}${suffix}`;
          }
        });
      });

    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section id="metrics" ref={container} className="w-full py-32 px-8 md:px-16 bg-background">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center md:text-left">
        <div className="flex flex-col gap-2 relative">
          <div className="text-5xl md:text-7xl font-display font-bold text-primary drop-shadow-lg flex items-center justify-center md:justify-start">
            <span className="metric-number" data-value="14200" data-suffix="+">0</span>
          </div>
          <span className="font-sans text-lg text-text-muted font-medium tracking-wide">Live alerts fulfilled</span>
        </div>

        <div className="flex flex-col gap-2 relative">
          <div className="text-5xl md:text-7xl font-display font-bold text-primary drop-shadow-lg flex items-center justify-center md:justify-start">
            <span className="metric-number" data-value="99.8" data-decimals="true" data-suffix="%">0</span>
          </div>
          <span className="font-sans text-lg text-text-muted font-medium tracking-wide">Signal delivery rate</span>
        </div>

        <div className="flex flex-col gap-2 relative">
          <div className="text-5xl md:text-7xl font-display font-bold text-primary drop-shadow-lg flex items-center justify-center md:justify-start">
            <span className="metric-number" data-value="120" data-prefix="&lt;" data-suffix="ms">0</span>
          </div>
          <span className="font-sans text-lg text-text-muted font-medium tracking-wide">Average engine latency</span>
        </div>
      </div>
    </section>
  );
}
