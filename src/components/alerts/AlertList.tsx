import type { AlertType } from '../../store/useStore';
import { useStore } from '../../store/useStore';
import { AlertCard } from './AlertCard';

interface AlertListProps {
  type: AlertType;
}

export function AlertList({ type }: AlertListProps) {
  const alerts = useStore((s) => s.alerts.filter((a) => a.type === type));

  if (alerts.length === 0) {
    return (
      <div className="text-center py-8 text-text-muted">
        <p className="text-sm">No alerts of this type yet. Create one above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Your Alerts ({alerts.length})</h3>
      {alerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </div>
  );
}
