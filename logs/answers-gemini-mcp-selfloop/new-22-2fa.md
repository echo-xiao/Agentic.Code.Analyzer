# How does two-factor authentication (2FA) work in Rocket.Chat?

## Gemini Answer

Two-factor authentication (2FA) in Rocket.Chat is implemented through a middleware wrapper `twoFactorRequired` in `apps/meteor/app/2fa/server/twoFactorRequired.ts`. This middleware is applied to sensitive methods and endpoints to enforce 2FA verification.

The core of the 2FA process resides in the `checkCodeForUser` function, located in `apps/meteor/app/2fa/server/code/index.ts`. This function orchestrates the verification process by attempting different 2FA methods in a predefined order.

Here's the detailed call chain for 2FA verification:

Entry → `twoFactorRequired` (apps/meteor/app/2fa/server/twoFactorRequired.ts) → `checkCodeForUser` (apps/meteor/app/2fa/server/code/index.ts)

Inside `checkCodeForUser`:

1.  It first checks if 2FA is generally enabled via the `Accounts_TwoFactorAuthentication_Enabled` setting.
2.  It retrieves the user for whom 2FA is being checked.
3.  It checks for 2FA codes and methods in the request headers (`x-2fa-code` and `x-2fa-method`).
4.  It determines the `selectedMethod` for 2FA from available methods. This selection prioritizes methods like TOTP (authenticator app) and Email.
5.  If no code is provided, it throws an error indicating that 2FA is required, along with the expected method and available methods.
6.  It calls the `verify` method of the `selectedMethod` to validate the provided code.

The specific 2FA verification methods, such as TOTP and Email, implement the `ICodeCheck` interface (defined in `apps/meteor/app/2fa/server/code/ICodeCheck.ts`). Each method provides its own `verify` and `isEnabled` implementations.

For example:

*   **TOTPCheck**:
    *   File: `apps/meteor/app/2fa/server/code/TOTPCheck.ts`
    *   Its `verify` method (which was not fully retrievable due to tool limits but is known to be part of the ICodeCheck interface) handles the validation of time-based one-time passwords, commonly used with authenticator apps.
*   **EmailCheck**:
    *   File: `apps/meteor/app/2fa/server/code/EmailCheck.ts`
    *   Its `verify` method (also part of the ICodeCheck interface) handles the verification of codes sent via email.

If the verification fails, `checkCodeForUser` will throw an error, potentially indicating too many failed attempts if a rate limit is reached. If successful, and the "remember me" option is not disabled, it will call `rememberAuthorization` to store authorization for the connection.

## Tool Calls (9 calls, 33,732 tokens)

**Step 1:** `search({"query":"two factor authentication"})` → 138 tokens
**Step 2:** `search({"query":"TwoFactor","layer":"server"})` → 203 tokens
**Step 3:** `graph({"layer":"server","query":"twoFactorRequired","direction":"down"})` → 1094 tokens
**Step 4:** `implement({"filename":"apps/meteor/app/2fa/server/index.ts","symbolName":"checkCodeForUser"})` → 547 tokens
**Step 5:** `implement({"filename":"apps/meteor/app/2fa/server/index.ts","symbolName":"verify"})` → 97 tokens
**Step 6:** `search({"query":"ICodeCheck","layer":"server"})` → 58 tokens
**Step 7:** `graph({"layer":"server","direction":"up","query":"ICodeCheck.verify"})` → 14 tokens
**Step 8:** `search({"layer":"server","query":"TOTPCheck"})` → 174 tokens
**Step 9:** `search({"layer":"server","query":"EmailCheck"})` → 175 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 5/6 |
| Symbols hit | 4/4 |
| Tool calls | 9 |
| Total tokens | 33,732 |
| Pass | YES |
