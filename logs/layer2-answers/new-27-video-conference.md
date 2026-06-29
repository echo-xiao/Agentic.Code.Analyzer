# How does the video conference system work in Rocket.Chat?

## Gemini Answer

The video conference system in Rocket.Chat is designed around a provider-based architecture, allowing for multiple video conferencing solutions to be integrated. The core logic resides on the server, while the client manages the user interface and call state.

Here is a step-by-step breakdown of how it works:

**Call Chain:** `Client UI → VideoConfManager → Server API → VideoConfService → videoConfProviders → Conference Provider (e.g., Jitsi)`

### 1. Client-Side Initiation (Entry Point)

A user starts a video conference from a chat room. The UI components for this are located in `packages/ui-video-conf/`.

-   **File**: `apps/meteor/client/lib/VideoConfManager.ts`
-   **Symbol**: `VideoConfManager`
-   **Role**: This client-side manager is responsible for the entire call lifecycle from the user's perspective. It handles actions like starting a call, showing ringing notifications, and managing accept/reject/end call states. It interacts with the UI modals to display the call pop-up.

### 2. Server-Side Service

The client communicates with the server, which orchestrates the creation and management of the video conference.

-   **File**: `apps/meteor/server/services/video-conference/service.ts`
-   **Symbol**: `VideoConfService`
-   **Role**: This is the main backend service that handles the business logic for video conferences. It receives requests from the client to start or join a call.

### 3. Provider Registry (The Core)

The `VideoConfService` does not contain the logic for any specific video conferencing tool. Instead, it uses a registry of providers. This allows administrators to choose and configure their preferred video solution.

-   **File**: `apps/meteor/server/lib/videoConfProviders.ts`
-   **Symbol**: `videoConfProviders`
-   **Role**: This acts as a central registry where different video conference providers can be added or removed. By default, Rocket.Chat includes a Jitsi provider. Other providers can be added through the Rocket.Chat Apps Engine. When a call is initiated, the `VideoConfService` consults this registry to determine which active provider should handle the request.

### 4. Apps Engine Integration

The system is extensible, allowing third-party applications to register their own video conference providers.

-   **File**: `packages/apps-engine/src/server/managers/AppVideoConfProviderManager.ts`
-   **Role**: This manager handles the logic for apps that want to add their own video conferencing capabilities, bridging them with the central `videoConfProviders` registry.

In summary, when a user starts a video call, the client-side `VideoConfManager` sends a request to the server. The `VideoConfService` on the server picks it up, queries the `videoConfProviders` registry for the active provider, and then delegates the call generation to that provider. The provider returns a unique conference URL and call details, which are sent back to the client to embed the video call interface.

## Tool Calls (8 calls, 38,112 tokens)

**Step 1:** `search({"query":"videoconf"})` → 559 tokens
**Step 2:** `search({"query":"VideoConfManager"})` → 156 tokens
**Step 3:** `graph({"query":"VideoConfManager","direction":"down"})` → 888 tokens
**Step 4:** `search({"query":"VideoConfService"})` → 186 tokens
**Step 5:** `graph({"query":"VideoConfService","direction":"down"})` → 137 tokens
**Step 6:** `search({"query":"videoconference path:app/"})` → 17 tokens
**Step 7:** `search({"query":"video path:app/"})` → 15 tokens
**Step 8:** `search({"query":"videoConfProviders"})` → 241 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 2/2 |
| Tool calls | 8 |
| Total tokens | 38,112 |
| Pass | NO |
