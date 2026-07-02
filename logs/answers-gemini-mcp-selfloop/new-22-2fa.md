# How does two-factor authentication (2FA) work in Rocket.Chat?

## Gemini Answer

Rocket.Chat implements two-factor authentication (2FA) through a system that prioritizes different verification methods, with Time-based One-Time Password (TOTP) being a primary method.

Here's a breakdown of the 2FA flow:

**Entry → Verification Flow → Final**

1.  **Entry: `twoFactorRequired()` middleware**
    *   Sensitive methods or endpoints are protected by the `twoFactorRequired()` middleware. When these are accessed, the 2FA process is initiated.
2.  **Verification Flow: `checkCodeForUser()`**
    *   The `twoFactorRequired()` middleware calls `checkCodeForUser()`. This function attempts to verify the user's identity using a prioritized list of 2FA methods.
3.  **Step 1: `TOTPCheck`**
    *   The system first attempts verification using `TOTPCheck` (for authenticator apps).
    *   The `TOTPCheck.verify()` method is invoked, located in `apps/meteor/app/2fa/server/code/TOTPCheck.ts`.
    *   This method checks if TOTP is enabled for the user and if a secret exists.
    *   It then delegates the actual code verification to `TOTP.verify()`.
4.  **Step 2: `TOTP.verify()`**
    *   The `TOTP.verify()` function, found in `apps/meteor/app/2fa/server/lib/totp.ts`, handles the core logic for verifying the provided code.
    *   **Backup Code Verification:**
        *   If the provided code is 8 characters long and the user has backup tokens, it's treated as a backup code.
        *   The code is hashed using `SHA256` and compared against the user's stored `hashedBackup` tokens.
        *   If a match is found, the backup code is marked as used by removing it from the user's `backupTokens` via `Users.update2FABackupCodesByUserId()`.
    *   **TOTP Code Verification:**
        *   If it's not a backup code, the system proceeds with standard TOTP verification.
        *   It retrieves the `Accounts_TwoFactorAuthentication_MaxDelta` setting, which defines the allowed time window for the TOTP code.
        *   It uses the `speakeasy` library's `speakeasy.totp.verifyDelta()` (if `maxDelta` is configured) or `speakeasy.totp.verify()` to validate the provided code against the user's secret and the current time.
5.  **Step 3 (Fallback): `EmailCheck` and `PasswordCheckFallback`**
    *   If TOTP verification fails or is not enabled, `checkCodeForUser()` proceeds to try `EmailCheck` (for email-based codes) and then `PasswordCheckFallback` as a last resort.

**Key Files and Their Roles:**

*   **`apps/meteor/app/2fa/server/lib/totp.ts`**: This file defines the `TOTP` object, which is central to 2FA. It provides functions for generating TOTP secrets, creating OTP authentication URLs, and critically, the `verify` method that handles both TOTP code and backup code validation using the `speakeasy` library.
*   **`apps/meteor/app/2fa/server/code/TOTPCheck.ts`**: This file implements the `ICodeCheck` interface specifically for TOTP. Its `verify` method acts as an orchestrator, checking user settings and then calling the core `TOTP.verify()` function.
*   **`apps/meteor/client/views/account/security/TwoFactorTOTP.tsx`**: This client-side component is responsible for the user interface where users can enable, disable, or manage their TOTP settings within their account security.
*   **`apps/meteor/client/components/TwoFactorModal/TwoFactorTotpModal.tsx`**: This component renders the modal window that prompts users to enter their TOTP code during login or when performing sensitive actions.

## Tool Calls (8 calls, 18,603 tokens)

**Step 1:** `plan({"question":"How does two-factor authentication (2FA) work in Rocket.Chat?","intent":"architecture"})` → 85 tokens
**Step 2:** `search({"query":"two-factor authentication OR 2FA"})` → 30 tokens
**Step 3:** `search({"query":"TOTP"})` → 330 tokens
**Step 4:** `graph({"query":"TOTP","move":"expand"})` → 384 tokens
**Step 5:** `details({"filename":"apps/meteor/app/2fa/server/code/TOTPCheck.ts","symbolName":"TOTPCheck"})` → 186 tokens
**Step 6:** `details({"filename":"apps/meteor/app/2fa/server/code/TOTPCheck.ts","symbolName":"TOTPCheck.verify"})` → 129 tokens
**Step 7:** `details({"symbolName":"TOTP.verify","filename":"apps/meteor/app/2fa/server/lib/totp.ts"})` → 44 tokens
**Step 8:** `details({"symbolName":"TOTP","filename":"apps/meteor/app/2fa/server/lib/totp.ts"})` → 425 tokens

## Files Seen In Tool Results (9)

- `apps/meteor/app/2fa/server/lib/totp.ts`
- `apps/meteor/client/views/admin/users/hooks/useResetTOTPAction.tsx`
- `apps/meteor/client/views/account/security/TwoFactorTOTP.tsx`
- `apps/meteor/client/meteor/overrides/totpOnCall.ts`
- `apps/meteor/client/components/TwoFactorModal/TwoFactorTotpModal.tsx`
- `apps/meteor/app/2fa/server/functions/resetTOTP.ts`
- `apps/meteor/app/2fa/server/code/TOTPCheck.ts`
- `packages/models/src/models/Users.ts`
- `apps/meteor/client/lib/2fa/utils.ts`
