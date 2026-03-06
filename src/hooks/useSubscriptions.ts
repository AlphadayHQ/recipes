import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { fetchSubscriptions, type Subscription } from '../api/alertApi';
import type { Alert, AlertType, NotificationMethod } from '../store/useStore';

const RECIPE_TYPE_MAP: Record<string, AlertType> = {
  price_alert: 'price',
  percentage_alert: 'percent',
  periodic_alert: 'periodic',
  twitter_digest: 'twitter-digest',
  web_search_alert: 'custom',
  crypto_briefing: 'crypto-briefing',
};

function parseCondition(apiCondition: string | undefined): Alert['condition'] {
  if (!apiCondition) return undefined;
  if (apiCondition.endsWith('_above') && apiCondition.startsWith('price')) return 'above';
  if (apiCondition.endsWith('_below') && apiCondition.startsWith('price')) return 'below';
  if (apiCondition.includes('above')) return 'rises';
  if (apiCondition.includes('below')) return 'drops';
  return undefined;
}

function parseNotificationMethods(
  payload: Subscription['payload']
): NotificationMethod[] {
  const methods: NotificationMethod[] = [];
  if (payload.notify_email) methods.push('email');
  if (payload.notify_push) methods.push('push');
  return methods;
}

function subscriptionToAlert(sub: Subscription): Alert {
  const type = RECIPE_TYPE_MAP[sub.recipe_type] ?? (sub.recipe_type as AlertType);
  const { payload } = sub;

  return {
    id: String(sub.id),
    type,
    createdAt: sub.created,
    isActive: payload.is_active,
    notificationMethods: parseNotificationMethods(payload),
    coin: payload.coin_ticker ?? payload.coin_slug,
    condition: parseCondition(payload.condition),
    threshold: payload.threshold,
    cooldown: payload.cooldown ?? undefined,
    frequency: payload.frequency,
    query: payload.query,
    includePrices: payload.include_prices,
    includeNews: payload.include_news,
    includeDao: payload.include_dao,
    includeSocialSentiment: payload.include_social_sentiment,
    includeEvents: payload.include_events,
  };
}

export function useSubscriptions() {
  const token = useStore((s) => s.authToken);
  const setAlerts = useStore((s) => s.setAlerts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    fetchSubscriptions(token.value)
      .then((subs) => setAlerts(subs.map(subscriptionToAlert)))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token, setAlerts]);

  return { loading, error };
}
