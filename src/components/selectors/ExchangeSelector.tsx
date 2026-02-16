import exchanges from '../../mocks/exchanges.json';

interface ExchangeSelectorProps {
  value: string;
  onChange: (slug: string) => void;
  label?: string;
  variant?: 'default' | 'inline';
}

const inlineClass =
  'bg-transparent border-0 border-b-2 border-primary text-primary font-semibold cursor-pointer text-lg px-1 py-0 focus:outline-none hover:border-primary/70 transition-colors';

const defaultClass =
  'w-full px-3 py-2.5 bg-surface-light border border-surface-border rounded-lg text-sm text-text cursor-pointer focus:outline-none focus:border-primary transition-colors';

export function ExchangeSelector({ value, onChange, label = 'Exchange', variant = 'default' }: ExchangeSelectorProps) {
  const isInline = variant === 'inline';

  return (
    <div className={isInline ? 'inline-block' : ''}>
      {!isInline && label && <label className="block text-sm text-text-muted mb-1">{label}</label>}
      <select
        title="exchanges"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={isInline ? inlineClass : defaultClass}
      >
        <option value="">Any exchange</option>
        {exchanges.map((ex) => (
          <option key={ex.id} value={ex.slug}>
            {ex.name}
          </option>
        ))}
      </select>
    </div>
  );
}
