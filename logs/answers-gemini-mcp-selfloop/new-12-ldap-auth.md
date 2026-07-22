# How does LDAP authentication work in Rocket.Chat?

## Plan

intent: architecture

## Gemini Answer

LDAP authentication in Rocket.Chat involves both client-side initiation and server-side handling.

**Client-side Flow:**

1.  **`loginWithLDAP`**: The client initiates the LDAP login process through the `loginWithLDAP` function, located in `apps/meteor/client/meteor/login/ldap.ts`.
2.  **`callLoginMethod`**: This function then calls `callLoginMethod` within the `AuthenticationProvider` (defined in `apps/meteor/client/providers/AuthenticationProvider/AuthenticationProvider.tsx`). This provider centralizes client-side authentication logic and acts as a dispatcher for various login methods.

**Server-side Flow:**

1.  **`Accounts.registerLoginHandler`**: On the server, LDAP authentication is handled by a login handler registered with `Accounts.registerLoginHandler`. This registration occurs in `apps/meteor/server/configuration/ldap.ts`. This handler is responsible for processing the login request sent from the client.
2.  **LDAP Settings**: The server-side LDAP configuration is managed through settings defined in `apps/meteor/server/settings/ldap.ts` by the `createLdapSettings` function. These settings include:
    *   **Connection**: `LDAP_Enable`, `LDAP_Server_Type`, `LDAP_Host`, `LDAP_Port`, `LDAP_Reconnect`, `LDAP_Login_Fallback`, `LDAP_Authentication` (with `LDAP_Authentication_UserDN` and `LDAP_Authentication_Password`), `LDAP_Encryption` (plain, TLS, SSL/LDAPS with `LDAP_CA_Cert` and `LDAP_Reject_Unauthorized`), and various timeouts.
    *   **User Search**: `LDAP_Find_User_After_Login`, `LDAP_BaseDN`, `LDAP_User_Search_Filter`, `LDAP_User_Search_Scope`, `LDAP_AD_User_Search_Field` (for Active Directory) or `LDAP_User_Search_Field` (for other LDAP), `LDAP_Search_Page_Size`, and `LDAP_Search_Size_Limit`.
    *   **Group Filter**: `LDAP_Group_Filter_Enable`, `LDAP_Group_Filter_ObjectClass`, `LDAP_Group_Filter_Group_Id_Attribute`, `LDAP_Group_Filter_Group_Member_Attribute`, `LDAP_Group_Filter_Group_Member_Format`, and `LDAP_Group_Filter_Group_Name`.
    *   **Data Synchronization**: `LDAP_Unique_Identifier_Field`, `LDAP_Merge_Existing_Users`, `LDAP_Update_Data_On_Login`, `LDAP_Update_Data_On_OAuth_Login`, `LDAP_Default_Domain`, and data mapping fields like `LDAP_AD_Username_Field`, `LDAP_Username_Field`, `LDAP_AD_Email_Field`, `LDAP_Email_Field`, `LDAP_AD_Name_Field`, `LDAP_Name_Field`, `LDAP_Extension_Field`, `LDAP_FederationHomeServer_Field`, `LDAP_DataSync_UseVariables`, and `LDAP_DataSync_VariableMap`.
    *   **Avatar Synchronization**: `LDAP_Sync_User_Avatar` and `LDAP_Avatar_Field`.

**Flow Summary:**

1.  **Client (Browser/App)**: User attempts to log in with LDAP credentials.
2.  **`apps/meteor/client/meteor/login/ldap.ts`**: `loginWithLDAP` is called.
3.  **`apps/meteor/client/providers/AuthenticationProvider/AuthenticationProvider.tsx`**: `callLoginMethod` is invoked, sending the login request to the server.
4.  **Server**: The `Accounts.registerLoginHandler` in `apps/meteor/server/configuration/ldap.ts` intercepts the login request.
5.  **Server**: The LDAP login handler uses the configured settings from `apps/meteor/server/settings/ldap.ts` to connect to the LDAP server, authenticate the user, and synchronize user data.

## Tool Calls (8 calls, 61,038 tokens)

**Step 1:** `plan({"question":"How does LDAP authentication work in Rocket.Chat?","intent":"architecture"})` → 3645 tokens
**Step 2:** `search({"query":"loginWithLDAP"})` → 68 tokens
**Step 3:** `graph({"query":"loginWithLDAP","move":"down","file":"ldap.ts","depth":3})` → 83 tokens
**Step 4:** `search({"query":"Accounts.registerLoginHandler"})` → 295 tokens
**Step 5:** `details({"symbolName":"Accounts.registerLoginHandler","filename":"ldap.ts"})` → 50 tokens
**Step 6:** `details({"filename":"ldap.ts","symbolName":"file"})` → 54 tokens
**Step 7:** `details({"filename":"ldap.ts","symbolName":"createLdapSettings"})` → 1863 tokens
**Step 8:** `graph({"move":"down","query":"file","depth":1,"file":"ldap.ts"})` → 45 tokens

## Files Seen In Tool Results (42)

- `apps/meteor/client/providers/AuthenticationProvider/AuthenticationProvider.tsx`
- `packages/ui-contexts/src/AuthenticationContext.ts`
- `apps/meteor/client/definitions/IOAuthProvider.ts`
- `apps/meteor/app/2fa/server/twoFactorRequired.ts`
- `apps/meteor/app/2fa/server/code/index.ts`
- `apps/meteor/app/2fa/server/code/ICodeCheck.ts`
- `apps/meteor/app/2fa/server/lib/totp.ts`
- `apps/meteor/client/meteor/overrides/totpOnCall.ts`
- `apps/meteor/client/lib/2fa/utils.ts`
- `apps/meteor/app/authentication/server/ILoginAttempt.ts`
- `apps/meteor/server/lib/ldap/UserConverter.ts`
- `apps/meteor/app/apps/server/bridges/cloud.ts`
- `packages/apps-engine/src/server/oauth2/OAuth2Client.ts`
- `apps/meteor/client/lib/customOAuth/CustomOAuthError.ts`
- `apps/meteor/client/lib/customOAuth/CustomOAuth.ts`
- `apps/meteor/server/settings/ldap.ts`
- `packages/ddp-client/__examples__/simple.ts`
- `packages/apps-engine/src/server/managers/AppLicenseManager.ts`
- `apps/meteor/server/settings/cas.ts`
- `apps/meteor/client/providers/AuthenticationProvider/hooks/useLDAPAndCrowdCollisionWarning.tsx`
- `apps/meteor/server/lib/ldap/Connection.ts`
- `apps/meteor/app/api/server/ApiClass.ts`
- `apps/meteor/server/services/authorization/service.ts`
- `apps/meteor/app/lib/server/startup/rateLimiter.js`
- `packages/apps-engine/src/server/accessors/ExperimentalRead.ts`
- `packages/ddp-client/src/types/Account.ts`
- `packages/cas-validate/src/validate.ts`
- `apps/meteor/client/views/root/hooks/useIframe.ts`
- `ee/packages/abac/src/errors.ts`
- `apps/meteor/client/lib/loginServices.ts`
- `packages/apps-engine/src/server/accessors/LivechatCreator.ts`
- `packages/apps-engine/src/server/managers/AppSignatureManager.ts`
- `apps/meteor/client/lib/errors/RocketChatError.ts`
- `apps/meteor/client/meteor/login/ldap.ts`
- `apps/meteor/app/apple/server/loginHandler.ts`
- `apps/meteor/app/meteor-accounts-saml/server/loginHandler.ts`
- `apps/meteor/app/iframe-login/server/iframe_server.ts`
- `apps/meteor/app/crowd/server/crowd.ts`
- `apps/meteor/app/2fa/server/loginHandler.ts`
- `apps/meteor/server/configuration/cas.ts`
- `apps/meteor/server/configuration/ldap.ts`
- `packages/apps-engine/src/server/messages/Message.ts`
