# How does LDAP authentication work in Rocket.Chat?

## Gemini Answer

LDAP authentication in Rocket.Chat follows this flow:

1.  **Configuration and Handler Registration:** The `configureLDAP()` function, likely found in `apps/meteor/server/settings/ldap.ts`, registers a login handler with `Accounts.registerLoginHandler('ldap', fn)`. This function is responsible for handling LDAP login requests.

2.  **Login Request:** When a user attempts to log in, the system checks for an LDAP flag in the login request. If present, it dispatches the request to the registered LDAP handler.

3.  **Core Services Proxy:** The LDAP handler calls `LDAP.loginRequest(username, password)` via a core-services proxy. While the exact file for `LDAP.loginRequest` wasn't found, the architecture description indicates it's part of the core services.

4.  **LDAP Service:** The `LDAPService.loginRequest()` function, located in `apps/meteor/server/services/ldap/service.ts`, is then invoked.

5.  **LDAP Manager:** `LDAPService.loginRequest()` calls `LDAPManager.login()`. The `LDAPManager` class, defined in `apps/meteor/server/lib/ldap/Manager.ts`, is central to the LDAP authentication process.

6.  **LDAPManager.login()**: This method performs the following steps:
    *   Creates an `LDAPConnection`.
    *   Connects to the LDAP server using `ldap.connect()`.
    *   Searches for the user by username using `ldap.searchByUsername()`.
    *   Authenticates the user with the provided password using `ldap.authenticate(dn, password)`.
    *   Checks for group filters if configured.
    *   Finds or creates the user in MongoDB.
    *   Syncs the user's avatar.
    *   Returns a `{userId}` upon successful authentication.

7.  **Fallback Mechanism:** If LDAP authentication fails and the `LDAP_Login_Fallback` setting is enabled, Rocket.Chat will attempt to authenticate the user using default password authentication by calling `Accounts._runLoginHandlers()`.

8.  **Login Validation Callback:** A `beforeValidateLogin` callback prevents password logins for LDAP users unless the fallback mechanism is explicitly enabled.

**Key Files:**

*   **`apps/meteor/server/settings/ldap.ts`**: Likely contains the `configureLDAP()` function, which registers the LDAP login handler.
*   **`apps/meteor/server/services/ldap/service.ts`**: Contains `LDAPService.loginRequest()`, which acts as an intermediary to the `LDAPManager`.
*   **`apps/meteor/server/lib/ldap/Manager.ts`**: Defines the `LDAPManager` class, which orchestrates the core LDAP authentication logic, including connecting to the LDAP server, searching for users, authenticating, and syncing user data with MongoDB.
*   **`packages/core-services/src/index.ts`**: This file is listed as a symbol for "LDAP" and likely contains the proxy for `LDAP.loginRequest()`.

## Tool Calls (8 calls, 23,114 tokens)

**Step 1:** `plan({"question":"How does LDAP authentication work in Rocket.Chat?","intent":"call-chain"})` → 81 tokens
**Step 2:** `search({"layer":"server","query":"LDAP authentication login"})` → 28 tokens
**Step 3:** `search({"layer":"server","query":"LDAP"})` → 620 tokens
**Step 4:** `graph({"depth":5,"move":"down","file":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/server/lib/ld)` → 14 tokens
**Step 5:** `details({"filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/server/lib/ldap/Manager.ts","symb)` → 965 tokens
**Step 6:** `graph({"depth":5,"file":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/server/lib/ldap/Manager.ts")` → 14 tokens
**Step 7:** `search({"layer":"server","query":"LDAPService.loginRequest"})` → 28 tokens
**Step 8:** `search({"layer":"packages","query":"LDAP.loginRequest"})` → 26 tokens

## Files Seen In Tool Results (17)

- `packages/core-services/src/index.ts`
- `apps/meteor/tests/end-to-end/api/LDAP.ts`
- `apps/meteor/server/settings/ldap.ts`
- `apps/meteor/server/services/ldap/service.ts`
- `apps/meteor/server/lib/ldap/processLdapVariables.ts`
- `apps/meteor/server/lib/ldap/ldapKeyExists.ts`
- `apps/meteor/server/lib/ldap/getLdapString.ts`
- `apps/meteor/server/lib/ldap/getLdapDynamicValue.ts`
- `apps/meteor/server/lib/ldap/getLDAPConditionalSetting.ts`
- `apps/meteor/server/lib/ldap/UserConverter.ts`
- `apps/meteor/server/lib/ldap/Manager.ts`
- `apps/meteor/server/lib/ldap/Logger.ts`
- `apps/meteor/server/lib/ldap/Connection.ts`
- `apps/meteor/server/lib/ldap/operations/substring.ts`
- `apps/meteor/server/lib/ldap/operations/split.ts`
- `apps/meteor/server/lib/ldap/operations/replace.ts`
- `apps/meteor/server/lib/ldap/operations/match.ts`
