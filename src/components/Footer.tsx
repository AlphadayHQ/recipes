export default function Footer() {
  return (
    <footer className="w-full bg-[#0d0d0d] rounded-t-3xl border-t border-surface-border pt-20 pb-8 px-8 md:px-16 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5 flex flex-col gap-6">
            <a href="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="AlphaRecipes Logo" className="h-8 w-auto mix-blend-screen" />
              <span className="font-display font-bold text-2xl tracking-tight text-text">
                AlphaRecipes
              </span>
            </a>
            <p className="font-sans text-text-muted text-base leading-relaxed max-w-sm">
              Custom crypto alerts and intelligent briefings. The cinematic
              terminal built for analysts and power users.
            </p>
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-display font-semibold text-text text-sm uppercase tracking-wider">
              Product
            </h4>
            <a
              href="#"
              className="font-sans text-text-muted hover:text-primary transition-colors text-sm"
            >
              Alerts
            </a>
            <a
              href="#"
              className="font-sans text-text-muted hover:text-primary transition-colors text-sm"
            >
              Live Feed
            </a>
            <a
              href="#"
              className="font-sans text-text-muted hover:text-primary transition-colors text-sm"
            >
              Scheduler
            </a>
            <a
              href="#"
              className="font-sans text-text-muted hover:text-primary transition-colors text-sm"
            >
              Integrations
            </a>
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-display font-semibold text-text text-sm uppercase tracking-wider">
              Company
            </h4>
            <a
              href="#"
              className="font-sans text-text-muted hover:text-primary transition-colors text-sm"
            >
              About
            </a>
            <a
              href="#"
              className="font-sans text-text-muted hover:text-primary transition-colors text-sm"
            >
              Blog
            </a>
            <a
              href="#"
              className="font-sans text-text-muted hover:text-primary transition-colors text-sm"
            >
              Careers
            </a>
            <a
              href="#"
              className="font-sans text-text-muted hover:text-primary transition-colors text-sm"
            >
              Contact
            </a>
          </div>

          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="font-display font-semibold text-text text-sm uppercase tracking-wider">
              Legal
            </h4>
            <a
              href="#"
              className="font-sans text-text-muted hover:text-primary transition-colors text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="font-sans text-text-muted hover:text-primary transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-sans text-text-muted hover:text-primary transition-colors text-sm"
            >
              Cookie Settings
            </a>
          </div>
        </div>

        <div className="w-full border-t border-surface-border pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 bg-surface px-4 py-2 rounded-lg border border-surface-border">
            <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse"></div>
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
              All Systems Operational
            </span>
          </div>

          <p className="font-sans text-sm text-text-muted">
            © {new Date().getFullYear()} AlphaRecipes
          </p>
        </div>
      </div>
    </footer>
  );
}
