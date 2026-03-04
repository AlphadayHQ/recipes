export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const APP_HEADERS = {
  "X-App-Id": import.meta.env.VITE_X_APP_ID as string,
  "X-App-Secret": import.meta.env.VITE_X_APP_SECRET as string,
};

export const AUTH_ROUTES = {
  REQUEST_OTP: "auth/email/get-otp/",
  VERIFY_OTP: "auth/email/verify-otp/",
  GOOGLE_LOGIN: "auth/sso/google/",
  APPLE_LOGIN: "auth/sso/apple/",
  LOGOUT: "auth/logout/",
} as const;

export const MARKET_ROUTES = {
  BASE: "market/",
} as const;

export const ALERT_ROUTES = {
  PRICE: "recipes/price-alerts/",
  PERCENTAGE: "recipes/percentage-alerts/",
  PERIODIC: "recipes/periodic-alerts/",
  TWITTER_DIGEST: "recipes/twitter-digests/",
  CUSTOM_ALERT: "recipes/web-search-alerts/",
  CRYPTO_BRIEFING: "recipes/crypto-briefings/",
  COOLDOWNS: "recipes/cooldowns/",
  FREQUENCIES: "recipes/frequencies/",
} as const;

export const OAUTH = {
  GOOGLE_CLIENT_ID: import.meta.env.VITE_OAUTH_ID_GOOGLE as string,
  APPLE_CLIENT_ID: import.meta.env.VITE_OAUTH_ID_APPLE as string,
};
