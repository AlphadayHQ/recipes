import { useState, useRef, useEffect } from 'react';
import type { MarketCoin } from '../../api/marketApi';

interface CoinSelectorProps {
  value: string;
  onChange: (symbol: string) => void;
  coins: MarketCoin[];
  label?: string;
  variant?: 'default' | 'inline';
}

export function CoinSelector({ value, onChange, coins, label = 'Coin', variant = 'default' }: CoinSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filtered = coins.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const selected = coins.find((c) => c.symbol === value);

  const isInline = variant === 'inline';

  return (
    <div ref={ref} className={isInline ? 'relative inline-block' : 'relative'}>
      {!isInline && label && <label className="block text-sm text-text-muted mb-1">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={
          isInline
            ? 'inline-flex items-center gap-1 bg-transparent border-0 border-b-2 border-primary text-primary font-semibold cursor-pointer text-lg px-1 py-0 focus:outline-none hover:border-primary/70 transition-colors'
            : 'w-full px-3 py-2.5 bg-surface-light border border-surface-border rounded-lg text-sm text-left text-text cursor-pointer hover:border-primary/50 transition-colors'
        }
      >
        {selected
          ? isInline
            ? `${selected.name} (${selected.symbol})`
            : `${selected.symbol} — ${selected.name}`
          : 'Select a coin'}
        {isInline && <span className="text-xs ml-0.5">&#9662;</span>}
      </button>

      {open && (
        <div className={`absolute top-full mt-1 bg-surface-light border border-surface-border rounded-lg shadow-xl z-40 max-h-64 overflow-hidden flex flex-col ${isInline ? 'left-0 min-w-55' : 'left-0 right-0'}`}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search coins..."
            className="px-3 py-2 bg-transparent border-b border-surface-border text-sm text-text placeholder:text-text-muted focus:outline-none"
            autoFocus
          />
          <div className="overflow-y-auto">
            {filtered.map((coin) => (
              <button
                key={coin.id}
                type="button"
                onClick={() => {
                  onChange(coin.symbol);
                  setOpen(false);
                  setSearch('');
                }}
                className={`w-full px-3 py-2 text-sm text-left border-none cursor-pointer transition-colors ${
                  coin.symbol === value
                    ? 'bg-primary/20 text-primary'
                    : 'bg-transparent text-text hover:bg-surface'
                }`}
              >
                <span className="font-medium">{coin.symbol}</span>{' '}
                <span className="text-text-muted">{coin.name}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-3 py-4 text-sm text-text-muted text-center">No coins found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
