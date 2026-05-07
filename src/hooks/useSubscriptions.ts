import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { fetchSubscriptions, type Subscription } from '../api/alertApi';
import type { Alert, AlertType, NotificationMethod } from '../store/useStore';

const RECIPE_TYPE_MAP: Record<string, AlertType> = {
  price_alert: 'price',
  twitter_digest: 'twitter-digest',
  web_search_alert: 'custom',
  crypto_briefing: 'crypto-briefing',
};

function parseCondition(apiCondition: string | undefined): Alert['condition'] {
  if (!apiCondition) return undefined;
  if (apiCondition === 'price_above') return 'above';
  if (apiCondition === 'price_below') return 'below';
  if (apiCondition.startsWith('pct_')) return apiCondition as Alert['condition'];
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
  const { payload } = sub;
  // Unified price-alert recipe carries the actual sub-type ("price" | "percent" | "periodic")
  // in payload.type. Fall back to recipe_type mapping for everything else.
  const type =
    sub.recipe_type === 'price_alert' && payload.type
      ? (payload.type as AlertType)
      : RECIPE_TYPE_MAP[sub.recipe_type] ?? (sub.recipe_type as AlertType);

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
    endpoint: sub.endpoint,
    rawPayload: payload as unknown as Record<string, unknown>,
  };
}

export function useSubscriptions() {
  const token = useStore((s) => s.authToken);
  const setAlerts = useStore((s) => s.setAlerts);
  const [loading, setLoading] = useState(!!token);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    const tokenValue = token.value;
    let cancelled = false;

    async function load() {
      try {
        const subs = await fetchSubscriptions(tokenValue);
        if (!cancelled) setAlerts(subs.map(subscriptionToAlert));
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to fetch subscriptions');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [token, setAlerts]);

  return { loading, error };
}
