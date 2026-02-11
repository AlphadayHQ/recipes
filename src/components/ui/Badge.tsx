interface BadgeProps {
  status: 'active' | 'paused' | 'triggered';
}

const styles = {
  active: 'bg-success/20 text-success border-success/30',
  paused: 'bg-warning/20 text-warning border-warning/30',
  triggered: 'bg-primary/20 text-primary border-primary/30',
};

export function Badge({ status }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
