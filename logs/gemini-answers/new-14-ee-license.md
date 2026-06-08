# How does enterprise feature gating work in Rocket.Chat?

## Gemini Answer

Enterprise feature gating in Rocket.Chat is managed by a centralized licensing system within the `ee/packages/license` directory. The core mechanism involves a `LicenseManager` that validates the active license, an underlying `LicenseImp` for implementation details, and `hasModule()` checks scattered throughout the codebase to gate specific features.

**Call Chain:**

1.  **Entry Point:** Setting or revalidating a license, often initiated via `LicenseManager.setLicense()` in `ee/packages/license/src/license.ts`.
2.  **License Validation:** `LicenseManager.setLicense()` triggers `LicenseManager.validateLicense()` within `ee/packages/license/src/license.ts`. This process parses the license and determines the active modules.
3.  **Module Population:** The `LicenseManager` populates its internal `modules` set (a `Set<LicenseModule>`) with the features enabled by the validated license.
4.  **Feature Gating:** Throughout the Rocket.Chat codebase, enterprise features use `hasModule()` from `ee/packages/license/src/modules.ts` to check if a particular module (feature) is enabled. This function directly queries the `modules` set on the `LicenseManager` instance.
5.  **License Events:** Changes to the license status (validation, invalidation) emit events via `onValidateLicense` listeners, allowing other parts of the system to react.

**Key Files and Symbols:**

*   **`ee/packages/license/src/license.ts`**: Contains the `LicenseManager` class, responsible for:
    *   Validating the format and content of the enterprise license.
    *   Maintaining the `modules` set, which stores all currently enabled enterprise features/modules.
    *   Exposing methods like `setLicense()` to apply new licenses and `hasValidLicense()` to check the overall license status.
*   **`ee/packages/license/src/modules.ts`**: Defines the `hasModule()` function, which is the primary method used across the application to check if a specific enterprise module is active. It works by checking if the module exists within the `LicenseManager`'s `modules` set.
*   **`apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts`**: An example entry point where the `license` symbol is used, demonstrating how license checks might be integrated into server-side middleware, potentially leveraging `hasModule`.

In essence, the `LicenseManager` acts as the central authority for all license-related information, and features consult this manager via `hasModule()` to determine their availability.

## Tool Calls (5 calls, 14,588 tokens)

**Step 1:** `search({"query":"enterprise feature gating","layer":"ee"})` → 17 tokens
**Step 2:** `search({"query":"license","layer":"ee"})` → 446 tokens
**Step 3:** `graph({"layer":"ee","direction":"down","query":"license"})` → 173 tokens
**Step 4:** `implement({"symbolName":"hasModule","filename":"ee/packages/license/src/modules.ts"})` → 69 tokens
**Step 5:** `implement({"symbolName":"LicenseManager","filename":"ee/packages/license/src/license.ts"})` → 1200 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 4/5 |
| Tool calls | 5 |
| Total tokens | 14,588 |
| Pass | NO |
