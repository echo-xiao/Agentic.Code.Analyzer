# How does enterprise feature gating work in Rocket.Chat?

## Gemini Answer

Rocket.Chat implements enterprise feature gating primarily through a `LicenseManager` and associated middleware.

Here's how it works:

1.  **`LicenseManager`**: This abstract class, defined in `ee/packages/license/src/license.ts`, is the core component for managing licenses. It provides methods like:
    *   `hasModule(license)`: Checks if a specific enterprise module (feature) is enabled by the current license. This is a key method for feature gating.
    *   `validateLicense()`: Handles the validation of an installed license.
    *   `setLicense()`: Installs and decrypts a new enterprise license.
    *   `shouldPreventAction()`: Determines if a particular action should be prevented based on license limits (e.g., active users, private apps).

2.  **License Middleware**: In `apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts`, a `license` middleware is defined. This middleware takes `options` which include an array of required license modules. When an API endpoint protected by this middleware is accessed:
    *   It iterates through the `options.license` array.
    *   For each required license module, it calls `licenseManager.hasModule(license)` to verify if the module is active.
    *   If any required module is missing, it returns a `400` status code with the error message "This is an enterprise feature \[error-action-not-allowed]".

**Call Chain for Feature Gating:**

1.  **API Endpoint/Method Call**: A client or server component attempts to access an enterprise feature, often through a REST API endpoint or a Meteor method.
2.  **License Middleware**: For API routes, the `license` middleware (`apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts`) is invoked.
3.  **`LicenseManager.hasModule()`**: The middleware calls `LicenseManager.hasModule()` (defined in `ee/packages/license/src/modules.ts`, and implemented in a concrete `LicenseManager` instance) for each required enterprise module.
4.  **Feature Access Decision**:
    *   If `hasModule()` returns `true` for all required modules, the request proceeds.
    *   If `hasModule()` returns `false` for any required module, access is denied, and an "error-action-not-allowed" error is returned.
5.  **Direct Checks**: In some cases (e.g., Meteor methods like `getReadReceipts` in `apps/meteor/ee/server/methods/getReadReceipts.ts`), the `LicenseManager.hasModule()` or a similar check might be directly called within the method implementation to gate the feature.

In essence, enterprise feature gating in Rocket.Chat relies on a centralized `LicenseManager` to validate the active license and its granted modules, with middleware and direct code checks enforcing these license requirements across various parts of the application.

## Tool Calls (8 calls, 64,212 tokens)

**Step 1:** `search({"query":"enterprise feature","layer":"ee"})` → 165 tokens
**Step 2:** `implement({"filename":"apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts","symbolName":"licenseM)` → 18 tokens
**Step 3:** `search({"query":"license","layer":"ee"})` → 336 tokens
**Step 4:** `implement({"symbolName":"license","filename":"apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts")` → 178 tokens
**Step 5:** `search({"layer":"ee","query":"LicenseManager"})` → 56 tokens
**Step 6:** `implement({"symbolName":"LicenseManager","filename":"ee/packages/license/src/license.ts"})` → 3627 tokens
**Step 7:** `graph({"direction":"up","query":"LicenseManager","mode":"tree","question":"find implementations of License)` → 662 tokens
**Step 8:** `search({"query":"extends LicenseManager","layer":"ee"})` → 17 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 3/5 |
| Tool calls | 8 |
| Total tokens | 64,212 |
