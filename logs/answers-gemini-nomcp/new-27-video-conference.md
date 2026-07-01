# How does the video conference system work in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat's video conferencing system primarily leverages **Jitsi Meet**, an open-source, secure, and scalable video conferencing solution. Rocket.Chat does not implement its own WebRTC stack from scratch but rather integrates with Jitsi Meet to provide this functionality.

Here's a breakdown of how it works:

### 1. Core Technology: Jitsi Meet

*   **WebRTC-based**: Jitsi Meet is built on WebRTC, allowing real-time communication directly in the browser without plugins.
*   **Open Source**: Its open-source nature aligns well with Rocket.Chat's philosophy, allowing for self-hosting and customization.
*   **Scalable**: Jitsi can be scaled to support many concurrent users and conferences.

### 2. Integration Mechanism

When a user initiates a video call in Rocket.Chat:

1.  **URL Generation**: Rocket.Chat generates a unique Jitsi meeting URL. This URL typically includes parameters for the room name, and potentially user display name and avatar, which Jitsi uses to pre-configure the meeting.
2.  **Embedding/Opening**:
    *   By default, Rocket.Chat embeds the Jitsi meeting within an `<iframe>` directly into the Rocket.Chat UI (e.g., in a dedicated video conference view or a modal).
    *   Alternatively, administrators can configure Rocket.Chat to open the Jitsi meeting in a new browser tab or window.
3.  **Parameter Passing**: Rocket.Chat passes user context (like the user's display name and avatar) to Jitsi. This ensures that participants see familiar names and images within the Jitsi interface.
4.  **Authentication (Optional)**: For self-hosted Jitsi instances, Rocket.Chat can be configured to use JWT (JSON Web Token) authentication. In this scenario, Rocket.Chat's server generates a JWT token, which is then passed to Jitsi to authenticate users and enforce permissions (e.g., who can start a meeting, who can moderate).

### 3. Key Configuration Settings (Admin Panel)

Rocket.Chat administrators can configure the Jitsi integration via the `Administration > Settings > Video Conference` section:

*   **`Jitsi_Enabled`**: Enables or disables the Jitsi integration.
*   **`Jitsi_Domain`**: The URL of your Jitsi Meet instance (e.g., `meet.jit.si` or your self-hosted domain).
*   **`Jitsi_SSL`**: Whether to use SSL for the Jitsi connection.
*   **`Jitsi_Open_New_Window`**: If enabled, Jitsi calls will open in a new browser tab instead of being embedded in the Rocket.Chat UI.
*   **`Jitsi_Enable_Bridge_Mode`**: Allows for a more direct peer-to-peer connection when possible, reducing server load.
*   **`Jitsi_Application_ID` / `Jitsi_Application_Secret`**: Used for JWT authentication with a self-hosted Jitsi instance.
*   **`Jitsi_URL_Room_Prefix`**: A prefix added to the room name when generating the Jitsi URL.

### 4. User Experience

*   **Starting a Call**: Users can initiate a video call directly from a channel or direct message conversation by clicking the "Video Call" button (often represented by a camera icon) in the message input area or the room header.
*   **Joining a Call**: Other participants in the conversation will see a notification or a button to join the ongoing call.
*   **In-Call Features**: Once in the Jitsi meeting, users have access to all standard Jitsi features, including:
    *   Video and audio controls (mute, camera on/off)
    *   Screen sharing
    *   Text chat within the Jitsi interface
    *   Participant list
    *   Raise hand
    *   Background blur/virtual backgrounds (if supported by Jitsi version)

### 5. Relevant Code Paths

The core logic for Jitsi integration resides primarily in the `app/videobridge` package:

*   **Client-side Call Initiation & Embedding**:
    *   `app/videobridge/client/lib/callManager.js`: Manages the state and initiation of video calls.
    *   `app/videobridge/client/views/videoConference/videoConference.html`: The template responsible for rendering the Jitsi iframe or managing the new window.
    *   `app/videobridge/client/views/videoConference/videoConference.js`: The client-side logic that handles embedding the Jitsi iframe, passing parameters, and managing its lifecycle.
    *   `app/ui-utils/client/lib/call.js`: Contains utility functions related to initiating calls.
*   **Server-side (for JWT)**:
    *   `app/videobridge/server/methods/generateJitsiToken.js`: If JWT authentication is configured, this server method is responsible for generating the secure token that Rocket.Chat passes to Jitsi.
*   **Settings**:
    *   The settings themselves are stored in the `rocketchat_settings` MongoDB collection.
    *   The UI for these settings is found in `app/ui-sidenav/client/admin/adminFlex.html` and related JavaScript files for the administration panel.

### 6. Extensibility

While Jitsi Meet is the default and most deeply integrated solution, Rocket.Chat's architecture allows for other video conference providers. For instance, it also supports BigBlueButton, though its integration is typically for more structured webinar/classroom scenarios rather than quick ad-hoc video calls. The `app/videobridge` package is designed with some level of abstraction to potentially support different providers, even if Jitsi is the primary focus.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 2,329 |
| Model | gemini-2.5-flash |
| Tools | NONE |
