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

export interface Preset {
  id: number;
  preset: string;
  preset_display: string;
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

interface CryptoBriefingPayload {
  preset?: string | null;
  timezone: string;
  tone: string;
  focus_tags: string[];
  include_prices: boolean;
  include_news: boolean;
  include_dao: boolean;
  include_social_sentiment: boolean;
  include_events: boolean;
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

async function put<T>(
  path: string,
  body: Record<string, unknown>,
  token: string
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "PUT",
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
  if (res.status === 204 || res.headers.get("content-length") === "0") return null as T;
  return res.json();
}

async function del(path: string, token: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "DELETE",
    headers: {
      ...APP_HEADERS,
      Authorization: `Token ${token}`,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status}: ${text}`);
  }
}

/**
 * Build the path for a subscription mutation.
 * `endpoint` is expected to be a relative path (e.g. "/recipes/price-alerts/").
 * Absolute URLs (returned by DRF HyperlinkedModelSerializer) are detected and
 * the origin is stripped so we always route through API_BASE_URL.
 */
function resolvePath(endpoint: string, id: string, suffix = ""): string {
  let relative = endpoint;
  try {
    const url = new URL(endpoint);
    relative = url.pathname;
  } catch {
    // not an absolute URL — use as-is
  }
  return `${relative.replace(/^\//, "")}${id}/${suffix}`;
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

export function createCryptoBriefingAlert(
  token: string,
  opts: {
    preset?: string;
    timezone: string;
    tone: string;
    focusTags: string[];
    notificationMethod: string;
    includePrices: boolean;
    includeNews: boolean;
    includeDao: boolean;
    includeSocialSentiment: boolean;
    includeEvents: boolean;
  }
): Promise<unknown> {
  const payload: CryptoBriefingPayload = {
    preset: opts.preset || null,
    timezone: opts.timezone,
    tone: opts.tone,
    focus_tags: opts.focusTags,
    include_prices: opts.includePrices,
    include_news: opts.includeNews,
    include_dao: opts.includeDao,
    include_social_sentiment: opts.includeSocialSentiment,
    include_events: opts.includeEvents,
    is_active: true,
    notify_push: opts.notificationMethod === "push",
    notify_email: opts.notificationMethod === "email",
  };
  return post(ALERT_ROUTES.CRYPTO_BRIEFING, payload as unknown as Record<string, unknown>, token);
}

export async function fetchCooldowns(): Promise<Cooldown[]> {
  const data = await get<PaginatedResponse<Cooldown>>(ALERT_ROUTES.COOLDOWNS);
  return data.results;
}

export async function fetchFrequencies(): Promise<Frequency[]> {
  const data = await get<PaginatedResponse<Frequency>>(ALERT_ROUTES.FREQUENCIES);
  return data.results;
}

export async function fetchPresets(): Promise<Preset[]> {
  const data = await get<PaginatedResponse<Preset>>(ALERT_ROUTES.CRYPTO_BRIEFING_PRESETS);
  return data.results;
}

// --- Subscriptions ---

export interface SubscriptionPayload {
  coin_slug?: string;
  coin_ticker?: string;
  condition?: string;
  threshold?: number;
  is_active: boolean;
  notify_push: boolean;
  notify_email: boolean;
  frequency?: string;
  cooldown?: string | null;
  timezone?: string;
  query?: string;
  max_tweets?: number;
  account_usernames?: string[];
  preset?: string | null;
  tone?: string;
  focus_tags?: string[];
  include_prices?: boolean;
  include_news?: boolean;
  include_dao?: boolean;
  include_social_sentiment?: boolean;
  include_events?: boolean;
}

export interface Subscription {
  id: number;
  created: string;
  recipe_type: string;
  endpoint: string;
  payload: SubscriptionPayload;
}

export async function fetchSubscriptions(token: string): Promise<Subscription[]> {
  const res = await fetch(`${API_BASE_URL}${ALERT_ROUTES.SUBSCRIPTIONS}`, {
    headers: {
      ...APP_HEADERS,
      Authorization: `Token ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(`GET subscriptions failed: ${res.status}`);
  }
  return res.json();
}

export async function toggleSubscription(
  token: string,
  endpoint: string,
  id: string
): Promise<void> {
  await post(resolvePath(endpoint, id, "toggle/"), {}, token);
}

export async function deleteSubscription(
  token: string,
  endpoint: string,
  id: string
): Promise<void> {
  return del(resolvePath(endpoint, id), token);
}

export async function updateSubscription(
  token: string,
  endpoint: string,
  id: string,
  body: Record<string, unknown>
): Promise<unknown> {
  return put(resolvePath(endpoint, id), body, token);
}
