# How does LDAP authentication work in Rocket.Chat?

## Baseline Answer (no tools)

LDAP authentication in Rocket.Chat provides a robust way to integrate with existing directory services like OpenLDAP, Active Directory, or FreeIPA, allowing users to log in using their LDAP credentials.

Here's a detailed breakdown of how it works, including code locations:

## Overview

At a high level, Rocket.Chat's LDAP integration involves:
1.  **Configuration:** Administrators define LDAP server details, bind credentials, search bases, filters, and attribute mappings.
2.  **Authentication Flow:** When a user attempts to log in, Rocket.Chat tries to bind to the LDAP server using the provided username and password.
3.  **User Provisioning/Synchronization:** If authentication is successful, Rocket.Chat either creates a new user account in its MongoDB database (provisioning) or updates an existing one (synchronization) based on LDAP attributes.
4.  **Background Synchronization:** Periodically, Rocket.Chat can synchronize user data (attributes, active state) from LDAP to its local database.

## 1. Configuration (Admin Panel)

All LDAP settings are managed via the Rocket.Chat administration interface:
*   `Administration > Workspace > Settings > LDAP`

Key configuration parameters include:

*   **Enable LDAP:** `LDAP_Enable` (boolean)
*   **Host and Port:** `LDAP_Host`, `LDAP_Port`
*   **TLS/SSL:** `LDAP_TLS`, `LDAP_CA_Cert` (for secure communication)
*   **Bind DN and Password:** `LDAP_Bind_DN`, `LDAP_Bind_Password` (used by Rocket.Chat to search the directory; often a service account)
*   **Search Base:** `LDAP_Search_Base` (the starting point for user searches, e.g., `ou=users,dc=example,dc=com`)
*   **Search Filter:** `LDAP_Search_Filter` (an LDAP filter to find users, e.g., `(&(objectClass=user)(sAMAccountName=#{username}))` for Active Directory, or `(&(objectClass=person)(uid=#{username}))` for OpenLDAP)
*   **User Unique ID Field:** `LDAP_Unique_ID_Field` (the attribute used to uniquely identify users, often `sAMAccountName` or `uid`)
*   **Attribute Mapping:** Defines how LDAP attributes map to Rocket.Chat user fields (e.g., `LDAP_User_Email_Field`, `LDAP_User_Name_Field`, `LDAP_User_Username_Field`).
*   **Synchronization Settings:** `LDAP_Sync_User_Data`, `LDAP_Sync_User_Data_Interval`, `LDAP_Sync_User_Active_State`, `LDAP_Sync_Users_on_Login` (control how and when user data is synchronized).
*   **Group Synchronization:** `LDAP_Enable_Group_Sync`, `LDAP_Group_Filter_Enable`, `LDAP_Group_Filter_Groups`, `LDAP_Group_BaseDN` (for mapping LDAP groups to Rocket.Chat roles).

These settings are stored in Rocket.Chat's `rocketchat_settings` collection in MongoDB.

## 2. Authentication Flow (Login Process)

When a user tries to log in using LDAP credentials:

1.  **User Input:** The user enters their username and password on the Rocket.Chat login screen.
2.  **Login Handler:** Rocket.Chat's authentication system intercepts this login request. A specific login handler for LDAP is registered.
    *   **File:** `app/ldap/server/index.ts` (this file registers the login handler).
    *   **Function:** `Accounts.registerLoginHandler` (from Meteor's `accounts-base` package) is used here.
3.  **LDAP Service Call:** The login handler invokes the core LDAP service with the provided username and password.
    *   **File:** `app/ldap/server/lib/Ldap.ts` (contains the `Ldap` class with methods for interacting with LDAP).
    *   **Method:** Typically, a method like `Ldap.prototype.authenticate` or `Ldap.prototype.login` is called.
4.  **Construct User DN:** Based on the `LDAP_Search_Base` and `LDAP_Unique_ID_Field` settings, Rocket.Chat constructs a full Distinguished Name (DN) for the user who is attempting to log in (e.g., `uid=johndoe,ou=users,dc=example,dc=com`). This is often done by first performing a search using the `LDAP_Bind_DN` and `LDAP_Bind_Password` to find the user's actual DN based on their username.
    *   **File:** `app/ldap/server/lib/sync.ts` (has functions like `getLdapUser` that search for the user).
5.  **Bind for Authentication:** The critical step: Rocket.Chat attempts to perform an LDAP `bind` operation to the LDAP server *using the user's constructed DN and the password they provided*.
    *   **Library:** This interaction is handled by the `ldapjs` npm package.
    *   If the bind is successful, it means the user's credentials are valid according to the LDAP server.
    *   If the bind fails, authentication fails, and an error is returned to the user.
6.  **Retrieve User Attributes:** If the bind is successful, Rocket.Chat performs another search (often using the `LDAP_Bind_DN` service account) to fetch the user's complete set of attributes from their LDAP entry.
    *   **File:** `app/ldap/server/lib/users.ts` (contains logic for fetching and processing user attributes).
7.  **User Provisioning/Synchronization:**
    *   **Check Existing User:** Rocket.Chat checks if a user with the corresponding `LDAP_Unique_ID_Field` value already exists in its `rocketchat_users` collection.
    *   **Create New User:** If no user exists and `LDAP_Sync_User_Data` is enabled, a new user account is created in MongoDB. The Rocket.Chat user's fields (username, email, name, etc.) are populated based on the configured attribute mappings (`LDAP_User_Email_Field`, `LDAP_User_Name_Field`, etc.) from the fetched LDAP attributes.
    *   **Update Existing User:** If the user already exists and `LDAP_Sync_User_Data` is enabled, the user's attributes in Rocket.Chat are updated based on the latest LDAP data, according to the `LDAP_Sync_User_Data_Fields` setting.
    *   **File:** `app/ldap/server/lib/users.ts` (`syncUser` function) is central to this.
8.  **Login to Rocket.Chat:** Finally, the user is logged into Rocket.Chat, and a new session is established.

## 3. Background Synchronization

Rocket.Chat also supports background synchronization of LDAP users, independent of login attempts:

*   **Scheduler:** A `SyncedCron` job (Meteor package) is set up to run periodically.
    *   **File:** `app/ldap/server/startup.ts` (registers the cron job).
*   **Frequency:** The frequency is determined by `LDAP_Sync_User_Data_Interval`.
*   **Process:**
    1.  The cron job triggers the LDAP synchronization process.
    2.  It uses the `LDAP_Bind_DN` and `LDAP_Bind_Password` to search the LDAP directory for all users matching the `LDAP_Search_Filter`.
    3.  For each user found in LDAP:
        *   It retrieves their attributes.
        *   It checks for a corresponding user in Rocket.Chat.
        *   It either creates the user (if `LDAP_Sync_Create_new_users` is enabled) or updates their data (if `LDAP_Sync_User_Data` is enabled), similar to the login flow.
    4.  It can also deactivate users in Rocket.Chat who are no longer found or active in LDAP, if `LDAP_Sync_User_Active_State` is enabled.
*   **File:** `app/ldap/server/lib/sync.ts` (`syncLdapUsers` function) is the core logic for background sync.

## Key Code Locations & Libraries

*   **Main Module Directory:** `app/ldap`
*   **Server-Side Entry Point:** `app/ldap/server/index.ts` (Registers login handlers, startup functions)
*   **LDAP Class & Core Interaction:** `app/ldap/server/lib/Ldap.ts` (Encapsulates the `ldapjs` client, connection, and bind operations)
*   **User Synchronization Logic:** `app/ldap/server/lib/users.ts` (Handles creating, updating, and deactivating users based on LDAP data)
*   **Background Sync Logic:** `app/ldap/server/lib/sync.ts` (Manages the periodic synchronization process, including fetching all users from LDAP)
*   **Settings Definition:** `app/settings/server/settings.ts` (While settings are stored in DB, their definitions and defaults reside here or within the `app/ldap/server/settings` directory)
*   **Logging:** `app/ldap/server/lib/logger.ts` (Dedicated logger for LDAP operations)
*   **Dependencies:**
    *   `ldapjs`: The primary Node.js library used for all LDAP client operations (connecting, binding, searching).

In essence, Rocket.Chat leverages `ldapjs` to perform the necessary bind and search operations against an LDAP server, integrating these actions into its Meteor-based authentication system and providing robust user management capabilities through provisioning and synchronization.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,852 |
| Model | gemini-2.5-flash |
| Tools | NONE |
