# How does enterprise feature gating work in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

Rocket.Chat implements enterprise feature gating through a licensing system that verifies valid licenses and specific modules to enable or disable features.

Here's a breakdown of how it works:

**1. Core Licensing System:**

*   The central component is the `License` class within the `@rocket.chat/license` package. This package is responsible for managing license validation and module availability.
*   The `LicenseService` (located at `apps/meteor/ee/app/license/server/license.internalService.ts`) is an internal service that handles license-related operations. It listens for license validation events and module changes.
*   When a license is validated, `LicenseService` broadcasts `authorization.guestPermissions` and resets enterprise permissions. Similarly, when a module changes, it broadcasts a `license.module` event.
*   The `LicenseService` provides key methods:
    *   `hasModule(feature: LicenseModule)`: Checks for the existence of a specific module.
    *   `hasValidLicense()`: Determines if there is a valid license.

**2. Feature Activation:**

*   Enterprise features are often dynamically imported and activated based on the active license. For example, various Livechat enterprise models (like `CannedResponse`, `LivechatTag`, and `LivechatDepartment`) are only imported when the `livechat-enterprise` license is active.
*   Features like the "engagement-dashboard" have `up` and `down` callbacks that are triggered when the feature is enabled or disabled, respectively.

**3. UI Representation:**

*   The user interface reflects the availability of enterprise features. The `FeaturesCard` component displays a list of features, indicating whether each is active based on `activeModules` and `isEnterprise` props.
*   Features that are part of the enterprise plan or specific modules are marked with a "check" icon, while unavailable features show a "lock" icon.
*   The `useIsEnterprise` hook (found in `packages/ui-client/src/hooks/useLicense.ts`) determines if the current instance has a valid enterprise license by checking `data?.license.hasValidLicense`.

**4. Feature Limitations and Downgrades:**

*   Rocket.Chat also enforces limitations on features, especially during license downgrades. For instance, if a license is downgraded, premium marketplace apps might be disabled, and the number of marketplace apps could be limited. This also applies to private apps, which may be disabled unless grandfathered based on historical statistics.

**Key Files:**

*   `apps/meteor/ee/app/license/server/license.internalService.ts`: Contains the `LicenseService` class, which is central to server-side license management.
*   `ee/packages/license/src/license.ts`: Defines the core `License` object and its interface.
*   `ee/packages/license/src/modules.ts`: Likely contains the implementation for `hasModule` and related module management logic.
*   `packages/ui-client/src/hooks/useLicense.ts`: Provides the `useIsEnterprise` hook for client-side license checks.

## Tool Calls (8 calls, 26,973 tokens)

**Step 1:** `wiki({"question":"How does enterprise feature gating work in Rocket.Chat?"})` → 791 tokens
**Step 2:** `search({"query":"LicenseService","layer":"ee"})` → 73 tokens
**Step 3:** `details({"symbolName":"LicenseService","filename":"license.internalService.ts"})` → 196 tokens
**Step 4:** `search({"layer":"packages","query":"License"})` → 409 tokens
**Step 5:** `search({"query":"License","layer":"ee"})` → 367 tokens
**Step 6:** `details({"filename":"license.ts","symbolName":"License"})` → 51 tokens
**Step 7:** `search({"query":"engagement-dashboard"})` → 69 tokens
**Step 8:** `search({"layer":"ee","query":"hasModule"})` → 91 tokens

## Files Seen In Tool Results (33)

- `apps/meteor/ee/app/license/server/license.internalService.ts`
- `packages/core-services/src/index.ts`
- `packages/ui-client/src/hooks/useLicense.ts`
- `packages/rest-typings/src/v1/licenses.ts`
- `packages/core-typings/src/license/index.ts`
- `packages/core-typings/src/license/events.ts`
- `packages/core-typings/src/license/LimitContext.ts`
- `packages/core-typings/src/license/LicenseValidationOptions.ts`
- `packages/core-typings/src/license/LicensePeriod.ts`
- `packages/core-typings/src/license/LicenseModule.ts`
- `packages/core-typings/src/license/LicenseLimit.ts`
- `packages/core-typings/src/license/LicenseInfo.ts`
- `packages/core-typings/src/license/LicenseBehavior.ts`
- `packages/core-typings/src/license/ILicenseV3.ts`
- `packages/core-typings/src/license/ILicenseV2.ts`
- `packages/core-typings/src/license/ILicenseTag.ts`
- `packages/core-typings/src/cloud/WorkspaceLicensePayload.ts`
- `ee/packages/license/jest.config.ts`
- `ee/packages/license/src/token.ts`
- `ee/packages/license/src/tags.ts`
- `ee/packages/license/src/showLicense.ts`
- `ee/packages/license/src/pendingLicense.ts`
- `ee/packages/license/src/modules.ts`
- `ee/packages/license/src/logger.ts`
- `ee/packages/license/src/licenseImp.ts`
- `ee/packages/license/src/license.ts`
- `ee/packages/license/src/isItemAllowed.ts`
- `ee/packages/license/src/index.ts`
- `ee/packages/license/src/deprecated.ts`
- `ee/packages/license/src/applyLicense.ts`
- `ee/packages/license/src/MockedLicenseBuilder.ts`
- `ee/packages/license/src/AirGappedRestriction.ts`
- `apps/meteor/tests/end-to-end/api/34-engagement-dashboard.ts`
