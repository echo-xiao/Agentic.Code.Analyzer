# How does LDAP authentication work in Rocket.Chat?

## Gemini Answer

LDAP authentication in Rocket.Chat is a server-side process that connects to an external LDAP server to validate user credentials, and then creates or updates the corresponding user in the Rocket.Chat database.

The process starts when a user attempts to log in using LDAP credentials. This triggers a registered login handler on the server.

### Call Chain

`Login Request` → `Accounts Login Handler` → `LDAPService.loginRequest` → `LDAPManager.login` → `LDAPManager.findUser` → `LDAPConnection.authenticate` → `User Creation/Login`

### Detailed Flow

1.  **Login Handler Registration**
    *   The process is initialized by `configureLDAP()`, which registers a login handler with Meteor's Accounts system for the `ldap` service. This function is located in `apps/meteor/server/services/ldap/service.ts`, which sets up the `LDAPService`.

2.  **Receiving the Login Request**
    *   When a user submits their credentials, the Meteor server invokes the registered LDAP login handler.
    *   The handler calls `LDAPService.loginRequest`.
    *   **File**: `apps/meteor/server/services/ldap/service.ts`
    *   **Symbol**: `LDAPService.loginRequest`

3.  **Managing the Login Flow**
    *   The `loginRequest` method delegates the core logic to `LDAPManager.login`. This static method orchestrates the entire authentication and user synchronization process.
    *   **File**: `apps/meteor/server/lib/ldap/Manager.ts`
    *   **Symbol**: `LDAPManager.login`
    *   **Logic**:
        *   It first checks if LDAP is enabled in the settings.
        *   It creates a new `LDAPConnection` instance to manage communication with the LDAP server.
        *   It calls `LDAPManager.findUser` to search for and authenticate the user against the LDAP directory.

4.  **Finding and Authenticating the User**
    *   The `LDAPManager.findUser` method performs the critical steps of validating the user with the LDAP server.
    *   **File**: `apps/meteor/server/lib/ldap/Manager.ts`
    *   **Symbol**: `LDAPManager.findUser`
    *   **Logic**:
        1.  **Search**: It uses the `LDAPConnection` to perform a search for the user based on the provided username (`ldap.searchByUsername`).
        2.  **Group Filter**: If a group filter is defined in the settings, it checks if the user is a member of an accepted group (`ldap.isUserAcceptedByGroupFilter`).
        3.  **Authentication**: It attempts to authenticate (bind) to the LDAP server using the user's distinguished name (DN) and the provided password (`ldap.authenticate`).

5.  **User Provisioning and Login**
    *   If the user is successfully authenticated against LDAP, `LDAPManager.login` checks if a corresponding user already exists in the Rocket.Chat database.
    *   If the user exists, it updates their data from LDAP and logs them in.
    *   If the user does not exist, a new user is created in the Rocket.Chat database with data synced from the LDAP entry, and then they are logged in.
    *   Finally, the LDAP connection is closed, and the user's session is established.

## Tool Calls (8 calls, 30,113 tokens)

**Step 1:** `search({"query":"LDAP","layer":"server"})` → 588 tokens
**Step 2:** `graph({"query":"LDAP.loginRequest","direction":"down"})` → 14 tokens
**Step 3:** `graph({"direction":"down","query":"LDAPService.loginRequest"})` → 16 tokens
**Step 4:** `implement({"filename":"apps/meteor/server/services/ldap/service.ts","symbolName":"LDAPService"})` → 201 tokens
**Step 5:** `graph({"direction":"down","query":"LDAPService.loginRequest"})` → 16 tokens
**Step 6:** `implement({"symbolName":"LDAPManager.login","filename":"apps/meteor/server/lib/ldap/Manager.ts"})` → 355 tokens
**Step 7:** `implement({"symbolName":"LDAPManager.findUser","filename":"apps/meteor/server/lib/ldap/Manager.ts"})` → 354 tokens
**Step 8:** `search({"query":"registerLoginHandler ldap"})` → 17 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 5/6 |
| Symbols hit | 4/4 |
| Tool calls | 8 |
| Total tokens | 30,113 |
| Pass | YES |
