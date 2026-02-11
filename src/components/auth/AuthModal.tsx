import { useCallback, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useStore, type AuthMethod } from "../../store/useStore";
import { OTPInput } from "./OtpInput";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export function AuthModal() {
  const {
    authStatus,
    authEmail,
    resetAuthState,
    requestCode,
    verifyToken,
    ssoLogin,
    setAuthStatus,
    setAuthMethod,
  } = useAuth();
  const addToast = useStore((s) => s.addToast);

  const [email, setEmail] = useState("");
  const [verifyingOTP, setVerifyingOTP] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);

  const handleClose = useCallback(() => {
    resetAuthState();
    setEmail("");
    setVerifyingOTP(false);
    setIsSignIn(false);
  }, [resetAuthState]);

  const handleEmailSubmit = useCallback(() => {
    if (!EMAIL_REGEX.test(email.toLowerCase())) return;
    requestCode(email)
      .then(() => addToast("OTP sent to your email"))
      .catch(() =>
        addToast("Email could not be sent. Please try again.", "error"),
      );
  }, [requestCode, email, addToast]);

  const handleOtpSubmit = useCallback(
    (otp: string) => {
      setVerifyingOTP(true);
      verifyToken(email, otp)
        .then(() => {
          addToast("Successfully verified email");
          setVerifyingOTP(false);
          setEmail("");
        })
        .catch(() => {
          addToast("We couldn't verify your email. Please try again.", "error");
          setVerifyingOTP(false);
        });
    },
    [email, verifyToken, addToast],
  );

  const handleSSOCallback = useCallback(
    (method: AuthMethod) => {
      if (method === "email") {
        setAuthMethod("email");
        setAuthStatus("signing-in");
      } else {
        ssoLogin(method);
      }
    },
    [setAuthMethod, setAuthStatus, ssoLogin],
  );

  const isValidEmail = EMAIL_REGEX.test(email.toLowerCase());

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-surface border border-surface-border rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Close button */}
        <button
          title="Close"
          onClick={handleClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-semibold text-text text-center mb-6">
            {isSignIn ? "Sign in to" : "Sign up for"} CryptoAlerts
          </h2>

          {/* Method Selection */}
          {authStatus === "selecting-method" && !isSignIn && (
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleSSOCallback("email")}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-primary/10 border border-primary/20 text-text font-semibold hover:bg-primary/20 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Continue with Email
              </button>
              <button
                onClick={() => handleSSOCallback("google")}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg border border-surface-border text-text font-semibold hover:bg-surface-light transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
              <button
                onClick={() => handleSSOCallback("apple")}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg border border-surface-border text-text font-semibold hover:bg-surface-light transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                Continue with Apple
              </button>

              <div className="mt-3 flex items-center gap-1 text-sm">
                <span className="text-text-muted">
                  Already have an account?
                </span>
                <button
                  onClick={() => setIsSignIn(true)}
                  className="text-primary font-semibold underline hover:opacity-80 transition-opacity"
                >
                  Log in
                </button>
              </div>
            </div>
          )}

          {/* Email Input (signing-in state or sign-in mode) */}
          {(authStatus === "signing-in" ||
            (authStatus === "selecting-method" && isSignIn)) && (
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-surface-light border border-surface-border text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                  autoFocus
                />
              </div>
              <button
                onClick={handleEmailSubmit}
                disabled={!isValidEmail}
                className="w-full py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Send Verification Code
              </button>

              <div className="relative flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-surface-border" />
                <span className="text-xs text-text-muted">
                  Or continue with
                </span>
                <div className="flex-1 h-px bg-surface-border" />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleSSOCallback("google")}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
                <button
                  onClick={() => handleSSOCallback("apple")}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  Apple
                </button>
              </div>
            </div>
          )}

          {/* OTP Verification */}
          {authStatus === "verifying-email" && (
            <div className="space-y-4">
              <p className="text-text-muted">
                Enter the 6 digit verification code we sent to{" "}
              </p>
              <p className="text-text font-bold">{authEmail || email}</p>

              <div className="flex justify-center py-4">
                {verifyingOTP ? (
                  <div className="flex justify-center py-4">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <OTPInput
                    length={6}
                    autoFocus
                    onChangeOTP={handleOtpSubmit}
                  />
                )}
              </div>

              <div className="text-sm text-text-muted">
                <span>Didn't get a verification code? </span>
                <button
                  onClick={handleEmailSubmit}
                  className="text-primary font-bold underline underline-offset-4 hover:opacity-80"
                >
                  Resend now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
