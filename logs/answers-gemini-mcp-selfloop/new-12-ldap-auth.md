# How does LDAP authentication work in Rocket.Chat?

## Gemini Answer

LDAP authentication in Rocket.Chat follows a server-side flow initiated by a login request. The process involves several steps, from the initial login attempt to user synchronization with the Rocket.Chat database.

The authentication flow is as follows:

**Entry Point → `LDAPService.loginRequest` → `LDAPManager.login` → `LDAPConnection.connect` → `LDAPConnection.findUser` → `LDAPConnection.bindAuthenticationUser` → `LDAPManager.loginExistingUser` or `LDAPManager.loginNewUserFromLDAP`**

Here's a detailed breakdown:

1.  **Client Login Request**: The authentication process begins when a user attempts to log in using a method like `Meteor.loginWith*()`.
2.  **Login Handler Dispatch**: Rocket.Chat's authentication system, managed by `Accounts.registerLoginHandler`, dispatches the login request to the registered LDAP handler. This handler is set up by `configureLDAP()` and checks for an `ldap` flag in the login request.
3.  **LDAP Service Call**: The registered LDAP handler then calls `LDAP.loginRequest(username, password)` (mediated via a core-services proxy). This function is found in `packages/core-services/src/index.ts`.
4.  **LDAP Service Implementation**: The actual logic for this request resides in `LDAPService.loginRequest()` within the file `apps/meteor/server/services/ldap/service.ts`. This service method in turn calls the main LDAP manager.
5.  **LDAP Manager Login**: The core authentication logic is handled by `LDAPManager.login(username, password)`, located in `apps/meteor/server/lib/ldap/Manager.ts`.
    *   **LDAP Enablement Check**: The `login` method first verifies if the `LDAP_Enable` setting is active. If not, it falls back to the default Rocket.Chat login mechanism.
    *   **Establish LDAP Connection**: An `LDAPConnection` object (from `apps/meteor/server/lib/ldap/Connection.ts`) is created and connected to the LDAP server using `ldap.connect()`.
    *   **User Search and Authentication**: It then attempts to locate the user in LDAP and authenticate them by calling `this.findUser(ldap, username, password)`. This typically involves searching the LDAP directory for the user's distinguished name (DN) and then attempting a bind operation with the provided DN and password.
    *   **Fallback if User Not Found**: If the user is not found in LDAP, or authentication fails, the system falls back to the default login method (if configured).
    *   **Existing User Check**: The system then attempts to find if an existing user with the slugified username already exists in the Rocket.Chat database by calling `this.findExistingUser`.
    *   **Admin Bind for Groups**: The LDAP connection is then bound to an administrative user using `ldap.bindAuthenticationUser()`. This ensures that Rocket.Chat has the necessary permissions to query for group memberships or other user attributes.
    *   **User Synchronization/Creation**:
        *   If an existing user is found in Rocket.Chat, `this.loginExistingUser` is called to synchronize user data with LDAP attributes and complete the login.
        *   If no existing user is found, `this.loginNewUserFromLDAP` is called to create a new user in Rocket.Chat, populating their profile with data fetched from LDAP.
    *   **Disconnect**: Finally, the LDAP connection is disconnected using `ldap.disconnect()`.

This detailed process ensures that user authentication and synchronization with LDAP are handled securely and efficiently within Rocket.Chat.

## Tool Calls (5 calls, 18,276 tokens)

**Step 1:** `search({"query":"LDAP","layer":"server"})` → 609 tokens
**Step 2:** `graph({"direction":"down","layer":"server","query":"LDAPManager.login","file":"apps/meteor/server/lib/ldap)` → 14 tokens
**Step 3:** `graph({"layer":"server","query":"LDAPManager","direction":"down","file":"apps/meteor/server/lib/ldap/Manag)` → 239 tokens
**Step 4:** `implement({"symbolName":"LDAPManager","filename":"apps/meteor/server/lib/ldap/Manager.ts"})` → 959 tokens
**Step 5:** `implement({"filename":"apps/meteor/server/lib/ldap/Manager.ts","symbolName":"LDAPManager.login"})` → 355 tokens
