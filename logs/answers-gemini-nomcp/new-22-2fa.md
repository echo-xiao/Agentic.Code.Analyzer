# How does two-factor authentication (2FA) work in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat implements Two-Factor Authentication (2FA) to add an extra layer of security to user accounts. When 2FA is enabled, users are required to provide a second verification factor (like a code from an authenticator app or an email) in addition to their password during login.

Rocket.Chat supports the following 2FA methods:

1.  **TOTP (Time-based One-Time Password)**: Uses authenticator apps like Google Authenticator, Authy, etc.
2.  **Email 2FA**: Sends a one-time code to the user's registered email address.
3.  **WebAuthn / FIDO2**: Uses hardware security keys (e.g., YubiKey) or built-in platform authenticators (e.g., Windows Hello, Touch ID).
4.  **Recovery Codes**: One-time codes generated during setup to regain access if other 2FA methods are unavailable.

Let's break down the general flow and implementation details:

### 1. Enabling 2FA (Enrollment Process)

Users enable 2FA from their account settings. The process generally involves:

*   **UI Interaction**: The user navigates to `Account Settings > Security` and chooses to enable a 2FA method.
*   **Server-side Generation**:
    *   **TOTP**: The server generates a unique secret key for the user. This key is stored securely (e.g., encrypted) in the user's database record. The secret is then displayed to the user as a QR code or a text string for them to add to their authenticator app.
        *   **Relevant files**:
            *   `app/2fa/server/methods/totp.js`: Contains methods like `2fa:totp:generateSecret` and `2fa:totp:enable`.
            *   `app/2fa/client/components/TwoFactorTOTPSetup.js`: Client-side component for TOTP setup.
    *   **Email 2FA**: The server simply marks the user's account as having Email 2FA enabled. When enabling, a verification code might be sent to confirm the email address is accessible.
        *   **Relevant files**:
            *   `app/2fa/server/methods/email.js`: Contains methods like `2fa:email:enable`.
            *   `app/2fa/client/components/TwoFactorEmailSetup.js`: Client-side component for Email 2FA setup.
    *   **WebAuthn**: The server initiates a WebAuthn registration ceremony. The browser's WebAuthn API interacts with the security key, and the public key credential is sent back to the server and stored in the user's record.
        *   **Relevant files**:
            *   `app/2fa/server/methods/webauthn.js`: Contains methods like `2fa:webauthn:register`.
            *   `app/2fa/client/components/TwoFactorWebAuthnSetup.js`: Client-side component for WebAuthn setup.
*   **Verification**: Before fully enabling, the user is typically asked to verify the setup (e.g., enter a code from their authenticator app or email) to ensure it's working correctly.
*   **Recovery Codes**: During the initial 2FA setup (especially for TOTP or WebAuthn), the server generates a set of one-time recovery codes. These are displayed to the user, who is instructed to save them in a safe place.
    *   **Relevant files**:
        *   `app/2fa/server/methods/recoveryCodes.js`: Contains methods like `2fa:recoveryCode:generate`.
        *   `app/2fa/client/components/TwoFactorRecoveryCodeSetup.js`: Client-side component for recovery code display.

### 2. Login Process with 2FA Enabled

When a user with 2FA enabled attempts to log in:

1.  **Initial Login Attempt**: The user enters their username/email and password.
    *   **Relevant file**: `app/authentication/server/methods/login.js`
2.  **Server-side Check**: The `login` method on the server verifies the username/password. If successful, it then checks the user's record (`users` collection) to see if any 2FA methods are enabled (e.g., `user.services.totp.enabled`, `user.services.email2fa.enabled`, `user.services.webauthn.credentials`).
3.  **2FA Challenge**: If 2FA is enabled, the server does *not* complete the login immediately. Instead, it returns a specific error or state to the client indicating that a 2FA challenge is required. The client-side UI then prompts the user for the 2FA code.
    *   **Relevant client files**:
        *   `app/2fa/client/components/TwoFactorLogin.js`: The main component that handles the 2FA login prompt.
        *   `app/2fa/client/views/TwoFactorTOTP.js`, `app/2fa/client/views/TwoFactorEmail.js`, `app/2fa/client/views/TwoFactorWebAuthn.js`: Specific UI for each 2FA method during login.
4.  **2FA Code Submission**: The user enters the 2FA code (from their authenticator app, email, or uses their security key).
5.  **Server-side Verification**: The client sends this 2FA code to a dedicated server method for verification.
    *   **Relevant file**: `app/authentication/server/methods/2fa.js`
    *   This method (`loginWith2fa`) takes the initial login result (which includes a temporary token) and the 2FA code.
    *   It then calls the appropriate verification logic based on the 2FA method:
        *   **TOTP**: Uses a library like `otplib` to verify the provided code against the stored secret.
            *   **Relevant file**: `app/2fa/server/methods/totp.js` (`2fa:totp:verify`)
        *   **Email 2FA**: Verifies the code sent to the user's email. The code is typically stored temporarily in the user's session or a dedicated field.
            *   **Relevant file**: `app/2fa/server/methods/email.js` (`2fa:email:verify`)
        *   **WebAuthn**: Initiates a WebAuthn assertion ceremony. The browser interacts with the security key, and the assertion result is sent to the server for cryptographic verification against the stored public key credential.
            *   **Relevant file**: `app/2fa/server/methods/webauthn.js` (`2fa:webauthn:verify`)
        *   **Recovery Code**: Checks if the provided code matches one of the stored recovery codes. If it does, the code is marked as used or removed.
            *   **Relevant file**: `app/2fa/server/methods/recoveryCodes.js` (`2fa:recoveryCode:verify`)
6.  **Login Completion**: If the 2FA code is successfully verified, the server completes the login process, generates a new authentication token, and sends it to the client.

### Key Code Locations and Structure

*   **Server-side 2FA Logic**:
    *   `app/2fa/server/methods/`: Contains the core Meteor methods for enabling, disabling, generating secrets, and verifying codes for each 2FA type (e.g., `totp.js`, `email.js`, `webauthn.js`, `recoveryCodes.js`).
    *   `app/authentication/server/methods/login.js`: The primary login method that initiates the 2FA challenge.
    *   `app/authentication/server/methods/2fa.js`: The method responsible for verifying the 2FA code after the initial password check.
    *   `app/models/server/models/Users.js`: Interacts with the `users` collection to store 2FA secrets, enabled flags, and WebAuthn credentials.
*   **Client-side 2FA UI**:
    *   `app/2fa/client/components/`: Reusable UI components for 2FA setup and login (e.g., `TwoFactorTOTPSetup.js`, `TwoFactorLogin.js`).
    *   `app/2fa/client/views/`: Specific views for each 2FA method during the login flow (e.g., `TwoFactorTOTP.js`).
*   **Libraries**: Rocket.Chat uses external libraries for cryptographic operations, such as `otplib` for TOTP generation and verification, and potentially `webauthn-json` or similar for WebAuthn interactions.

This modular approach allows Rocket.Chat to support multiple 2FA methods and integrate them seamlessly into the existing authentication flow.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,271 |
| Model | gemini-2.5-flash |
| Tools | NONE |
