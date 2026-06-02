# How does enterprise feature gating work in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat implements a robust enterprise feature gating mechanism to differentiate between its community/open-source offering and its commercial Enterprise Edition (EE) features. This system relies on license keys, feature definitions, and checks performed on both the server and client sides.

Here's a breakdown of how it works:

### 1. License Acquisition and Storage

1.  **License Key:** Enterprise customers receive a license key, which is an encrypted string containing information about their subscription, such as:
    *   Enabled features (e.g., `auditing`, `sso-ldap`, `omnichannel-priorities`, `canned-responses-enterprise`, `push-notifications-proxy`).
    *   Expiry date.
    *   Number of users.
    *   Workspace ID.
    *   License type/tier.

2.  **License Validation & Storage:**
    *   When an administrator connects their workspace to Rocket.Chat Cloud or manually uploads a license key, the key is sent to Rocket.Chat's licensing server for validation.
    *   Upon successful validation, the license data (the decrypted features, expiry, etc.) is stored in the MongoDB database, typically within the `rocketchat_settings` collection as a special setting, or in a dedicated collection.
    *   **Core Logic:** `ee/lib/License.ts` is the central file responsible for loading, parsing, validating, and managing the license. It handles decrypting the license key and making its contents available.

### 2. Feature Definition and Core Gating Logic

1.  **Feature Identifiers:** Each enterprise feature is identified by a unique string key (e.g., `'auditing'`, `'sso-ldap'`). These keys are defined within the code where the feature is implemented or checked.

2.  **`RocketChat.License.hasFeature()`:** This is the central function used across the codebase to check if a specific feature is enabled by the current license.
    *   **Server-side:** The `ee/lib/feature-manager/server/server.ts` module (or similar within `ee/lib`) provides the server-side implementation. It reads the stored license information from the database and checks if the requested feature key exists in the list of enabled features.
    *   **Client-side:** A client-side reactive version of this function (often exposed via `RocketChat.License.hasFeature()`) allows UI components to reactively update based on the license status without needing full page reloads. This relies on Meteor's reactivity or a dedicated publication.

### 3. Server-Side Enforcement

Server-side enforcement is crucial to prevent unauthorized access to enterprise features, even if a user tries to bypass client-side checks.

1.  **API Endpoints:** Many enterprise API endpoints are protected. Before executing the logic, the server checks the license.
    *   **Example:** An API route for managing SAML or LDAP settings (which are EE features) would call `RocketChat.License.hasFeature('sso-saml')` or `RocketChat.License.hasFeature('sso-ldap')`. If the feature is not licensed, it typically returns a `403 Forbidden` error.
    *   **File Example:** You'd find checks in files like `ee/server/api/v1/users.ts` (for SAML/LDAP related user operations) or `ee/server/api/v1/omnichannel/priorities.ts`.

2.  **Meteor Methods:** Similarly, Meteor methods (RPC calls from the client to the server) that pertain to EE features also perform license checks.
    *   **Example:** A method to "start an audit log" or "create an enterprise-level canned response" would begin with `if (!RocketChat.License.hasFeature('auditing')) { throw new Meteor.Error('not-licensed', 'Auditing feature not licensed.'); }`.
    *   **File Example:** `ee/server/methods/livechat/cannedResponses/saveCannedResponse.ts` might have such a check for advanced canned responses.

3.  **Background Jobs/Event Listeners:** Any server-side process that triggers an enterprise-only action (e.g., advanced analytics aggregation, data retention policies) will also have a license check at its entry point.

### 4. Client-Side Enforcement (UI Gating)

Client-side enforcement hides or disables UI elements related to enterprise features when the license is not present. This provides a clean user experience and encourages upgrades.

1.  **`FeatureGate` Component:** Rocket.Chat provides a dedicated UI component, typically named `FeatureGate` or similar, which is the primary mechanism for client-side gating.
    *   **Path:** `app/ui-utils/client/components/FeatureGate/FeatureGate.tsx`
    *   **Usage:**
        ```typescript jsx
        import { FeatureGate } from '../../../app/ui-utils/client/components/FeatureGate';

        // ... in a React component's render method
        <FeatureGate feature='auditing'>
            <AuditingSettingsPage />
        </FeatureGate>

        <FeatureGate feature='livechat-priorities' fallback={
            <Button disabled primary>
                Enable Livechat Priorities (requires Enterprise)
            </Button>
        }>
            <LivechatPrioritiesButton />
        </FeatureGate>
        ```
    *   **How it works:** The `FeatureGate` component subscribes to the license status and calls `RocketChat.License.hasFeature(props.feature)`. If the feature is present, it renders its `children`. Otherwise, it renders its `fallback` prop (if provided) or nothing.

2.  **Settings Pages:** Entire sections or individual settings within the administration panel are often wrapped in `FeatureGate` components.
    *   **Example:** The settings for SAML/LDAP authentication, advanced omnichannel features, or audit logs will only appear if the corresponding license feature is active.
    *   **File Example:** You'll find `FeatureGate` usage in many React components within `ee/client/components`, `ee/client/views`, and even `app/administration/client/settings/` when referencing EE-specific settings.

3.  **Navigation and Routes:** Some navigation items or entire client-side routes might be conditionally rendered or guarded based on license checks.

### 5. Reactive Updates

When a license is updated (e.g., a new license is uploaded, or an existing one expires), the server broadcasts this change.
*   The client-side `RocketChat.License.hasFeature()` reactive source updates.
*   Any `FeatureGate` components or other reactive UI elements listening to this update will automatically re-render, showing or hiding features as appropriate.

In summary, Rocket.Chat's enterprise feature gating is a comprehensive system that integrates license management, server-side access control, and client-side UI adjustments to ensure that commercial features are only available to licensed customers, providing a clear distinction between its community and enterprise offerings.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,305 |
| Model | gemini-2.5-flash |
| Tools | NONE |
