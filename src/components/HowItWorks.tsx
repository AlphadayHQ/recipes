import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Configure Protocol",
    desc: "Set your monitoring parameters. Define the assets, networks, and technical thresholds that align with your required signals.",
  },
  {
    num: "02",
    title: "Live Reconnaissance",
    desc: "Our isolated engine continuously scans on-chain states and exchange data, filtering noise from pure, actionable intelligence.",
  },
  {
    num: "03",
    title: "Instant Action",
    desc: "Receive the payload exactly when conditions are met. Zero latency between on-chain confirmation and your device.",
  }
];

class ParticleEngine {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  particles: {
    id: number;
    angle: number;
    radius: number;
    x: number;
    y: number;
    baseSize: number;
    colorType: string;
    colorBase: string;
  }[] = [];
  width: number = 0;
  height: number = 0;
  state = {
    progress: 0,
    radarY: -200
  };
  animationId = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false })!; 
    this.resize();
    this.initParticles();
    window.addEventListener('resize', this.resize);
    this.render = this.render.bind(this);
    this.render(0);
  }

  resize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  initParticles() {
    this.particles = Array.from({ length: 600 }).map((_, i) => ({
      id: i,
      angle: Math.random() * Math.PI * 2,
      radius: 80 + Math.random() * (window.innerWidth > 768 ? 400 : 250),
      x: this.width / 2,
      y: this.height / 2,
      baseSize: 1 + Math.random() * 2,
      colorType: Math.random() > 0.85 ? 'primary' : (Math.random() > 0.6 ? 'success' : 'muted'),
      colorBase: '#3b3a3a',
    }));
  }

  render(time: number) {
    this.ctx.fillStyle = '#121212';
    this.ctx.fillRect(0, 0, this.width, this.height);

    const cx = this.width / 2;
    const cy = this.height / 2;
    const { progress } = this.state;

    // Determine physics weights based on GSAP scroll progress (0 to 2)
    const orbitWeight = Math.max(0, Math.min(1, 1 - progress));
    const noiseWeight = progress <= 1 ? progress : 2 - progress;
    const streamWeight = Math.max(0, Math.min(1, progress - 1));

    if (noiseWeight > 0.5) {
      this.state.radarY += 8;
      if (this.state.radarY > this.height + 200) this.state.radarY = -200;
    }

    this.particles.forEach(p => {
      // State 1: Orbit
      const orbitX = cx + Math.cos(p.angle) * p.radius;
      const orbitY = cy + Math.sin(p.angle) * p.radius;
      p.angle += 0.002 * (150 / p.radius);

      // State 2: Noise Scatter
      const nx = cx + Math.cos(time * 0.0005 + p.id) * p.radius * 1.5;
      const ny = cy + Math.sin(time * 0.0007 + p.id * 1.2) * p.radius * 1.5;

      // State 3: High-speed Stream
      const streamXBase = ((p.id * 30 + time * 2) % (this.width + 400)) - 200;
      const streamY = cy - 250 + (p.id % 50) * 10;

      // Blend positions using scroll weights
      const targetX = orbitX * orbitWeight + nx * noiseWeight + streamXBase * streamWeight;
      const targetY = orbitY * orbitWeight + ny * noiseWeight + streamY * streamWeight;

      // Elastic tension towards target
      p.x += (targetX - p.x) * 0.1;
      p.y += (targetY - p.y) * 0.1;

      // Radar sweep color logic
      let color = p.colorBase;
      if (streamWeight > 0.1) {
        color = '#6DD230'; // Complete stream green
      } else if (noiseWeight > 0.1) {
        const dist = p.y - this.state.radarY;
        if (dist > 0 && dist < 150) {
          color = p.colorType === 'success' ? '#6DD230' : '#F45532';
        } else if (dist < 0) {
          color = p.colorType === 'success' ? '#6DD230' : p.colorBase;
        }
      } else {
        color = p.colorType === 'primary' ? '#FAA202' : p.colorBase;
      }

      this.ctx.fillStyle = color;
      
      if (streamWeight > 0.5) {
        const stretch = p.baseSize * 15 * streamWeight;
        this.ctx.fillRect(p.x, p.y - p.baseSize/2, stretch, p.baseSize);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.baseSize, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });

    if (noiseWeight > 0.1 && streamWeight < 0.5) {
      this.ctx.fillStyle = `rgba(109, 210, 48, ${noiseWeight * 0.15})`;
      this.ctx.fillRect(0, this.state.radarY - 100, this.width, 100);
      this.ctx.fillStyle = `rgba(109, 210, 48, ${noiseWeight * 0.8})`;
      this.ctx.fillRect(0, this.state.radarY, this.width, 2);
    }

    this.animationId = requestAnimationFrame((t) => this.render(t));
  }

  destroy() {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.resize);
  }
}

export default function HowItWorks() {
  const container = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ParticleEngine | null>(null);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    
    engineRef.current = new ParticleEngine(canvasRef.current);
    const engine = engineRef.current;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.hiw-panel');

      // Animates the canvas physics engine state from 0 to 2 across the scroll
      gsap.to(engine.state, {
        progress: 2,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5
        }
      });

      panels.forEach((panel, i) => {
        if (i === panels.length - 1) return;

        gsap.to(panel, {
          scale: 0.85,
          opacity: 0,
          y: -50,
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
    
    return () => {
      ctx.revert();
      engine.destroy();
    };
  }, []);

  return (
    <section id="how" ref={container} className="relative w-full bg-background pb-32">
      {/* Absolute Canvas Background Container */}
      <div className="absolute inset-0 z-0">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
          <div 
            className="absolute inset-0 bg-[radial-gradient(#3b3a3a_1px,transparent_1px)] opacity-20 pointer-events-none" 
            style={{ 
              backgroundSize: '24px 24px', 
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)' 
            }}
          ></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="px-8 md:px-16 pt-32 pb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text relative z-20">The Signal Stack</h2>
        </div>

        {steps.map((step, i) => (
          <div key={i} className="hiw-panel h-[85vh] w-full flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-3xl bg-background/40 backdrop-blur-3xl border border-surface-border/50 rounded-3xl p-10 md:p-14 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col gap-6 relative overflow-hidden transition-all duration-500 hover:border-primary/50 group">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-linear-to-br from-white/3 to-transparent pointer-events-none"></div>
              
              <span className="font-mono text-xl md:text-2xl text-primary tracking-widest font-semibold relative z-10">{step.num}</span>
              <h3 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-text relative z-10">{step.title}</h3>
              <p className="font-sans text-lg md:text-xl text-text-muted leading-relaxed relative z-10 max-w-xl">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
