import { Link } from 'react-router-dom';

const footerLinks = [
  {
    title: 'Recipes',
    links: [
      { label: 'Price Recipe', to: '/alerts/price', soon: false, external: false },
      { label: 'Percent Recipe', to: '/alerts/percent', soon: false, external: false },
      { label: 'Volume Recipe', to: '/alerts/volume', soon: true, external: false },
      { label: 'Listing Recipe', to: '/alerts/listing', soon: true, external: false },
      { label: 'Wallet Watch', to: '/alerts/wallet', soon: true, external: false },
      { label: 'Gas Recipe', to: '/alerts/gas', soon: true, external: false },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Coins', to: '/coins', soon: false, external: false },
      { label: 'Exchanges', to: '/exchanges', soon: false, external: false },
      { label: 'Guides', to: '/guides', soon: false, external: false },
      { label: 'FAQ', to: '/faq', soon: false, external: false },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'alphaday.com', to: 'https://alphaday.com', soon: false, external: true },
      { label: 'Settings', to: '/settings', soon: false, external: false },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-surface border-t border-surface-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-lg font-bold text-primary">AlphaRecipes</p>
            <p className="text-sm text-text-muted">by Alphaday</p>
            <p className="mt-2 text-sm text-text-muted">
              Personalized crypto signals — the alpha that matters to you, delivered your way.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold text-text mb-3">{group.title}</p>
              <ul className="space-y-2 list-none p-0 m-0">
                {group.links.map((link) => (
                  <li key={link.to} className="flex items-center gap-1.5">
                    {link.external ? (
                      <a
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-text-muted hover:text-text no-underline transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        className="text-sm text-text-muted hover:text-text no-underline transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                    {link.soon && (
                      <span className="text-xs text-text-muted opacity-60">(Soon)</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-surface-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            &copy; 2026 AlphaRecipes by Alphaday. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-xs text-text-muted">Terms</span>
            <span className="text-xs text-text-muted">Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
