# How does two-factor authentication (2FA) work in Rocket.Chat?

## Gemini Answer

Rocket.Chat's two-factor authentication (2FA) system is implemented as a middleware that intercepts sensitive operations and verifies a user's 2FA code. The process involves several key components:

**Call Chain:**

`twoFactorRequired` (middleware) → `checkCodeForUser` → `getMethodByNameOrFirstActiveForUser` → `ICodeCheck.verify` (e.g., `TOTPCheck.verify`) → `TOTP.verify`

**Detailed Flow:**

1.  **`twoFactorRequired`** (`apps/meteor/app/2fa/server/twoFactorRequired.ts`): This acts as a middleware wrapper for sensitive methods or API endpoints. When a protected action is attempted, this middleware is triggered to ensure 2FA is enforced.

2.  **`checkCodeForUser`** (`apps/meteor/app/2fa/server/code/index.ts`): This function is called by `twoFactorRequired`. Its primary responsibility is to orchestrate the 2FA code verification process.

3.  **`getMethodByNameOrFirstActiveForUser`** (`apps/meteor/app/2fa/server/code/index.ts`): Within `checkCodeForUser`, this function determines which 2FA method is active for the user. It checks if a specific method name is provided and enabled; otherwise, it iterates through all available 2FA methods (such as TOTP, Email, or Password Fallback) and returns the first one that is enabled for the user. This function returns an object that implements the `ICodeCheck` interface.

4.  **`ICodeCheck.verify`** (e.g., `TOTPCheck.verify` in `apps/meteor/app/2fa/server/code/TOTPCheck.ts`): Each 2FA method (like TOTP, Email, or Password Fallback) implements the `ICodeCheck` interface, which includes a `verify` method. This method is responsible for validating the provided 2FA code against the user's stored credentials for that specific method.

5.  **`TOTP.verify`** (likely in `apps/meteor/app/2fa/server/lib/totp.ts`): For Time-based One-Time Password (TOTP) authentication, the `TOTPCheck.verify` method delegates the actual code validation to `TOTP.verify`. This function takes the user's TOTP secret, the provided code, and other relevant information (like backup tokens) to determine if the code is valid according to the RFC 6238 standard.

In summary, when a user attempts a protected action, the `twoFactorRequired` middleware initiates a check. `checkCodeForUser` then identifies the user's active 2FA method and calls its `verify` function. For TOTP, this ultimately leads to `TOTP.verify` to validate the code.

## Tool Calls (7 calls, 52,951 tokens)

**Step 1:** `search({"query":"two-factor authentication"})` → 17 tokens
**Step 2:** `search({"query":"2FA"})` → 631 tokens
**Step 3:** `graph({"query":"twoFactorRequired","file":"apps/meteor/app/2fa/server/twoFactorRequired.ts","direction":"d)` → 2812 tokens
**Step 4:** `graph({"query":"checkCodeForUser","file":"apps/meteor/app/2fa/server/index.ts","direction":"down"})` → 1852 tokens
**Step 5:** `implement({"filename":"apps/meteor/app/2fa/server/index.ts","symbolName":"getMethodByNameOrFirstActiveForUser")` → 122 tokens
**Step 6:** `search({"query":"TOTPCheck"})` → 450 tokens
**Step 7:** `implement({"filename":"apps/meteor/app/2fa/server/code/TOTPCheck.ts","symbolName":"TOTPCheck.verify"})` → 131 tokens

## Files Seen In Tool Results (34)

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
- `apps/meteor/app/2fa/server/code/TOTPCheck.ts`
- `apps/meteor/client/views/root/MainLayout/TwoFactorAuthSetupCheck.tsx`
- `apps/meteor/client/views/root/hooks/loggedIn/useTwoFactorAuthSetupCheck.tsx`
- `apps/meteor/app/2fa/server/code/ICodeCheck.ts`
- `apps/meteor/client/views/root/MainLayout/MainContent.tsx`
- `apps/meteor/client/views/root/MainLayout/PasswordChangeCheck.tsx`
- `apps/meteor/client/views/root/MainLayout/TwoFactorRequiredModal.tsx`
- `apps/meteor/client/views/root/MainLayout/LoggedInArea.tsx`
- `apps/meteor/client/views/account/security/AccountSecurityPage.tsx`
- `apps/meteor/client/views/root/MainLayout/LayoutWithSidebar.tsx`
- `packages/ui-contexts/src/hooks/useLayout.ts`
