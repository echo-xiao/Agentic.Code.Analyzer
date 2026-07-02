# How does LDAP authentication work in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat integrates with LDAP (Lightweight Directory Access Protocol) to allow users to authenticate against an external directory server, such as Active Directory or OpenLDAP. This provides centralized user management and single sign-on capabilities for users within an organization.

Here's a detailed breakdown of how LDAP authentication works in Rocket.Chat:

### 1. Configuration

Before any authentication can happen, LDAP needs to be configured in Rocket.Chat's administration interface:

*   **Admin UI Path:** `Administration > Workspace > Settings > Authentication > LDAP`
*   **Key Settings:**
    *   `LDAP_Enable`: Toggles LDAP authentication on/off.
    *   `LDAP_Host`, `LDAP_Port`, `LDAP_TLS`: Connection details for the LDAP server.
    *   `LDAP_Bind_DN`, `LDAP_Bind_Password`: Credentials for a service account (or "bind user") that Rocket.Chat uses to connect to the LDAP server and perform searches. This account typically needs read access to the user directory.
    *   `LDAP_User_Search_DN`: The base DN (Distinguished Name) where Rocket.Chat should start searching for users (e.g., `ou=Users,dc=example,dc=com`).
    *   `LDAP_User_Search_Filter`: An LDAP filter to narrow down user searches (e.g., `(&(objectClass=user)(sAMAccountName={username}))` for Active Directory, or `(&(objectClass=person)(uid={username}))` for OpenLDAP). The `{username}` placeholder is crucial.
    *   `LDAP_User_DN_Field`: The LDAP attribute that contains the user's full DN (e.g., `dn`).
    *   `LDAP_Username_Field`, `LDAP_Email_Field`, `LDAP_Name_Field`: Mappings from LDAP attributes (e.g., `sAMAccountName`, `mail`, `cn`) to Rocket.Chat's user fields.
    *   `LDAP_Sync_User_Data`: Enables synchronization of user data (email, name, etc.) from LDAP to Rocket.Chat.
    *   `LDAP_Sync_User_Data_Groups`: Enables synchronization of user groups/roles.
    *   `LDAP_Login_Fallback`: Allows users to log in with their local Rocket.Chat password if LDAP authentication fails (e.g., if the LDAP server is unreachable).

These settings are stored in the `rocketchat_settings` MongoDB collection.

### 2. High-Level Authentication Flow

1.  **User attempts login:** A user enters their username and password on the Rocket.Chat login screen.
2.  **Server receives credentials:** The client sends these credentials to the Rocket.Chat server via a Meteor method call (typically `login`).
3.  **LDAP Login Handler:** Rocket.Chat's authentication system checks registered login handlers. If LDAP is enabled, the LDAP handler is invoked.
4.  **Connect to LDAP:** Rocket.Chat establishes a connection to the configured LDAP server.
5.  **Search for User:** Using the `LDAP_Bind_DN` and `LDAP_Bind_Password`, Rocket.Chat performs a search for the user based on the provided username and `LDAP_User_Search_DN`/`LDAP_User_Search_Filter`.
6.  **Authenticate User:** If the user is found, Rocket.Chat attempts to *bind* to the LDAP server using the user's full DN (obtained from the search) and the password provided by the user.
7.  **Success/Failure:**
    *   **Success:** The bind operation succeeds, meaning the credentials are valid.
    *   **Failure:** The bind operation fails. If `LDAP_Login_Fallback` is enabled, Rocket.Chat might try local password authentication. Otherwise, the login fails.
8.  **User Provisioning/Synchronization:** If authentication is successful, Rocket.Chat creates or updates the user's profile in its local database (`rocketchat_users` MongoDB collection) based on the configured attribute mappings.
9.  **Session Creation:** Rocket.Chat creates a local session for the user, allowing them to access the workspace.

### 3. Detailed Authentication Process (Code Perspective)

Rocket.Chat uses the `ldapjs` library for its LDAP interactions.

1.  **Login Request:**
    *   When a user submits the login form, the client calls the `login` Meteor method on the server.
    *   **File:** `server/methods/login.js` (and related files in `app/authentication/server/`)

2.  **LDAP Login Handler Invocation:**
    *   The `login` method iterates through registered authentication handlers.
    *   The LDAP handler is registered during server startup.
    *   **File:** `app/authentication/server/startup.js` (registers the handler)
    *   **File:** `app/authentication/server/lib/ldap.js` (defines the actual LDAP login handler logic)

3.  **Retrieve LDAP Settings:**
    *   The handler fetches all necessary LDAP configuration settings from the `rocketchat_settings` collection.
    *   **File:** `server/lib/settings/index.js` (provides access to settings)

4.  **LDAP Client Initialization & Connection:**
    *   An `ldapjs` client is created using the configured `LDAP_Host`, `LDAP_Port`, and `LDAP_TLS` settings.
    *   **File:** `server/lib/ldap/ldap.js` (contains the core LDAP client logic, connection, bind, search functions)

5.  **Initial Bind (for searching):**
    *   If `LDAP_Bind_DN` and `LDAP_Bind_Password` are provided, Rocket.Chat performs an initial bind to the LDAP server using these credentials. This establishes a privileged connection for searching.
    *   **Function:** `ldap.bind()` in `server/lib/ldap/ldap.js`

6.  **User Search:**
    *   Rocket.Chat constructs an LDAP search query using `LDAP_User_Search_DN` and `LDAP_User_Search_Filter` (replacing `{username}` with the user's input).
    *   It performs a search operation on the LDAP server.
    *   **Function:** `ldap.search()` in `server/lib/ldap/ldap.js`

7.  **User Authentication (Second Bind):**
    *   If the search yields a unique user entry, Rocket.Chat extracts the user's full DN (e.g., `cn=John Doe,ou=Users,dc=example,dc=com`) from the search result.
    *   It then attempts a *second bind* to the LDAP server, this time using the *user's full DN* and the *password provided by the user*.
    *   This bind attempt is the actual authentication step. If it succeeds, the user's credentials are valid. If it fails, the password is incorrect.

8.  **User Synchronization (`ldap.sync.js`):**
    *   Upon successful authentication, Rocket.Chat calls the synchronization logic.
    *   **File:** `server/lib/ldap/sync.js`
    *   This module:
        *   Retrieves user attributes (email, name, username, etc.) from the LDAP entry based on the configured mappings (`LDAP_Username_Field`, `LDAP_Email_Field`, etc.).
        *   Checks if a user with that username/email already exists in `rocketchat_users`.
        *   If not, it creates a new user document in `rocketchat_users`, marking them as an LDAP user.
        *   If yes, it updates the existing user's profile with the latest data from LDAP (if `LDAP_Sync_User_Data` is enabled).
        *   Handles group/role synchronization if `LDAP_Sync_User_Data_Groups` is enabled, mapping LDAP groups to Rocket.Chat roles.

9.  **Login Token Generation:**
    *   Finally, Rocket.Chat generates a login token and returns it to the client, completing the login process.

### Key Takeaways:

*   **No Password Storage:** Rocket.Chat never stores the user's LDAP password. It only sends the password to the LDAP server for verification during the bind operation.
*   **Two-Step Bind (Common):** Often, there's an initial "bind" with a service account to search for the user, followed by a "bind" with the user's actual credentials to authenticate them.
*   **Local User Representation:** Even though authentication happens externally, Rocket.Chat maintains a local representation of the user in its MongoDB database (`rocketchat_users`) to store their settings, messages, and other Rocket.Chat-specific data.
*   **Synchronization:** LDAP integration isn't just for authentication; it also allows for keeping user profiles (and potentially groups/roles) synchronized with the directory server.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,613 |
| Model | gemini-2.5-flash |
| Tools | NONE |
