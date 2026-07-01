# How does LDAP authentication work in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat integrates with LDAP (Lightweight Directory Access Protocol) to authenticate users against an external directory server and optionally synchronize user data. The implementation leverages the `ldapjs` library on the server-side.

Here's a breakdown of how LDAP authentication works in Rocket.Chat:

## Core Principles

1.  **Server-Side Integration:** All LDAP communication happens on the Rocket.Chat server, not the client.
2.  **Two-Step Bind Process:**
    *   **Service Account Bind (Optional but Recommended):** Rocket.Chat first binds to the LDAP server using a configured "service account" (defined by `LDAP_DN` and `LDAP_Password`). This account needs read permissions to search the directory for users. This is used to find the user's full DN (Distinguished Name) based on their provided username.
    *   **User Credential Bind:** Once the user's full DN is found, Rocket.Chat attempts to bind *again* using that user's full DN and the password they provided during login. If this bind succeeds, the user is authenticated. This is the crucial step for verifying the user's password.
3.  **User Synchronization:** After successful authentication, Rocket.Chat can optionally create new users or update existing user profiles (email, name, etc.) based on attributes fetched from the LDAP directory.

## Configuration (Admin Panel)

All LDAP settings are managed in the Rocket.Chat Admin Panel under **Workspace -> Settings -> LDAP**. Key settings include:

*   **Enable LDAP:** `LDAP_Enable`
*   **Server Details:** `LDAP_Host`, `LDAP_Port`, `LDAP_TLS` (for secure connections).
*   **Bind Account:** `LDAP_DN`, `LDAP_Password` (the service account for searching).
*   **User Search:** `LDAP_Search_DN` (the base DN for user searches), `LDAP_Search_Filter` (e.g., `(&(objectClass=user)(sAMAccountName=#{username}))`), `LDAP_User_DN_Field` (the attribute used as the username, e.g., `sAMAccountName`, `uid`).
*   **User Synchronization:** `LDAP_Sync_User_Data`, `LDAP_Sync_User_Data_FieldMap` (maps LDAP attributes to Rocket.Chat user fields like `name`, `email`, `username`).
*   **Group Synchronization:** `LDAP_Group_Filter`, `LDAP_Group_DN`, `LDAP_Group_Attribute`, `LDAP_Group_Role_Map` (for assigning roles based on LDAP groups).

## Authentication Flow

1.  **User Initiates Login:** A user enters their username and password on the Rocket.Chat login screen.
2.  **Client Sends Credentials:** The client sends these credentials to the Rocket.Chat server, typically via a Meteor `Accounts` method like `loginWithPassword`.
3.  **Server-Side Login Handler:** Rocket.Chat's custom LDAP login handler is triggered. This handler is registered using Meteor's `Accounts.addLoginHandler`.
    *   **File:** `app/ldap/server/startup.js` (registers the handler) and `app/ldap/server/lib/ldap.js` (contains the core logic).
4.  **Check LDAP Enablement:** The handler first checks if `LDAP_Enable` is set to `true`.
5.  **Find User's DN (Service Account Bind):**
    *   If `LDAP_DN` and `LDAP_Password` are configured, Rocket.Chat attempts to bind to the LDAP server using these credentials.
    *   It then performs an LDAP search using `LDAP_Search_DN` and `LDAP_Search_Filter` (where `#{username}` is replaced by the user's input) to find the user's full Distinguished Name (DN).
    *   If the user is not found, authentication fails.
6.  **Authenticate User (User Credential Bind):**
    *   Using the found user's full DN and the password provided by the user, Rocket.Chat attempts another bind operation to the LDAP server.
    *   If this bind succeeds, the user's password is confirmed, and they are authenticated.
    *   If this bind fails, authentication fails (e.g., incorrect password).
7.  **User Synchronization (Optional):**
    *   If `LDAP_Sync_User_Data` is enabled, Rocket.Chat fetches the user's attributes from their LDAP entry.
    *   It then checks if a Rocket.Chat user with the same username (or mapped field) already exists.
    *   **New User:** If no user exists, a new Rocket.Chat user account is created using the fetched LDAP attributes and the `LDAP_Sync_User_Data_FieldMap`.
    *   **Existing User:** If a user exists, their profile is updated with the latest information from LDAP, again based on the `LDAP_Sync_User_Data_FieldMap`.
    *   **File:** `app/ldap/server/sync.js` handles the user creation/update logic.
8.  **Group/Role Synchronization (Optional):**
    *   If group synchronization is configured, Rocket.Chat fetches the user's group memberships from LDAP.
    *   It then maps these groups to Rocket.Chat roles based on `LDAP_Group_Role_Map` and assigns/removes roles accordingly.
9.  **Login Success:** The user is successfully logged into Rocket.Chat.

## Key Code Paths

*   **Core LDAP Client Logic:**
    *   `app/ldap/server/lib/ldap.js`: This file contains the primary functions for connecting to the LDAP server, performing binds, searches, and handling results. It wraps the `ldapjs` library.
*   **LDAP Service Initialization & Login Handler Registration:**
    *   `app/ldap/server/startup.js`: This file runs on server startup, initializes the LDAP service, and registers the custom login handler with Meteor's `Accounts.addLoginHandler`.
*   **LDAP Settings Definition:**
    *   `app/ldap/server/settings.js`: Defines all the LDAP-related settings that appear in the Admin Panel.
*   **User Synchronization Logic:**
    *   `app/ldap/server/sync.js`: Contains the functions responsible for creating new Rocket.Chat users from LDAP data and updating existing ones.
*   **Server-Side Methods (e.g., for testing connection):**
    *   `app/ldap/server/methods.js`: Defines Meteor methods like `testLDAPConnection` which can be called from the client (e.g., Admin Panel) to verify LDAP configuration.
*   **Watchers for Settings Changes:**
    *   `app/ldap/server/watchers.js`: Observes changes to LDAP settings in the database and reconfigures the LDAP service accordingly without requiring a server restart.
*   **General Authentication Handlers:**
    *   `app/authentication/server/lib/loginHandlers.js`: This is where custom login handlers (like LDAP's) are generally managed and registered within Rocket.Chat's broader authentication system.

In essence, Rocket.Chat's LDAP integration acts as a robust authentication provider, allowing organizations to centralize user management in their existing directory services while providing a seamless login experience for their users.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,288 |
| Model | gemini-2.5-flash |
| Tools | NONE |
