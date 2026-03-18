
export default function CTABlock() {
  return (
    <section className="w-full pb-32 px-4 md:px-8 bg-background">
      <div className="relative max-w-6xl mx-auto bg-surface border border-surface-border rounded-3xl py-24 px-8 md:px-16 text-center overflow-hidden flex flex-col items-center justify-center shadow-[0_0_80px_rgba(250,162,2,0.05)]">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/10 blur-[100px] pointer-events-none rounded-full"></div>

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl">
          <h2 className="font-display font-bold text-4xl md:text-6xl text-text tracking-tight">
            Ready to cook your alpha?
          </h2>
          <p className="font-sans text-lg md:text-xl text-text-muted leading-relaxed">
            Stop reacting to the market. Start acting on pure, customized signals. 
            Join the power users who never miss a move.
          </p>
          
          <div className="mt-8 flex flex-col items-center gap-4 w-full">
            <button className="btn-primary w-full md:w-auto px-12 py-5 rounded-2xl text-xl hover:scale-105 transition-transform duration-300 shadow-xl shadow-primary/20">
              Start cooking
            </button>
            <span className="font-mono text-sm text-text-muted tracking-wide uppercase mt-2">
              No credit card required. Cancel anytime.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
