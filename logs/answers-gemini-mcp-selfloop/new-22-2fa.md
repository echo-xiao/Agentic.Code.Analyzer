# How does two-factor authentication (2FA) work in Rocket.Chat?

## Gemini Answer

Rocket.Chat's two-factor authentication (2FA) system is implemented as a server-side middleware that intercepts sensitive operations and enforces a second factor of verification. The core of the 2FA process revolves around a `twoFactorRequired` middleware, which then delegates to a `checkCodeForUser` function to handle the actual verification.

Here's a detailed breakdown of how 2FA works:

**Call Chain:**
`apps/meteor/app/2fa/server/twoFactorRequired.ts` → `apps/meteor/app/2fa/server/index.ts` (`checkCodeForUser`) → `apps/meteor/app/2fa/server/index.ts` (`getSecondFactorMethod`) → `apps/meteor/app/2fa/server/index.ts` (`getMethodByNameOrFirstActiveForUser`) → `ICodeCheck` implementations (e.g., `TOTPCheck`, `EmailCheck`)

**Detailed Flow:**

1.  **`twoFactorRequired` Middleware (`apps/meteor/app/2fa/server/twoFactorRequired.ts`):**
    *   This acts as an entry point, wrapping sensitive methods or API endpoints that require 2FA.
    *   When a protected operation is attempted, this middleware is triggered.

2.  **`checkCodeForUser` (`apps/meteor/app/2fa/server/index.ts`):**
    *   This is the central function responsible for orchestrating the 2FA verification.
    *   **Initial Checks:** It first verifies if 2FA is globally enabled and if the user exists.
    *   **Header-based 2FA:** It can extract 2FA codes and methods from `x-2fa-code` and `x-2fa-method` HTTP headers, allowing for programmatic 2FA submission.
    *   **Remembered Authorization:** It checks if the current connection has a remembered authorization token, which allows users to bypass 2FA for a set period on trusted devices.
    *   **Method Selection:** It calls `getSecondFactorMethod` to determine which 2FA method (e.g., TOTP, Email) is active and should be used for verification.
    *   **Code Verification:**
        *   If no 2FA code is provided, it throws a `totp-required` error, indicating the expected 2FA method.
        *   It then calls the `verify` method of the `selectedMethod` (e.g., `TOTPCheck.verify` or `EmailCheck.verify`) to validate the user-provided code.
        *   If verification fails, it checks for maximum failed attempts and throws appropriate errors (`totp-max-attempts` or `totp-invalid`).
    *   **Remember Authorization:** If the code is valid and the "remember me" option is not disabled, it calls `rememberAuthorization` to store the authorization for the current connection.

3.  **`getSecondFactorMethod` (`apps/meteor/app/2fa/server/index.ts`):**
    *   This function determines the specific 2FA method to be used for verification.
    *   It primarily calls `getMethodByNameOrFirstActiveForUser` to find an active method.
    *   If no specific method is found but 2FA is required, it can fall back to a `passwordCheckFallback` if enabled.

4.  **`getMethodByNameOrFirstActiveForUser` (`apps/meteor/app/2fa/server/index.ts`):**
    *   This function is responsible for identifying the active 2FA method for a given user.
    *   It maintains a collection of all registered 2FA verification methods (`checkMethods`).
    *   If a method name is provided, it attempts to retrieve that specific method.
    *   Otherwise, it iterates through all available methods and returns the first one for which `method.isEnabled(user)` returns `true`, indicating that the method is active for the user.

**2FA Methods (Implementations of `ICodeCheck`):**

Rocket.Chat supports different 2FA methods, each implementing the `ICodeCheck` interface with `verify()` and `isEnabled()` methods:

*   **TOTPCheck (Time-based One-Time Password):** Used for authenticator apps (e.g., Google Authenticator, Authy). It verifies codes based on the RFC 6238 standard.
*   **EmailCheck:** Sends a temporary verification code to the user's registered email address.
*   **PasswordCheckFallback:** A fallback mechanism that might be used if other 2FA methods are not configured or available, requiring the user's password as a second factor.

In summary, Rocket.Chat's 2FA system is a robust, modular architecture that allows for different verification methods, enforced by a server-side middleware, and managed through a clear selection and verification process.

## Tool Calls (6 calls, 31,752 tokens)

**Step 1:** `search({"query":"two-factor authentication"})` → 17 tokens
**Step 2:** `search({"query":"2FA"})` → 631 tokens
**Step 3:** `graph({"direction":"down","layer":"server","query":"twoFactorRequired"})` → 1897 tokens
**Step 4:** `implement({"symbolName":"checkCodeForUser","filename":"apps/meteor/app/2fa/server/index.ts"})` → 547 tokens
**Step 5:** `implement({"filename":"apps/meteor/app/2fa/server/index.ts","symbolName":"getSecondFactorMethod"})` → 221 tokens
**Step 6:** `implement({"filename":"apps/meteor/app/2fa/server/index.ts","symbolName":"getMethodByNameOrFirstActiveForUser")` → 122 tokens

## Files Seen In Tool Results (23)

- `apps/meteor/app/2fa/server/code/EmailCheck.ts`
- `apps/meteor/tests/end-to-end/api/methods/2fa-enable.ts`
- `packages/models/src/models/Users.ts`
- `packages/ddp-client/src/legacy/RocketchatSDKLegacy.ts`
- `apps/meteor/app/lib/server/functions/deleteUser.ts`
- `apps/meteor/app/lib/server/lib/notifyListener.ts`
- `apps/meteor/app/api/server/ApiClass.ts`
- `apps/meteor/client/views/hooks/useRequire2faSetup.ts`
- `apps/meteor/client/lib/2fa/utils.ts`
- `apps/meteor/client/lib/2fa/process2faReturn.ts`
- `apps/meteor/client/lib/2fa/overrideLoginMethod.ts`
- `apps/meteor/app/2fa/server/twoFactorRequired.ts`
- `apps/meteor/app/2fa/server/loginHandler.ts`
- `apps/meteor/app/2fa/server/index.ts`
- `apps/meteor/app/2fa/server/MethodInvocationOverride.js`
- `apps/meteor/app/2fa/server/methods/validateTempToken.ts`
- `apps/meteor/app/2fa/server/methods/regenerateCodes.ts`
- `apps/meteor/app/2fa/server/methods/enable.ts`
- `apps/meteor/app/2fa/server/methods/disable.ts`
- `apps/meteor/app/2fa/server/methods/checkCodesRemaining.ts`
- `apps/meteor/app/2fa/server/lib/totp.ts`
- `apps/meteor/app/2fa/server/functions/resetTOTP.ts`
- `apps/meteor/app/2fa/server/code/index.ts`
