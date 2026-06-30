# How does the video conference system work in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat's video conferencing system is designed to be flexible and relies primarily on **integrations with external WebRTC-based services** for multi-party calls, while also offering **native 1:1 direct video calls** using WebRTC directly.

Here's a breakdown of how it works:

---

### I. Core Technologies

1.  **WebRTC (Web Real-Time Communication):** This is the fundamental technology behind all real-time audio/video communication in modern browsers. It enables peer-to-peer connections for media streaming and data exchange.
2.  **Jitsi Meet:** The most prominent and default video conferencing provider integrated with Rocket.Chat. Jitsi Meet is an open-source, highly scalable, and secure video conferencing solution built on WebRTC.
3.  **DDP (Distributed Data Protocol):** Rocket.Chat's real-time communication protocol (built on top of WebSockets) is used for signaling, presence, and exchanging metadata for calls, especially for native 1:1 calls.

---

### II. Multi-Party Video Conferencing (Primarily Jitsi Meet Integration)

For group calls (more than two participants), Rocket.Chat primarily acts as an orchestrator, launching and managing calls hosted by an external Jitsi Meet instance.

#### A. How Jitsi Meet Integration Works:

1.  **Initiation:**
    *   A user clicks the "Video Call" button in a channel or private group conversation.
    *   This button is typically found in the room header (`client/views/room/HeaderV2/Header.tsx` or `client/views/room/contextualBar/VideoConference/VideoConference.tsx` which contains `VideoConferenceButton`).
    *   The client-side code triggers a server-side method call.

2.  **Server-Side Call Creation:**
    *   Rocket.Chat's server receives the request to start a video conference.
    *   It calls a method like `videoConference/startJitsiCall` (defined in **`app/videobridge/server/methods/startJitsiCall.js`** or similar in newer versions).
    *   This method generates a unique Jitsi Meet room name, often based on the Rocket.Chat room ID (e.g., `RC_channelId`).
    *   It then constructs the full URL for the Jitsi Meet conference, incorporating the `Jitsi_Domain` configured in Rocket.Chat's admin settings (`app/settings/server/settings.js` under `Jitsi_` prefixes).

3.  **Client-Side Launch:**
    *   The server returns the Jitsi Meet URL to the Rocket.Chat client.
    *   The client then opens this URL in a new browser tab or a pop-up window. In some cases, it might embed it in an iframe, but a new window is more common for full Jitsi functionality.
    *   The actual rendering of the call link/button and opening the window is handled by components like `client/components/message/VideoCall.js` or `client/lib/utils/callManagement.ts`.

4.  **Jitsi Meet Server Takes Over:**
    *   Once the Jitsi Meet URL is opened, the user's browser connects directly to the Jitsi Meet server (which is an independent service, *not* part of Rocket.Chat itself).
    *   Jitsi Meet handles all the actual audio/video streaming, participant management, screen sharing, recording (if configured), etc., using WebRTC.

#### B. Key Configuration (Admin Settings):

*   **Jitsi_Enabled:** Toggles the Jitsi integration on/off.
*   **Jitsi_Domain:** The URL of your Jitsi Meet instance (e.g., `meet.jit.si` or your self-hosted domain).
*   **Jitsi_URL_Room_Prefix:** A prefix added to the room name when generating the Jitsi URL.
*   **Jitsi_URL_Room_Hash:** Whether to use a hash for room names.
*   **Jitsi_URL_Room_Length:** The length of the random room name.
*   **Jitsi_Chromecast_Enabled:** Enables Chromecast support.
*   **Jitsi_SSL:** Whether to use HTTPS for Jitsi.

These settings are managed via the Rocket.Chat admin panel under `Administration > Settings > Video Conference`. The backend for these settings lives in **`app/settings/server/settings.js`** and related files.

#### C. Other Providers:

Rocket.Chat's architecture allows for integration with other video conferencing providers like Google Meet or BigBlueButton. The mechanism is similar: Rocket.Chat generates a link or uses an API to create a meeting, and then opens that meeting in the user's browser, offloading the actual video stream handling to the external service. This is managed by `VideoConfProviders` (e.g., **`ee/app/videobridge/server/`** or **`app/videobridge/server/lib/`** in older versions for different provider implementations).

---

### III. Direct 1:1 Video Calls (Native WebRTC)

For private 1:1 chats, Rocket.Chat offers a native direct video call feature that leverages WebRTC directly between the two users, with the Rocket.Chat server acting as a signaling broker.

#### A. How Native 1:1 Calls Work:

1.  **Initiation:**
    *   In a direct message (DM) conversation, one user clicks the "Call" button.
    *   This triggers a server-side method, for instance, `createDirectCall` (**`server/methods/createDirectCall.ts`**).

2.  **Signaling through Rocket.Chat Server:**
    *   The Rocket.Chat server acts as a signaling server. It doesn't handle the media stream itself, but facilitates the exchange of critical information between the two users' browsers:
        *   **SDP (Session Description Protocol) Offers/Answers:** These describe the capabilities of each user's browser (e.g., codecs, resolutions, IP addresses).
        *   **ICE (Interactive Connectivity Establishment) Candidates:** These are network candidates (IP addresses and ports) that each user's browser can use to try and establish a direct connection.
    *   This signaling happens over Rocket.Chat's DDP protocol. The server simply relays the messages between the two clients. Call state and signaling data are often managed via collections like `Video_Calls` or specific server publications (**`server/publications/webrtc.ts`** might be involved).

3.  **Peer-to-Peer Connection (WebRTC):**
    *   Once the SDP and ICE candidates are exchanged, the two browsers attempt to establish a direct peer-to-peer WebRTC connection.
    *   This typically happens in the `client/components/calls/DirectCall/` directory (e.g., **`client/components/calls/DirectCall/DirectCall.js`**).
    *   **STUN/TURN Servers:**
        *   To overcome network address translation (NAT) and firewalls, WebRTC relies on STUN (Session Traversal Utilities for NAT) and TURN (Traversal Using Relays around NAT) servers.
        *   **STUN servers** help peers discover their public IP addresses.
        *   **TURN servers** act as relays if a direct peer-to-peer connection cannot be established (e.g., strict firewalls).
        *   Rocket.Chat needs to be configured with STUN/TURN server details in the admin settings (`WebRTC_StunServers`, `WebRTC_TurnServers` in `app/settings/server/settings.js`).

4.  **Media Streaming:**
    *   Once the peer connection is established, audio and video streams flow directly between the two users' browsers, bypassing the Rocket.Chat server entirely.

---

### IV. Architectural Components

*   **Client-Side (Browser):**
    *   **UI Components:** Buttons, call display, video rendering (e.g., `client/components/message/VideoCall.js`, `client/components/calls/DirectCall/DirectCall.js`).
    *   **WebRTC API:** JavaScript API for accessing camera/microphone, establishing peer connections (for 1:1 calls).
    *   **DDP Client:** For real-time signaling with the Rocket.Chat server.
    *   **External Service Integration:** Logic for opening new windows or embedding iframes for Jitsi/other providers.
*   **Rocket.Chat Server:**
    *   **API/Methods:** Endpoints for initiating calls, generating Jitsi URLs, or handling 1:1 call signaling (e.g., `server/methods/videoConference/startJitsiCall.ts`, `server/methods/createDirectCall.ts`).
    *   **Settings Management:** Stores and provides configuration for video conferencing (e.g., Jitsi domain, STUN/TURN servers).
    *   **Signaling Broker:** Relays SDP offers/answers and ICE candidates for 1:1 calls.
    *   **`app/videobridge`:** Module responsible for managing video conference providers.
*   **External Video Conference Service (e.g., Jitsi Meet Server):**
    *   Hosts the multi-party conference, handles media routing, transcoding, recording, etc.
    *   Communicates directly with users' browsers using WebRTC.
    *   *This is independent of the Rocket.Chat server.*

---

In summary, Rocket.Chat provides a robust and flexible video conferencing solution by leveraging the powerful Jitsi Meet integration for scalable group calls and offering native WebRTC for direct 1:1 communication, with its server acting as a crucial signaling and orchestration layer.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,989 |
| Model | gemini-2.5-flash |
| Tools | NONE |
