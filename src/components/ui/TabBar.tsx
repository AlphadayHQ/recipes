interface TabBarProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}

export function TabBar({ tabs, active, onChange }: TabBarProps) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors border-none cursor-pointer ${
            active === tab
              ? 'bg-primary text-white'
              : 'bg-surface-light text-text-muted hover:text-text hover:bg-surface'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
