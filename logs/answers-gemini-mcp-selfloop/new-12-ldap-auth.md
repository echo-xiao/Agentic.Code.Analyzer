# How does LDAP authentication work in Rocket.Chat?

## Plan

intent: call-chain

## Gemini Answer

LDAP authentication in Rocket.Chat follows this general flow:

1.  **`configureLDAP`** (apps/meteor/server/configuration/ldap.ts): This function is responsible for setting up the LDAP integration. It registers a login handler with `Accounts.registerLoginHandler('ldap', fn)`. This handler is triggered when a login request includes an LDAP flag.

2.  **`LDAPService.loginRequest`** (apps/meteor/server/services/ldap/service.ts): This service acts as a proxy, receiving the username and password from the login handler. It then calls `LDAPManager.login()` to handle the actual LDAP authentication.

3.  **`LDAPManager.login`** (apps/meteor/server/lib/ldap/Manager.ts): This is the core of the LDAP authentication process. It performs the following steps:
    *   Creates an `LDAPConnection`.
    *   Connects to the LDAP server using `ldap.connect()`.
    *   Searches for the user by username using `ldap.searchByUsername()`.
    *   Authenticates the user with the provided distinguished name (DN) and password using `ldap.authenticate(dn, password)`.
    *   Checks for group filters if configured.
    *   Finds or creates the user in the MongoDB database.
    *   Syncs the user's avatar.
    *   Returns the `userId` upon successful authentication.

4.  **Fallback Mechanism**: If LDAP authentication fails and the `LDAP_Login_Fallback` setting is enabled, Rocket.Chat will attempt to authenticate the user using other registered login handlers, such as the default password authentication.

5.  **`beforeValidateLogin` Callback**: This callback prevents users who are configured for LDAP from logging in with a password unless the fallback mechanism is explicitly enabled.

In summary, the LDAP authentication flow starts with `configureLDAP` registering a handler, which then dispatches to `LDAPService.loginRequest`. This service, in turn, calls `LDAPManager.login` to perform the actual LDAP server interaction, user creation/syncing, and ultimately returns the authenticated user's ID.

## Tool Calls (8 calls, 26,048 tokens)

**Step 1:** `plan({"question":"How does LDAP authentication work in Rocket.Chat?","intent":"call-chain"})` → 305 tokens
**Step 2:** `search({"layer":"server","query":"LDAPManager.login"})` → 85 tokens
**Step 3:** `graph({"query":"LDAPManager.login","file":"service.ts","depth":5,"move":"down"})` → 14 tokens
**Step 4:** `search({"layer":"server","query":"LDAPManager"})` → 66 tokens
**Step 5:** `graph({"move":"down","file":"Manager.ts","query":"LDAPManager.login","depth":5})` → 14 tokens
**Step 6:** `search({"layer":"server","query":"LDAPService.loginRequest"})` → 28 tokens
**Step 7:** `search({"layer":"server","query":"configureLDAP"})` → 68 tokens
**Step 8:** `graph({"depth":5,"file":"ldap.ts","move":"down","query":"configureLDAP"})` → 3929 tokens

## Files Seen In Tool Results (3)

- `apps/meteor/server/services/ldap/service.ts`
- `apps/meteor/server/lib/ldap/Manager.ts`
- `apps/meteor/server/configuration/ldap.ts`
