# How does the video conference system work in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat's video conferencing system is designed to be highly extensible, primarily by integrating with various third-party video conferencing providers rather than implementing a full WebRTC stack directly within Rocket.Chat itself. This allows users to leverage existing, robust solutions like Jitsi Meet, Google Meet, and others.

Here's a breakdown of how it works:

### 1. Core Concept: Provider Abstraction

Rocket.Chat acts as an orchestrator. It manages the initiation and display of video calls but delegates the actual real-time communication (audio, video, screen sharing) to external services. The system uses a "provider" model, allowing administrators to choose their preferred service.

The default and most tightly integrated provider is **Jitsi Meet**.

### 2. How a Video Call is Initiated

1.  **User Action:** A user clicks the "Video Call" button in a channel or direct message (DM) room. This button is typically found in the room header, managed by components like `client/components/room/RoomHeader/RoomHeader.tsx`.
2.  **Client-Side Request:** The client-side code triggers a server method call, usually `createVideoCall`. This is handled by the `VideoConf.ts` service:
    *   `client/lib/videoconference/VideoConf.ts`: This service is the central client-side orchestrator for video conferencing. It determines which provider is active and handles the UI updates.
3.  **Server-Side Processing (`createVideoCall`):**
    *   The `app/videoconference/server/methods/createVideoCall.ts` method is invoked.
    *   It retrieves the currently configured video conferencing provider from `RocketChat.settings.Video_Conf_Provider`.
    *   Based on the selected provider, it calls a provider-specific function to generate a meeting URL. For Jitsi, this is typically `app/videoconference/server/functions/startJitsiCall.ts`.
    *   A new record for the ongoing video conference is created in the `video-conferences` MongoDB collection. This collection stores details like the `_id`, `roomId` (the Rocket.Chat room ID where the call started), `providerName`, `url`, `status` (e.g., `ongoing`), and `startedBy`.
        *   The schema for this collection is managed by `app/models/server/raw/VideoConferences.ts`.
    *   The generated URL and the video conference `_id` are returned to the client.
4.  **Client-Side Rendering:**
    *   Upon receiving the URL, the `VideoConf.ts` service updates the UI.
    *   For **Jitsi Meet**, Rocket.Chat embeds the Jitsi meeting directly within an `iframe` in the room. This makes the experience seamless, as users don't leave Rocket.Chat.
        *   `client/lib/videoconference/providers/JitsiMeetProvider.ts`: This file contains the client-side logic for integrating with Jitsi, including setting up the iframe and interacting with the Jitsi Meet External API for features like muting/unmuting, ending the call, etc.
        *   `client/components/room/VideoConference/VideoConference.tsx` (or similar component) displays the iframe.
    *   For other providers (like Google Meet or BigBlueButton), Rocket.Chat typically opens the meeting URL in a new browser tab or window, redirecting the user to the external service.

### 3. Key Components and Technologies

*   **Jitsi Meet (Default Provider):**
    *   **External Service:** Jitsi Meet is an open-source WebRTC-based video conferencing server. Rocket.Chat typically connects to a self-hosted Jitsi instance or the public `meet.jit.si`.
    *   **Jitsi Meet External API:** Rocket.Chat uses this JavaScript API to control the embedded Jitsi instance (e.g., mute microphone, hang up) and listen for events.
    *   **iFrame Embedding:** The Jitsi meeting is loaded into an `<iframe>` within the Rocket.Chat UI, providing an integrated experience.
    *   **Server-Side URL Generation:** `app/videoconference/server/functions/startJitsiCall.ts` constructs the Jitsi meeting URL based on Rocket.Chat's room ID and configured Jitsi settings (e.g., domain, enable password).

*   **Other Providers:**
    *   **Google Meet, BigBlueButton, Webex:** These are typically integrated by generating a specific URL for the meeting and opening it in a new browser tab. The level of integration (e.g., ability to control the external meeting from Rocket.Chat) varies greatly and is generally less deep than Jitsi.
    *   **Custom Provider:** Rocket.Chat allows administrators to configure a generic "Custom" provider, where they can define a URL template that includes placeholders for the Rocket.Chat room ID, allowing for integration with almost any external video conferencing service.
    *   `client/lib/videoconference/providers/`: This directory contains implementations for various providers.

*   **Settings:**
    *   `app/videoconference/server/settings.ts`: Defines the server-side settings for video conferencing, including the `Video_Conf_Provider` (Jitsi, Google Meet, BigBlueButton, etc.), Jitsi domain, and other provider-specific configurations.
    *   These settings are accessible via the Rocket.Chat Admin UI under `Administration > Settings > Video Conference`.

*   **Database (MongoDB):**
    *   The `video-conferences` collection (`app/models/server/raw/VideoConferences.ts`) stores current and past video call metadata, allowing Rocket.Chat to display an "ongoing call" indicator and allow other users to join.

*   **User Interface:**
    *   `client/components/room/RoomHeader/RoomHeader.tsx`: Contains the "Video Call" button.
    *   `client/components/room/VideoConference/VideoConference.tsx`: This or similar components handle the display of the embedded video conference (e.g., Jitsi iframe) or notification about an ongoing call.

In summary, Rocket.Chat's video conferencing system is a clever abstraction layer that allows it to leverage the specialized capabilities of external video conferencing services, with Jitsi Meet offering the most deeply integrated experience due to its open nature and robust API.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,001 |
| Model | gemini-2.5-flash |
| Tools | NONE |
