# How does two-factor authentication (2FA) work in Rocket.Chat?

## Gemini Answer

Two-factor authentication (2FA) in Rocket.Chat is an orchestrated process that validates a user's identity using a second factor, such as a Time-based One-Time Password (TOTP) from an authenticator app.

The process begins when a user performs a sensitive action that requires 2FA. A central function, `checkCodeForUser`, manages the verification by coordinating between different possible 2FA methods.

### Call Chain

`Entry (Sensitive Action) → checkCodeForUser → TOTPCheck.verify → TOTP.verify`

### Step-by-Step Breakdown

1.  **Orchestration (`checkCodeForUser`)**
    *   **File**: `apps/meteor/app/2fa/server/code/index.ts`
    *   The `checkCodeForUser` function is the main entry point for 2FA validation. It first checks if 2FA is enabled globally. It retrieves the user and determines the appropriate 2FA method to use (e.g., TOTP, email). If no code is provided, it throws an error indicating that 2FA is required. If a code is provided, it calls the `verify` method on the selected checker class.

2.  **TOTP Provider (`TOTPCheck.verify`)**
    *   **File**: `apps/meteor/app/2fa/server/code/TOTPCheck.ts`
    *   This class implements the verification logic specifically for TOTP (authenticator apps). The `verify` method first confirms that the user has TOTP enabled and a secret key stored in their profile (`user.services.totp.secret`). It then passes the user's secret, the provided code, and any backup tokens to the core TOTP library for validation.

3.  **Core Validation (`TOTP.verify`)**
    *   **File**: `apps/meteor/app/2fa/server/lib/totp.ts`
    *   The `TOTP.verify` function performs the final cryptographic check. It validates the provided token against the user's stored secret, accounting for time-based code generation (as per RFC 6238). It also checks against the user's single-use backup codes. If the code is valid, it returns `true`, confirming the user's identity. Otherwise, it returns `false`, and the `checkCodeForUser` function handles the failure, tracking failed attempts to prevent brute-force attacks.

## Tool Calls (8 calls, 35,143 tokens)

**Step 1:** `search({"query":"2fa totp login"})` → 15 tokens
**Step 2:** `search({"layer":"server","query":"totp"})` → 221 tokens
**Step 3:** `graph({"direction":"down","query":"TOTPCheck"})` → 153 tokens
**Step 4:** `graph({"query":"TOTPCheck","direction":"up"})` → 162 tokens
**Step 5:** `search({"query":"checkCodeForUser"})` → 178 tokens
**Step 6:** `graph({"direction":"down","query":"checkCodeForUser"})` → 1280 tokens
**Step 7:** `implement({"symbolName":"checkCodeForUser","filename":"apps/meteor/app/2fa/server/code/index.ts"})` → 547 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/2fa/server/code/TOTPCheck.ts","symbolName":"TOTPCheck.verify"})` → 131 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 4/4 |
| Tool calls | 8 |
| Total tokens | 35,143 |
| Pass | NO |
