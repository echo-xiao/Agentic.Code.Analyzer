# How does LDAP authentication work in Rocket.Chat?

## Gemini Answer

LDAP authentication in Rocket.Chat follows this process:

1.  **Entry Point:** When a user attempts to log in using an LDAP account, the `Meteor.loginWith*()` method is called, which dispatches to registered login handlers.
2.  **Handler Registration:** The `configureLDAP()` function, located in `apps/meteor/server/configuration/ldap.ts`, registers a handler with `Accounts.registerLoginHandler('ldap', fn)`. This handler is responsible for processing LDAP login requests.
3.  **Login Request Processing:**
    *   The registered handler checks for an `ldap` flag in the login request.
    *   It then calls `LDAP.loginRequest(username, password)`. This `LDAP` symbol, found in `packages/core-services/src/index.ts`, acts as a proxy.
    *   The proxy forwards the request to `LDAPService.loginRequest()` in `apps/meteor/server/services/ldap/service.ts`.
4.  **LDAP Service Authentication:**
    *   Inside `LDAPService.loginRequest()`, the authentication logic is handled by `LDAPManager.login()`.
    *   `LDAPManager.login()` creates an `LDAPConnection`, connects to the LDAP server, searches for the user by username, and then authenticates the user with their distinguished name (DN) and password.
    *   It also checks for group filters.
    *   Upon successful authentication, the user is found or created in MongoDB, and their avatar is synced.
    *   The method returns a `{userId}`.
5.  **Login Fallback:**
    *   If LDAP authentication fails and the `LDAP_Login_Fallback` setting is enabled, `Accounts._runLoginHandlers()` is called, allowing the system to attempt authentication using the default password method.
6.  **Password Login Prevention:**
    *   The `configureLDAP()` function also sets up a `beforeValidateLogin` callback (`validateLdapLoginFallback`).
    *   This callback prevents password logins for users who have an LDAP ID in their services, unless the `LDAP_Login_Fallback` setting is explicitly enabled.

**Call Chain:**

`Meteor.loginWith*()` → `configureLDAP()` (in `apps/meteor/server/configuration/ldap.ts`) → `Accounts.registerLoginHandler()` → `LDAP.loginRequest()` (in `packages/core-services/src/index.ts`) → `LDAPService.loginRequest()` (in `apps/meteor/server/services/ldap/service.ts`) → `LDAPManager.login()` (in `apps/meteor/server/lib/ldap/Manager.ts`) → `LDAPConnection.connect()` (in `apps/meteor/server/lib/ldap/Connection.ts`) → `LDAPConnection.searchByUsername()` → `LDAPConnection.authenticate()` → MongoDB user operations.

## Tool Calls (8 calls, 48,578 tokens)

**Step 1:** `search({"layer":"server","query":"LDAP"})` → 588 tokens
**Step 2:** `graph({"query":"configureLDAP","direction":"down","layer":"server"})` → 1234 tokens
**Step 3:** `implement({"filename":"apps/meteor/server/configuration/ldap.ts","symbolName":"configureLDAP"})` → 369 tokens
**Step 4:** `graph({"direction":"down","layer":"server","query":"LDAPService.loginRequest"})` → 16 tokens
**Step 5:** `implement({"symbolName":"LDAP.loginRequest","filename":"packages/core-services/src/index.ts"})` → 44 tokens
**Step 6:** `graph({"layer":"server","direction":"down","query":"loginRequest","filename":"apps/meteor/server/services/)` → 723 tokens
**Step 7:** `implement({"filename":"apps/meteor/server/services/ldap/service.ts","symbolName":"loginRequest"})` → 55 tokens
**Step 8:** `implement({"filename":"apps/meteor/server/services/ldap/service.ts","symbolName":"LDAPService"})` → 201 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 4/6 |
| Symbols hit | 4/4 |
| Tool calls | 8 |
| Total tokens | 48,578 |
| Pass | YES |
