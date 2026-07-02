# How does the video conference system work in Rocket.Chat?

## Gemini Answer

Rocket.Chat's video conferencing system is designed to be extensible, allowing for integration with various video conference providers. The core of this system revolves around the `IVideoConfProvider` interface, which defines the contract for any video conference provider.

Here's a breakdown of how it works:

**1. `IVideoConfProvider` (packages/apps-engine/src/definition/videoConfProviders/IVideoConfProvider.ts):**
This interface is the blueprint for any video conference provider. It specifies the following:
*   **`name`**: A unique identifier for the provider.
*   **`capabilities`**: Optional flags indicating what features the provider supports (e.g., `mic`, `cam`, `title`, `persistentChat`).
*   **`isFullyConfigured`**: An optional function to check if the provider is ready for use.
*   **`onNewVideoConference`**: An optional callback when a new video conference is created.
*   **`onVideoConferenceChanged`**: An optional callback when a video conference is modified.
*   **`onUserJoin`**: An optional callback when a user joins a video conference.
*   **`getVideoConferenceInfo`**: An optional function to retrieve information about a video conference, returning UI Kit blocks for display.
*   **`generateUrl`**: The crucial function responsible for generating the URL to start a new video conference.
*   **`customizeUrl`**: The function to generate a customized URL for a user to join an existing video conference.

**2. `AppVideoConfProviderManager` (packages/apps-engine/src/server/managers/AppVideoConfProviderManager.ts):**
This class acts as a central manager for all registered video conference providers. It handles:
*   **Adding and registering providers**: Apps can register their own video conference providers with Rocket.Chat.
*   **Checking provider configuration**: It can determine if a provider is fully configured.
*   **Event handling**: It dispatches events to the appropriate provider's `onNewVideoConference`, `onVideoConferenceChanged`, and `onUserJoin` methods.
*   **URL generation**: It calls the `generateUrl` and `customizeUrl` methods of the registered providers to obtain conference URLs.

**Flow for initiating a video conference:**

1.  A user or an app requests to start a video conference.
2.  The `AppVideoConfProviderManager` identifies the chosen video conference provider.
3.  It calls the `generateUrl` method of the selected `IVideoConfProvider` implementation.
4.  The provider's `generateUrl` method returns the URL for the new video conference.
5.  Rocket.Chat then uses this URL to initiate the video conference.

**Flow for joining a video conference:**

1.  A user requests to join an existing video conference.
2.  The `AppVideoConfProviderManager` identifies the provider associated with the conference.
3.  It calls the `customizeUrl` method of the selected `IVideoConfProvider` implementation, passing user and conference details.
4.  The provider's `customizeUrl` method returns a customized URL for the user to join.
5.  Rocket.Chat then directs the user to this URL to join the conference.

In essence, Rocket.Chat provides an abstraction layer through the `IVideoConfProvider` interface, allowing different video conferencing services to be plugged in and managed by the `AppVideoConfProviderManager`. This architecture promotes flexibility and extensibility for video conferencing capabilities within Rocket.Chat.

## Tool Calls (8 calls, 26,173 tokens)

**Step 1:** `plan({"intent":"architecture","question":"How does the video conference system work in Rocket.Chat?"})` → 85 tokens
**Step 2:** `search({"query":"video conference"})` → 459 tokens
**Step 3:** `graph({"query":"IVideoConfProvider","depth":2,"move":"expand","file":"packages/apps-engine/src/definition/)` → 417 tokens
**Step 4:** `details({"filename":"packages/apps-engine/src/definition/videoConfProviders/IVideoConfProvider.ts","symbolNa)` → 636 tokens
**Step 5:** `details({"symbolName":"AppVideoConfProviderManager","filename":"packages/apps-engine/src/server/managers/App)` → 664 tokens
**Step 6:** `graph({"depth":3,"move":"up","file":"packages/apps-engine/src/server/managers/AppVideoConfProviderManager.)` → 20 tokens
**Step 7:** `graph({"depth":3,"move":"up","file":"packages/apps-engine/src/server/managers/AppVideoConfProviderManager.)` → 80 tokens
**Step 8:** `details({"symbolName":"VideoConference","filename":"apps/meteor/server/services/video-conference/service.ts")` → 60 tokens

## Files Seen In Tool Results (24)

- `apps/meteor/tests/end-to-end/apps/video-conferences.ts`
- `packages/apps-engine/src/definition/videoConfProviders/IVideoConfProvider.ts`
- `apps/meteor/app/apps/server/bridges/videoConferences.ts`
- `packages/apps-engine/src/definition/accessors/IVideoConferenceRead.ts`
- `packages/apps-engine/src/server/accessors/ModifyCreator.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/modify/ModifyCreator.ts`
- `apps/meteor/server/services/video-conference/service.ts`
- `apps/meteor/client/lib/VideoConfManager.ts`
- `packages/apps-engine/src/server/managers/AppVideoConfProviderManager.ts`
- `packages/apps-engine/src/server/errors/VideoConfProviderNotRegisteredError.ts`
- `packages/apps-engine/src/server/accessors/VideoConfProviderExtend.ts`
- `packages/apps-engine/src/definition/accessors/IVideoConfProvidersExtend.ts`
- `packages/apps-engine/src/server/managers/AppOutboundCommunicationProviderManager.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/mod.ts`
- `packages/models/src/models/BaseRaw.ts`
- `apps/meteor/app/utils/client/lib/SDKClient.ts`
- `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/business-hour/Multiple.ts`
- `apps/meteor/app/crowd/server/crowd.ts`
- `packages/apps-engine/src/server/accessors/SettingsExtend.ts`
- `apps/meteor/ee/server/apps/marketplace/MarketplaceAPIClient.ts`
- `apps/meteor/server/lib/logger/logPayloads.ts`
- `packages/apps-engine/src/server/runtime/deno/AppsEngineDenoRuntime.ts`
- `packages/models/src/index.ts`
