import { useAuth } from "../hooks/useAuth";

export default function CTABlock() {
  const { openAuthModal } = useAuth();
  return (
    <section className="w-full pb-32 px-4 md:px-8 bg-background">
      <div className="relative max-w-5xl mx-auto bg-surface border border-surface-border rounded-3xl py-24 px-8 md:px-16 text-center overflow-hidden flex flex-col items-center justify-center">
        
        {/* Clean, data-dense texture replacing cheap glows */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundSize: '16px 16px', backgroundImage: 'radial-gradient(#f2f2f2 1px, transparent 1px)' }}
        ></div>

        <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8 max-w-3xl">
          <p className="font-mono font-semibold text-xs md:text-sm text-primary uppercase tracking-[0.15em]">
            The Alpha Recipes Protocol
          </p>

          <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] text-text leading-[1.05] tracking-tight text-balance">
            Ready to cook your alpha?
          </h2>

          <p className="font-sans font-medium text-[clamp(1.125rem,2vw,1.25rem)] text-text-muted leading-relaxed max-w-[54ch] mx-auto text-balance">
            Stop reacting to the market. Start acting on pure, customized signals. 
            Join the power users who never miss a move.
          </p>
          
          <div className="mt-8 flex flex-col items-center gap-6 w-full max-w-sm">
            <button className="btn-primary w-full py-4 rounded-xl font-display font-bold text-lg md:text-xl" onClick={openAuthModal}>
              Start cooking
            </button>
            <span className="font-mono font-semibold text-[0.65rem] md:text-xs text-text-muted tracking-[0.15em] uppercase">
              No credit card required. Cancel anytime.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
