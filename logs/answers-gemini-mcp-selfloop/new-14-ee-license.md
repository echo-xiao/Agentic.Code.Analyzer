# How does enterprise feature gating work in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

Rocket.Chat implements enterprise feature gating through a licensing system that verifies a valid license and specific modules to enable or disable features.

**Core Components:**

*   **`LicenseService`** (`app/license/server/lib/LicenseService.ts`): This server-side service is responsible for verifying the license status using `License.hasValidLicense()`. It also handles resetting enterprise permissions if no valid license is found.
*   **`License`** (`app/license/server/lib/License.ts`): This utility provides methods like `hasValidLicense()` to check the overall license validity and `hasModule(feature)` to check for specific feature modules.
*   **`useIsEnterprise`** (`client/hooks/useIsEnterprise.ts`): This client-side hook determines if the current instance has an active enterprise license by checking `data?.license.hasValidLicense`. It's used to conditionally render UI elements or enable functionalities.

**Flow of Enterprise Feature Gating:**

1.  **License Verification (Server-side):**
    *   The `LicenseService` (app/license/server/lib/LicenseService.ts) uses `License.hasValidLicense()` (app/license/server/lib/License.ts) to verify the license status.
    *   If no valid license is found, certain enterprise permissions are reset.

2.  **Feature Module Checks (Server-side and Client-side):**
    *   Individual enterprise features are often tied to specific license modules.
    *   The `License.hasModule(feature)` method (app/license/server/lib/License.ts) is used to check if a particular module is active.
    *   **Example:** The `request-transcript` API endpoint explicitly requires the `livechat-enterprise` license module to be active. If the module is not present, the action is not allowed.
    *   **Client-side:** The `useIsEnterprise` hook (client/hooks/useIsEnterprise.ts) checks `data?.license.hasValidLicense` to enable or disable UI elements and functionalities. Components like `FeaturesCard` (client/views/admin/info/FeaturesCard.tsx) dynamically display features based on `isEnterprise` and `activeModules`.

3.  **Conditional Loading/Enabling:**
    *   Certain models and functionalities are conditionally imported or enabled based on license modules. For instance, `CannedResponse`, `LivechatTag`, and `LivechatUnit` models are only imported when the `livechat-enterprise` license is active.

**Key Files:**

*   `app/license/server/lib/LicenseService.ts`: Server-side license verification and management.
*   `app/license/server/lib/License.ts`: Utility for license validation and module checks.
*   `client/hooks/useIsEnterprise.ts`: Client-side hook for checking enterprise license status.
*   `client/views/admin/info/FeaturesCard.tsx`: Example of client-side feature display based on license.

## Tool Calls (1 calls, 3,213 tokens)

**Step 1:** `wiki({"question":"How does enterprise feature gating work in Rocket.Chat?"})` → 795 tokens

## Files Seen In Tool Results (0)

_(none)_
