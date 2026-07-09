# How does LDAP authentication work in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

LDAP authentication in Rocket.Chat is handled by the `LDAPManager` class, located at `apps/meteor/server/lib/ldap/Manager.ts`.

The authentication flow, initiated by `LDAPManager.login`, proceeds as follows:

1.  **Check LDAP Enablement**: The system first verifies if LDAP is enabled via the `LDAP_Enable` setting. If not, it falls back to the default Rocket.Chat login.
2.  **LDAP Connection**: An `LDAPConnection` instance is created, and a connection to the LDAP server is attempted.
3.  **User Search and Authentication**: The `LDAPManager.findUser` method is called to search for the user using the provided username and password.
    *   It escapes the username and performs a search using `ldap.searchByUsername()`.
    *   It verifies that exactly one user is found.
    *   It checks if the user is accepted by any configured group filters using `ldap.isUserAcceptedByGroupFilter()`.
    *   It attempts to authenticate the user against the LDAP server using `ldap.authenticate()` with the user's distinguished name (DN) and password.
    *   If `LDAP_Find_User_After_Login` is enabled, an additional search is performed as the authenticated user.
4.  **Federation Home Server Check**: If a federation home server is identified for the LDAP user, the system falls back to the default login.
5.  **Existing User Check**: The system attempts to find an existing Rocket.Chat user corresponding to the authenticated LDAP user using `LDAPManager.findExistingUser`.
6.  **Bind Authentication User**: The LDAP connection is bound to an admin user to ensure full access to groups for subsequent steps.
7.  **Login Existing or New User**:
    *   If an existing user is found, `LDAPManager.loginExistingUser` is called to log in and potentially synchronize the existing Rocket.Chat user with their LDAP counterpart.
    *   If no existing user is found, `LDAPManager.loginNewUserFromLDAP` is called to create a new Rocket.Chat user account, mapping attributes from the LDAP entry.
8.  **Disconnect**: Finally, the LDAP connection is disconnected.

Key files involved:

*   `apps/meteor/server/lib/ldap/Manager.ts`: Contains the core logic for LDAP authentication and user management, including the `LDAPManager` class and its `login` method.

## Tool Calls (8 calls, 29,493 tokens)

**Step 1:** `wiki({"question":"How does LDAP authentication work in Rocket.Chat?"})` → 838 tokens
**Step 2:** `search({"query":"LDAPManager"})` → 66 tokens
**Step 3:** `graph({"depth":5,"file":"Manager.ts","query":"LDAPManager.login","move":"down"})` → 14 tokens
**Step 4:** `details({"filename":"Manager.ts","symbolName":"LDAPManager"})` → 954 tokens
**Step 5:** `graph({"query":"LDAPManager.login","depth":5,"file":"Manager.ts","move":"down"})` → 14 tokens
**Step 6:** `graph({"file":"Manager.ts","depth":5,"move":"down","query":"LDAPManager"})` → 36 tokens
**Step 7:** `details({"symbolName":"LDAPManager.login","filename":"Manager.ts"})` → 353 tokens
**Step 8:** `details({"filename":"Manager.ts","symbolName":"LDAPManager.findUser"})` → 351 tokens

## Files Seen In Tool Results (1)

- `apps/meteor/server/lib/ldap/Manager.ts`
