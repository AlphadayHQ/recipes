import { useState, useEffect } from 'react';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  delay?: number;
}

export function SearchInput({ placeholder = 'Search...', value: controlledValue, onChange, delay = 300 }: SearchInputProps) {
  const [internal, setInternal] = useState(controlledValue ?? '');

  useEffect(() => {
    if (controlledValue !== undefined) setInternal(controlledValue);
  }, [controlledValue]);

  useEffect(() => {
    const timer = setTimeout(() => onChange(internal), delay);
    return () => clearTimeout(timer);
  }, [internal, delay, onChange]);

  return (
    <input
      type="text"
      value={internal}
      onChange={(e) => setInternal(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 bg-surface-light border border-surface-border rounded-lg text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
    />
  );
}
