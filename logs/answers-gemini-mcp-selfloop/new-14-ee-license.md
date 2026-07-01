# How does enterprise feature gating work in Rocket.Chat?

## Gemini Answer

Rocket.Chat implements enterprise feature gating through a centralized `LicenseManager` that validates the active license and maintains a set of available modules.

Here's the call chain and how it works:

1.  **Entry Point (Middleware/Feature Access):** When an enterprise feature is accessed, a server-side middleware or a direct check within the feature's logic initiates the license validation process. An example is `apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts`, which acts as a gatekeeper.

2.  **`LicenseManager.hasModule()` Call:** The middleware or feature code calls `LicenseManager.hasModule(moduleName)` to determine if the specific enterprise module is enabled.
    *   **File:** `ee/packages/license/src/modules.ts`
    *   **Symbol:** `hasModule`
    *   **Logic:** `export function hasModule(this: LicenseManager, module: LicenseModule) { return this.modules.has(module); }`
    This function simply delegates the check to the `modules` property of the `LicenseManager` instance.

3.  **`LicenseManager.modules.has()` Check:** The `hasModule` function accesses the `modules` property of the `LicenseManager` instance.
    *   **File:** `ee/packages/license/src/license.ts`
    *   **Symbol:** `LicenseManager` (specifically, its `modules` property)
    *   **Logic:** The `LicenseManager` class (defined in `ee/packages/license/src/license.ts`) contains a property `modules = new Set<LicenseModule>();`. This `Set` object stores all the enterprise modules that are enabled by the currently active license. The `Set.prototype.has()` method is then used to efficiently check if the requested `moduleName` exists within this set.

**How the `modules` Set is Populated:**

The `modules` set within the `LicenseManager` is populated during the license validation process. When a license is set or revalidated (e.g., via `LicenseManager.setLicense()`, `LicenseManager.setLicenseV2()`, `LicenseManager.setLicenseV3()`, or `LicenseManager.validateLicense()` methods in `ee/packages/license/src/license.ts`), the license data is parsed, and the enabled modules are added to this `modules` set.

**In summary, the enterprise feature gating works as follows:**

*   **License Validation:** The `LicenseManager` (`ee/packages/license/src/license.ts`) is responsible for validating the enterprise license.
*   **Module Population:** Upon successful validation, the `LicenseManager` populates its `modules` property (a `Set<LicenseModule>`) with all the features/modules granted by the license.
*   **Feature Check:** When an enterprise feature is accessed, `LicenseManager.hasModule()` (`ee/packages/license/src/modules.ts`) is called, which in turn checks if the requested module is present in the `modules` set of the `LicenseManager` instance. If the module is in the set, the feature is enabled; otherwise, access is denied (often with an "error-action-not-allowed" message, as seen in the initial search results).

**Call Chain:**
`Enterprise Feature Access (e.g., via API middleware)` → `LicenseManager.hasModule` (`ee/packages/license/src/modules.ts`) → `LicenseManager.modules.has()` (`ee/packages/license/src/license.ts`)

## Tool Calls (5 calls, 16,035 tokens)

**Step 1:** `search({"layer":"ee","query":"enterprise feature"})` → 203 tokens
**Step 2:** `graph({"layer":"server","direction":"down","query":"license","file":"apps/meteor/ee/app/api-enterprise/ser)` → 380 tokens
**Step 3:** `implement({"filename":"ee/packages/license/modules.ts","symbolName":"hasModule"})` → 69 tokens
**Step 4:** `implement({"filename":"ee/packages/license/src/index.ts","symbolName":"LicenseManager.has"})` → 46 tokens
**Step 5:** `implement({"filename":"ee/packages/license/src/index.ts","symbolName":"LicenseManager"})` → 1200 tokens

## Files Seen In Tool Results (7)

- `apps/meteor/ee/server/api/roles.ts`
- `apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts`
- `apps/meteor/ee/server/methods/getReadReceipts.ts`
- `apps/meteor/ee/server/api/chat.ts`
- `ee/packages/license/src/modules.ts`
- `ee/packages/license/src/index.ts`
- `ee/packages/license/src/license.ts`
