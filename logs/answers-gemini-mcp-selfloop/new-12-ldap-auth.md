# How does LDAP authentication work in Rocket.Chat?

## Gemini Answer

LDAP authentication in Rocket.Chat works as follows:

The authentication process begins when a user attempts to log in via a `Meteor.loginWith*()` method. This triggers `Accounts.registerLoginHandler`, which dispatches to registered handlers.

1.  **Handler Registration**: The `configureLDAP()` function, located in `apps/meteor/server/configuration/ldap.ts`, registers a specific handler with `Accounts.registerLoginHandler('ldap', fn)`. This handler is responsible for processing LDAP login requests.
2.  **LDAP Login Request**: When a login request with an LDAP flag is received, it calls `LDAP.loginRequest(username, password)` via a core-services proxy. This, in turn, invokes `LDAPService.loginRequest()` from `apps/meteor/server/services/ldap/service.ts`.
3.  **Core Authentication Logic**: The `LDAPService.loginRequest()` method then calls `LDAPManager.login()` from `apps/meteor/server/lib/ldap/Manager.ts`. This is where the primary LDAP authentication logic resides.

**Call Chain:** `Meteor.loginWith*()` → `Accounts.registerLoginHandler` (via `apps/meteor/server/configuration/ldap.ts::configureLDAP`) → `LDAPService.loginRequest` (in `apps/meteor/server/services/ldap/service.ts`) → `LDAPManager.login` (in `apps/meteor/server/lib/ldap/Manager.ts`).

The `LDAPManager.login()` method performs the following steps (from `apps/meteor/server/lib/ldap/Manager.ts`):

*   **LDAP Enablement Check**: It first verifies if LDAP is enabled through the `LDAP_Enable` setting. If not, it falls back to the default Rocket.Chat login mechanism.
*   **Establish Connection**: An `LDAPConnection` is created and an attempt is made to connect to the LDAP server.
*   **User Search and Authentication**: It searches for the user in the LDAP directory using the provided username and password. If the user is not found, it falls back to the default login.
*   **Federation Check**: It checks if a federation home server is configured for the LDAP user. If so, it reverts to the default login.
*   **Username Processing**: The username obtained from LDAP is slugified.
*   **Existing User Check**: It attempts to find an existing Rocket.Chat user corresponding to the authenticated LDAP user.
*   **Bind Admin User**: The LDAP connection is bound to an administrative user to ensure full access for retrieving group information.
*   **Login Flow**:
    *   If an existing Rocket.Chat user is found, it proceeds with `this.loginExistingUser`.
    *   If it's a new user, it calls `this.loginNewUserFromLDAP` to create the user in Rocket.Chat and complete the login.
*   **Disconnect**: Finally, the LDAP connection is disconnected.

In case LDAP authentication fails and the `LDAP_Login_Fallback` setting is enabled, Rocket.Chat will attempt to authenticate the user using the default password authentication handlers. Additionally, a `beforeValidateLogin` callback prevents password logins for LDAP users unless this fallback is explicitly enabled.

## Tool Calls (4 calls, 22,337 tokens)

**Step 1:** `search({"layer":"server","query":"LDAP"})` → 772 tokens
**Step 2:** `graph({"layer":"server","direction":"down","query":"configureLDAP"})` → 1973 tokens
**Step 3:** `graph({"direction":"down","query":"LDAPManager.login","layer":"server"})` → 14 tokens
**Step 4:** `implement({"filename":"apps/meteor/server/lib/ldap/Manager.ts","symbolName":"LDAPManager.login"})` → 355 tokens
