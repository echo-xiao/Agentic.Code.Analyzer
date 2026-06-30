# How does LDAP authentication work in Rocket.Chat?

## Baseline Answer (no tools)

LDAP (Lightweight Directory Access Protocol) authentication in Rocket.Chat allows organizations to leverage their existing directory services for user management and authentication. This means users can log in to Rocket.Chat using their existing corporate credentials, and Rocket.Chat can automatically provision user accounts based on LDAP data.

Here's a breakdown of how it works in Rocket.Chat, from configuration to the actual authentication flow, with specific file paths where relevant:

## 1. Core Concepts & Components

*   **`ldapjs` library:** Rocket.Chat's server-side code uses the `ldapjs` Node.js library to communicate with LDAP servers.
*   **Meteor Accounts System:** Rocket.Chat is built on Meteor, which has a robust accounts system. LDAP authentication is integrated as a custom login handler within this system.
*   **`rocketchat-ldap` package:** This is the dedicated Meteor package (`packages/rocketchat-ldap/`) responsible for all LDAP-related logic, including settings, server-side connection, user synchronization, and authentication.
*   **Settings:** All LDAP configurations (server URL, bind DN, search filters, attribute mapping, etc.) are stored as Rocket.Chat settings, accessible via the Admin UI.

## 2. Configuration (Admin UI)

Admins configure LDAP settings under **Administration > Workspace > Settings > LDAP**.

Key settings include:

*   **LDAP Enabled:** Toggles the feature on/off.
*   **Server URL:** The address of the LDAP server (e.g., `ldap://myldap.example.com:389` or `ldaps://myldap.example.com:636`).
*   **Bind DN:** The Distinguished Name (DN) of a service account that Rocket.Chat will use to connect to and search the LDAP directory.
*   **Bind Password:** The password for the `Bind DN`.
*   **Search DN:** The base DN from which Rocket.Chat will start searching for users (e.g., `ou=users,dc=example,dc=com`).
*   **Search Filter:** An LDAP filter to specify which objects are users (e.g., `(&(objectClass=person)(sAMAccountName=*))`).
*   **User DN:** Specifies how the user's DN is constructed for direct authentication (e.g., `sAMAccountName=%u,ou=users,dc=example,dc=com` or `uid=%u,ou=people,dc=example,dc=com`).
*   **Attribute Map:** Defines how LDAP attributes (e.g., `sAMAccountName`, `cn`, `mail`) are mapped to Rocket.Chat user fields (e.g., `username`, `name`, `email`).
*   **Sync Settings:** Controls whether users are created/updated on login, and for more advanced synchronization (often enterprise features).

These settings are registered in the `rocketchat-ldap` package here:
*   `packages/rocketchat-ldap/server/startup/settings.js`

## 3. Detailed Authentication Flow

When a user attempts to log in via the Rocket.Chat login screen (entering a username and password):

1.  **Client-Side Request:** The user submits their username and password from the client (browser/desktop app). This triggers a Meteor method call to `login` on the server.
    *   Relevant file: `app/authentication/server/methods/login.js` (this is the general Meteor login method).

2.  **Server-Side Login Handler:** Rocket.Chat's authentication system checks its registered login handlers. The `rocketchat-ldap` package registers a custom login handler specifically for LDAP:
    *   Relevant file: `packages/rocketchat-ldap/server/login.js`
    *   Within this file, `Accounts.registerLoginHandler((loginRequest) => { ... });` is used to hook into the Meteor authentication process.

3.  **LDAP Enabled Check:** The login handler first checks if LDAP is enabled in Rocket.Chat's settings. If not, it falls through to other authentication methods (e.g., local password, OAuth).
    *   Relevant file: `packages/rocketchat-ldap/server/lib/LDAP.js` (contains the `LDAP` class and its methods).

4.  **Initial Bind (Service Account):**
    *   Rocket.Chat attempts to connect to the configured LDAP server using the `Bind DN` and `Bind Password` (service account). This establishes a session with sufficient privileges to search the directory.
    *   This is handled by the `LDAP.prototype.bind()` method in `packages/rocketchat-ldap/server/lib/LDAP.js`.

5.  **User Search:**
    *   Using the established service account connection, Rocket.Chat performs a search within the `Search DN` using the `Search Filter` and the provided username to locate the user's full LDAP entry.
    *   This usually involves a call to `LDAP.prototype.search()` in `packages/rocketchat-ldap/server/lib/LDAP.js`.
    *   The `Search Filter` often includes `sAMAccountName={username}` or `uid={username}` to pinpoint the user.

6.  **User Authentication (User's Credentials):**
    *   If the user is found, Rocket.Chat attempts a *second* bind operation, this time trying to bind directly as the found user with the password provided by the user in the login form.
    *   This is the critical step that validates the user's password against the LDAP server.
    *   The `User DN` setting (e.g., `uid=%u,ou=people,dc=example,dc=com`) is used to construct the user's full DN for this bind attempt.
    *   This logic resides within `packages/rocketchat-ldap/server/lib/LDAP.js` and is orchestrated by `packages/rocketchat-ldap/server/login.js`.

7.  **Success/Failure:**
    *   If the user's bind succeeds, the user is authenticated against LDAP.
    *   If any bind or search fails, the authentication attempt fails, and an appropriate error is returned.

8.  **User Provisioning and Synchronization:**
    *   If LDAP authentication is successful, Rocket.Chat needs to ensure the user exists in its local MongoDB database and that their profile information is up-to-date.
    *   This is handled by the `LDAP.prototype.syncUser()` method, which calls helper functions like `LDAP.prototype.getLdapUserByUsername()` and `LDAP.prototype.createOrUpdateUser()`.
    *   Relevant file: `packages/rocketchat-ldap/server/lib/sync.js` and `packages/rocketchat-ldap/server/lib/LDAP.js`.
    *   **Attribute Mapping:** LDAP attributes from the retrieved user entry (e.g., `cn`, `mail`, `displayName`) are mapped to Rocket.Chat user fields (e.g., `name`, `email`, `username`) according to the `Attribute Map` settings.
    *   If the user doesn't exist in Rocket.Chat, a new user account is created.
    *   If the user already exists, their profile information (email, name, etc.) is updated based on the LDAP data, depending on sync settings.

9.  **Rocket.Chat Session Creation:**
    *   Finally, if all steps are successful, Rocket.Chat's internal authentication system creates a session for the user, allowing them to access the platform.
    *   The `Accounts.setLoggedInUser()` and `Accounts._generateStampedLoginToken()` methods are used for this.

## 4. Enterprise Features

While the core LDAP authentication is available in the community edition, the Rocket.Chat Enterprise Edition offers more advanced LDAP features, such as:

*   **Live Sync:** Periodically synchronizing user data and groups from LDAP to Rocket.Chat, even for users who haven't recently logged in.
*   **Group Synchronization:** Mapping LDAP groups to Rocket.Chat roles or channels, automatically adding/removing users from groups.
*   **Password Change Policy:** Handling password change requests back to LDAP.

These features typically involve more background jobs, additional `cron` like mechanisms, and more complex `LDAP.js` interactions, often residing in the `ee/` directory structure.

In summary, Rocket.Chat's LDAP integration is a robust, server-side process that leverages the `ldapjs` library and Meteor's accounts system to provide secure and manageable user authentication and provisioning based on an organization's existing LDAP directory.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,500 |
| Model | gemini-2.5-flash |
| Tools | NONE |
