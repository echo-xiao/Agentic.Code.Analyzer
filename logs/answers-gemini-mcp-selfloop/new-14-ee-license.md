# How does enterprise feature gating work in Rocket.Chat?

## Gemini Answer

Rocket.Chat implements enterprise feature gating primarily through a `LicenseManager` and `hasModule()` checks.

The core mechanism for enterprise feature gating is as follows:

1.  **License Middleware**: The `license` middleware located in `apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts` is responsible for checking if required licenses are active for specific API endpoints.
    *   This middleware takes `options` containing the `license` modules to be checked and a `licenseManager` instance.
    *   It iterates through the required `license` modules and calls `licenseManager.hasModule(license)` for each.
    *   If any of the required modules are not licensed, it returns an error with status code 400 and the message 'This is an enterprise feature [error-action-not-allowed]'.

2.  **`hasModule` Function**: The `hasModule` function, defined in `apps/meteor/ee/app/license/server/license.internalService.ts`, is the central point for determining if a specific enterprise module is active based on the current license.

Therefore, the call chain for enterprise feature gating is:

`API Endpoint (e.g., in apps/meteor/ee/server/api/roles.ts) → license middleware (apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts) → licenseManager.hasModule (apps/meteor/ee/app/license/server/license.internalService.ts)`

Developers also use `hasModule()` directly in various parts of the codebase (client and server) to conditionally enable or disable features based on the active license modules.

## Tool Calls (8 calls, 26,774 tokens)

**Step 1:** `search({"query":"enterprise feature gating","layer":"server"})` → 17 tokens
**Step 2:** `search({"layer":"server","query":"enterprise feature"})` → 203 tokens
**Step 3:** `graph({"layer":"server","query":"license.ts","file":"apps/meteor/ee/app/api-enterprise/server/middlewares/)` → 12 tokens
**Step 4:** `implement({"filename":"apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts","symbolName":"license.)` → 57 tokens
**Step 5:** `search({"query":"licenseMiddleware","layer":"server"})` → 308 tokens
**Step 6:** `graph({"layer":"server","direction":"down","file":"apps/meteor/ee/app/api-enterprise/server/middlewares/li)` → 380 tokens
**Step 7:** `implement({"filename":"apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts","symbolName":"license")` → 203 tokens
**Step 8:** `search({"query":"hasModule","layer":"server"})` → 418 tokens
