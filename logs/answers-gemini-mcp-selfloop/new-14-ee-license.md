# How does enterprise feature gating work in Rocket.Chat?

## Plan

intent: architecture

## Gemini Answer

Rocket.Chat implements enterprise feature gating through a license management system centered around the `LicenseManager` and `LicenseImp` classes.

Here's the breakdown of the architecture and flow:

**Core Components:**

*   **`LicenseManager`** (ee/packages/license/src/license.ts): This abstract class defines the interface for license management. It includes methods for:
    *   `validateFormat`: To check the format of a license.
    *   `hasModule`: To determine if a specific enterprise module is enabled by the current license.
    *   `getModules`: To retrieve the list of modules enabled by the license.
    *   `onValidateLicense`, `onInvalidateLicense`, `onLimitReached`, `onBehaviorTriggered`: Event emitters that allow other parts of the system to react to license validation, invalidation, limit breaches, or specific license behaviors.
    *   `setLicense`: The method responsible for applying a new license.
    *   `shouldPreventAction`: To check if a certain action should be prevented due to license limits.

*   **`LicenseImp`** (ee/packages/license/src/licenseImp.ts): This class extends `LicenseManager` and provides the concrete implementation for all the abstract methods defined in `LicenseManager`. It assigns specific functions for license validation, module checking, and event handling. This is where the actual logic for interpreting the license and its associated features resides.

**Feature Gating Flow:**

1.  **License Application:** When a new enterprise license is provided, it is processed by the `setLicense` method within the `LicenseManager` (and its `LicenseImp` implementation). This involves validating the license format and content.
2.  **Module Checks:** Throughout the Rocket.Chat codebase, enterprise features are gated by calling the `hasModule()` method. Before enabling or allowing access to a specific enterprise feature, the system queries `LicenseManager.hasModule('featureName')` to verify if the current license permits that feature.
3.  **Event-Driven Reactions:**
    *   **`onValidateLicense`**: When a license is successfully validated, listeners subscribed to this event are triggered. This allows various parts of the system to enable features, update UI elements, or perform other actions contingent on a valid license.
    *   **`onInvalidateLicense`**: If a license becomes invalid (e.g., expires, tampered with), this event is emitted. Listeners can then disable enterprise features, show warnings, or restrict functionality.
    *   **`onLimitReached`**: For features with usage limits (e.g., number of active users), this event is triggered when a limit is reached. This allows the system to prevent further actions or notify administrators.
    *   **`onBehaviorTriggered`**: This event handles specific behaviors defined within the license, allowing for dynamic responses to license conditions.

In essence, `LicenseManager` acts as the central authority for all license-related operations, with `LicenseImp` providing the concrete logic. Features are gated by explicit `hasModule()` checks, and the system dynamically reacts to license changes and limits through an event-driven mechanism.

## Tool Calls (5 calls, 11,457 tokens)

**Step 1:** `plan({"question":"How does enterprise feature gating work in Rocket.Chat?","intent":"architecture"})` → 184 tokens
**Step 2:** `search({"query":"LicenseManager","layer":"ee"})` → 96 tokens
**Step 3:** `graph({"query":"LicenseManager","move":"expand","depth":2,"file":"license.ts"})` → 230 tokens
**Step 4:** `details({"symbolName":"LicenseManager","filename":"license.ts"})` → 1205 tokens
**Step 5:** `details({"filename":"licenseImp.ts","symbolName":"LicenseImp"})` → 387 tokens

## Files Seen In Tool Results (9)

- `ee/packages/license/src/license.ts`
- `packages/apps-engine/src/server/managers/AppLicenseManager.ts`
- `packages/apps-engine/src/server/AppManager.ts`
- `ee/packages/license/__tests__/MockedLicenseBuilder.ts`
- `ee/packages/license/src/validation/getCurrentValueForLicenseLimit.ts`
- `ee/packages/license/src/licenseImp.ts`
- `apps/meteor/server/ufs/ufs-store.ts`
- `apps/meteor/app/api/server/ApiClass.ts`
- `packages/core-services/src/types/ServiceClass.ts`
