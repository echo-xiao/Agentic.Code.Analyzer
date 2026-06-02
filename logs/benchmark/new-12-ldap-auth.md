# How does LDAP authentication work?

## Answer

LDAP authentication in Rocket.Chat follows a layered architecture: a Meteor login handler delegates to the `LDAPService`, which calls `LDAPManager.login()`, which creates an `LDAPConnection`, searches for the user, authenticates credentials, and syncs user data via `LDAPUserConverter`.

### 1. Login Handler Registration

**`apps/meteor/server/configuration/ldap.ts`, line 7:**
```ts
export async function configureLDAP(settings: ICachedSettings): Promise<void> {
    Accounts.registerLoginHandler('ldap', async (loginRequest: Record<string, any>) => {
        if (!loginRequest.ldap || !loginRequest.ldapOptions) {
            return undefined;
        }
        return LDAP.loginRequest(loginRequest.username, loginRequest.ldapPass);
    });
```

This registers a Meteor `Accounts.registerLoginHandler` named `'ldap'`. The handler checks for `loginRequest.ldap` and `loginRequest.ldapOptions` fields, then delegates to the `LDAP` service proxy (from `@rocket.chat/core-services`), which calls `loginRequest()`.

The function also watches the `LDAP_Enable` setting (line 19) to add/remove a `beforeValidateLogin` callback that prevents password-based logins for LDAP users (unless `LDAP_Login_Fallback` is enabled).

### 2. LDAPService (Service Layer)

**`apps/meteor/server/services/ldap/service.ts`, line 7:**
```ts
export class LDAPService extends ServiceClassInternal implements ILDAPService {
    protected name = 'ldap';

    async loginRequest(username: string, password: string): Promise<LDAPLoginResult> {
        return LDAPManager.login(username, password);
    }
```

A thin service layer extending `ServiceClassInternal`. It exposes:
- `loginRequest()` -- delegates to `LDAPManager.login()`
- `loginAuthenticatedUserRequest()` -- delegates to `LDAPManager.loginAuthenticatedUser()`
- `testConnection()` -- delegates to `LDAPManager.testConnection()`
- `testSearch()` -- delegates to `LDAPManager.testSearch()`

### 3. LDAPManager (Core Logic)

**`apps/meteor/server/lib/ldap/Manager.ts`, line 24:**
```ts
export class LDAPManager {
    public static async login(username: string, password: string): Promise<LDAPLoginResult> {
```

The `login()` flow (lines 25-64):
1. Checks if LDAP is enabled via `settings.get('LDAP_Enable')`. If not, falls back to `fallbackToDefaultLogin()`.
2. Creates a new `LDAPConnection` instance (line 34).
3. Calls `ldap.connect()` to establish the LDAP connection (line 37).
4. Calls `this.findUser(ldap, username, password)` to search for the user (line 38). This internally calls `ldap.searchByUsername()` and then `ldap.authenticate()` to verify credentials.
5. If no LDAP user found, falls back to default login (line 44).
6. Calls `this.slugifyUsername(ldapUser, username)` to normalize the username (line 52).
7. Calls `this.findExistingUser(ldapUser, slugifiedUsername)` to check if a local user already exists (line 53).
8. Calls `ldap.bindAuthenticationUser()` to rebind as admin for group lookups (line 56).
9. If user exists: `this.loginExistingUser(ldap, user, ldapUser, password)` -- syncs data and returns login result (line 58).
10. If user is new: `this.loginNewUserFromLDAP(slugifiedUsername, ldap, ldapUser, password)` -- creates local user via `LDAPUserConverter` (line 61).
11. Finally calls `ldap.disconnect()` in the `finally` block (line 63).

### 4. LDAPConnection (Transport Layer)

**`apps/meteor/server/lib/ldap/Connection.ts`, line 38:**
```ts
export class LDAPConnection {
    public ldapjs: any;
    public connected: boolean;
    public options: ILDAPConnectionOptions;
    public client: ldapjs.Client;
```

Wraps the `ldapjs` library. Key methods:
- `connect()` -- establishes connection using settings for host, port, encryption (TLS/SSL/plain)
- `searchByUsername(username)` -- performs LDAP search using configured base DN and user filter
- `authenticate(dn, password)` -- binds with user credentials to verify password
- `bindAuthenticationUser()` -- binds with admin/service credentials for privileged operations
- `disconnect()` -- closes the LDAP connection
- `searchAllUsers()` -- for background sync operations

### 5. LDAPUserConverter (Data Sync)

**`apps/meteor/server/lib/ldap/UserConverter.ts`:**

Extends the importer's `UserConverter` class. Handles:
- Mapping LDAP attributes to Rocket.Chat user fields
- Avatar sync from LDAP
- Role mapping from LDAP groups
- Custom field mapping
- Creating or updating local user records

### Key Files
| File | Role |
|------|------|
| `apps/meteor/server/configuration/ldap.ts` | Registers Meteor login handler, manages LDAP_Enable callback |
| `apps/meteor/server/services/ldap/service.ts` | Service layer (`ServiceClassInternal`) exposing LDAP operations |
| `apps/meteor/server/lib/ldap/Manager.ts` | Core LDAP login logic, user finding, user creation/update |
| `apps/meteor/server/lib/ldap/Connection.ts` | LDAP connection management using `ldapjs`, search, bind, auth |
| `apps/meteor/server/lib/ldap/UserConverter.ts` | Maps LDAP entries to Rocket.Chat users, handles data sync |
| `apps/meteor/server/lib/ldap/Logger.ts` | LDAP-specific logging (auth, conn, search, bind, map loggers) |

### Key Symbols
- `configureLDAP(settings)` -- registers Meteor login handler and fallback prevention
- `LDAPService` -- `ServiceClassInternal` implementation, name = `'ldap'`
- `LDAPManager.login(username, password)` -- static method orchestrating the full login flow
- `LDAPManager.loginAuthenticatedUser(username)` -- login without password (pre-authenticated)
- `LDAPManager.findUser(ldap, username, password)` -- searches and authenticates against LDAP
- `LDAPManager.loginExistingUser()` -- syncs data for existing local users
- `LDAPManager.loginNewUserFromLDAP()` -- creates new local user from LDAP data
- `LDAPConnection` -- wraps `ldapjs.Client` with connect/search/bind/authenticate methods
- `LDAPUserConverter` -- maps LDAP attributes to RC user model
- `LDAP` -- proxified service reference from `@rocket.chat/core-services`
