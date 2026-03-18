import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, TrendingUp, Activity, Zap } from 'lucide-react';

export default function Hero() {
  const comp = useRef<HTMLElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // 1. Text Entrance Animation
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

      // 2. Ambient Floating for Nodes Containers
      gsap.utils.toArray<HTMLElement>(".node-ambient").forEach((node, i) => {
        gsap.to(node, {
          y: `+=${15 + i * 5}`,
          x: `+=${10 - i * 5}`,
          rotation: i % 2 === 0 ? 1 : -1,
          duration: 3 + i,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.2
        });
      });

      // 3. Mouse Tracking for Liquid Orbs & Magnetic Nodes
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const handleMouseMove = (e: MouseEvent) => {
          if (!comp.current) return;
          const { clientX, clientY } = e;
          const rect = comp.current.getBoundingClientRect();
          
          const xPos = clientX - rect.left;
          const yPos = clientY - rect.top;
          const xRatio = (xPos / rect.width - 0.5) * 2; // -1 to 1
          const yRatio = (yPos / rect.height - 0.5) * 2; // -1 to 1

          // Liquid Orbs Parallax
          gsap.to(".ambient-orb-1", {
            x: xRatio * 60,
            y: yRatio * 60,
            duration: 1.5,
            ease: "power2.out",
            overwrite: "auto"
          });
          
          gsap.to(".ambient-orb-2", {
            x: xRatio * -40,
            y: yRatio * -40,
            duration: 2,
            ease: "power2.out",
            overwrite: "auto"
          });

          // Magnetic Nodes Logic
          nodesRef.current.forEach((node) => {
            if (!node) return;
            const nodeRect = node.getBoundingClientRect();
            // Calculate distance from cursor to node center
            const nodeCenterX = nodeRect.left + nodeRect.width / 2;
            const nodeCenterY = nodeRect.top + nodeRect.height / 2;
            const distX = clientX - nodeCenterX;
            const distY = clientY - nodeCenterY;
            const dist = Math.sqrt(distX * distX + distY * distY);
            
            const magnetRadius = 300; // Activation distance
            
            if (dist < magnetRadius) {
              // Magnet pull (weighted by distance)
              const pullFactor = 1 - (dist / magnetRadius); // 1 at center, 0 at edge
              const pullX = distX * 0.3 * pullFactor;
              const pullY = distY * 0.3 * pullFactor;
              
              // Tilt logic (3D rotational physics)
              const tiltX = -(distY / (nodeRect.height/2)) * 10 * pullFactor;
              const tiltY = (distX / (nodeRect.width/2)) * 10 * pullFactor;

              gsap.to(node, {
                x: pullX,
                y: pullY,
                rotationX: tiltX,
                rotationY: tiltY,
                scale: 1.05,
                duration: 0.6,
                ease: "power3.out",
                overwrite: "auto"
              });
            } else {
              // Return to center of its container
              gsap.to(node, {
                x: 0,
                y: 0,
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                duration: 1.2,
                ease: "elastic.out(1, 0.4)",
                overwrite: "auto"
              });
            }
          });
        };

        const handleMouseLeave = () => {
          gsap.to(".ambient-orb-1, .ambient-orb-2", {
            x: 0,
            y: 0,
            duration: 2,
            ease: "power2.out",
            overwrite: "auto"
          });
          
          nodesRef.current.forEach((node) => {
            if (!node) return;
            gsap.to(node, {
              x: 0,
              y: 0,
              rotationX: 0,
              rotationY: 0,
              scale: 1,
              duration: 1.5,
              ease: "elastic.out(1, 0.3)",
              overwrite: "auto"
            });
          });
        };

        const el = comp.current;
        if (!el) return;

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          el.removeEventListener('mousemove', handleMouseMove);
          el.removeEventListener('mouseleave', handleMouseLeave);
        };
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={comp}
      className="relative h-dvh w-full flex items-end pb-24 px-8 md:px-16 overflow-hidden perspective-[1000px] bg-background"
    >
      {/* Liquid Ambient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="ambient-orb-1 absolute -top-32 -left-32 w-[60vw] h-[60vw] bg-primary/20 rounded-full blur-[140px] mix-blend-screen opacity-70" />
        <div className="ambient-orb-2 absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-[#477FF7]/30 rounded-full blur-[140px] mix-blend-screen opacity-30" />

        {/* Deep shadow vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent,var(--color-background))] opacity-80 z-10" />

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik00MCAwaC0xTTAgNDBWMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIvPgo8L3N2Zz4=')] opacity-30 z-20" />
      </div>

      {/* Floating Magnetic Data Nodes */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="max-w-7xl mx-auto w-full h-full relative">
          {/* Node 1: Top Right */}
          <div className="node-ambient absolute top-[15%] right-[5%] lg:right-[15%] hidden md:block">
            <div
              ref={(el) => {
                nodesRef.current[0] = el;
              }}
              className="bg-surface/50 backdrop-blur-xl border border-white/5 rounded-2xl p-4 flex items-center gap-4 shadow-2xl pointer-events-auto cursor-default transform-3d will-change-transform"
            >
              <div className="bg-success/10 p-2.5 rounded-xl text-success border border-success/20">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-white font-mono text-[13px] font-semibold tracking-wider">
                  BTC BREAKOUT
                </p>
                <p className="text-text-muted text-xs font-mono mt-0.5">
                  <span className="text-success">+$2,400</span> (5m vol)
                </p>
              </div>
            </div>
          </div>

          {/* Node 2: Middle Right/Bottom */}
          <div className="node-ambient absolute bottom-[35%] right-[2%] lg:right-[8%] hidden md:block">
            <div
              ref={(el) => {
                nodesRef.current[1] = el;
              }}
              className="bg-surface/50 backdrop-blur-xl border border-white/5 rounded-2xl p-4 flex items-center gap-4 shadow-2xl pointer-events-auto cursor-default transform-3d will-change-transform"
            >
              <div className="bg-danger/10 p-2.5 rounded-xl text-danger border border-danger/20">
                <Activity size={20} />
              </div>
              <div>
                <p className="text-white font-mono text-[13px] font-semibold tracking-wider">
                  WHALE MOVEMENT
                </p>
                <p className="text-text-muted text-xs font-mono mt-0.5">
                  14,392 ETH transferred
                </p>
              </div>
            </div>
          </div>

          {/* Node 3: Center Top */}
          <div className="node-ambient absolute top-[25%] left-[45%] hidden lg:block">
            <div
              ref={(el) => {
                nodesRef.current[2] = el;
              }}
              className="bg-surface/50 backdrop-blur-xl border border-white/5 rounded-2xl p-4 flex items-center gap-4 shadow-2xl pointer-events-auto cursor-default transform-3d will-change-transform"
            >
              <div className="bg-primary/10 p-2.5 rounded-xl text-primary border border-primary/20">
                <Zap size={20} />
              </div>
              <div>
                <p className="text-white font-mono text-[13px] font-semibold tracking-wider">
                  GAS SPIKE
                </p>
                <p className="text-text-muted text-xs font-mono mt-0.5">
                  <span className="text-primary">185 Gwei</span> · Base L2
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-start gap-6 pointer-events-none">
        <div className="flex flex-col">
          <h1 className="hero-anim font-display font-bold text-5xl md:text-6xl text-white tracking-tight drop-shadow-xl">
            FRESH ALPHA.
          </h1>
          <h2 className="hero-anim font-display font-bold text-[4.5rem] leading-none md:text-[8rem] tracking-tighter text-white mt-2 drop-shadow-2xl">
            <span className="text-primary">COOKED</span> DAILY.
          </h2>
        </div>

        <p className="hero-anim font-sans text-lg md:text-xl text-text-muted max-w-xl font-medium mt-3 drop-shadow-md">
          Custom crypto alerts and intelligent briefings — the alpha that
          matters to you, delivered your way. Trusted by power users.
        </p>

        {/* Mobile Swipeable Ticker */}
        <div className="hero-anim w-screen relative left-1/2 -translate-x-1/2 md:hidden mt-4 overflow-x-auto hide-scrollbar pointer-events-auto flex items-center gap-4 px-8 pb-2 snap-x snap-mandatory">
          <div className="bg-surface/50 backdrop-blur-xl border border-white/5 rounded-2xl p-4 flex items-center gap-4 shrink-0 shadow-xl snap-center w-[85%] max-w-75">
            <div className="bg-success/10 p-2.5 rounded-xl text-success border border-success/20">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-white font-mono text-[13px] font-semibold tracking-wider">BTC BREAKOUT</p>
              <p className="text-text-muted text-xs font-mono mt-0.5"><span className="text-success">+$2,400</span> (5m vol)</p>
            </div>
          </div>

          <div className="bg-surface/50 backdrop-blur-xl border border-white/5 rounded-2xl p-4 flex items-center gap-4 shrink-0 shadow-xl snap-center w-[85%] max-w-75">
            <div className="bg-danger/10 p-2.5 rounded-xl text-danger border border-danger/20">
              <Activity size={20} />
            </div>
            <div>
              <p className="text-white font-mono text-[13px] font-semibold tracking-wider">WHALE MOVEMENT</p>
              <p className="text-text-muted text-xs font-mono mt-0.5">14,392 ETH transferred</p>
            </div>
          </div>

          <div className="bg-surface/50 backdrop-blur-xl border border-white/5 rounded-2xl p-4 flex items-center gap-4 shrink-0 shadow-xl snap-center w-[85%] max-w-75">
            <div className="bg-primary/10 p-2.5 rounded-xl text-primary border border-primary/20">
              <Zap size={20} />
            </div>
            <div>
              <p className="text-white font-mono text-[13px] font-semibold tracking-wider">GAS SPIKE</p>
              <p className="text-text-muted text-xs font-mono mt-0.5"><span className="text-primary">185 Gwei</span> · Base L2</p>
            </div>
          </div>
          
          <div className="w-1 shrink-0" />
        </div>

        <button className="hero-anim pointer-events-auto btn-primary mt-4 px-8 py-4 rounded-xl text-lg flex items-center justify-center gap-3 w-full md:w-auto">
          Start cooking
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Market Pulse Widget */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3 bg-surface/80 backdrop-blur-md border border-white/5 px-4 py-2 rounded-lg pointer-events-auto shadow-xl">
        <div className="pulse-dot w-2 h-2 rounded-full bg-primary"></div>
        <span className="font-mono text-xs text-text-muted tracking-wider uppercase">
          Markets Open
        </span>
      </div>
    </section>
  );
}
