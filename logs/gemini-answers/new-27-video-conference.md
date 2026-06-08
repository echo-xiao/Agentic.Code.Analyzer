# How does the video conference system work in Rocket.Chat?

## Gemini Answer

Rocket.Chat's video conference system is designed with a modular architecture, leveraging a core service and pluggable providers for flexibility.

Here's a breakdown of how it works:

**1. Core Service and Architecture:**
The video conferencing functionality is primarily handled by the `VideoConfService`, which extends `ServiceClassInternal`. This service acts as the central hub for managing video conference sessions on the server side. While a direct call chain for the `VideoConference` symbol was not fully mapped in the graph due to its nature as a proxied model (`packages/models/src/index.ts`), the architectural description indicates that the server-side logic resides in files such as `apps/meteor/server/services/video-conference/service.ts`. This file likely contains methods like `VideoConference.create` for starting new conferences.

**2. Pluggable Providers:**
Rocket.Chat supports various video conference providers through a registry system. This allows for integration with different services (e.g., Jitsi, as mentioned in the search results) and custom solutions via the Apps Engine.
*   **Provider Definition**: The interface for these providers is defined in `packages/apps-engine/src/definition/videoConfProviders/IVideoConfProvider.ts`.
*   **Provider Management**: The `AppVideoConfProviderManager` (`packages/apps-engine/src/server/managers/AppVideoConfProviderManager.ts`) is responsible for managing these providers, especially those integrated via the Apps Engine.
*   **App Bridge**: `apps/meteor/app/apps/server/bridges/videoConferences.ts` serves as a bridge for interactions between Apps and the core video conferencing system.

**3. Client-Side Management:**
On the client side, the `VideoConfManager` (`apps/meteor/client/lib/VideoConfManager.ts`) is responsible for handling the user interface and the lifecycle of video calls, including:
*   Initiating calls.
*   Managing the ringing state.
*   Allowing users to accept or reject calls.

**4. Room Compatibility:**
Before a video conference can be initiated, the system checks for room compatibility using `isRoomCompatibleWithVideoConfRinging` (`apps/meteor/server/lib/isRoomCompatibleWithVideoConfRinging.ts`). This ensures that a video conference can be properly started within a given chat room.

**Call Chain (Architectural Overview):**
The overall flow involves interactions between the client, the `VideoConfService` on the server, and the configured video conference providers.

`Client-side (VideoConfManager)` → `Server-side (VideoConfService)` → `Video Conference Provider (e.g., Jitsi via AppVideoConfProviderManager)`

**Key Files Involved:**
*   `packages/models/src/index.ts`: Defines the `VideoConference` model (proxied).
*   `apps/meteor/server/services/video-conference/service.ts`: Contains the core server-side logic for video conferencing.
*   `packages/apps-engine/src/definition/videoConfProviders/IVideoConfProvider.ts`: Interface for video conference providers.
*   `apps/meteor/app/apps/server/bridges/videoConferences.ts`: Bridge for Apps Engine video conference interactions.
*   `packages/apps-engine/src/server/managers/AppVideoConfProviderManager.ts`: Manages video conference providers.
*   `apps/meteor/client/lib/VideoConfManager.ts`: Client-side logic for managing video calls.
*   `apps/meteor/server/lib/isRoomCompatibleWithVideoConfRinging.ts`: Logic to determine if a room is compatible with video conferencing.

## Tool Calls (8 calls, 29,036 tokens)

**Step 1:** `search({"query":"video conference"})` → 612 tokens
**Step 2:** `graph({"direction":"down","depth":3,"query":"apps/meteor/server/services/video-conference/service.ts"})` → 24 tokens
**Step 3:** `graph({"query":"VideoConference","layer":"server","depth":3,"direction":"down"})` → 35 tokens
**Step 4:** `implement({"symbolName":"NOT_A_SYMBOL","filename":"apps/meteor/server/services/video-conference/service.ts"})` → 16 tokens
**Step 5:** `search({"layer":"server","query":"video-conference service"})` → 17 tokens
**Step 6:** `implement({"symbolName":"VideoConference","filename":"apps/meteor/server/services/video-conference/service.ts")` → 65 tokens
**Step 7:** `search({"layer":"server","query":"VideoConf"})` → 543 tokens
**Step 8:** `graph({"query":"VideoConf","direction":"down","layer":"server","depth":3})` → 129 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 5/6 |
| Symbols hit | 1/2 |
| Tool calls | 8 |
| Total tokens | 29,036 |
| Pass | NO |
