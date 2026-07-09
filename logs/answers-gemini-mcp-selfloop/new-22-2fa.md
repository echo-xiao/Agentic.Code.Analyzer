# How does two-factor authentication (2FA) work in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

Rocket.Chat implements two-factor authentication (2FA) through two primary methods: Time-based One-Time Password (TOTP) and email-based codes.

**General Flow:**
When 2FA is enabled, it integrates into the login process. The `overrideLoginMethod` function intercepts login attempts and checks if 2FA is required. If so, the `process2faReturn` function handles the 2FA challenge, determining the required method (TOTP, email, or password fallback) and displaying the appropriate modal to the user. Server-side, the `checkCodeForUser` function verifies the provided 2FA code.

**2FA Methods:**

1.  **TOTP (Time-based One-Time Password):**
    *   **Enabling:** Users enable TOTP using authenticator apps. The `2fa:enable` method generates a secret key and QR code.
    *   **Validating:** To finalize setup, users provide a code from their app. The `2fa:validateTempToken` method verifies this code, promoting the temporary secret to permanent and generating backup codes.
    *   **Disabling:** Users disable TOTP by providing a valid TOTP code, which the `2fa:disable` method verifies.

2.  **Email-based 2FA:**
    *   **Enabling:** The `users.2fa.enableEmail` API endpoint allows users to enable email 2FA, requiring a verified email address.
    *   **Disabling:** The `users.2fa.disableEmail` API endpoint is used to disable email 2FA.
    *   **Sending Code:** The `users.2fa.sendEmailCode` API endpoint sends a 2FA code to the user's email, with the `EmailCheck` class handling the sending logic.

**UI Components:**
On the client-side, the `AccountSecurityPage.tsx` component manages 2FA settings, rendering `TwoFactorTOTP` and `TwoFactorEmail` components. Modals like `TwoFactorEmailModal` and `TwoFactorTotpModal` prompt users for codes during login or setup.

**Key Files and Components:**

*   **Server-side logic:**
    *   `overrideLoginMethod` (function for login interception)
    *   `process2faReturn` (function for handling 2FA challenge)
    *   `checkCodeForUser` (function for verifying 2FA codes)
    *   `2fa:enable` (method for enabling TOTP)
    *   `2fa:validateTempToken` (method for validating temporary TOTP token)
    *   `2fa:disable` (method for disabling TOTP)
    *   `users.2fa.enableEmail` (API endpoint for enabling email 2FA)
    *   `users.2fa.disableEmail` (API endpoint for disabling email 2FA)
    *   `users.2fa.sendEmailCode` (API endpoint for sending email 2FA code)
    *   `EmailCheck` (class handling email sending logic)
*   **Client-side UI:**
    *   `client/views/account/security/AccountSecurityPage.tsx` (User interface for managing 2FA settings)
    *   `TwoFactorTOTP` (Component for TOTP settings)
    *   `TwoFactorEmail` (Component for email 2FA settings)
    *   `TwoFactorEmailModal` (Modal for email 2FA code input)
    *   `TwoFactorTotpModal` (Modal for TOTP code input)

## Tool Calls (1 calls, 3,970 tokens)

**Step 1:** `wiki({"question":"How does two-factor authentication (2FA) work in Rocket.Chat?"})` → 1195 tokens

## Files Seen In Tool Results (0)

_(none)_
