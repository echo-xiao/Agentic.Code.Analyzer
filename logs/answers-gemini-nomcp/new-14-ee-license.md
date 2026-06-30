# How does enterprise feature gating work in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat implements enterprise feature gating primarily through its **licensing system**, which determines the "plan" (e.g., Community, Pro, Enterprise) a server is running. This plan then dictates which features are enabled or disabled throughout the application, both on the server and client sides.

Here's a breakdown of how it works:

### 1. Core Licensing Module (`app/license/server`)

The heart of the feature gating is the `app/license/server` module. This module is responsible for:

*   **Reading and Validating Licenses:** It processes the license key provided by Rocket.Chat Cloud, validating its authenticity, expiry, and the associated plan. Licenses are typically stored in the `rocketchat_license` MongoDB collection.
*   **Determining Active Features:** Based on the validated license, it identifies the set of features that are enabled for the current server.
*   **Providing Feature Check Functions:** It exposes methods to query whether a specific feature is active.

**Key Files:**

*   **`app/license/server/index.ts`**: The main entry point for the license service, initializing it and making its methods available.
*   **`app/license/server/planFeatures.ts`**: This is a crucial file! It contains a mapping of **feature names** to the **plans** they belong to. This central definition allows the system to consistently check feature availability.
    *   *Example structure (simplified):*
        ```typescript
        export const planFeatures: Record<string, FeaturePlan[]> = {
            'omnichannel-livechat-monitors': ['enterprise'],
            'teams': ['pro', 'enterprise'],
            'auditing': ['enterprise'],
            'ldap-advanced': ['enterprise'],
            // ... more features
        };
        ```
*   **`app/license/server/license.ts`**: Defines the `License` class (or similar singleton) that manages the active license, parses its details, and provides methods like `License.has('featureName')`, `License.isPro()`, `License.isEnterprise()`, etc.

### 2. Server-Side Feature Gating

Server-side gating is critical for security and enforcing business rules. If a feature is not licensed, the server will prevent its execution or access.

**How it's implemented:**

*   **API Endpoints:** Many API endpoints check for specific features. Before allowing a request to proceed, the API handler will call `License.has('feature-name')`.
    *   *Example:* An API endpoint for an Enterprise-only feature (e.g., advanced audit logs) would have a check like:
        ```typescript
        // In an API route handler (e.g., ee/server/api/v1/auditing.ts)
        API.v1.addRoute('auditing/:type', { authRequired: true }, {
            get() {
                if (!License.has('auditing')) {
                    throw new Meteor.Error('not-authorized', 'Auditing feature requires an Enterprise license.');
                }
                // ... logic for fetching audit logs
            }
        });
        ```
*   **Meteor Methods:** Similarly, DDP methods called from the client will perform license checks.
    *   *Example:* A method to configure a specific integration available only in Enterprise:
        ```typescript
        // In a server/methods file (e.g., ee/server/methods/configureAdvancedIntegration.ts)
        Meteor.methods({
            'advancedIntegration.configure'(settings) {
                if (!License.has('advanced-integration')) {
                    throw new Meteor.Error('not-authorized', 'This integration requires an Enterprise license.');
                }
                // ... configuration logic
            },
        });
        ```
*   **Settings:** Many administration settings are feature-gated. The setting itself might only appear if the feature is licensed, or its value might only be applied if the license permits. This is often handled within `app/settings/server/settings.ts` or specific `ee/app/settings/server/*.ts` files using `settings.add()` with a `conditions` or `enableQuery` property that checks `License.has()`.
    *   *Example:*
        ```typescript
        // In app/settings/server/settings.ts or ee/app/settings/server/settings.ts
        settings.add('Enterprise_Feature_Enabled', false, {
            type: 'boolean',
            group: 'Enterprise',
            public: true,
            enterprise: true, // A shorthand some settings might use for license check
            enableQuery: () => License.has('some-enterprise-feature'), // Explicit check
        });
        ```
*   **Backend Jobs/Services:** Any background processes or services that provide premium functionality will also perform license checks before running.

### 3. Client-Side Feature Awareness

The client-side (UI) needs to know which features are enabled to render the appropriate UI elements (e.g., show/hide menu items, disable buttons, display "Upgrade to Enterprise" messages).

**How it's implemented:**

*   **Publications:** The server publishes the active license and plan information (often an anonymized version without the key itself) to the client. This allows the client-side `License` service to reactively update its state.
    *   *Example:* `app/license/server/publications/license.ts` might publish `license.plan`, `license.active`, `license.expires`, etc.
*   **Client-Side `License` Module:** A client-side `License` service (e.g., `client/lib/license.ts` or similar) mirrors the server-side functionality. It subscribes to the license publication and provides helper functions like `hasLicense('feature-name')`, `isPro`, `isEnterprise` for UI components.
*   **UI Components:** React components (or older Blaze templates) then use these client-side helpers to conditionally render parts of the UI.
    *   *Example in a React component:*
        ```typescript
        import { useLicense } from '@rocket.chat/ui-contexts'; // A common pattern for context/hooks

        const MyFeatureButton = () => {
            const { hasAtLeastOneLicense, queryLicense } = useLicense();

            const isAdvancedFeatureLicensed = hasAtLeastOneLicense('my-advanced-feature');

            if (!isAdvancedFeatureLicensed) {
                return <UpgradeToEnterpriseButton />;
            }

            return <button onClick={() => alert('Advanced feature!')}>Use Advanced Feature</button>;
        };
        ```
    *   This ensures that users only see and interact with features they are entitled to, improving UX and guiding them towards upgrades.

### Summary of the Flow:

1.  **License Activation:** An administrator enters a license key in the Rocket.Chat admin UI, which is then sent to Rocket.Chat Cloud for validation.
2.  **Server-Side Storage:** The validated license (including the plan type) is stored in the `rocketchat_license` collection.
3.  **License Service Initialization:** On server startup, the `app/license/server/license.ts` module reads the license and initializes the `License` service.
4.  **Feature Mapping:** `app/license/server/planFeatures.ts` defines which features belong to which plans.
5.  **Runtime Checks:**
    *   **Server:** Any request (API, Method call, setting update) for a gated feature calls `License.has('feature-name')`. If the check fails, access is denied.
    *   **Client:** The client receives license information via a publication. UI components use client-side helpers (`useLicense`, etc.) to conditionally render or disable UI elements based on `License.has('feature-name')` checks.

This robust system ensures that enterprise features are correctly gated and managed across the entire Rocket.Chat application stack.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,254 |
| Model | gemini-2.5-flash |
| Tools | NONE |
