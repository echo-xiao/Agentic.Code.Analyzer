# How does two-factor authentication (2FA) work in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat implements Two-Factor Authentication (2FA) to add an extra layer of security beyond just a username and password. It supports several methods, primarily TOTP (Authenticator Apps), Email OTP, and WebAuthn (security keys), along with recovery codes.

Here's a breakdown of how 2FA works in Rocket.Chat, including its architecture and key components:

## 1. Supported 2FA Methods

Rocket.Chat generally supports the following 2FA methods:

*   **TOTP (Time-based One-Time Password):** The most common method, using authenticator apps like Google Authenticator, Authy, Microsoft Authenticator, etc.
*   **Email OTP (One-Time Password):** A code is sent to the user's registered email address.
*   **WebAuthn (FIDO2 Security Keys):** Using hardware security keys (like YubiKey) or platform authenticators (fingerprint, Face ID). *Note: WebAuthn is often an Enterprise Edition feature in Rocket.Chat.*
*   **Recovery Codes:** A set of one-time-use codes provided to the user when 2FA is initially enabled, for emergency access if their primary 2FA method is unavailable.

## 2. General 2FA Flow

Regardless of the specific method, the general 2FA login flow in Rocket.Chat follows these steps:

1.  **Primary Authentication:** The user submits their username and password (or logs in via OAuth/SAML).
2.  **2FA Check:** The Rocket.Chat server checks the user's document in the database to see if 2FA is enabled for them.
3.  **2FA Prompt:** If 2FA is enabled, the server responds to the client, indicating that a second factor is required. The client (web, desktop, mobile app) then displays a UI to prompt the user for the 2FA code or interaction.
4.  **2FA Submission:** The user provides the 2FA code (from their authenticator app, email, or by interacting with their security key) to the client.
5.  **2FA Validation:** The client sends the 2FA code/response to the Rocket.Chat server. The server validates this against the user's stored 2FA configuration.
6.  **Login Completion:** If the 2FA validation is successful, the server completes the login process, issuing an authentication token to the client. If it fails, an error is returned.

## 3. Detailed Breakdown by Method

### A. TOTP (Authenticator App)

**Enabling TOTP:**

1.  **User Action:** A user navigates to their profile settings (`/account/security`) and chooses to enable "Authenticator App".
2.  **Secret Generation:** The server (specifically, a Meteor method like `2fa:totp:generate`) generates a unique, cryptographically strong secret key for the user.
3.  **QR Code Display:** This secret key, along with the user's email and the Rocket.Chat instance name, is encoded into a URI (e.g., `otpauth://totp/...`). The server then generates a QR code from this URI and sends it to the client. The manual key is also displayed.
4.  **User Setup:** The user scans the QR code with their authenticator app (or manually enters the key).
5.  **Initial Verification:** The user enters a code from their authenticator app into Rocket.Chat to verify the setup.
6.  **Server Storage & Recovery Codes:** If the verification is successful, the server stores the encrypted TOTP `secret` in the user's document (`users.services.totp.secret`) and marks TOTP as enabled. It also generates and presents **recovery codes** to the user, which are stored securely (hashed) in the user's document (`users.services.twoFactor.codes`).

**Login with TOTP:**

1.  **Initial Login:** User submits username/password via `loginWithPassword`.
2.  **Server Check:** The server's login handler (e.g., in `apps/meteor/server/methods/login.ts` or a login hook) checks if `user.services.totp.enabled` is `true`.
3.  **Prompt:** If enabled, the server responds with a flag like `totpNeeded: true`. The client displays the TOTP input field.
4.  **Code Submission:** User enters the TOTP code from their authenticator app, and the client calls a method like `loginWithTotp`.
5.  **Server Validation:** The server retrieves the stored `secret` for the user. It then uses a TOTP library (e.g., `otp-generator` or similar, potentially wrapped in `apps/meteor/app/2fa/server/totp.ts`) to verify the provided code against the secret, usually allowing for a small time-based skew (+/- 1 window).
6.  **Authentication:** If the code is valid, the user is successfully logged in.

### B. Email OTP

**Enabling Email OTP:**

1.  **User Action:** A user navigates to their profile settings (`/account/security`) and chooses to enable "Email Code".
2.  **Initial Code Generation & Email:** The server (e.g., `2fa:email:generateCode`) generates an OTP, sends it to the user's registered email, and temporarily stores it (or a hash of it).
3.  **Initial Verification:** The user enters the received email code into Rocket.Chat.
4.  **Server Storage & Recovery Codes:** If the verification is successful, the server marks `user.services.email2fa.enabled` as `true` in the user's document and generates recovery codes.

**Login with Email OTP:**

1.  **Initial Login:** User submits username/password via `loginWithPassword`.
2.  **Server Check:** The server checks if `user.services.email2fa.enabled` is `true`.
3.  **Code Generation & Email:** If enabled, the server generates a new OTP, emails it to the user, and temporarily stores this new code (e.g., with an expiry time).
4.  **Prompt:** The server responds with a flag like `emailCodeNeeded: true`. The client displays the email OTP input field.
5.  **Code Submission:** User enters the email OTP, and the client calls a method like `loginWithEmailCode`.
6.  **Server Validation:** The server retrieves the temporarily stored code and compares it with the provided code.
7.  **Authentication:** If the code is valid, the user is successfully logged in.

### C. WebAuthn (Security Keys)

*Note: WebAuthn is often an Enterprise Edition feature in Rocket.Chat (`ee/app/webauthn`).*

**Enabling WebAuthn:**

1.  **User Action:** User initiates WebAuthn setup in their security settings.
2.  **Challenge Generation:** The server generates a WebAuthn "challenge" and sends it to the client.
3.  **Client-Side WebAuthn API:** The client-side JavaScript uses the WebAuthn API (`navigator.credentials.create()`) to interact with the user's security key or platform authenticator.
4.  **Credential Creation:** The user interacts with their key (e.g., touches it, uses fingerprint). The authenticator generates a new key pair, and the public key, credential ID, and attestation data are sent back to the client.
5.  **Server Storage:** The client sends this information to the server. The server verifies the attestation and stores the public key credential in `user.services.webauthn.credentials` in the user's document. Recovery codes are also generated.

**Login with WebAuthn:**

1.  **Initial Login:** User submits username/password.
2.  **Server Check:** The server checks if `user.services.webauthn.credentials` exists.
3.  **Challenge Generation:** If enabled, the server generates a new WebAuthn "assertion challenge" and sends it to the client.
4.  **Client-Side WebAuthn API:** The client uses `navigator.credentials.get()` to interact with the user's security key.
5.  **Assertion:** The user interacts with their key, which signs the challenge. The signed assertion is sent back to the client.
6.  **Server Validation:** The client sends the assertion to the server. The server verifies the signature using the stored public key and completes the login.

### D. Recovery Codes

*   **Generation:** Recovery codes are generated and shown to the user *only once* when any 2FA method is initially enabled. They are stored as securely hashed values in the user's document (`users.services.twoFactor.codes`).
*   **Usage:** If a user loses access to their primary 2FA method, they can use one of these codes instead of a TOTP or email code.
*   **Validation:** When a recovery code is provided, the server hashes it and compares it against the stored hashes. If a match is found, that specific recovery code is marked as *used* (often by removing its hash from the array) to prevent reuse. The user is then logged in. If all recovery codes are used, the user must contact an administrator for assistance.

## 4. Key Architectural Components and File Paths

### Frontend (Client-side - React)

*   **Security Settings UI:**
    *   `apps/meteor/client/views/account/security/SecurityPage.tsx`: The main entry point for account security settings.
    *   `apps/meteor/client/views/account/security/TwoFactorAuth.tsx`: Component managing the display and interaction for 2FA setup (enable/disable, QR code display, etc.).
*   **Login Forms:**
    *   `apps/meteor/client/views/login/LoginPage.tsx`: The primary login page.
    *   `apps/meteor/client/views/login/TwoFactorTOTP.tsx`: Component for entering TOTP codes during login.
    *   `apps/meteor/client/views/login/TwoFactorEmail.tsx`: Component for entering Email OTP codes during login.
    *   `apps/meteor/client/views/login/TwoFactorWebauthn.tsx`: Component for WebAuthn interaction during login.
    *   `apps/meteor/client/views/login/TwoFactorRecovery.tsx`: Component for entering recovery codes during login.

### Backend (Server-side - Meteor/Node.js)

*   **2FA Core Logic:**
    *   `apps/meteor/app/2fa/server/`: This directory contains the main server-side logic for 2FA.
        *   `apps/meteor/app/2fa/server/totp.ts`: Logic for TOTP generation and validation.
        *   `apps/meteor/app/2fa/server/recovery.ts`: Logic for recovery code generation and validation.
        *   `apps/meteor/app/2fa/server/methods.ts`: Meteor methods related to 2FA operations (enabling, disabling, generating codes, etc.).
    *   `apps/meteor/ee/app/2fa-email-otp/server/`: (Enterprise Edition) Logic for Email OTP.
    *   `apps/meteor/ee/app/webauthn/server/`: (Enterprise Edition) Logic for WebAuthn.
*   **Login Methods:**
    *   `apps/meteor/server/methods/login.ts`: Contains `Meteor.methods` like `loginWithPassword`, which handle the initial authentication and then delegate 2FA checks.
    *   `apps/meteor/server/methods/loginWithTotp.ts`: Handles the submission and validation of TOTP codes.
    *   `apps/meteor/server/methods/loginWithEmailCode.ts`: Handles the submission and validation of Email OTP codes.
    *   `apps/meteor/server/methods/loginWithWebauthn.ts`: Handles the submission and validation of WebAuthn assertions.
    *   `apps/meteor/server/methods/loginWithRecoveryCode.ts`: Handles the submission and validation of recovery codes.
*   **User Document Structure:**
    *   `apps/meteor/app/lib/server/startup/createAdminUser.js` (example): Shows how user data is structured.
    *   The `users` collection in MongoDB stores 2FA-related data within the `services` field:
        *   `user.services.totp.enabled`: Boolean, indicates if TOTP is active.
        *   `user.services.totp.secret`: Encrypted TOTP secret key.
        *   `user.services.email2fa.enabled`: Boolean, indicates if Email OTP is active.
        *   `user.services.twoFactor.enabled`: General flag indicating *any* 2FA is enabled.
        *   `user.services.twoFactor.codes`: Array of hashed recovery codes.
        *   `user.services.webauthn.credentials`: Array of WebAuthn credentials (public keys, IDs, etc.).
*   **Server Hooks:**
    *   `apps/meteor/server/startup/hooks.ts`: Contains `Meteor.startup` code that might register login hooks or other server-side initialization relevant to 2FA.

## Conclusion

Rocket.Chat's 2FA implementation is robust, leveraging server-side cryptographic operations for TOTP and recovery codes, integrating with email services for OTP, and utilizing the WebAuthn API for security keys. The system is designed to seamlessly guide users through the setup and login process, enhancing the overall security posture of the platform.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 5,144 |
| Model | gemini-2.5-flash |
| Tools | NONE |
