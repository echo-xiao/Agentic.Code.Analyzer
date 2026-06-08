# How does two-factor authentication (2FA) work in Rocket.Chat?

## Gemini Answer

Two-factor authentication (2FA) in Rocket.Chat works by intercepting sensitive method/endpoint calls and enforcing a secondary verification step. This process is orchestrated on the server-side, with different methods available for verification.

Here's the detailed call chain:

**Entry → `twoFactorRequired` → `checkCodeForUser` → `getSecondFactorMethod` → `getMethodByNameOrFirstActiveForUser` → `selectedMethod.verify`**

1.  **`twoFactorRequired` (apps/meteor/app/2fa/server/twoFactorRequired.ts)**:
    This function acts as a middleware wrapper for methods and endpoints that require 2FA. When a sensitive operation is attempted by a user with 2FA enabled, this middleware is triggered.

2.  **`checkCodeForUser` (apps/meteor/app/2fa/server/code/index.ts)**:
    This is the core function for verifying a 2FA code.
    *   It first checks if 2FA is globally enabled through the `Accounts_TwoFactorAuthentication_Enabled` setting.
    *   It determines the user for whom 2FA is being verified.
    *   It attempts to extract the 2FA code and method from HTTP headers (`x-2fa-code` and `x-2fa-method`) if present.
    *   It then calls `getSecondFactorMethod` to select the appropriate 2FA verification method.
    *   If no code is provided, it throws a `totp-required` error, providing the method name and available methods.
    *   If a code is provided, it calls the `verify` method of the `selectedMethod` (e.g., `TOTPCheck.verify` or `EmailCheck.verify`).
    *   If verification fails, it checks if the maximum failed attempts have been reached and throws a `totp-invalid` or `totp-max-attempts` error.
    *   Upon successful verification, it may call `rememberAuthorization` to remember the authorization for the session.

3.  **`getSecondFactorMethod` (apps/meteor/app/2fa/server/code/index.ts)**:
    This function is responsible for identifying which 2FA method should be used for the current verification attempt. It primarily delegates to `getMethodByNameOrFirstActiveForUser`.

4.  **`getMethodByNameOrFirstActiveForUser` (apps/meteor/app/2fa/server/code/index.ts)**:
    This function retrieves the specific 2FA method to be used.
    *   If a method name is provided, it attempts to find that specific method from a collection of registered 2FA check methods (`checkMethods`).
    *   If no specific method is named, it iterates through all available 2FA methods and returns the first one that is enabled for the given user.

**Available 2FA Methods:**
Rocket.Chat supports different 2FA methods, each implementing an `ICodeCheck` interface with `verify()` and `isEnabled()` methods:
*   **TOTPCheck**: Handles Time-based One-Time Passwords, typically used with authenticator apps (e.g., Google Authenticator). This uses the standard RFC 6238.
*   **EmailCheck** (`apps/meteor/app/2fa/server/code/EmailCheck.ts`): Sends a temporary verification code to the user's registered email address via the Mailer service.
*   **PasswordCheckFallback**: Implied as a fallback mechanism, though not explicitly detailed in the provided architectural overview.

In summary, when 2FA is required, Rocket.Chat's server-side logic (`twoFactorRequired` → `checkCodeForUser`) dynamically selects an enabled 2FA method (TOTP or Email) and then attempts to verify the provided code using that method's specific implementation.

## Tool Calls (8 calls, 50,913 tokens)

**Step 1:** `search({"query":"two-factor authentication"})` → 17 tokens
**Step 2:** `search({"query":"2FA"})` → 635 tokens
**Step 3:** `graph({"query":"twoFactorRequired","direction":"down"})` → 1455 tokens
**Step 4:** `implement({"symbolName":"checkCodeForUser","filename":"apps/meteor/app/2fa/server/code/index.ts"})` → 547 tokens
**Step 5:** `graph({"query":"getSecondFactorMethod","direction":"down","layer":"server"})` → 599 tokens
**Step 6:** `implement({"symbolName":"getMethodByNameOrFirstActiveForUser","filename":"apps/meteor/app/2fa/server/code/inde)` → 122 tokens
**Step 7:** `search({"query":"checkMethods"})` → 14 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/2fa/server/code/index.ts","symbolName":"*"})` → 14 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 4/4 |
| Tool calls | 8 |
| Total tokens | 50,913 |
| Pass | NO |
