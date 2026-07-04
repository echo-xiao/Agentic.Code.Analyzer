# How does the video conference system work in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

Rocket.Chat's video conference system is divided into two main categories: **Video Conferencing** for multi-party meetings and **VoIP/Media Calls** for direct 1-to-1 audio/video calls.

### Video Conferencing (Multi-party)

This system is designed for multi-party meetings and leverages an abstraction layer to support various providers (e.g., Jitsi, Meet).

*   **Server-side**: The `VideoConfService` orchestrates conference creation, joining, and status tracking.
*   **Client-side**: The `VideoConfManager` handles the local state of calls and user preferences, while the `VideoConfProvider` acts as a React context provider to bridge the manager to UI components.
*   **Flow**:
    1.  A user initiates a video conference from the client.
    2.  The client-side `VideoConfManager` calls the REST API endpoint `/v1/video-conference.start`.
    3.  The `VideoConfService` on the server handles this API call.
    4.  The `VideoConfService` determines the appropriate video conference provider and interacts with Apps-Engine providers to generate the conference URL.
    5.  The generated URL and call ID are returned to the client.
    6.  The `VideoConfManager` then emits a `call/join` event.
*   **Provider Interface**: The `IVideoConfProvider` interface defines the contract for video conference providers, including methods for generating and customizing URLs, handling new conferences, and managing user joins.
*   **Persistent Chat**: A feature called "Video Conference Persistent Chat" creates a discussion for each conference call, storing chat messages exchanged during the conference for later access. This requires explicit support from the conference provider app.

### VoIP and Media Calls (1-to-1)

This system manages direct 1-to-1 audio/video calls.

*   **Service**: The `MediaCallService` manages these calls, handling signaling (like SDP and ICE candidates) and call history.
*   **Call History**: After a call concludes, its details are stored in the `CallHistory` collection.
*   **Mobile Integration**: For mobile devices, the system integrates with push notifications to alert users of incoming calls. This involves using specialized VoIP tokens and the `PushClass` to send notifications via APN (Apple) and FCM (Google), with `pushType = 'voip'` for iOS to trigger native call UI.

**Key Components and Files:**

*   `VideoConfService`: Server-side service for multi-party video conferencing.
*   `VideoConfManager`: Client-side manager for multi-party video conferencing state.
*   `VideoConfProvider`: Client-side React context provider for multi-party video conferencing.
*   `IVideoConfProvider`: Interface for video conference providers.
*   `MediaCallService`: Manages 1-to-1 VoIP/media calls.
*   `PushClass`: Handles push notifications, including those for VoIP calls.
*   `VideoConfConfigModal`: UI component for configuring video conference providers.

## Tool Calls (1 calls, 3,505 tokens)

**Step 1:** `wiki({"question":"How does the video conference system work in Rocket.Chat?"})` → 786 tokens

## Files Seen In Tool Results (0)

_(none)_
