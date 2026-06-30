# How does the video conference system work in Rocket.Chat?

## Gemini Answer

The video conference system in Rocket.Chat uses a client-side `VideoConfManager` (`apps/meteor/client/lib/VideoConfManager.ts`) to manage the call lifecycle, including starting, accepting, rejecting, and joining calls.

**Call Chain for Starting a Video Conference:**

1.  **`VideoConfManager.startCall`** (`apps/meteor/client/lib/VideoConfManager.ts`):
    *   Initiates a call from the client side.
    *   Makes a REST API call to `/v1/video-conference.start` on the server.
    *   Handles different call types (`direct`, `videoconference`, `livechat`) and dispatches to `callUser` or `joinCall` accordingly.

2.  **`POST /v1/video-conference.start`** (`apps/meteor/app/api/server/v1/videoConference.ts`):
    *   This is the server-side endpoint that receives the request to start a video conference.
    *   It likely interacts with a `VideoConfService` (identified in earlier searches as extending `ServiceClassInternal`) to provision and manage the video conference.

**Key Components and Their Roles:**

*   **`apps/meteor/client/lib/VideoConfManager.ts`**: This is the central client-side component for managing video conference calls. It handles:
    *   Starting new calls (`startCall`).
    *   Accepting incoming calls (`acceptIncomingCall`).
    *   Rejecting incoming calls (`rejectIncomingCall`).
    *   Joining existing calls (`joinCall`).
    *   Managing call states (busy, ringing, calling).
    *   Loading video conference capabilities (`loadCapabilities`).
    *   Communicating with the server via `sdk.rest.post` for various actions.
    *   Receiving real-time notifications about video conference events via `sdk.stream('notify-user', ...)` and processing them in `onVideoConfNotification`.

*   **`apps/meteor/ee/server/configuration/videoConference.ts`**: This file contains the server-side configuration for video conferencing, including `videoConference` which likely exposes methods for managing video conference instances.

*   **`apps/meteor/server/services/video-conference/service.ts`**: This service (`join` function) on the server likely handles the core logic for joining video conferences, interacting with user and room data, and potentially with external video conference providers.

*   **`apps/meteor/app/api/server/v1/videoConference.ts`**: This file defines the server-side REST API endpoints for video conferencing, such as `video-conference.start`, `video-conference.join`, and `video-conference.cancel`.

*   **`packages/apps-engine/src/definition/videoConfProviders/IVideoConfProvider.ts`**: This interface suggests that Rocket.Chat supports pluggable video conference providers (e.g., Jitsi, or other custom integrations via the Apps Engine). The `VideoConfService` likely uses these providers.

The overall flow involves the client-side `VideoConfManager` initiating actions by calling REST API endpoints on the Rocket.Chat server. The server-side API then interacts with internal services and potentially external video conference providers to manage the actual video conference sessions. The client also listens for real-time notifications from the server to update its UI and manage the call state.

## Tool Calls (8 calls, 79,642 tokens)

**Step 1:** `search({"query":"video conference"})` → 608 tokens
**Step 2:** `graph({"file":"apps/meteor/ee/server/configuration/videoConference.ts","direction":"down","depth":3,"query)` → 707 tokens
**Step 3:** `graph({"depth":3,"file":"apps/meteor/server/services/video-conference/service.ts","query":"join","directio)` → 289 tokens
**Step 4:** `search({"query":"VideoConfManager"})` → 156 tokens
**Step 5:** `graph({"depth":3,"direction":"down","query":"VideoConfManager","file":"apps/meteor/client/lib/VideoConfMan)` → 434 tokens
**Step 6:** `implement({"filename":"apps/meteor/client/lib/VideoConfManager.ts","symbolName":"VideoConfManager"})` → 5557 tokens
**Step 7:** `search({"query":"/v1/video-conference.start"})` → 129 tokens
**Step 8:** `search({"layer":"server","query":"video-conference.start"})` → 77 tokens
