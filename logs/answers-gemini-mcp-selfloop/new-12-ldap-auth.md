# How does LDAP authentication work in Rocket.Chat?

## Gemini Answer

LDAP authentication in Rocket.Chat follows a structured flow, starting from the client-side login request and proceeding through several server-side components.

Here's the call chain:

`Meteor.loginWith*()` (Client-side) → `Accounts.registerLoginHandler('ldap', fn)` (Server-side, registered by `configureLDAP()`) → `LDAP.loginRequest(username, password)` (via `core-services` proxy) → `LDAPService.loginRequest()` → `LDAPManager.login()`

**Detailed Breakdown:**

1.  **Client-side Login:** The process begins when a user attempts to log in using `Meteor.loginWith*()` on the client.
2.  **Login Handler Registration:** On the server, a function like `configureLDAP()` (likely found in `apps/meteor/server/configuration/ldap.ts`) registers a specific handler for 'ldap' logins using `Accounts.registerLoginHandler('ldap', fn)`. This handler is responsible for processing LDAP login requests.
3.  **LDAP Login Request:** When an LDAP login is initiated, the registered handler dispatches the request, which eventually calls `LDAP.loginRequest(username, password)`. This call is proxied through `packages/core-services/src/index.ts`.
4.  **LDAP Service:** The request then reaches `LDAPService.loginRequest()`, located in `apps/meteor/server/services/ldap/service.ts`. This service acts as an intermediary, preparing the request for the core LDAP management logic.
5.  **LDAP Manager:** The central authentication logic resides within `LDAPManager.login()`, which can be found in either `apps/meteor/server/lib/ldap/Manager.ts` or `apps/meteor/ee/server/lib/ldap/Manager.ts` (for Enterprise Edition). This function performs the following steps:
    *   Creates an `LDAPConnection` (from `apps/meteor/server/lib/ldap/Connection.ts`).
    *   Connects to the LDAP server (`ldap.connect()`).
    *   Searches for the user by username (`ldap.searchByUsername()`).
    *   Authenticates the user with their distinguished name (DN) and password (`ldap.authenticate(dn, password)`).
    *   Checks for group filters to ensure the user is authorized.
    *   Finds or creates the user in the MongoDB database.
    *   Syncs the user's avatar.
    *   Returns the `userId` upon successful authentication.
6.  **Fallback Mechanism:** If LDAP authentication fails and the `LDAP_Login_Fallback` setting is enabled, Rocket.Chat can fall back to other authentication methods, such as default password authentication, by calling `Accounts._runLoginHandlers()`.
7.  **Login Validation:** A `beforeValidateLogin` callback is used to prevent password logins for LDAP users unless the fallback mechanism is explicitly enabled.

**Key Files Involved:**

*   `apps/meteor/server/configuration/ldap.ts`: Registers the LDAP login handler.
*   `packages/core-services/src/index.ts`: Provides the `LDAP` proxy for login requests.
*   `apps/meteor/server/services/ldap/service.ts`: Contains `LDAPService.loginRequest()`.
*   `apps/meteor/server/lib/ldap/Manager.ts` or `apps/meteor/ee/server/lib/ldap/Manager.ts`: Implements `LDAPManager.login()`, the core LDAP authentication logic.
*   `apps/meteor/server/lib/ldap/Connection.ts`: Manages the connection to the LDAP server.

## Tool Calls (2 calls, 7,947 tokens)

**Step 1:** `search({"query":"LDAP","layer":"server"})` → 772 tokens
**Step 2:** `graph({"file":"apps/meteor/server/lib/ldap/Manager.ts","direction":"down","query":"LDAPManager.login"})` → 14 tokens

## Files Seen In Tool Results (25)

- `packages/core-services/src/index.ts`
- `apps/meteor/tests/end-to-end/api/LDAP.ts`
- `apps/meteor/server/lib/ldap/Manager.ts`
- `apps/meteor/ee/server/configuration/ldap.ts`
- `apps/meteor/server/services/ldap/service.ts`
- `apps/meteor/ee/server/lib/ldap/Manager.ts`
- `apps/meteor/ee/server/sdk/index.ts`
- `apps/meteor/server/lib/ldap/ldapKeyExists.ts`
- `apps/meteor/client/views/admin/settings/groups/LDAPGroupPage.tsx`
- `apps/meteor/server/lib/ldap/Connection.ts`
- `apps/meteor/server/settings/ldap.ts`
- `apps/meteor/server/lib/ldap/processLdapVariables.ts`
- `apps/meteor/server/lib/ldap/getLdapString.ts`
- `apps/meteor/server/lib/ldap/getLdapDynamicValue.ts`
- `apps/meteor/server/lib/ldap/getLDAPConditionalSetting.ts`
- `apps/meteor/server/lib/ldap/UserConverter.ts`
- `apps/meteor/server/lib/ldap/Logger.ts`
- `apps/meteor/server/lib/ldap/operations/substring.ts`
- `apps/meteor/server/lib/ldap/operations/split.ts`
- `apps/meteor/server/lib/ldap/operations/replace.ts`
- `apps/meteor/server/lib/ldap/operations/match.ts`
- `apps/meteor/server/lib/ldap/operations/fallback.ts`
- `apps/meteor/server/lib/ldap/operations/executeOperation.ts`
- `apps/meteor/server/configuration/ldap.ts`
- `apps/meteor/ee/server/settings/ldap.ts`
