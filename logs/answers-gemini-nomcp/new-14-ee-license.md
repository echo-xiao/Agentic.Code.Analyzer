# How does enterprise feature gating work in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat implements enterprise feature gating through a robust licensing system that integrates deeply with its settings, UI components, and server-side logic. The core idea is to tie the availability of specific features to a valid license obtained from Rocket.Chat Cloud.

Here's a breakdown of how it works:

### 1. The Licensing System (Server-Side Core)

The heart of the enterprise feature gating lies in the `app/license` package, specifically on the server.

*   **License Storage:** The workspace's license is typically stored as a JSON Web Token (JWT) in the database (e.g., in the `rocketchat_settings` collection under a key like `License_token`). This token is obtained when the workspace connects to Rocket.Chat Cloud and registers.
*   **License Validation:**
    *   On server startup, and periodically, the system validates the stored JWT.
    *   The JWT contains crucial information:
        *   `workspaceId`: Unique identifier for the workspace.
        *   `expiry`: When the license expires.
        *   `features`: A list of specific enterprise features enabled for this license (e.g., `['engagement-dashboard', 'ldap-sync', 'auditing']`).
        *   `isEnterprise`: A boolean flag indicating if it's an enterprise license.
        *   `trial`: Information about any active trial period.
    *   The validation process ensures the token is valid, not expired, and signed correctly.
*   **`app/license/server/license.ts`**: This file is central.
    *   It defines the `License` object, which is a singleton that manages the current license state.
    *   `License.has(featureName: string)`: This is the primary function used throughout the server to check if a specific feature is enabled by the current license. It checks the `features` array within the parsed JWT.
    *   `License.get.isEnterprise`: A getter to quickly check if *any* enterprise license is active.
    *   `License.get.features`: Returns the array of enabled features.
    *   `License.get.trial`: Provides details about an active trial, if any.
    *   It uses `Tracker.Dependency` to make license changes reactive, meaning any part of the server code observing `License.has()` will automatically re-run if the license changes (e.g., expires, is updated).

### 2. Settings Integration

Many enterprise features are controlled by settings in the Administration panel. Rocket.Chat's settings system is designed to integrate with the licensing system:

*   **`settings.add()` with `licenseFeature`**: When defining a setting (e.g., in `app/settings/server/settings.ts` or feature-specific settings files), you can specify a `licenseFeature` property.
    *   **Example:**
        ```typescript
        settings.add('Engagement_Dashboard_Enabled', false, {
            type: 'boolean',
            group: 'Engagement Dashboard',
            public: true,
            i18nLabel: 'Engagement_Dashboard_Enabled',
            licenseFeature: 'engagement-dashboard', // This links the setting to the 'engagement-dashboard' feature
        });
        ```
*   **Automatic Gating:** If a setting has `licenseFeature` defined, it will only be visible and editable in the Administration panel if the current license *has* that specific feature. Otherwise, the setting will be hidden or disabled, preventing users from enabling a feature they are not licensed for.

### 3. Client-Side Access and UI Gating

The client-side needs to know which features are available to correctly render the UI, show/hide menu items, and enable/disable buttons.

*   **`app/license/client/license.ts`**: This file provides client-side helpers.
    *   It exposes a reactive data source (often via a Meteor publication/subscription or a dedicated API endpoint) that provides the current license status and enabled features to the client.
    *   `useLicense()` (or similar hooks/helpers): React components can use this to get the current license information.
    *   `hasLicenseFeature(featureName: string)`: A client-side helper function that mirrors the server-side `License.has()`, allowing UI components to conditionally render based on feature availability.
*   **UI Components:**
    *   **`FeatureToggle` (or similar):** Rocket.Chat often uses wrapper components or conditional rendering logic in React components.
        ```typescript
        import { hasLicenseFeature } from '../../lib/license'; // Example path

        const MyEnterpriseFeatureButton = () => {
            if (!hasLicenseFeature('my-enterprise-feature')) {
                return <UpgradeToEnterpriseButton />;
            }
            return <ActualFeatureButton onClick={doSomethingEnterprise} />;
        };
        ```
    *   **Admin Panel Navigation:** Menu items in the Administration panel (e.g., for LDAP, Engagement Dashboard, Auditing) are often conditionally rendered based on `hasLicenseFeature()`.
    *   **Disabled States:** If a feature is not licensed, related UI elements might be shown but disabled, with a tooltip indicating "License Required" or "Upgrade to Enterprise."

### 4. How Individual Features Use It

Throughout the codebase, specific enterprise features will explicitly check for their license:

*   **Server-Side Logic:**
    ```typescript
    import { License } from '../../license/server/license';

    // In an API endpoint or method
    Meteor.methods({
        'engagementDashboard.getData'() {
            if (!License.has('engagement-dashboard')) {
                throw new Meteor.Error('error-license-required', 'Engagement Dashboard requires an enterprise license.');
            }
            // ... proceed with data retrieval
        },
    });
    ```
*   **Client-Side Logic:**
    ```typescript
    import { hasLicenseFeature } from '../../license/client/license';

    // In a React component's useEffect or event handler
    const handleLdapSync = () => {
        if (!hasLicenseFeature('ldap-sync')) {
            alert('LDAP Sync is an enterprise feature. Please upgrade your license.');
            return;
        }
        // ... initiate LDAP sync
    };
    ```

### 5. Trial Periods

The licensing system also supports trial periods. The JWT can contain information about an active trial.

*   `License.get.trial`: This object provides details like `start`, `end`, and `has  Trial`.
*   Features can be enabled during a trial, and the UI might display banners or notifications indicating the remaining trial days. Once the trial expires, the features revert to their unlicensed state.

### Key File Paths

*   **Core License Logic (Server):**
    *   `app/license/server/license.ts`
    *   `app/license/server/methods/getLicenseStatus.ts` (API for client)
    *   `app/license/server/startup.ts` (Initial license loading/validation)
*   **Core License Logic (Client):**
    *   `app/license/client/license.ts`
    *   `client/views/admin/info/LicenseCard.tsx` (UI for displaying license info)
*   **Settings Integration:**
    *   `app/settings/server/settings.ts` (and other feature-specific `settings.ts` files)
*   **Cloud Connection:**
    *   `app/cloud/server/functions/connectWorkspace.ts` (Where the license token is typically fetched)
    *   `app/cloud/server/functions/syncWorkspace.ts` (Periodic sync)

In summary, Rocket.Chat's enterprise feature gating is a comprehensive system built around a validated JWT license. It uses server-side checks for core logic and API access, integrates with the settings system to gate configuration options, and provides client-side helpers to dynamically adjust the user interface based on the available features.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,230 |
| Model | gemini-2.5-flash |
| Tools | NONE |
