import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Logo from './Logo';

const navGroups = [
  {
    label: 'Market',
    items: [
      { label: 'Price Alert', to: '/alerts/price' },
      { label: 'Percent Alert', to: '/alerts/percent' },
      { label: 'Periodic Alert', to: '/alerts/periodic' },
      { label: 'Volume Alert', to: '/alerts/volume' },
      { label: 'Funding Rate', to: '/alerts/funding-rate' },
      { label: 'Market Cap', to: '/alerts/market-cap' },
      { label: 'BTC Dominance', to: '/alerts/dominance' },
      { label: 'Stock / ETF', to: '/alerts/stock' },
    ],
  },
  {
    label: 'Listings',
    items: [
      { label: 'New Listing Alert', to: '/alerts/listing' },
      { label: 'Listing Events', to: '/alerts/listing/events' },
    ],
  },
  {
    label: 'On-chain',
    items: [
      { label: 'Wallet Watch', to: '/alerts/wallet' },
      { label: 'Wallet Balance', to: '/alerts/wallet-balance' },
      { label: 'Whale Alert', to: '/alerts/whale' },
      { label: 'ETH Gas', to: '/alerts/gas' },
      { label: 'Mempool', to: '/alerts/mempool' },
      { label: 'Blockchain', to: '/alerts/blockchain' },
    ],
  },
];

export function Navbar() {
  const { isAuthenticated, authEmail, logout, openAuthModal } = useAuth();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-surface border-b border-surface-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navGroups.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(group.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="px-3 py-2 text-sm text-text-muted hover:text-text rounded-md hover:bg-surface-light transition-colors">
                  {group.label}
                </button>
                {openDropdown === group.label && (
                  <div className="absolute top-full left-0 mt-0 w-48 bg-surface-light border border-surface-border rounded-lg shadow-xl py-1 z-50">
                    {group.items.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block px-4 py-2 text-sm text-text-muted hover:text-text hover:bg-surface no-underline transition-colors"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              to="/coins"
              className="px-3 py-2 text-sm text-text-muted hover:text-text rounded-md hover:bg-surface-light no-underline transition-colors"
            >
              Coins
            </Link>
            <Link
              to="/exchanges"
              className="px-3 py-2 text-sm text-text-muted hover:text-text rounded-md hover:bg-surface-light no-underline transition-colors"
            >
              Exchanges
            </Link>
            <Link
              to="/pricing"
              className="px-3 py-2 text-sm text-text-muted hover:text-text rounded-md hover:bg-surface-light no-underline transition-colors"
            >
              Pricing
            </Link>
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-3 py-2 text-sm text-text-muted hover:text-text no-underline"
                >
                  Dashboard
                </Link>
                {authEmail && (
                  <span className="text-xs text-text-muted truncate max-w-35">
                    {authEmail}
                  </span>
                )}
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm bg-surface-light text-text-muted hover:text-text rounded-lg border border-surface-border transition-colors"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={openAuthModal}
                  className="px-4 py-2 text-sm text-text-muted hover:text-text"
                >
                  Log In
                </button>
                <button
                  onClick={openAuthModal}
                  className="px-4 py-2 text-sm bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            title="Toggle Menu"
            className="md:hidden p-2 text-text-muted hover:text-text"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-surface-border bg-surface-light px-4 py-3 space-y-2">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
                {group.label}
              </p>
              {group.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block py-1.5 text-sm text-text hover:text-primary no-underline"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="pt-2 border-t border-surface-border flex gap-2">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="w-full py-2 text-sm bg-surface text-text-muted rounded-lg border border-surface-border"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={() => {
                  openAuthModal();
                  setMobileOpen(false);
                }}
                className="w-full py-2 text-sm bg-primary text-white rounded-lg"
              >
                Sign In / Sign Up
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
