import { useCallback } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useStore } from '../store/useStore';
import * as authApi from '../api/authApi';
import { OAUTH } from '../api/config';

declare global {
  interface Window {
    AppleID?: {
      auth: {
        init: (config: Record<string, string>) => void;
        signIn: () => Promise<{
          authorization: { id_token: string };
        }>;
      };
    };
  }
}

export function useAuth() {
  const {
    authToken,
    authStatus,
    authMethod,
    authEmail,
    setAuthToken,
    setAuthStatus,
    setAuthMethod,
    setAuthEmail,
    resetAuthState,
    addToast,
  } = useStore();

  const isAuthenticated =
    authToken !== null && authStatus === 'verified';

  const openAuthModal = useCallback(() => {
    setAuthStatus('selecting-method');
  }, [setAuthStatus]);

  const requestCode = useCallback(
    async (email: string) => {
      await authApi.requestOtp(email);
      setAuthEmail(email);
      setAuthStatus('verifying-email');
    },
    [setAuthEmail, setAuthStatus]
  );

  const verifyToken = useCallback(
    async (email: string, code: string) => {
      const resp = await authApi.verifyOtp(email, code);
      setAuthToken({ value: resp.token });
      setAuthEmail(resp.user.email);
      setAuthStatus('verified');
    },
    [setAuthToken, setAuthEmail, setAuthStatus]
  );

  const handleSSOSuccess = useCallback(
    (resp: authApi.AuthLoginResponse) => {
      setAuthToken({ value: resp.token });
      setAuthEmail(resp.user.email);
      setAuthStatus('verified');
    },
    [setAuthToken, setAuthEmail, setAuthStatus]
  );

  const googleLogin = useGoogleLogin({
    onSuccess: ({ access_token }) => {
      authApi
        .ssoGoogle(access_token)
        .then(handleSSOSuccess)
        .catch(() => {
          addToast('Could not login with Google', 'error');
        });
    },
    onError: () => {
      addToast('Google login failed', 'error');
    },
  });

  const appleSSOLogin = useCallback(() => {
    if (!window.AppleID) {
      addToast('Apple Sign-In is not available', 'error');
      return;
    }
    window.AppleID.auth.init({
      clientId: OAUTH.APPLE_CLIENT_ID,
      scope: 'email',
      redirectURI: `${window.location.origin}/auth/apple_callback/`,
      usePopup: 'true',
    });
    window.AppleID.auth
      .signIn()
      .then((data) => {
        return authApi.ssoApple(data.authorization.id_token);
      })
      .then(handleSSOSuccess)
      .catch(() => {
        addToast('Could not login with Apple', 'error');
      });
  }, [handleSSOSuccess, addToast]);

  const ssoLogin = useCallback(
    (provider: 'google' | 'apple') => {
      setAuthMethod(provider);
      if (provider === 'google') {
        googleLogin();
      } else {
        appleSSOLogin();
      }
    },
    [setAuthMethod, googleLogin, appleSSOLogin]
  );

  const logout = useCallback(async () => {
    if (authToken) {
      await authApi.logout(authToken.value).catch(() => {});
    }
    resetAuthState();
  }, [authToken, resetAuthState]);

  return {
    isAuthenticated,
    authStatus,
    authMethod,
    authEmail,
    openAuthModal,
    resetAuthState,
    requestCode,
    verifyToken,
    ssoLogin,
    logout,
    setAuthStatus,
    setAuthMethod,
  };
}
