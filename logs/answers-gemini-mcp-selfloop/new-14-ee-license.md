# How does enterprise feature gating work in Rocket.Chat?

## Gemini Answer

Rocket.Chat implements enterprise feature gating through a centralized `LicenseManager` that validates the active license and maintains a set of enabled modules. When an enterprise feature is accessed, the system checks if the corresponding module is present in this set.

Here's the call chain:

**Entry → Middleware → `LicenseManager.hasModule()` → `Set.prototype.has()`**

1.  **Entry Point (e.g., `apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts`):** When an enterprise feature is accessed, a middleware or the feature's code itself initiates a check. For example, `apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts` is a middleware that intercepts requests to enterprise APIs.
2.  **Module Check (`ee/packages/license/src/modules.ts`):** The middleware or feature code calls `LicenseManager.hasModule(module)`. This function, defined in `ee/packages/license/src/modules.ts`, acts as a wrapper.
3.  **Set Lookup (`ee/packages/license/src/license.ts`):** The `hasModule` function then calls `this.modules.has(module)`. The `modules` property is a `Set<LicenseModule>` within the `LicenseManager` class, defined in `ee/packages/license/src/license.ts`. This `Set` stores all the `LicenseModule`s (representing individual enterprise features) that are enabled by the currently active and valid license. The `Set.prototype.has()` method efficiently checks for the presence of the requested module.
4.  **License Validation and Population (`ee/packages/license/src/license.ts`):** The `LicenseManager` class itself, located in `ee/packages/license/src/license.ts`, is responsible for the core logic of license management. It contains methods like `setLicense`, `validateLicense`, and `revalidateLicense`. When a license is set or revalidated, the `LicenseManager` parses the license data and populates its `modules` Set with the features permitted by that license.

In essence, the `LicenseManager` acts as the gatekeeper, ensuring that only features explicitly granted by a valid enterprise license are accessible by checking against its internal `modules` Set.

## Tool Calls (6 calls, 19,878 tokens)

**Step 1:** `search({"query":"enterprise feature","layer":"ee"})` → 203 tokens
**Step 2:** `graph({"query":"license","direction":"down","file":"apps/meteor/ee/app/api-enterprise/server/middlewares/l)` → 380 tokens
**Step 3:** `implement({"symbolName":"hasModule","filename":"ee/packages/license/modules.ts"})` → 69 tokens
**Step 4:** `implement({"filename":"ee/packages/license/src/index.ts","symbolName":"has"})` → 185 tokens
**Step 5:** `search({"layer":"packages","query":"LicenseManager"})` → 269 tokens
**Step 6:** `implement({"filename":"ee/packages/license/src/license.ts","symbolName":"LicenseManager"})` → 1200 tokens

## Files Seen In Tool Results (18)

- `apps/meteor/ee/server/api/roles.ts`
- `apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts`
- `apps/meteor/ee/server/methods/getReadReceipts.ts`
- `apps/meteor/ee/server/api/chat.ts`
- `ee/packages/license/src/modules.ts`
- `ee/packages/license/src/index.ts`
- `packages/cron/src/index.ts`
- `packages/agenda/src/Agenda.ts`
- `apps/meteor/tests/unit/server/services/calendar/mocks/cronJobs.ts`
- `apps/meteor/packages/meteor-cookies/cookies.js`
- `apps/meteor/client/meteor/minimongo/OrderedDict.ts`
- `apps/meteor/client/meteor/minimongo/IdMap.ts`
- `apps/meteor/app/settings/server/CachedSettings.ts`
- `ee/packages/license/src/license.ts`
- `packages/apps-engine/src/server/managers/AppLicenseManager.ts`
- `packages/apps-engine/src/server/AppManager.ts`
- `ee/packages/license/__tests__/MockedLicenseBuilder.ts`
- `ee/packages/license/src/validation/getCurrentValueForLicenseLimit.ts`
