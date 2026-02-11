import { API_BASE_URL, APP_HEADERS, AUTH_ROUTES } from "./config";

export type AuthLoginResponse = {
  token: string;
  user: {
    email: string;
  };
};

function authHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...APP_HEADERS,
  };
  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }
  return headers;
}

async function post<T>(
  path: string,
  body: Record<string, unknown>,
  token?: string
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status}: ${text}`);
  }
  // Some endpoints (like request OTP) return 204 with no body
  if (res.status === 204 || res.headers.get("content-length") === "0") {
    return undefined as T;
  }
  return res.json();
}

export function requestOtp(email: string): Promise<void> {
  return post(AUTH_ROUTES.REQUEST_OTP, { email });
}

export function verifyOtp(
  email: string,
  code: string
): Promise<AuthLoginResponse> {
  return post(AUTH_ROUTES.VERIFY_OTP, { email, token: code });
}

export function ssoGoogle(accessToken: string): Promise<AuthLoginResponse> {
  return post(AUTH_ROUTES.GOOGLE_LOGIN, { access_token: accessToken });
}

export function ssoApple(idToken: string): Promise<AuthLoginResponse> {
  return post(AUTH_ROUTES.APPLE_LOGIN, {
    id_token: idToken,
    access_token: idToken,
  });
}

export function logout(token: string): Promise<void> {
  return post(AUTH_ROUTES.LOGOUT, {}, token);
}
