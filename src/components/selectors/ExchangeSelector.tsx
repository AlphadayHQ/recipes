import exchanges from '../../mocks/exchanges.json';

interface ExchangeSelectorProps {
  value: string;
  onChange: (slug: string) => void;
  label?: string;
}

export function ExchangeSelector({ value, onChange, label = 'Exchange' }: ExchangeSelectorProps) {
  return (
    <div>
      {label && <label className="block text-sm text-text-muted mb-1">{label}</label>}
      <select
        title='exchanges'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 bg-surface-light border border-surface-border rounded-lg text-sm text-text cursor-pointer focus:outline-none focus:border-primary transition-colors"
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
