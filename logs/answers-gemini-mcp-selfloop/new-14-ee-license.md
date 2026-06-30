# How does enterprise feature gating work in Rocket.Chat?

## Gemini Answer

Enterprise feature gating in Rocket.Chat works through a system that validates the active license and then checks for the availability of specific modules (features) across the codebase.

The general architecture involves:
1.  **LicenseManager**: This component is responsible for validating the enterprise license.
2.  **LicenseImp**: This likely handles the underlying implementation details of the license management.
3.  **`hasModule()` checks**: Throughout the Rocket.Chat codebase, especially in enterprise-specific files, functions like `hasModule()` are used to determine if a particular enterprise feature is enabled by the current license. If the feature is not available, actions tied to that feature are restricted.
4.  **Event Listeners**: License changes are handled by emitting events, which are then listened to by `onValidateLicense` listeners. This ensures that the system reacts to license updates and adjusts feature availability accordingly.

When an enterprise feature is accessed without a valid license or if the license does not include that specific module, an error such as `"This is an enterprise feature"` is thrown.

Key files and directories involved in this process include:
*   `ee/packages/license/`: This directory likely contains the core logic for license management, including `LicenseManager` and `LicenseImp`.
*   `apps/meteor/ee/server/api/roles.ts`: Throws an error if an enterprise role action is attempted without a valid license.
*   `apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts`: Contains middleware that likely intercepts API calls to check for enterprise features.
*   `apps/meteor/ee/server/methods/getReadReceipts.ts`: Throws an error if read receipts, an enterprise feature, are accessed without the necessary license.
*   `apps/meteor/ee/server/api/chat.ts`: Also contains checks for enterprise features related to chat functionalities.

**Call Chain:**
`LicenseManager` (in `ee/packages/license/`) → `LicenseImp` (in `ee/packages/license/`) → `hasModule()` checks (various files like `apps/meteor/ee/server/api/roles.ts`, `apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts`, etc.) → Restriction/Error (`Meteor.Error('error-action-not-allowed', 'This is an enterprise feature')`).

## Tool Calls (8 calls, 23,456 tokens)

**Step 1:** `search({"layer":"server","query":"enterprise feature gating"})` → 17 tokens
**Step 2:** `search({"query":"enterprise feature","layer":"server"})` → 203 tokens
**Step 3:** `graph({"query":"license.ts","file":"apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts","laye)` → 12 tokens
**Step 4:** `implement({"filename":"apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts","symbolName":"license.)` → 57 tokens
**Step 5:** `implement({"symbolName":"default","filename":"apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts")` → 15 tokens
**Step 6:** `search({"query":"apps/meteor/ee/app/api-enterprise/server/middlewares/license.ts"})` → 85 tokens
**Step 7:** `search({"layer":"server","query":"license"})` → 513 tokens
**Step 8:** `graph({"query":"LicenseManager","layer":"packages","file":"ee/packages/license/LicenseManager.ts","directi)` → 119 tokens
