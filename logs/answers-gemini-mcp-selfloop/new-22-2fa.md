# How does two-factor authentication (2FA) work in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

Two-factor authentication (2FA) in Rocket.Chat involves both server-side enforcement and client-side handling of 2FA challenges.

**Server-Side Flow:**

1.  **Enforcement:** Server-side methods are protected by the `twoFactorRequired` higher-order function, located in `apps/meteor/app/2fa/server/twoFactorRequired.ts`. This function ensures that if a user is logged in, a 2FA check is performed.
2.  **Code Verification:** The `twoFactorRequired` function calls `checkCodeForUser` (defined in `apps/meteor/app/2fa/server/code/index.ts`) to verify the 2FA code.
3.  **`checkCodeForUser` Function:** This function performs the following:
    *   Checks if 2FA is globally enabled via the `Accounts_TwoFactorAuthentication_Enabled` setting.
    *   Retrieves the user information.
    *   Extracts the 2FA code and method from the arguments or HTTP headers (`x-2fa-code`, `x-2fa-method`).
    *   Checks if the user's login token is already authorized for 2FA bypass (e.g., "remember me" functionality) using `isAuthorizedForToken`.
    *   Selects the appropriate 2FA method (e.g., TOTP, Email, Password Fallback) using `getSecondFactorMethod`.
    *   If no code is provided, it throws a `totp-required` error, prompting the client for a code.
    *   Verifies the provided code using the selected method's `verify` function.
    *   Handles invalid codes and maximum failed attempts.
    *   If successful and "remember me" is applicable, it updates the user's login token with a `twoFactorAuthorizedHash` and `twoFactorAuthorizedUntil` timestamp using `rememberAuthorization`.

**Client-Side Flow:**

1.  **Interception:** The client-side overrides `Meteor.call` and `Meteor.callAsync` (likely within `apps/meteor/client/meteor/overrides/totpOnCall.ts`, though the specific symbol `totpOnCall` was not found directly in the details output, the wiki mentions its role).
2.  **Error Handling:** If a server method call returns a `totp-required` error, the client-side override intercepts it. The `isTotpRequiredError` utility function (from `apps/meteor/client/lib/2fa/utils.ts`) is used to identify this specific error.
3.  **User Prompt:** The client then prompts the user for a 2FA code.
4.  **Retry:** The original method call is retried with the provided `twoFactorCode` and `twoFactorMethod` included in the arguments.

**Key Files:**

*   `apps/meteor/app/2fa/server/twoFactorRequired.ts`: Enforces 2FA on server methods.
*   `apps/meteor/app/2fa/server/code/index.ts`: Central orchestrator for 2FA code verification.
*   `apps/meteor/client/meteor/overrides/totpOnCall.ts`: (As per wiki) Overrides client-side method calls to handle 2FA challenges.
*   `apps/meteor/client/lib/2fa/utils.ts`: Contains utility functions like `isTotpRequiredError` to identify 2FA-related errors.

## Tool Calls (8 calls, 59,091 tokens)

**Step 1:** `wiki({"question":"How does two-factor authentication (2FA) work in Rocket.Chat?"})` → 3816 tokens
**Step 2:** `search({"layer":"server","query":"twoFactorRequired"})` → 102 tokens
**Step 3:** `details({"filename":"twoFactorRequired.ts","symbolName":"twoFactorRequired"})` → 354 tokens
**Step 4:** `graph({"query":"twoFactorRequired","file":"twoFactorRequired.ts","move":"down","depth":2})` → 285 tokens
**Step 5:** `details({"filename":"index.ts","symbolName":"checkCodeForUser"})` → 541 tokens
**Step 6:** `search({"layer":"client","query":"totpOnCall"})` → 69 tokens
**Step 7:** `details({"filename":"totpOnCall.ts","symbolName":"totpOnCall"})` → 57 tokens
**Step 8:** `search({"query":"isTotpRequiredError","layer":"client"})` → 70 tokens

## Files Seen In Tool Results (33)

- `apps/meteor/client/providers/AuthenticationProvider/AuthenticationProvider.tsx`
- `apps/meteor/app/2fa/server/twoFactorRequired.ts`
- `apps/meteor/app/2fa/server/code/index.ts`
- `apps/meteor/app/2fa/server/code/ICodeCheck.ts`
- `apps/meteor/app/2fa/server/lib/totp.ts`
- `apps/meteor/client/meteor/overrides/totpOnCall.ts`
- `apps/meteor/client/lib/2fa/utils.ts`
- `apps/meteor/app/authentication/server/ILoginAttempt.ts`
- `apps/meteor/client/lib/2fa/process2faReturn.ts`
- `apps/meteor/client/lib/2fa/overrideLoginMethod.ts`
- `packages/api-client/src/errors.ts`
- `packages/models/src/index.ts`
- `apps/meteor/ee/server/api/api.ts`
- `apps/meteor/client/providers/AuthenticationProvider/hooks/useLDAPAndCrowdCollisionWarning.tsx`
- `apps/meteor/app/api/server/ApiClass.ts`
- `apps/meteor/client/lib/loginServices.ts`
- `apps/meteor/app/lib/server/startup/rateLimiter.js`
- `packages/ddp-client/src/types/Account.ts`
- `packages/password-policies/src/PasswordPolicy.ts`
- `packages/apps-engine/src/server/logging/AppConsole.ts`
- `apps/meteor/app/ui-master/server/inject.ts`
- `apps/meteor/client/lib/errors/RocketChatError.ts`
- `apps/meteor/client/lib/e2ee/logger.ts`
- `packages/core-typings/src/ILoginServiceConfiguration.ts`
- `packages/http-router/src/Router.ts`
- `packages/ui-contexts/src/hooks/useSetting.ts`
- `apps/meteor/client/providers/MeteorProvider.tsx`
- `apps/meteor/server/services/omnichannel-integrations/providers/twilio.ts`
- `packages/media-signaling/src/lib/Call.ts`
- `apps/meteor/lib/ClientLogger.ts`
- `apps/meteor/ee/app/authorization/server/callback.ts`
- `packages/ui-voip/src/providers/MediaCallLogger.ts`
- `apps/meteor/client/views/root/MainLayout/TwoFactorRequiredModal.tsx`
