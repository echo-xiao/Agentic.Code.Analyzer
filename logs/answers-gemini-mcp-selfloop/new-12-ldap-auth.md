# How does LDAP authentication work in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

LDAP authentication in Rocket.Chat is handled by the `LDAPManager` class, located in `apps/meteor/server/lib/ldap/Manager.ts`. The process involves several steps:

**Authentication Flow:**

1.  **Login Attempt:** A user attempts to log in with their username and password.
2.  **LDAP Enabled Check:** The `LDAPManager.login` method first checks if LDAP is enabled (`LDAP_Enable` setting). If not, it falls back to the default login mechanism.
3.  **Establish Connection:** An `LDAPConnection` object (defined in `apps/meteor/server/lib/ldap/Connection.ts`) is created and attempts to connect to the LDAP server using `ldap.connect()`. This method initializes the connection, handles TLS if configured, and sets up error and timeout handling.
4.  **User Search:** The `LDAPManager.findUser` method is called to search for the user in LDAP.
    *   It escapes the username and then uses `ldap.searchByUsername` to find the user.
    *   It verifies that exactly one user is found.
    *   It checks if the user is accepted by any configured group filters using `ldap.isUserAcceptedByGroupFilter`.
5.  **User Binding (Authentication):** The `LDAPManager.findUser` method then calls `ldap.authenticate(ldapUser.dn, password)`.
    *   The `LDAPConnection.authenticate` method attempts to bind to the LDAP server using the user's distinguished name (DN) and the provided password via `this.bindDN(dn, password)`.
    *   If the bind is successful, the user is authenticated.
6.  **Post-Authentication Search (Optional):** If the `LDAP_Find_User_After_Login` setting is enabled, an additional search is performed as the authenticated user to ensure they can be found.
7.  **Existing User Check:** The system checks if a Rocket.Chat user corresponding to the LDAP user already exists using `LDAPManager.findExistingUser`.
8.  **Login Existing User:** If the user exists, `LDAPManager.loginExistingUser` is called to handle the login of an existing Rocket.Chat user, potentially updating their data from LDAP.
9.  **Login New User:** If the user does not exist in Rocket.Chat, `LDAPManager.loginNewUserFromLDAP` is called to create a new Rocket.Chat account and synchronize data from LDAP.
10. **Disconnect:** Finally, the LDAP connection is disconnected in the `finally` block of the `LDAPManager.login` method.

**Key Files:**

*   **`apps/meteor/server/lib/ldap/Manager.ts`**: Contains the core logic for LDAP login and user synchronization, including the `LDAPManager` class and its `login` method.
*   **`apps/meteor/server/lib/ldap/Connection.ts`**: Defines the `LDAPConnection` class, responsible for establishing and managing the connection to the LDAP server, performing searches, and authenticating users.

## Tool Calls (8 calls, 40,017 tokens)

**Step 1:** `wiki({"question":"How does LDAP authentication work in Rocket.Chat?"})` → 910 tokens
**Step 2:** `details({"symbolName":"LDAPManager","filename":"Manager.ts"})` → 954 tokens
**Step 3:** `details({"symbolName":"LDAPManager.login","filename":"Manager.ts"})` → 353 tokens
**Step 4:** `search({"query":"LDAPConnection","layer":"server"})` → 69 tokens
**Step 5:** `details({"filename":"Connection.ts","symbolName":"LDAPConnection.connect"})` → 101 tokens
**Step 6:** `details({"filename":"Connection.ts","symbolName":"LDAPConnection.initializeConnection"})` → 534 tokens
**Step 7:** `details({"filename":"Manager.ts","symbolName":"LDAPManager.findUser"})` → 351 tokens
**Step 8:** `details({"symbolName":"LDAPConnection.authenticate","filename":"Connection.ts"})` → 142 tokens

## Files Seen In Tool Results (3)

- `apps/meteor/server/lib/ldap/Manager.ts`
- `apps/meteor/server/settings/ldap.ts`
- `apps/meteor/server/lib/ldap/Connection.ts`
