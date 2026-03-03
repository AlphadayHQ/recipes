import { API_BASE_URL, APP_HEADERS, ALERT_ROUTES } from "./config";

// --- Lookup types ---

export interface Cooldown {
  name: string;
  cooldown_seconds: number;
  description: string;
}

export interface Frequency {
  name: string;
  label: string;
}

interface PaginatedResponse<T> {
  links: { next: string | null; previous: string | null };
  total: number;
  results: T[];
}

// --- Request payload types ---

interface PriceAlertPayload {
  coin_slug: string;
  condition: "price_above" | "price_below";
  threshold: number;
  cooldown?: string | null;
  is_active: boolean;
  notify_push: boolean;
  notify_email: boolean;
}

interface PercentageAlertPayload {
  coin_slug: string;
  condition: "pct_24h_above" | "pct_24h_below" | "pct_7d_above" | "pct_7d_below";
  threshold: number;
  cooldown?: string | null;
  is_active: boolean;
  notify_push: boolean;
  notify_email: boolean;
}

interface TwitterDigestPayload {
  frequency: string;
  timezone: string;
  max_tweets: number;
  is_active: boolean;
  notify_push: boolean;
  notify_email: boolean;
  account_usernames: string[];
}

interface CustomAlertPayload {
  coin_slug?: string;
  query: string;
  frequency: string;
  timezone: string;
  is_active: boolean;
  notify_push: boolean;
  notify_email: boolean;
}

interface PeriodicAlertPayload {
  coin_slug: string;
  condition:
    | "price_above"
    | "price_below"
    | "pct_24h_above"
    | "pct_24h_below"
    | "pct_7d_above"
    | "pct_7d_below";
  threshold: number;
  frequency: string;
  cooldown?: string | null;
  is_active: boolean;
  notify_push: boolean;
  notify_email: boolean;
}

// --- Helpers ---

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: APP_HEADERS,
  });
  if (!res.ok) {
    throw new Error(`GET ${path} failed: ${res.status}`);
  }
  return res.json();
}

async function post<T>(
  path: string,
  body: Record<string, unknown>,
  token: string
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...APP_HEADERS,
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status}: ${text}`);
  }
  return res.json();
}

/**
 * Map frontend direction value ("above"/"below") to the API condition for price alerts.
 */
function toPriceCondition(direction: string): PriceAlertPayload["condition"] {
  return direction === "below" ? "price_below" : "price_above";
}

/**
 * Map frontend direction ("rises"/"drops") + timeWindow ("1h"/"4h"/"24h"/"7d")
 * to the API condition for percentage alerts.
 * The API only supports 24h and 7d windows; 1h and 4h are mapped to 24h.
 */
function toPercentCondition(
  direction: string,
  timeWindow: string
): PercentageAlertPayload["condition"] {
  const period = timeWindow === "7d" ? "7d" : "24h";
  const dir = direction === "drops" ? "below" : "above";
  return `pct_${period}_${dir}` as PercentageAlertPayload["condition"];
}

/**
 * Map frontend direction to a periodic alert condition.
 */
function toPeriodicCondition(
  direction: string
): PeriodicAlertPayload["condition"] {
  return direction === "below" ? "price_below" : "price_above";
}

// --- Public API functions ---

export function createPriceAlert(
  token: string,
  opts: {
    coinSlug: string;
    direction: string;
    threshold: number;
    cooldown?: string;
    notificationMethod: string;
  }
): Promise<unknown> {
  const payload: PriceAlertPayload = {
    coin_slug: opts.coinSlug,
    condition: toPriceCondition(opts.direction),
    threshold: opts.threshold,
    cooldown: opts.cooldown || null,
    is_active: true,
    notify_push: opts.notificationMethod === "push",
    notify_email: opts.notificationMethod === "email",
  };
  return post(ALERT_ROUTES.PRICE, payload as unknown as Record<string, unknown>, token);
}

export function createPercentageAlert(
  token: string,
  opts: {
    coinSlug: string;
    direction: string;
    timeWindow: string;
    threshold: number;
    cooldown?: string;
    notificationMethod: string;
  }
): Promise<unknown> {
  const payload: PercentageAlertPayload = {
    coin_slug: opts.coinSlug,
    condition: toPercentCondition(opts.direction, opts.timeWindow),
    threshold: opts.threshold,
    cooldown: opts.cooldown || null,
    is_active: true,
    notify_push: opts.notificationMethod === "push",
    notify_email: opts.notificationMethod === "email",
  };
  return post(ALERT_ROUTES.PERCENTAGE, payload as unknown as Record<string, unknown>, token);
}

export function createPeriodicAlert(
  token: string,
  opts: {
    coinSlug: string;
    direction: string;
    threshold: number;
    frequency: string;
    cooldown?: string;
    notificationMethod: string;
  }
): Promise<unknown> {
  const payload: PeriodicAlertPayload = {
    coin_slug: opts.coinSlug,
    condition: toPeriodicCondition(opts.direction),
    threshold: opts.threshold,
    frequency: opts.frequency,
    cooldown: opts.cooldown || null,
    is_active: true,
    notify_push: opts.notificationMethod === "push",
    notify_email: opts.notificationMethod === "email",
  };
  return post(ALERT_ROUTES.PERIODIC, payload as unknown as Record<string, unknown>, token);
}

export function createTwitterDigestAlert(
  token: string,
  opts: {
    frequency: string;
    timezone: string;
    maxTweets: number;
    notificationMethod: string;
    accountUsernames: string[];
  }
): Promise<unknown> {
  const payload: TwitterDigestPayload = {
    frequency: opts.frequency,
    timezone: opts.timezone,
    max_tweets: opts.maxTweets,
    is_active: true,
    notify_push: opts.notificationMethod === "push",
    notify_email: opts.notificationMethod === "email",
    account_usernames: opts.accountUsernames,
  };
  return post(ALERT_ROUTES.TWITTER_DIGEST, payload as unknown as Record<string, unknown>, token);
}

export function createCustomAlert(
  token: string,
  opts: {
    coinSlug?: string;
    query: string;
    frequency: string;
    timezone: string;
    notificationMethod: string;
  }
): Promise<unknown> {
  const payload: CustomAlertPayload = {
    ...(opts.coinSlug ? { coin_slug: opts.coinSlug } : {}),
    query: opts.query,
    frequency: opts.frequency,
    timezone: opts.timezone,
    is_active: true,
    // The form only offers "email" and "push"; other NotificationMethod values
    // would leave both flags false. If new channels are added to the form, this
    // mapping must be extended accordingly.
    notify_push: opts.notificationMethod === "push",
    notify_email: opts.notificationMethod === "email",
  };
  return post(ALERT_ROUTES.CUSTOM_ALERT, payload as unknown as Record<string, unknown>, token);
}

export async function fetchCooldowns(): Promise<Cooldown[]> {
  const data = await get<PaginatedResponse<Cooldown>>(ALERT_ROUTES.COOLDOWNS);
  return data.results;
}

export async function fetchFrequencies(): Promise<Frequency[]> {
  const data = await get<PaginatedResponse<Frequency>>(ALERT_ROUTES.FREQUENCIES);
  return data.results;
}
