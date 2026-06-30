# How does two-factor authentication (2FA) work in Rocket.Chat?

## Gemini Answer

Rocket.Chat implements two-factor authentication (2FA) by employing a middleware wrapper called `twoFactorRequired()` which is applied to sensitive methods and endpoints.

Here's how it works:

**Call Chain:**

1.  **`twoFactorRequired()`** (located in `apps/meteor/app/2fa/server/twoFactorRequired.ts`): This function acts as the entry point for 2FA validation. When a sensitive action is attempted, this middleware is triggered.
2.  **`checkCodeForUser()`** (located in `apps/meteor/app/2fa/server/code/index.ts`): This is the core function responsible for verifying the 2FA code.
    *   It first checks if 2FA is globally enabled via `Accounts_TwoFactorAuthentication_Enabled` setting.
    *   It retrieves the user information for whom the 2FA check is being performed.
    *   It attempts to extract the 2FA code and method from `x-2fa-code` and `x-2fa-method` headers if not provided directly.
    *   It then calls `isAuthorizedForToken()` to check if the user is already authorized for the current session (e.g., "remember me" functionality).
    *   It determines the appropriate second-factor method to use by calling `getSecondFactorMethod()`.
    *   If no code is provided, it throws a `totp-required` error, prompting the user for the 2FA code.
    *   Finally, it calls the `verify()` method on the `selectedMethod` (e.g., TOTP or Email) to validate the provided 2FA code. If the code is invalid, it throws `totp-invalid` or `totp-max-attempts` errors.
    *   If the code is valid and "remember me" is enabled, it calls `rememberAuthorization()` to store the authorization.
3.  **`getSecondFactorMethod()`** (located in `apps/meteor/app/2fa/server/code/index.ts`): This function identifies the active 2FA method for a given user. It iterates through available methods (TOTP, Email, Password Fallback) and returns the first enabled and active one for the user.
    *   It checks the `isEnabled()` status of each method.
    *   It utilizes the `ICodeCheck` interface (defined in `ICodeCheck.ts`) which requires `verify()` and `isEnabled()` methods for each 2FA implementation.
    *   **TOTPCheck (Authenticator App):** Uses standard RFC 6238 time-based codes.
    *   **EmailCheck (Email Code):** Sends a temporary code via the Mailer.
    *   **PasswordCheckFallback:** A fallback mechanism (details not fully explored in the provided `implement` output, but implied by the "Architecture" description).

In essence, `twoFactorRequired` acts as a gatekeeper, delegating the actual verification logic to `checkCodeForUser`, which in turn leverages specific 2FA method implementations (like TOTP or Email) to validate the user's second factor.

## Tool Calls (8 calls, 53,073 tokens)

**Step 1:** `search({"query":"two factor authentication"})` → 138 tokens
**Step 2:** `search({"query":"saveUserProfile"})` → 62 tokens
**Step 3:** `graph({"query":"saveUserProfile","file":"apps/meteor/server/methods/saveUserProfile.ts","direction":"down")` → 1858 tokens
**Step 4:** `search({"query":"TwoFactor"})` → 473 tokens
**Step 5:** `graph({"direction":"down","query":"twoFactorRequired","file":"apps/meteor/app/2fa/server/twoFactorRequired)` → 904 tokens
**Step 6:** `search({"query":"checkCodeForUser"})` → 178 tokens
**Step 7:** `implement({"filename":"apps/meteor/app/2fa/server/code/index.ts","symbolName":"checkCodeForUser"})` → 547 tokens
**Step 8:** `search({"query":"getSecondFactorMethod"})` → 65 tokens
