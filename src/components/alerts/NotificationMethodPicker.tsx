import type { NotificationMethod } from '../../store/useStore';

const methods: { id: NotificationMethod; label: string }[] = [
  { id: 'email', label: 'Email' },
  { id: 'sms', label: 'SMS' },
  { id: 'phone', label: 'Phone' },
  { id: 'push', label: 'Push' },
  { id: 'webhook', label: 'Webhook' },
  { id: 'telegram', label: 'Telegram' },
  { id: 'discord', label: 'Discord' },
  { id: 'slack', label: 'Slack' },
];

interface NotificationMethodPickerProps {
  value: NotificationMethod[];
  onChange: (methods: NotificationMethod[]) => void;
}

export function NotificationMethodPicker({ value, onChange }: NotificationMethodPickerProps) {
  const toggle = (id: NotificationMethod) => {
    if (value.includes(id)) {
      onChange(value.filter((m) => m !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div>
      <label className="block text-sm text-text-muted mb-2">Notification Methods</label>
      <div className="flex flex-wrap gap-2">
        {methods.map((method) => {
          const active = value.includes(method.id);
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => toggle(method.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                active
                  ? 'bg-primary/20 border-primary/40 text-primary'
                  : 'bg-surface border-surface-border text-text-muted hover:text-text hover:border-primary/30'
              }`}
            >
              {method.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
