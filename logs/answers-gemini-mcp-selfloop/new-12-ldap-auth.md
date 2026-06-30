# How does LDAP authentication work in Rocket.Chat?

## Gemini Answer

LDAP authentication in Rocket.Chat follows a specific flow, starting with the `Meteor.loginWith*()` method and dispatching to registered login handlers.

Here's the detailed breakdown:

**Call Chain:**

1.  **Entry Point:** `Meteor.loginWith*()`
2.  **Handler Registration:** `configureLDAP()` (located in `apps/meteor/server/configuration/ldap.ts`) registers a handler with `Accounts.registerLoginHandler('ldap', fn)`.
3.  **Login Request:** When an LDAP login is initiated, the registered handler checks for an LDAP flag in the login request and calls `LDAP.loginRequest(username, password)` via a `core-services` proxy.
4.  **Service Layer:** This call is handled by `LDAPService.loginRequest()` (located in `apps/meteor/server/services/ldap/service.ts`).
5.  **Manager Layer:** `LDAPService.loginRequest()` then calls `LDAPManager.login(username, password)`. (The `LDAPManager` is likely located in `apps/meteor/server/lib/ldap/Manager.ts`).
6.  **LDAP Operations:** Inside `LDAPManager.login()`:
    *   An `LDAPConnection` is created.
    *   `ldap.connect()` establishes a connection to the LDAP server.
    *   `ldap.searchByUsername()` searches for the user.
    *   `ldap.authenticate(dn, password)` authenticates the user against the LDAP server.
    *   Group filters are checked.
    *   The user is found or created in MongoDB.
    *   The user's avatar is synced.
    *   Finally, `{userId}` is returned.
7.  **Fallback Mechanism:** If LDAP authentication fails and the `LDAP_Login_Fallback` setting is enabled, `Accounts._runLoginHandlers()` is called to attempt default password authentication.
8.  **Login Validation:** A `beforeValidateLogin` callback prevents password logins for LDAP users unless the fallback is enabled.

**Key Files:**

*   `apps/meteor/server/configuration/ldap.ts`: Contains `configureLDAP()`, which registers the LDAP login handler.
*   `apps/meteor/server/services/ldap/service.ts`: Contains `LDAPService.loginRequest()`, which acts as an intermediary to the `LDAPManager`.
*   `apps/meteor/server/lib/ldap/Manager.ts`: Likely contains `LDAPManager.login()`, which orchestrates the core LDAP authentication logic.
*   `apps/meteor/server/lib/ldap/Connection.ts`: Likely defines the `LDAPConnection` class used for connecting to the LDAP server.

## Tool Calls (8 calls, 43,688 tokens)

**Step 1:** `search({"layer":"server","query":"LDAP"})` → 772 tokens
**Step 2:** `graph({"query":"LDAPManager.login","file":"apps/meteor/server/lib/ldap/Manager.ts","layer":"server","direc)` → 14 tokens
**Step 3:** `graph({"direction":"down","layer":"server","query":"LDAPService.loginRequest","file":"apps/meteor/server/s)` → 16 tokens
**Step 4:** `graph({"query":"LDAPService","file":"apps/meteor/server/services/ldap/service.ts","direction":"down","laye)` → 240 tokens
**Step 5:** `search({"layer":"server","query":"configureLDAP"})` → 460 tokens
**Step 6:** `graph({"direction":"down","query":"configureLDAP","layer":"server","file":"apps/meteor/server/configuratio)` → 1973 tokens
**Step 7:** `implement({"filename":"apps/meteor/server/services/ldap/service.ts","symbolName":"loginRequest"})` → 55 tokens
**Step 8:** `implement({"filename":"apps/meteor/server/services/ldap/service.ts","symbolName":"LDAPService.loginRequest"})` → 84 tokens

## Files Seen In Tool Results (33)

- `packages/core-services/src/index.ts`
- `apps/meteor/tests/end-to-end/api/LDAP.ts`
- `apps/meteor/server/lib/ldap/Manager.ts`
- `apps/meteor/ee/server/configuration/ldap.ts`
- `apps/meteor/ee/server/lib/ldap/Manager.ts`
- `apps/meteor/ee/server/sdk/index.ts`
- `apps/meteor/server/lib/ldap/ldapKeyExists.ts`
- `apps/meteor/server/services/ldap/service.ts`
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
- `apps/meteor/app/settings/server/CachedSettings.ts`
- `apps/meteor/server/configuration/index.ts`
- `packages/apps-engine/src/server/AppManager.ts`
- `apps/meteor/app/api/server/api.ts`
- `apps/meteor/app/mailer/server/api.ts`
- `apps/meteor/app/file-upload/server/lib/FileUpload.ts`
- `apps/meteor/app/lib/server/functions/checkUsernameAvailability.ts`
- `apps/meteor/server/lib/callbacks/callbacksBase.ts`
