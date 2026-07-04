# How does two-factor authentication (2FA) work in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

Rocket.Chat implements two-factor authentication (2FA) to enhance user account security, supporting both Time-based One-Time Password (TOTP) and email-based authentication methods.

Here's a breakdown of how 2FA works:

**1. 2FA Methods:**

*   **TOTP (Time-based One-Time Password):**
    *   Users initiate TOTP setup via the client, which calls the `2fa:enable` method. This generates a secret and a QR code URL.
    *   The client then validates a temporary token using the `2fa:validateTempToken` method, which verifies the code, enables TOTP, and generates backup codes.
    *   During login or sensitive actions, the system verifies the TOTP code using the `checkCodeForUser` function.
*   **Email-based 2FA:**
    *   When email 2FA is required, the system sends a code to the user's verified email via the `users.2fa.sendEmailCode` API endpoint.
    *   The `EmailCheck` class handles the generation and sending of these codes.
    *   The user enters the code, which is then verified by the `EmailCheck.verify` method.

**2. 2FA Enforcement and Flow:**

*   The `checkCodeForUser` function, located in `apps/meteor/app/2fa/server/code/index.ts`, is central to the 2FA process. It determines which 2FA method is active for a user and validates the provided code.
    *   **File:** `apps/meteor/app/2fa/server/code/index.ts` (for `checkCodeForUser`)
*   If no code is provided when 2FA is required, a `totp-required` error is thrown, prompting the user for the code.
*   For API calls, the `ApiClass.processTwoFactor` method intercepts requests and checks for 2FA headers (`x-2fa-code`, `x-2fa-method`). If 2FA is required for a route, it calls `checkCodeForUser` to validate the provided code.
*   During the login process, the `overrideLoginMethod` function intercepts the standard login flow. If a `totp-required` error is encountered, it triggers a modal to prompt the user for their 2FA code. The `process2faAsyncReturn` function handles the display of the 2FA modal and the validation of the entered code.

**3. Key Components and Files:**

*   **`checkCodeForUser` function:**
    *   **Role:** Central function for validating 2FA codes (both TOTP and email). It determines the active 2FA method and calls the appropriate verification logic.
    *   **File:** `apps/meteor/app/2fa/server/code/index.ts`
*   **`EmailCheck` class:**
    *   **Role:** Handles the specifics of email-based 2FA, including sending email codes and verifying them.
    *   **File:** `apps/meteor/app/2fa/server/code/EmailCheck.ts`
    *   **Methods:** `isEnabled`, `sendEmailCode`, `verify`, `processInvalidCode`, `maxFaildedAttemtpsReached`.

**4. Configuration:**

Administrators can configure various 2FA settings, including:

*   `Accounts_TwoFactorAuthentication_Enabled`: Global toggle for 2FA.
*   `Accounts_TwoFactorAuthentication_By_TOTP_Enabled`: Enables/disables TOTP.
*   `Accounts_TwoFactorAuthentication_By_Email_Enabled`: Enables/disables email 2FA.
*   `Accounts_TwoFactorAuthentication_By_Email_Auto_Opt_In`: Automatically enables email 2FA for new users.
*   `Accounts_TwoFactorAuthentication_By_Email_Code_Expiration`: Sets the expiration time for email codes.
*   `Accounts_TwoFactorAuthentication_Max_Invalid_Email_Code_Attempts`: Defines the maximum invalid email OTP attempts before a new code is generated.
*   `Accounts_TwoFactorAuthentication_RememberFor`: Specifies how long 2FA authorization is remembered.

## Tool Calls (5 calls, 19,493 tokens)

**Step 1:** `wiki({"question":"How does two-factor authentication (2FA) work in Rocket.Chat?"})` → 1113 tokens
**Step 2:** `search({"query":"checkCodeForUser"})` → 69 tokens
**Step 3:** `details({"symbolName":"checkCodeForUser","filename":"index.ts"})` → 541 tokens
**Step 4:** `search({"query":"EmailCheck"})` → 68 tokens
**Step 5:** `details({"filename":"EmailCheck.ts","symbolName":"EmailCheck"})` → 262 tokens

## Files Seen In Tool Results (2)

- `apps/meteor/app/2fa/server/code/index.ts`
- `apps/meteor/app/2fa/server/code/EmailCheck.ts`
