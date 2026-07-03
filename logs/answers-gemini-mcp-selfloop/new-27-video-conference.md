# How does the video conference system work in Rocket.Chat?

## Plan

intent: architecture

## Gemini Answer

The video conference system in Rocket.Chat operates through a client-server architecture with pluggable provider support via the Apps Engine.

**Core Components:**

1.  **`apps/meteor/client/lib/VideoConfManager.ts`**: This is the client-side manager responsible for initiating and managing video conference calls from the user interface. It handles user actions like starting, joining, accepting, or rejecting calls, and manages the client-side call state.
2.  **`apps/meteor/server/services/video-conference/service.ts`**: This is the central server-side service that orchestrates video conference creation, management, and interaction with various providers. It exposes API endpoints for client-side requests and handles the business logic for video conferencing.
3.  **`packages/apps-engine/src/server/managers/AppVideoConfProviderManager.ts`**: This manager is responsible for handling and registering video conference providers that are integrated through the Apps Engine. It allows for a flexible and extensible system where different video conferencing platforms (like Jitsi) can be plugged in.
4.  **`packages/apps-engine/src/definition/videoConfProviders/IVideoConfProvider.ts`**: This file defines the interface that all video conference providers must implement. It ensures a consistent way for the `AppVideoConfProviderManager` to interact with different video conferencing solutions.
5.  **`apps/meteor/server/lib/videoConfProviders.ts`**: This file likely contains the registration or configuration of default video conference providers within the Rocket.Chat instance.

**Video Conference Flow:**

1.  **Client Initiates Call (Entry)**: A user on the Rocket.Chat client decides to start or join a video conference. This action is handled by the `VideoConfManager` (`apps/meteor/client/lib/VideoConfManager.ts`).
2.  **API Call to Server (Step 1)**:
    *   To start a call, `VideoConfManager.startCall` makes a REST API call to the server endpoint `/v1/video-conference.start`.
    *   To join a call, `VideoConfManager.joinCall` makes a REST API call to `/v1/video-conference.join`.
3.  **Server-Side Processing by `VideoConfService` (Step 2)**: The `VideoConfService` (`apps/meteor/server/services/video-conference/service.ts`) receives these API requests.
    *   It interacts with the `AppVideoConfProviderManager` (`packages/apps-engine/src/server/managers/AppVideoConfProviderManager.ts`) to determine which video conference provider to use (e.g., Jitsi, or a custom app-provided solution).
    *   The `AppVideoConfProviderManager` then uses the specific `IVideoConfProvider` implementation to generate a unique URL for the video conference.
4.  **URL Generation and Return (Step 3)**: The generated video conference URL and the provider name are returned from the server to the client.
5.  **Client-Side Redirection/Embedding (Final)**: The `VideoConfManager` on the client receives the URL. It then emits a `call/join` event, which instructs the client application to open this URL, typically in a new browser tab or an embedded iframe, thereby launching the actual video conference.
6.  **Notifications**: Throughout the process, both the client and server utilize a notification system (`sdk.publish('notify-user', ...)`) to inform relevant users about the call's status, such as ringing, acceptance, rejection, cancellation, or when a user joins or leaves the call.

This modular design allows Rocket.Chat to support various video conferencing solutions by simply implementing the `IVideoConfProvider` interface and registering them through the Apps Engine.

## Tool Calls (8 calls, 37,139 tokens)

**Step 1:** `plan({"intent":"architecture","question":"How does the video conference system work in Rocket.Chat?"})` → 204 tokens
**Step 2:** `search({"query":"videoConfProviders"})` → 248 tokens
**Step 3:** `graph({"query":"videoConfProviders","file":"videoConfProviders.ts","depth":2,"move":"expand"})` → 253 tokens
**Step 4:** `details({"filename":"AppVideoConfProviderManager.ts","symbolName":"AppVideoConfProviderManager"})` → 674 tokens
**Step 5:** `search({"query":"VideoConfService"})` → 100 tokens
**Step 6:** `details({"filename":"service.ts","symbolName":"VideoConfService"})` → 2248 tokens
**Step 7:** `search({"layer":"client","query":"VideoConfManager"})` → 70 tokens
**Step 8:** `details({"symbolName":"VideoConfManager","filename":"VideoConfManager.ts"})` → 5552 tokens

## Files Seen In Tool Results (15)

- `packages/apps-engine/src/server/managers/AppVideoConfProviderManager.ts`
- `apps/meteor/server/lib/videoConfProviders.ts`
- `packages/apps-engine/src/definition/videoConfProviders/index.ts`
- `packages/apps-engine/src/definition/videoConfProviders/VideoConfData.ts`
- `packages/apps-engine/src/definition/videoConfProviders/IVideoConferenceOptions.ts`
- `packages/apps-engine/src/definition/videoConfProviders/IVideoConfProvider.ts`
- `packages/apps-engine/src/definition/accessors/IVideoConfProvidersExtend.ts`
- `packages/apps-engine/src/server/errors/VideoConfProviderNotRegisteredError.ts`
- `packages/apps-engine/src/server/errors/VideoConfProviderAlreadyExistsError.ts`
- `packages/apps-engine/src/server/managers/AppOutboundCommunicationProviderManager.ts`
- `apps/meteor/app/api/server/ApiClass.ts`
- `apps/meteor/app/settings/server/CachedSettings.ts`
- `apps/meteor/server/services/video-conference/service.ts`
- `packages/core-services/src/types/IVideoConfService.ts`
- `apps/meteor/client/lib/VideoConfManager.ts`
