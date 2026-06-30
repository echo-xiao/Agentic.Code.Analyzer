# How does the video conference system work in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat's video conferencing system works primarily by **integrating with external WebRTC-based video conferencing providers**, rather than implementing its own full WebRTC stack from scratch. The most deeply integrated and commonly used provider is **Jitsi Meet**.

Here's a breakdown of how it works:

### 1. Core Principle: External Provider Integration

Rocket.Chat acts as a **coordinator and UI wrapper** for external video conferencing services. When you initiate a video call in Rocket.Chat, it doesn't start a WebRTC session directly within its own server. Instead, it generates a unique link to a conference room on a configured external service and then either opens that link in a new tab/window or embeds it within an `<iframe>` in the Rocket.Chat UI.

### 2. Primary Integration: Jitsi Meet

Jitsi Meet is the default and most robustly integrated video conferencing solution in Rocket.Chat.

**How Jitsi Meet Integration Works:**

1.  **Configuration:**
    *   Administrators configure Jitsi Meet settings in `Admin -> Workspace -> Settings -> Video Conference`.
    *   Key settings include:
        *   `Video_Conference_Provider`: Set to `Jitsi`.
        *   `Jitsi_Domain`: The domain of your Jitsi Meet instance (e.g., `meet.jit.si` for the public service, or your self-hosted domain).
        *   `Jitsi_URL_Room_Prefix`: A prefix for room names (e.g., `RocketChat`).
        *   `Jitsi_Enabled`: To enable/disable the feature.
        *   `Jitsi_Enable_Embedded`: To control whether Jitsi is embedded in an `<iframe>` or opens in a new tab.

    *   **Relevant Files:**
        *   `app/jitsi/server/settings.js`: Registers Jitsi-specific settings.
        *   `app/settings/server/functions/settings.js`: General settings registration.

2.  **Initiating a Call:**
    *   A user clicks the "Call" button (often a video camera icon) in the header of a channel or direct message.
    *   **Relevant Files:**
        *   `client/views/room/Header/Omnichannel/CallButtons.tsx` (or similar for general room header buttons).
        *   `client/components/VideoConference/VideoConferenceProvider.tsx`: Provides context for managing video conference state.

3.  **Server-Side Link Generation:**
    *   When the "Call" button is clicked, the client-side UI triggers a server method (e.g., `createVideoConference` or `startVideoConference`).
    *   The Rocket.Chat server, based on the configured `Jitsi_Domain` and `Jitsi_URL_Room_Prefix`, generates a unique Jitsi Meet room URL. This URL typically looks like `https://[Jitsi_Domain]/[Jitsi_URL_Room_Prefix][RoomId]`. The `RoomId` is often derived from the Rocket.Chat room's ID or a unique identifier.
    *   **Relevant Files:**
        *   `app/jitsi/server/functions/createJitsiMeetUrl.js`: Contains the logic for constructing the Jitsi URL.
        *   `app/videoconference/server/methods/startVideoConference.js`: The server method that orchestrates starting a conference, calling the provider-specific URL generation.
        *   `app/videoconference/server/lib/VideoConference.js`: Core server-side logic for video conferencing.

4.  **Client-Side Rendering:**
    *   The generated Jitsi Meet URL is sent back to the Rocket.Chat client.
    *   If `Jitsi_Enable_Embedded` is true, the client renders an `<iframe>` element within the Rocket.Chat UI, pointing its `src` attribute to the Jitsi Meet URL.
    *   If `Jitsi_Enable_Embedded` is false, a new browser tab or window is opened with the Jitsi Meet URL.
    *   **Relevant Files:**
        *   `client/components/VideoConference/VideoConference.tsx`: The main component responsible for rendering the video conference UI (e.g., the `<iframe>`).
        *   `client/components/VideoConference/VideoConferenceWrapper.tsx`: Wraps the conference component.

5.  **Jitsi Meet Handles the WebRTC:**
    *   Once the Jitsi Meet URL is loaded (either in the iframe or new tab), the Jitsi Meet application takes over.
    *   Jitsi Meet (which consists of Jitsi Meet web app, Jitsi Videobridge for media routing, and Jitsi Conference Focus for signaling) handles all the WebRTC complexities:
        *   **Signaling:** Establishing peer connections between participants.
        *   **Media Streaming:** Capturing audio/video from user devices and sending it to other participants (via Jitsi Videobridge).
        *   **UI:** Providing the in-call controls (mute, video on/off, screen sharing, chat, etc.).

6.  **Rocket.Chat UI Updates:**
    *   Rocket.Chat might display a "Call in progress" banner or update the room header to indicate an active video conference.
    *   **Relevant Files:**
        *   `client/views/room/Header/Header.tsx`: Manages the room header display.

### 3. Other Video Conference Providers

Rocket.Chat also supports integration with other providers, often through dedicated apps or similar configuration mechanisms:

*   **Google Meet:** Can be integrated, often by simply providing a Google Meet link.
*   **BigBlueButton:** Popular for educational and webinar use cases, offering more advanced features like whiteboards and polls.
*   **Pexip, Whereby, etc.:** Other providers can be integrated, sometimes requiring custom development or specific Rocket.Chat Apps.

For these, the general flow remains similar: Rocket.Chat generates or uses a link to the external service, and that service handles the actual video conferencing.

### Summary of the Flow:

1.  **User Action:** User clicks "Call" button in a Rocket.Chat room.
2.  **Client Request:** Rocket.Chat client sends a request to the Rocket.Chat server to start a video conference.
3.  **Server Logic:** Rocket.Chat server identifies the configured video conference provider (e.g., Jitsi Meet).
4.  **URL Generation:** The server generates a unique conference room URL for the chosen provider.
5.  **Client Rendering:** The server sends this URL back to the client. The client then either:
    *   Opens a new browser tab/window with the URL.
    *   Embeds the URL in an `<iframe>` within the Rocket.Chat UI.
6.  **External Service Takes Over:** The external video conferencing service (e.g., Jitsi Meet) loads and handles all WebRTC signaling, media streaming, and in-call UI.
7.  **Rocket.Chat UI:** Rocket.Chat updates its own UI to reflect the ongoing call.

This architecture allows Rocket.Chat to leverage the robust and specialized WebRTC implementations of dedicated video conferencing platforms while providing a seamless user experience within its own application.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,262 |
| Model | gemini-2.5-flash |
| Tools | NONE |
