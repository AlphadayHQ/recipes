import { Link } from 'react-router-dom';

const footerLinks = [
  {
    title: 'Alerts',
    links: [
      { label: 'Price Alert', to: '/alerts/price' },
      { label: 'Percent Alert', to: '/alerts/percent' },
      { label: 'Volume Alert', to: '/alerts/volume' },
      { label: 'Listing Alert', to: '/alerts/listing' },
      { label: 'Wallet Watch', to: '/alerts/wallet' },
      { label: 'Gas Alert', to: '/alerts/gas' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Coins', to: '/coins' },
      { label: 'Exchanges', to: '/exchanges' },
      { label: 'Guides', to: '/guides' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Pricing', to: '/pricing' },
      { label: 'Settings', to: '/settings' },
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
            <p className="text-lg font-bold text-primary">CryptoAlerts</p>
            <p className="mt-2 text-sm text-text-muted">
              Real-time crypto alerts for prices, listings, on-chain events, and more.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold text-text mb-3">{group.title}</p>
              <ul className="space-y-2 list-none p-0 m-0">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-text-muted hover:text-text no-underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-surface-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} CryptoAlerts. All rights reserved.
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
