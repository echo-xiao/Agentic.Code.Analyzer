# How does the video conference system work in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

The Rocket.Chat video conference system is divided into two main categories: **Video Conferencing** for multi-party meetings and **VoIP/Media Calls** for direct 1-to-1 audio/video calls.

### Multi-Party Video Conferencing Flow

The multi-party video conferencing system leverages a `VideoConfService` on the server-side and a `VideoConfManager` on the client-side.

**Entry Point:** A user initiates a video conference from the client.
**Step 1: Client Request:** The client-side `VideoConfManager` sends a request to the REST API endpoint `/v1/video-conference.start`.
**Step 2: Server-side Handling:** This request is handled by the `VideoConfService`'s `start` method on the server.
**Step 3: Provider Selection and URL Generation:** The `start` method determines the conference type (direct, livechat, or group) and the appropriate external provider (e.g., Jitsi or Meet). It then calls the `create` method, which validates the room and user, and delegates to specific `startDirect`, `startLivechat`, or `startGroup` methods.
**Step 4: External Provider Interaction:** The `VideoConfService` interacts with `AppVideoConfProvider` instances, which are registered by Apps-Engine providers. These providers implement the `IVideoConfProvider` interface, defining methods like `generateUrl` and `customizeUrl` to create the conference URL.
**Step 5: Conference Join:** Once a conference is created, a message is generated in the room, and users can join using the `/v1/video-conference.join` endpoint. The `join` method in `VideoConfService` retrieves the call details and then calls `joinCall` to get the customized URL for the user.

**Key Server-side Files:**
*   `app/videoconference/server/VideoConf.ts`: Contains the `VideoConfService` which orchestrates multi-party video conferences.
*   `app/videoconference/server/apps/AppVideoConfProvider.ts`: Manages the registration and execution of video conference provider apps.
*   `app/videoconference/server/IVideoConfProvider.ts`: Defines the interface for video conference providers, specifying how they generate and customize URLs.

### VoIP and Media Calls Flow (1-to-1)

The `MediaCallService` handles 1-to-1 audio/video calls, supporting both internal WebRTC signaling and external SIP integration.

**Key Components:**
*   **`MediaCallService`**: This service is responsible for signaling relay for 1-to-1 WebRTC/VoIP calls and persisting call history. It also integrates with push notifications for incoming calls.
*   **`packages/media-signaling`**: This package defines the protocol and state management for media sessions, including `MediaSignalingSession` for local sessions and `ClientMediaCall` for handling WebRTC peer connections and call states.
*   **Enterprise VoIP (EE)**: For Enterprise Edition, the `ee/packages/media-calls` package extends media capabilities with SIP support using `drachtio`. `GlobalSignalProcessor` routes signals, and `OutgoingSipCall` and `IncomingSipCall` manage the conversion between WebRTC signals and SIP messages.

**Push Notification Integration:**
Rocket.Chat integrates with push notification systems (APN for Apple, FCM for Google) for timely alerts for VoIP calls. The system uses separate `voipToken` fields for users and configures `note.pushType = 'voip'` for iOS devices to trigger native call UI. The `MediaCallService` triggers `sendVoipPushNotification`, which then uses the `Push` service to dispatch high-priority notifications.

**Key Server-side Files:**
*   `app/media-enterprise/server/MediaCallService.ts`: Handles 1-to-1 audio/video calls, signaling, and history persistence.
*   `packages/media-signaling/lib/MediaSignalingSession.ts`: Manages local media signaling sessions.
*   `packages/media-signaling/lib/ClientMediaCall.ts`: Handles WebRTC peer connections and call states.
*   `ee/packages/media-calls/server/GlobalSignalProcessor.ts`: Routes signals between local users and SIP endpoints (Enterprise Edition).
*   `ee/packages/media-calls/server/OutgoingSipCall.ts`: Manages outbound SIP calls (Enterprise Edition).
*   `ee/packages/media-calls/server/IncomingSipCall.ts`: Manages inbound SIP calls (Enterprise Edition).

## Tool Calls (1 calls, 4,058 tokens)

**Step 1:** `wiki({"question":"How does the video conference system work in Rocket.Chat?"})` → 1203 tokens

## Files Seen In Tool Results (0)

_(none)_
