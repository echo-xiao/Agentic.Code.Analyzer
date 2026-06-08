# How does enterprise feature gating work in Rocket.Chat?

## Gemini Answer

Rocket.Chat's enterprise feature gating mechanism is centered around the `ee/packages/license/` package, specifically the `LicenseManager` and the `hasModule` function.

Here's the call chain and how it works:

1.  **License Application (Entry Point):** An encrypted license is applied to the system via `LicenseManager.setLicense(encryptedLicense, isNewLicense)`.
    *   **File:** `ee/packages/license/src/license.ts`
2.  **License Validation:** The `setLicense` method internally invokes `LicenseManager.validateLicense()` to parse and validate the provided license. During this process, the active modules permitted by the license are identified.
    *   **File:** `ee/packages/license/src/license.ts`
3.  **Module Population:** Upon successful validation, the `LicenseManager` instance's `modules` property (a `Set<LicenseModule>`) is populated with the names of all enabled enterprise modules/features.
    *   **File:** `ee/packages/license/src/license.ts` (specifically, the `modules = new Set<LicenseModule>();` property within the `LicenseManager` class)
4.  **Feature Gating (Check):** Throughout the codebase, when an enterprise feature needs to determine if it should be enabled or accessible, it calls `hasModule(moduleName)`.
    *   **File:** `ee/packages/license/src/modules.ts` (the `hasModule` function)
    5. **Module Availability Check:** The `hasModule` function simply checks if the requested `moduleName` exists in the `LicenseManager.modules` Set. If it's present, the feature is considered available; otherwise, it's not.
    *   **File:** `ee/packages/license/src/modules.ts` (implementation of `hasModule`)

**Call Chain:**

`LicenseManager.setLicense` (`ee/packages/license/src/license.ts`) → `LicenseManager.validateLicense` (`ee/packages/license/src/license.ts`) → (Populates `LicenseManager.modules` property) → `hasModule` (`ee/packages/license/src/modules.ts`) → `LicenseManager.modules.has(module)` (`ee/packages/license/src/license.ts` property and `ee/packages/license/src/modules.ts` usage)

## Tool Calls (7 calls, 20,705 tokens)

**Step 1:** `search({"layer":"ee","query":"feature gating"})` → 72 tokens
**Step 2:** `search({"layer":"ee","query":"ee feature"})` → 186 tokens
**Step 3:** `graph({"query":"isFeatureAvailableForUser","direction":"down","layer":"ee"})` → 61 tokens
**Step 4:** `search({"query":"license","layer":"ee"})` → 446 tokens
**Step 5:** `graph({"query":"hasModule","direction":"down","layer":"ee"})` → 139 tokens
**Step 6:** `implement({"symbolName":"hasModule","filename":"ee/packages/license/src/modules.ts"})` → 69 tokens
**Step 7:** `implement({"filename":"ee/packages/license/src/license.ts","symbolName":"LicenseManager"})` → 1200 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 4/6 |
| Symbols hit | 4/5 |
| Tool calls | 7 |
| Total tokens | 20,705 |
| Pass | NO |
