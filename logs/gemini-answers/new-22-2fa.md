# How does two-factor authentication (2FA) work in Rocket.Chat?

## Gemini Answer

Two-factor authentication (2FA) in Rocket.Chat works by acting as a middleware wrapper, `twoFactorRequired`, applied to sensitive methods and endpoints.

Here's the architectural flow:

**Entry → `twoFactorRequired` (apps/meteor/app/2fa/server/twoFactorRequired.ts) → `checkCodeForUser` (apps/meteor/app/2fa/server/code/index.ts)**

1.  **`twoFactorRequired`** (apps/meteor/app/2fa/server/twoFactorRequired.ts) is the initial entry point, serving as a middleware.
2.  It then calls `checkCodeForUser` (apps/meteor/app/2fa/server/code/index.ts) to handle the actual 2FA verification.
3.  **`checkCodeForUser`** (apps/meteor/app/2fa/server/code/index.ts) is responsible for:
    *   Retrieving the user attempting to authenticate.
    *   Checking for 2FA code and method in HTTP headers if not provided otherwise.
    *   Determining if the user is already authorized for a token (e.g., "remember me" functionality).
    *   Calling `getSecondFactorMethod` to identify the appropriate 2FA method.
4.  **`getSecondFactorMethod`** (apps/meteor/app/2fa/server/code/index.ts) then:
    *   Checks if a specific method name is provided and active.
    *   If not, it iterates through all available 2FA methods (`checkMethods`) and returns the first one that is enabled for the user using `getMethodByNameOrFirstActiveForUser` (apps/meteor/app/2fa/server/code/index.ts).
    *   This function (`getMethodByNameOrFirstActiveForUser`) iterates through registered 2FA check methods (like `TOTPCheck`, `EmailCheck`, `PasswordCheckFallback`) and returns the first enabled one.
5.  Once a method is selected, `checkCodeForUser` (apps/meteor/app/2fa/server/code/index.ts) calls the `verify` method of the selected 2FA method.
6.  For **TOTP (Time-based One-Time Password)**, the flow is:
    *   **`TOTPCheck.verify`** (apps/meteor/app/2fa/server/code/TOTPCheck.ts) is invoked.
    *   This method checks if TOTP is enabled for the user and if a secret exists.
    *   Finally, it calls **`TOTP.verify`** (likely located in a `TOTP` utility module, as suggested by `apps/meteor/app/2fa/server/code/TOTPCheck.ts`) to perform the actual verification of the provided TOTP code against the user's secret, also considering backup tokens.

In summary, the 2FA process is a server-side middleware that selects an active verification method (TOTP, Email, or Password Fallback) and then delegates the code validation to that specific method's `verify` function.

## Tool Calls (8 calls, 49,012 tokens)

**Step 1:** `search({"query":"twoFactor"})` → 473 tokens
**Step 2:** `graph({"direction":"down","layer":"server","query":"twoFactorRequired"})` → 1094 tokens
**Step 3:** `implement({"symbolName":"checkCodeForUser","filename":"apps/meteor/app/2fa/server/index.ts"})` → 547 tokens
**Step 4:** `graph({"query":"getSecondFactorMethod","direction":"down","layer":"server"})` → 599 tokens
**Step 5:** `implement({"symbolName":"getMethodByNameOrFirstActiveForUser","filename":"apps/meteor/app/2fa/server/code/inde)` → 122 tokens
**Step 6:** `search({"layer":"server","query":"TOTPCheck"})` → 174 tokens
**Step 7:** `implement({"symbolName":"TOTPCheck.verify","filename":"apps/meteor/app/2fa/server/code/TOTPCheck.ts"})` → 131 tokens
**Step 8:** `search({"query":"TOTP.verify"})` → 147 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 4/4 |
| Tool calls | 8 |
| Total tokens | 49,012 |
| Pass | NO |
