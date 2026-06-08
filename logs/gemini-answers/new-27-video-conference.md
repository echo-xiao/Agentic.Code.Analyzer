# How does the video conference system work in Rocket.Chat?

## Gemini Answer

The Rocket.Chat video conference system is built around a pluggable provider architecture, allowing for integration with various video conferencing solutions.

The core components and their interactions are:

*   **`IVideoConfProvider`** (`packages/apps-engine/src/definition/videoConfProviders/IVideoConfProvider.ts`): This interface defines the contract for any video conference provider. Apps that want to offer video conferencing capabilities must implement this interface.

*   **`AppVideoConfProviderManager`** (`packages/apps-engine/src/server/managers/AppVideoConfProviderManager.ts`): This manager is responsible for registering and unregistering video conference providers provided by Rocket.Chat Apps.
    *   **`AppVideoConfProviderManager.registerProvider`**: This method takes an `appId` and `AppVideoConfProvider` object, and calls the `doRegisterProvider` method on the `VideoConferenceBridge`.

*   **`VideoConferenceBridge`** (`packages/apps-engine/src/server/bridges/VideoConferenceBridge.ts`): This bridge acts as an intermediary between the App's video conference provider and the Rocket.Chat server.
    *   **`VideoConferenceBridge.doRegisterProvider`**: This method checks if the App has the necessary permissions (`hasProviderPermission`) and then calls `this.registerProvider` (another method within the `VideoConferenceBridge` itself) to complete the registration.
    *   **`VideoConferenceBridge.registerProvider`**: This method actually handles the registration of the `IVideoConfProvider` instance with the Rocket.Chat system.

*   **`VideoConfService`** (`apps/meteor/server/services/video-conference/service.ts`): This is a server-side service that likely exposes methods for initiating, managing, and ending video conferences, using the registered providers.

*   **`VideoConfManager`** (`apps/meteor/client/lib/VideoConfManager.ts`): On the client-side, this manager handles the lifecycle of a video call, including ringing, accepting, and rejecting calls. It also contains logic to check if a room is compatible with video conferencing (`isRoomCompatibleWithVideoConfRinging`).

The overall flow for registering a video conference provider from an App is:

`AppManager.enableApp` (within `packages/apps-engine/src/server/AppManager.ts`) → `AppVideoConfProviderManager.registerProviders` (within `packages/apps-engine/src/server/managers/AppVideoConfProviderManager.ts`) → `AppVideoConfProviderManager.registerProvider` (within `packages/apps-engine/src/server/managers/AppVideoConfProviderManager.ts`) → `VideoConferenceBridge.doRegisterProvider` (within `packages/apps-engine/src/server/bridges/VideoConferenceBridge.ts`) → `VideoConferenceBridge.registerProvider` (within `packages/apps-engine/src/server/bridges/VideoConferenceBridge.ts`).

Once a provider is registered, the `VideoConfService` on the server can utilize it to create and manage video conferences, and the `VideoConfManager` on the client handles the user interface and call interactions.

## Tool Calls (8 calls, 40,751 tokens)

**Step 1:** `search({"query":"video conference"})` → 612 tokens
**Step 2:** `graph({"query":"VideoConfManager","direction":"down","layer":"client"})` → 880 tokens
**Step 3:** `graph({"layer":"server","direction":"down","query":"apps/meteor/server/services/video-conference/service.t)` → 24 tokens
**Step 4:** `graph({"direction":"down","query":"VideoConfService","layer":"server"})` → 137 tokens
**Step 5:** `search({"query":"IVideoConfProvider"})` → 104 tokens
**Step 6:** `graph({"query":"IVideoConfProvider","direction":"up"})` → 782 tokens
**Step 7:** `implement({"symbolName":"AppVideoConfProviderManager.registerProvider","filename":"packages/apps-engine/src/se)` → 106 tokens
**Step 8:** `implement({"filename":"packages/apps-engine/src/server/bridges/VideoConferenceBridge.ts","symbolName":"VideoCo)` → 110 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 1/2 |
| Tool calls | 8 |
| Total tokens | 40,751 |
| Pass | NO |
