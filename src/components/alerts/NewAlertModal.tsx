import type { AlertFormConfig } from './AlertForm';
import { AlertForm } from './AlertForm';
import {
  priceAlertConfig,
  percentAlertConfig,
  // periodicAlertConfig,
  cryptoBriefingAlertConfig,
  twitterDigestAlertConfig,
  customAlertConfig,
} from './alertConfigs';

const ALERT_CONFIGS: Record<string, { label: string; config: AlertFormConfig }> = {
  price: { label: 'Price Alert', config: priceAlertConfig },
  percent: { label: 'Percent Alert', config: percentAlertConfig },
  // periodic: { label: 'Periodic Alert', config: periodicAlertConfig },
  'crypto-briefing': { label: 'Crypto Briefing', config: cryptoBriefingAlertConfig },
  'twitter-digest': { label: 'Twitter Digest', config: twitterDigestAlertConfig },
  custom: { label: 'Custom Alert', config: customAlertConfig },
};

interface NewAlertModalProps {
  alertType: string;
  onClose: () => void;
}

export function NewAlertModal({ alertType, onClose }: NewAlertModalProps) {
  const entry = ALERT_CONFIGS[alertType];
  if (!entry) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-surface border border-surface-border rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-surface border-b border-surface-border rounded-t-2xl px-8 py-5 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold">{entry.label}</h2>
          <button
            title="Close"
            onClick={onClose}
            className="text-text-muted hover:text-text transition-colors bg-transparent border-none cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-8 pt-6">
          <AlertForm config={entry.config} onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
}
