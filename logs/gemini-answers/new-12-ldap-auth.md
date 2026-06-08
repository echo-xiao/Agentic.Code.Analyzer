# How does LDAP authentication work in Rocket.Chat?

## Gemini Answer

Rocket.Chat's LDAP authentication works by registering a custom login handler that intercepts login requests and directs them to the LDAP service. The process involves the following key steps and files:

**Call Chain:** `Meteor.loginWith*()` → `Accounts.registerLoginHandler` → `configureLDAP` → `LDAPService.loginRequest` → `LDAPManager.login`

1.  **`configureLDAP`** (in `apps/meteor/server/configuration/ldap.ts`):
    *   This function is responsible for initializing and registering the LDAP login handler with Meteor's `Accounts.registerLoginHandler('ldap', fn)` system. This handler is triggered when a user attempts to log in with LDAP.

2.  **`LDAPService.loginRequest`** (in `apps/meteor/server/services/ldap/service.ts`):
    *   When an LDAP login attempt is made, the registered handler dispatches to this method.
    *   Its primary role is to act as a proxy, forwarding the authentication request (username and password) directly to the core LDAP management logic.
    *   **Implementation Snippet:**
        
```typescript
        async loginRequest(username: string, password: string): Promise<LDAPLoginResult> {
        		return LDAPManager.login(username, password);
        	}
        ```


3.  **`LDAPManager.login`** (in `apps/meteor/server/lib/ldap/Manager.ts`):
    *   This is the central component for handling the actual LDAP authentication and user management within Rocket.Chat.
    *   **Core Logic:**
        *   It first verifies if LDAP is enabled via the `LDAP_Enable` setting. If not, or if authentication fails later, it can fall back to the default login method if configured.
        *   An `LDAPConnection` is established to connect to the configured LDAP server.
        *   It attempts to find and authenticate the user against the LDAP server using `this.findUser(ldap, username, password)`.
        *   If the user is successfully found and authenticated in LDAP, it proceeds with user synchronization:
            *   It checks for federation settings.
            *   It slugifies the username for Rocket.Chat's internal use.
            *   It determines if the user already exists in Rocket.Chat's database (`this.findExistingUser`).
            *   If the user exists, it updates their information using `this.loginExistingUser`.
            *   If the user does not exist, a new Rocket.Chat user account is created based on the LDAP data using `this.loginNewUserFromLDAP`.
        *   Finally, the LDAP connection is disconnected.
    *   **Implementation Snippet (abbreviated):**
        
```typescript
        public static async login(username: string, password: string): Promise<LDAPLoginResult> {
        		logger.debug({ msg: 'Init LDAP login', username });

        		if (settings.get('LDAP_Enable') !== true) {
        			return this.fallbackToDefaultLogin(username, password);
        		}

        		let ldapUser: ILDAPEntry | undefined;

        		const ldap = new LDAPConnection();
        		try {
        			try {
        				await ldap.connect();
        				ldapUser = await this.findUser(ldap, username, password);
        			} catch (err) {
        				logger.error({ err });
        			}

        			if (ldapUser === undefined) {
        				return this.fallbackToDefaultLogin(username, password);
        			}

        			// ... (federation, username slugification, existing user check) ...

        			await ldap.bindAuthenticationUser();
        			if (user) {
        				return await this.loginExistingUser(ldap, user, ldapUser, password);
        			}

        			return await this.loginNewUserFromLDAP(slugifiedUsername, ldap, ldapUser, password);
        		} finally {
        			ldap.disconnect();
        		}
        	}
        ```

## Tool Calls (8 calls, 31,962 tokens)

**Step 1:** `search({"query":"LDAP","layer":"server"})` → 588 tokens
**Step 2:** `graph({"layer":"server","query":"LDAPManager.login","direction":"down"})` → 14 tokens
**Step 3:** `search({"layer":"server","query":"LDAPService.loginRequest"})` → 17 tokens
**Step 4:** `search({"query":"configureLDAP","layer":"server"})` → 262 tokens
**Step 5:** `graph({"query":"configureLDAP","layer":"server","direction":"down"})` → 1234 tokens
**Step 6:** `implement({"symbolName":"loginRequest","filename":"apps/meteor/server/services/ldap/service.ts"})` → 55 tokens
**Step 7:** `implement({"filename":"apps/meteor/server/services/ldap/service.ts","symbolName":"LDAPService.loginRequest"})` → 84 tokens
**Step 8:** `implement({"filename":"apps/meteor/server/lib/ldap/Manager.ts","symbolName":"LDAPManager.login"})` → 355 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 6/6 |
| Symbols hit | 4/4 |
| Tool calls | 8 |
| Total tokens | 31,962 |
| Pass | YES |
