# How does enterprise feature gating work in Rocket.Chat?

## Gemini Answer

    *   **Role:** As shown in the implementation, `hasModule` simply checks if the provided `module` is present in the `modules` set managed by the `LicenseManager`. If the module is in the set, the feature is considered enabled.

3.  **Enterprise Feature Checkpoints (Examples of where `hasModule` is called):**
    *   **File:** `ee/packages/omni-core-ee/src/isDepartmentCreationAvailable.ts`
        *   **Symbol:** `isDepartmentCreationAvailablePatch`
    *   **File:** `ee/packages/omni-core-ee/src/patches/applyDepartmentRestrictions.ts`
        *   **Symbol:** `applyDepartmentRestrictionsPatch`
    *   **File:** `ee/packages/federation-matrix/src/api/middlewares/isLicenseEnabled.ts`
        *   **Symbol:** `isLicenseEnabledMiddleware`
    *   **File:** `apps/meteor/ee/server/methods/getReadReceipts.ts`
        *   **Symbol:** `getReadReceiptsFunction`
    *   **File:** `apps/meteor/ee/server/lib/ldap/Manager.ts`
        *   **Symbols:** `syncAbacAttributes`, `syncUsersAbacAttributes`
    *   **Role:** Various parts of the codebase implement checks using `hasModule()` to conditionally enable or disable specific functionalities based on the active license.

**Flow:**
When an enterprise feature is about to be used, the relevant code calls `hasModule()` with the specific module name required for that feature. The `hasModule()` function, which is associated with the `LicenseManager`, then checks its internal list of enabled modules. If the required module is present, the feature proceeds; otherwise, it is gated (e.g., by throwing an error or preventing access). Changes to the license status trigger `onValidateLicense` listeners, which update the `LicenseManager` and, consequently, the set of enabled modules, allowing for dynamic feature activation/deactivation.

## Tool Calls (8 calls, 26,256 tokens)

**Step 1:** `search({"query":"enterprise feature","layer":"server"})` → 203 tokens
**Step 2:** `graph({"layer":"server","query":"apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts","directi)` → 26 tokens
**Step 3:** `search({"layer":"server","query":"license"})` → 513 tokens
**Step 4:** `graph({"direction":"down","layer":"ee","query":"LicenseManager"})` → 119 tokens
**Step 5:** `search({"layer":"ee","query":"hasModule"})` → 163 tokens
**Step 6:** `graph({"query":"hasModule","direction":"up","layer":"ee"})` → 646 tokens
**Step 7:** `implement({"symbolName":"hasModule","filename":"ee/packages/license/src/modules.ts"})` → 69 tokens
**Step 8:** `implement({"symbolName":"hasModule","filename":"ee/packages/license/src/modules.ts"})` → 69 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 0/6 |
| Symbols hit | 4/5 |
| Tool calls | 8 |
| Total tokens | 26,256 |
| Pass | NO |
