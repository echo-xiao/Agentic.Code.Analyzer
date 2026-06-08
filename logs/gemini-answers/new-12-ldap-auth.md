# How does LDAP authentication work in Rocket.Chat?

## Gemini Answer

LDAP authentication in Rocket.Chat follows this process:

**Call Chain:**

1.  **Entry Point:** When a user attempts to log in using a `Meteor.loginWith*()` method, the request is handled by `Accounts.registerLoginHandler`.
2.  **LDAP Handler Registration:** The `configureLDAP()` function (located in `apps/meteor/server/configuration/ldap.ts`) registers a specific handler for 'ldap' logins with `Accounts.registerLoginHandler('ldap', fn)`.
3.  **LDAP Login Request:** If the login request includes an `ldap` flag, the registered handler dispatches the request to `LDAP.loginRequest(username, password)` via a core-services proxy.
4.  **LDAP Service Invocation:** This call is then handled by `LDAPService.loginRequest()` (located in `apps/meteor/server/services/ldap/service.ts`).
5.  **LDAP Manager Login:** `LDAPService.loginRequest()`, in turn, calls `LDAPManager.login()` (located in `apps/meteor/server/lib/ldap/Manager.ts`).
6.  **LDAP Connection and Authentication:**
    *   `LDAPManager.login()` creates an `LDAPConnection` (defined in `apps/meteor/server/lib/ldap/Connection.ts`).
    *   It then connects to the LDAP server using `ldap.connect()`.
    *   The user is searched by their username via `ldap.searchByUsername()`.
    *   Authentication is performed using `ldap.authenticate(dn, password)`.
    *   Group filters are checked.
    *   The user is either found or created in MongoDB.
    *   The user's avatar is synced.
    *   Finally, `LDAPManager.login()` returns `{userId}` upon successful authentication.

**Fallback Mechanism:**

*   If LDAP authentication fails and the `LDAP_Login_Fallback` setting is enabled, Rocket.Chat falls back to other registered login handlers via `Accounts._runLoginHandlers()` to attempt default password authentication.
*   A `beforeValidateLogin` callback prevents password logins for users primarily authenticated via LDAP, unless the fallback option is specifically enabled.

**Key Files Involved:**

*   `apps/meteor/server/configuration/ldap.ts`: Contains `configureLDAP()` which registers the LDAP login handler.
*   `apps/meteor/server/services/ldap/service.ts`: Implements `LDAPService.loginRequest()`.
*   `apps/meteor/server/lib/ldap/Manager.ts`: Contains `LDAPManager.login()` which orchestrates the LDAP connection, search, and authentication.
*   `apps/meteor/server/lib/ldap/Connection.ts`: Handles the actual LDAP connection and operations.
*   `packages/core-services/src/index.ts`: Defines the `LDAP` symbol, likely for proxying LDAP service calls.

## Tool Calls (8 calls, 31,872 tokens)

**Step 1:** `search({"query":"LDAP authentication","layer":"server"})` → 16 tokens
**Step 2:** `search({"query":"LDAP","layer":"server"})` → 588 tokens
**Step 3:** `graph({"layer":"server","direction":"down","query":"LDAPService.loginRequest"})` → 16 tokens
**Step 4:** `search({"layer":"server","query":"LDAPService"})` → 287 tokens
**Step 5:** `graph({"direction":"down","query":"LDAPService.loginRequest","layer":"server"})` → 16 tokens
**Step 6:** `search({"layer":"server","query":"configureLDAP"})` → 262 tokens
**Step 7:** `graph({"query":"configureLDAP","direction":"down","layer":"server"})` → 1234 tokens
**Step 8:** `graph({"layer":"server","direction":"down","query":"LDAPManager.login"})` → 14 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 6/6 |
| Symbols hit | 4/4 |
| Tool calls | 8 |
| Total tokens | 31,872 |
| Pass | YES |
