import { useLayoutEffect, useRef, useState, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { MousePointer2 } from 'lucide-react';

export default function Features() {
  const container = useRef(null);
  
  // Alert Shuffler State
  const [alerts, setAlerts] = useState([
    { id: 1, pair: 'BTC/USD', status: 'success', msg: 'Whale accumulation detected' },
    { id: 2, pair: 'ETH/USDT', status: 'warning', msg: 'Approaching resistance' },
    { id: 3, pair: 'SOL/USD', status: 'danger', msg: 'Volume drop-off alert' },
  ]);

  useEffect(() => {
    const int = setInterval(() => {
      setAlerts(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        if (last) newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(int);
  }, []);

  // Live Feed State
  const feedMessages = useMemo(() => [
    "> CONNECTING TO DATA STREAM...",
    "> SYNCING CONTRACT DEPLOYS...",
    "> DETECTING LIQUIDITY POOLS...",
    "> ANALYZING SOCIAL SENTIMENT...",
    "> LIVE SIGNALS SECURED."
  ], []);
  const [feedText, setFeedText] = useState("");
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    let charIdx = 0;
    setFeedText("");

    const typeInt = setInterval(() => {
      const target = feedMessages[msgIdx];
      if (charIdx < target.length) {
        setFeedText(target.substring(0, charIdx + 1));
        charIdx++;
      } else {
        clearInterval(typeInt);
        setTimeout(() => {
          setMsgIdx((m) => (m + 1) % feedMessages.length);
        }, 2000);
      }
    }, 40);

    return () => clearInterval(typeInt);
  }, [msgIdx, feedMessages]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations for the whole section
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out"
      });

      // Scheduler Cursor Animation
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      tl.set(".scheduler-cursor", { x: 0, y: 0, opacity: 0 })
        .to(".scheduler-cursor", { opacity: 1, duration: 0.2 })
        .to(".scheduler-cursor", { x: 80, y: 60, duration: 1, ease: "power2.inOut" })
        .to(".scheduler-cell-target", { scale: 0.9, backgroundColor: "#FAA202", color: "#121212", duration: 0.1, yoyo: true, repeat: 1 })
        .to(".scheduler-cell-target", { backgroundColor: "#FAA202", color: "#121212", duration: 0.1 })
        .to(".scheduler-cursor", { x: 160, y: 140, duration: 1, ease: "power2.inOut", delay: 0.3 })
        .to(".scheduler-btn", { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 })
        .to(".scheduler-cursor", { opacity: 0, duration: 0.2, delay: 0.2 });

    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={container} className="w-full py-32 px-8 md:px-16 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="feature-card flex flex-col gap-2">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-text">Interactive Signal Artifacts</h2>
          <p className="font-sans text-text-muted text-xl">The precision tools engineered for the analytical edge.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Alert Shuffler */}
          <div className="feature-card bg-surface border border-surface-border rounded-2xl p-6 shadow-xl flex flex-col gap-6 overflow-hidden">
            <div className="flex flex-col gap-1">
              <h3 className="font-display font-bold text-xl text-text">Alerts</h3>
              <p className="font-sans text-sm text-text-muted">Real-time detection for crucial parameters.</p>
            </div>
            <div className="relative h-55 w-full mt-auto">
              {alerts.map((alert, i) => (
                <div 
                  key={alert.id}
                  className="absolute left-0 right-0 p-4 rounded-xl bg-surface-light border border-surface-border flex items-center justify-between transition-all duration-400"
                  style={{
                    transform: `translateY(${i * 60}px) scale(${1 - i * 0.05})`,
                    opacity: 1 - i * 0.3,
                    zIndex: 10 - i,
                  }}
                >
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-text-muted">{alert.pair}</span>
                    <span className="font-sans text-sm font-semibold text-text">{alert.msg}</span>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${alert.status === 'success' ? 'bg-success' : alert.status === 'warning' ? 'bg-primary' : 'bg-danger'}`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Live Feed Typewriter */}
          <div className="feature-card bg-surface border border-surface-border rounded-2xl p-6 shadow-xl flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="font-display font-bold text-xl text-text">Live signals</h3>
              <p className="font-sans text-sm text-text-muted">Continuous monitoring across networks.</p>
            </div>
            <div className="h-full min-h-45 w-full bg-background rounded-xl border border-surface-border/50 p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="font-mono text-xs text-success uppercase tracking-wider">Live Feed</span>
              </div>
              <p className="font-mono text-sm text-text-muted wrap-break-word">
                {feedText}
                <span className="animate-pulse">_</span>
              </p>
            </div>
          </div>

          {/* Card 3: Signal Scheduler */}
          <div className="feature-card bg-surface border border-surface-border rounded-2xl p-6 shadow-xl flex flex-col gap-6 relative">
            <div className="flex flex-col gap-1">
              <h3 className="font-display font-bold text-xl text-text">Scheduling</h3>
              <p className="font-sans text-sm text-text-muted">Automate the timing of your intelligence.</p>
            </div>
            <div className="mt-auto h-50 flex flex-col justify-end gap-3 relative">
              <div className="grid grid-cols-7 gap-1">
                {['S','M','T','W','T','F','S'].map((day, dIdx) => (
                  <div key={dIdx} className="text-center font-mono text-[10px] text-text-muted uppercase">{day}</div>
                ))}
                {Array(14).fill(0).map((_, i) => (
                  <div 
                    key={i} 
                    className={`aspect-square rounded-md border border-surface-border transition-colors ${i === 10 ? 'scheduler-cell-target' : 'bg-surface-light'}`}
                  ></div>
                ))}
              </div>
              <button className="scheduler-btn w-full bg-primary text-background py-2 rounded-lg font-sans font-semibold text-sm">
                Save Alert
              </button>
              
              {/* SVG Cursor */}
              <div className="scheduler-cursor absolute top-0 left-4 z-20 pointer-events-none drop-shadow-md">
                <MousePointer2 className="text-white fill-white/20" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
