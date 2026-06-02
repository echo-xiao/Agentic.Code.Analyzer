# How does LDAP authentication work in Rocket.Chat?

## Gemini Answer

The LDAP authentication process in Rocket.Chat starts with a client-side login request which is handled by a server-side service that orchestrates the interaction with the LDAP server.

Here's the detailed call chain:

**Entry Point → Step 1 → Step 2 → Step 3 → Step 4 → Final**

1.  **Client-side Login (Implicit)**: While not explicitly traced here, the user initiates an LDAP login from the Rocket.Chat client (e.g., via `Meteor.loginWithLDAP`), which dispatches to a server-side Meteor method for handling the authentication request.

2.  **`LDAPService.loginRequest(username, password)`** (in `apps/meteor/server/services/ldap/service.ts`):
    *   This is the server-side entry point for handling an LDAP login request.
    *   It acts as a wrapper, delegating the core logic to the `LDAPManager`.

3.  **`LDAPManager.login(username, password)`** (in `apps/meteor/server/lib/ldap/Manager.ts`):
    *   This class orchestrates the entire LDAP authentication flow on the server.
    *   It first checks if LDAP is enabled (`settings.get('LDAP_Enable')`). If not, it falls back to the default Rocket.Chat login mechanism (`Accounts._runLoginHandlers`).
    *   It creates a new instance of `LDAPConnection`.
    *   It attempts to connect to the LDAP server and find the user's entry using `this.findUser()`, which involves:
        *   `LDAPConnection.searchByUsername()`: Searches the LDAP directory for the provided username based on configured search filters.
        *   `LDAPConnection.isUserAcceptedByGroupFilter()`: (Optional) If group filtering is enabled, it verifies if the user belongs to the specified LDAP groups.
        *   `LDAPConnection.authenticate()`: Attempts to bind to the LDAP server using the user's Distinguished Name (DN) and password to authenticate them.
    *   If authentication is successful, `LDAPManager` then checks if a Rocket.Chat user already exists for the authenticated LDAP user (`this.findExistingUser()`).
    *   Based on whether the user is new or existing, it either calls `this.loginNewUserFromLDAP()` (to create a new Rocket.Chat user) or `this.loginExistingUser()` (to log in and potentially update an existing user).
    *   Both paths eventually lead to `this.onLogin()`, which can set a local password if `LDAP_Login_Fallback` is enabled and triggers the `onLDAPLogin` callback for further custom processing.

4.  **`LDAPConnection`** (in `apps/meteor/server/lib/ldap/Connection.ts`):
    *   This class is responsible for the low-level communication with the LDAP server using the `ldapjs` library.
    *   **`constructor()`**: Initializes LDAP connection options (host, port, encryption, base DN, search filters, etc.) from Rocket.Chat's settings.
    *   **`connect()`**: Establishes a connection to the LDAP server. It supports plain, SSL, and TLS encryption based on configuration.
    *   **`searchByUsername(escapedUsername)`**: Formulates an LDAP filter string and executes an LDAP search operation (`this.client.search()`) to find user entries matching the username.
    *   **`authenticate(dn, password)`**: Performs an LDAP bind operation (`this.client.bind()`) to verify the user's credentials against the LDAP server. This is the critical step where the password is validated.
    *   **`isUserAcceptedByGroupFilter(username, userdn)`**: If configured, it performs an LDAP search to check for group membership, applying dynamic filters using the provided username and user DN.
    *   **`disconnect()`**: Unbinds the client from the LDAP server when the operation is complete.

In summary, Rocket.Chat's LDAP authentication flow is managed by the `LDAPService`, which uses the `LDAPManager` to coordinate user lookup, authentication, and user provisioning. The `LDAPConnection` handles the direct communication with the LDAP server, utilizing the `ldapjs` library to perform connections, searches, and binds based on the system's LDAP settings.

## Tool Calls (5 calls, 47,954 tokens)

**Step 1:** `search({"query":"LDAP","layer":"server"})` → 417 tokens
**Step 2:** `implement({"symbolName":"LDAP","filename":"apps/meteor/server/services/ldap/service.ts"})` → 29 tokens
**Step 3:** `implement({"filename":"apps/meteor/server/services/ldap/service.ts","symbolName":"LDAPService"})` → 161 tokens
**Step 4:** `implement({"filename":"apps/meteor/server/lib/ldap/Manager.ts","symbolName":"LDAPManager"})` → 4115 tokens
**Step 5:** `implement({"filename":"apps/meteor/server/lib/ldap/Connection.ts","symbolName":"LDAPConnection"})` → 5546 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 5/6 |
| Symbols hit | 3/4 |
| Tool calls | 5 |
| Total tokens | 47,954 |
