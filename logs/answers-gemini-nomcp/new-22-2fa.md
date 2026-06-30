# How does two-factor authentication (2FA) work in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat implements two-factor authentication (2FA) to add an extra layer of security to user accounts. It primarily supports two types of 2FA: **Time-based One-Time Password (TOTP)**, compatible with apps like Google Authenticator or Authy, and **Email-based 2FA**. Additionally, it provides **recovery codes** for emergency access.

Here's a breakdown of how 2FA works in Rocket.Chat:

---

### 1. General 2FA Flow (Enabling and Logging In)

**Enabling 2FA:**
1.  A user navigates to their profile settings and chooses to enable 2FA.
2.  Rocket.Chat generates a secret key (for TOTP) or activates email-based 2FA.
3.  The user is prompted to verify the setup (e.g., by entering a TOTP code from their authenticator app or an email code).
4.  Once verified, 2FA is enabled for their account, and recovery codes are typically generated.

**Logging In with 2FA Enabled:**
1.  The user enters their username/email and password.
2.  Rocket.Chat verifies the primary credentials.
3.  If successful and 2FA is enabled for the user, Rocket.Chat prompts for the second factor (TOTP code, email code, or a recovery code).
4.  The user enters the code.
5.  Rocket.Chat validates the second factor. If valid, the user is logged in.

---

### 2. Time-based One-Time Password (TOTP)

This is the most common form of 2FA, using apps like Google Authenticator, Authy, or Microsoft Authenticator.

**Key Components & Files:**

*   **Server Settings**:
    *   `TwoFactor_Enable` and `TwoFactor_Enable_TOTP` are administrator settings to enable/disable 2FA globally and specifically TOTP. These are managed via the admin panel, backed by `app/settings/server/settings.ts` and `app/2fa/server/settings.ts`.
*   **User Interface**:
    *   Client-side components for enabling 2FA are typically found in `client/views/account/security/twoFactorAuth/`.
*   **Enabling TOTP**:
    1.  When a user initiates TOTP setup, the server generates a cryptographically secure random secret key.
    2.  This secret is temporarily stored and presented to the user, often as a QR code (generated client-side from the secret) for easy scanning by authenticator apps.
    3.  The user is asked to enter a code from their authenticator app to verify the setup.
    4.  The server-side method `Meteor.methods({ '2fa:validateAndSave' })` (defined in `app/2fa/server/methods/validateAndSave.ts`) is called with the generated secret and the user-provided code.
    5.  It uses a library like `speakeasy` (or similar, details might evolve) to validate the code against the secret.
    6.  If valid, the secret is hashed and stored in the user's document in the `users` collection: `services.twoFactor.enabled: true`, `services.twoFactor.secret: <hashed_secret>`, and `services.twoFactor.codes: [...]` (for recovery codes).
*   **Logging in with TOTP**:
    1.  After a successful password login, Rocket.Chat checks if `user.services.twoFactor.enabled` is `true`.
    2.  If so, the login flow is paused, and the client is prompted for a 2FA code.
    3.  The user enters the TOTP code from their authenticator app.
    4.  The client sends this code to the server via `Meteor.methods({ '2fa:check' })` (defined in `app/2fa/server/methods/check.ts`).
    5.  The core logic for checking TOTP codes resides in `app/2fa/server/lib/check.ts` and `app/2fa/server/lib/Utils.ts`. It retrieves the stored (hashed) secret for the user, uses the same TOTP library to verify the provided code against the secret within an acceptable time window.
    6.  If the code is valid, the login process completes.

---

### 3. Email-based 2FA

This method sends a one-time code to the user's registered email address.

**Key Components & Files:**

*   **Server Settings**:
    *   `TwoFactor_Enable_Email` is an administrator setting to enable/disable email 2FA.
*   **Enabling Email 2FA**:
    1.  The user enables email 2FA in their profile settings.
    2.  This sets `services.twoFactor.enabled: true` and `services.twoFactor.email: true` in their user document. The method involved is likely `Meteor.methods({ '2fa:enableEmailCode' })` in `app/2fa/server/methods/enableEmailCode.ts`.
*   **Logging in with Email 2FA**:
    1.  After a successful password login, if `user.services.twoFactor.enabled` and `user.services.twoFactor.email` are `true`, the login flow is paused.
    2.  The client prompts for an email 2FA code.
    3.  The user requests to send the code (e.g., by clicking a button). This triggers `Meteor.methods({ '2fa:sendEmailCode' })` (defined in `app/2fa/server/methods/sendEmailCode.ts`).
    4.  This method generates a random numeric code, temporarily stores it in the user's document (e.g., `services.emailCode.code`, `services.emailCode.expire`) and sends it to the user's registered email address. The email sending logic relies on Rocket.Chat's mailer system.
    5.  The user enters the received code.
    6.  The client sends this code via `Meteor.methods({ '2fa:check' })`.
    7.  The server-side `app/2fa/server/lib/check.ts` verifies the provided code against the temporarily stored code for that user, ensuring it hasn't expired.
    8.  If valid, the login process completes, and the temporary email code is cleared.

---

### 4. Recovery Codes

Recovery codes are single-use codes provided when 2FA is set up, intended for use if the user loses access to their primary 2FA method.

**Key Components & Files:**

*   **Generation**:
    1.  When a user enables any 2FA method, they are typically prompted to generate and save recovery codes.
    2.  This process involves `Meteor.methods({ '2fa:generateRecoveryCodes' })` (defined in `app/2fa/server/methods/generateRecoveryCodes.ts`).
    3.  This method generates a set of unique, random codes, hashes them, and stores them in the user's document as `services.twoFactor.recoveryCodes: [...]`.
*   **Usage**:
    1.  During the 2FA prompt at login, the user can choose to enter a recovery code instead of a TOTP or email code.
    2.  The code is sent via `Meteor.methods({ '2fa:check' })`.
    3.  The `app/2fa/server/lib/check.ts` logic checks if the provided code matches any of the hashed recovery codes stored for the user.
    4.  If a match is found, the specific recovery code is marked as used (or removed from the list) to prevent reuse, and the login proceeds.

---

### 5. Database Schema (`users` collection)

The `users` collection stores 2FA-related information within the `services` field:

```javascript
{
  "_id": "userId",
  "username": "...",
  "emails": [...],
  "services": {
    "password": { ... },
    // TOTP and Email 2FA details
    "twoFactor": {
      "enabled": true, // Boolean: Is 2FA enabled for this user?
      "secret": "hashed_totp_secret", // String: Hashed TOTP secret for TOTP-based 2FA
      "email": true, // Boolean: Is email 2FA enabled?
      "codes": [ // Array of strings: Hashed recovery codes
        "hashed_recovery_code_1",
        "hashed_recovery_code_2",
        // ...
      ]
    },
    // Temporary storage for email 2FA code during login
    "emailCode": {
      "code": "123456", // String: The current email 2FA code (cleared after use/expiry)
      "expire": "ISODate(...)" // Date: When the email code expires
    },
    // ... other services like google, github, etc.
  }
}
```

This comprehensive approach ensures strong authentication by leveraging standard 2FA methods and providing robust recovery options.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,359 |
| Model | gemini-2.5-flash |
| Tools | NONE |
