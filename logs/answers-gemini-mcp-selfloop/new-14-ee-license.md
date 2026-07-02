# How does enterprise feature gating work in Rocket.Chat?

## Gemini Answer

Rocket.Chat's enterprise feature gating system is built around a core licensing mechanism that validates an installed license and then enables specific modules based on that license. Access to enterprise features is then controlled by checking for the presence of these enabled modules.

Here's a breakdown of the architecture and flow:

**Architecture:**

*   **LicenseManager:** This is the central component responsible for managing and validating the enterprise license. It maintains a collection of enabled modules.
*   **LicenseImp (`ee/packages/license/src/licenseImp.ts`):** This class extends `LicenseManager` and provides the concrete implementation for license handling. It exposes methods like `hasModule` for checking feature availability and handles events related to license changes (e.g., `onValidateLicense`, `onInvalidateLicense`).
*   **`hasModule` function (`ee/packages/license/src/modules.ts`):** This is the core function used to determine if a specific enterprise module is enabled. It checks if the requested module is present in the `LicenseManager`'s internal collection of active modules.
*   **API Middlewares/Feature Checks:** Throughout the codebase, particularly in the `ee` (Enterprise Edition) layer, there are checks that utilize the `hasModule` function to gate access to specific features, API endpoints, or functionalities. If a required module is not present, access is typically denied with an error.

**Flow:**

1.  **License Installation/Validation:** An enterprise license is installed and validated by the `LicenseManager` (via `LicenseImp`).
2.  **Module Activation:** Based on the validated license, the `LicenseManager` populates its internal `modules` collection with the specific `LicenseModule`s that the license enables.
3.  **Feature Access Request:** When a user or system component attempts to access an enterprise feature (e.g., calling an API endpoint, using a specific UI element).
4.  **Feature Gating Check:** A check is performed, typically by calling the `hasModule` function (exposed through `LicenseImp`), passing the relevant `LicenseModule` for the feature in question.
    *   **Example:** An API middleware like `apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts` might intercept an API call and use `hasModule` to verify if the necessary license module is active.
5.  **Access Decision:**
    *   If `hasModule` returns `true` (meaning the module is enabled by the license), access to the feature is granted.
    *   If `hasModule` returns `false`, access is denied, often by throwing an error indicating that it's an enterprise-only feature.

**Key Files:**

*   **`ee/packages/license/src/licenseImp.ts`**: This file contains the `LicenseImp` class, which is the primary implementation of the license management system, extending `LicenseManager` and exposing the `hasModule` method.
*   **`ee/packages/license/src/modules.ts`**: This file defines the `hasModule` function, which performs the actual check against the `LicenseManager`'s active modules: `export function hasModule(this: LicenseManager, module: LicenseModule) { return this.modules.has(module); }`.
*   **`apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts`**: This file serves as an example of how the license checking mechanism is integrated into API routes to restrict access to enterprise features. It throws an error if the feature is not licensed.

## Tool Calls (7 calls, 15,005 tokens)

**Step 1:** `plan({"intent":"architecture","question":"How does enterprise feature gating work in Rocket.Chat?"})` → 85 tokens
**Step 2:** `search({"layer":"ee","query":"enterprise feature"})` → 210 tokens
**Step 3:** `graph({"file":"apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts","move":"expand","query":"l)` → 281 tokens
**Step 4:** `details({"filename":"ee/packages/license/src/license.ts","symbolName":"getLicense"})` → 50 tokens
**Step 5:** `details({"symbolName":"LicenseImp","filename":"ee/packages/license/src/licenseImp.ts"})` → 376 tokens
**Step 6:** `search({"layer":"ee","query":"hasModule"})` → 173 tokens
**Step 7:** `details({"symbolName":"hasModule","filename":"ee/packages/license/src/modules.ts"})` → 66 tokens

## Files Seen In Tool Results (14)

- `apps/meteor/ee/server/api/roles.ts`
- `apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts`
- `apps/meteor/ee/server/methods/getReadReceipts.ts`
- `apps/meteor/ee/server/api/chat.ts`
- `apps/meteor/app/license/client/index.ts`
- `ee/packages/license/src/license.ts`
- `ee/packages/license/src/events/deprecated.ts`
- `packages/ui-client/src/hooks/useLicense.ts`
- `apps/meteor/ee/server/api/licenses.ts`
- `ee/packages/license/src/licenseImp.ts`
- `packages/core-services/src/index.ts`
- `ee/packages/license/src/applyLicense.ts`
- `ee/packages/license/src/modules.ts`
- `apps/meteor/ee/app/license/server/license.internalService.ts`
