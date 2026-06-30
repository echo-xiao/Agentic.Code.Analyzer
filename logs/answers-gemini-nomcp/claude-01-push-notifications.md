# How do push notifications work in Rocket.Chat?

## Baseline Answer (no tools)

Push notifications in Rocket.Chat involve several components working together, from the client device registering to the server sending the notification via a push gateway. Here's a detailed breakdown:

### Overall Flow

1.  **Device Registration**: The Rocket.Chat mobile app (or desktop app) registers with the native push service (FCM for Android/Web, APN for iOS) and obtains a unique device token. This token is then sent to the Rocket.Chat server.
2.  **Server Storage**: The Rocket.Chat server stores this device token and associated metadata (device type, app ID, etc.) in its database, linked to the user.
3.  **Notification Trigger**: When a new message arrives that should trigger a push notification (e.g., direct message, mention, message in a watched room, depending on user settings), the Rocket.Chat server identifies the target users and their devices.
4.  **Payload Generation**: The server generates a notification payload containing message details, sender, room information, and sound/vibration preferences.
5.  **Push Gateway Communication**: The Rocket.Chat server sends this payload and the device tokens to a **Unified Push Gateway (UPG)**. Rocket.Chat often uses its cloud-hosted UPG for simplicity, but a self-hosted alternative is possible.
6.  **Native Service Relay**: The UPG translates the generic Rocket.Chat payload into the specific format required by FCM (Firebase Cloud Messaging) or APN (Apple Push Notification service).
7.  **Native Service Delivery**: FCM/APN deliver the notification to the target device.
8.  **Client-side Reception**: The Rocket.Chat app on the device receives the notification, processes its content, and displays it to the user.

### Key Components and File Paths

Let's dive into the specifics within the Rocket.Chat codebase:

#### 1. Device Registration (Client to Server)

*   **Client-side (Mobile App - React Native)**:
    *   The mobile application integrates with native push notification libraries (e.g., `@react-native-firebase/messaging` for FCM).
    *   It obtains a device token from FCM/APN.
    *   This token, along with device information, is sent to the Rocket.Chat server using a Meteor method.
    *   **Relevant files**:
        *   `apps/mobile/src/lib/notifications.ts`: Handles the initialization of push notifications, requesting permissions, obtaining the device token, and sending it to the server.
        *   `apps/mobile/src/push.ts`: Push notification setup and handling logic specific to the mobile app.

*   **Server-side (Receiving Token)**:
    *   The Rocket.Chat server exposes a Meteor method for clients to register their push tokens.
    *   **`app/push/server/push_methods.js`**: Contains the `push-enable` method. When a client calls this method, it provides its device token, device type, and app ID.
    *   **`app/models/server/models/Users.js`**: Methods within this file (like `saveUserPushData`) are called to store the device information. The push tokens are typically stored in the `users.services.push` field of the `users` collection in MongoDB, containing entries for `apn`, `gcm` (FCM), and `web` tokens, along with device-specific metadata.

#### 2. Server-side Notification Trigger and Payload Generation

*   **Message Processing**: When a message is sent, the server determines if a push notification should be sent based on user preferences (e.g., "Notify for all messages," "Mentions only," "Nothing").
*   **`app/notifications/server/lib/senders/PushSender.ts`**: This class is responsible for creating the push notification object and adding relevant data like message text, sender, room ID, badges, etc.
*   **`app/notifications/server/lib/Notification.ts`**: Defines the structure of a generic notification object, which is then adapted for push.
*   **`app/lib/server/lib/sendNotifications.js`**: This module (or similar logic in `app/notifications/server`) is generally where the high-level decision to send notifications (including push) is made after a message is processed. It filters users based on online status, notification preferences, etc.
*   **`app/push/server/push_events.js`**: Listens to server events (e.g., `rocketchat.sendMessage` or `Messages.insert`) and triggers the push notification logic.

#### 3. Push Gateway Communication (Server to UPG)

*   **`app/push/server/lib/sender.js`**: This is the core logic for sending the actual HTTP request to the configured Unified Push Gateway (UPG). It constructs the JSON payload based on the notification data and device tokens.
*   **`app/push/server/lib/PushNotification.js`**: A helper class used to format the notification data before sending it to the `sender.js`.
*   **Settings**: The Rocket.Chat server needs to be configured with the UPG URL and a secret key for authentication. These are usually found in the `rocketchat_settings` collection or via the UI:
    *   `Push_enable` (boolean): Enables/disables push notifications.
    *   `Push_gateway` (string): The URL of the Unified Push Gateway (e.g., `https://push.rocket.chat`).
    *   `Push_secret_key` (string): The secret key used to authenticate with the UPG.
    *   **Relevant files**: `server/startup/settings.ts` (default settings), `app/settings/server/lib/callbacks.js` (settings handlers).

#### 4. Unified Push Gateway (UPG)

*   This is a **separate microservice** (not part of the main Rocket.Chat codebase) that acts as an intermediary.
*   **Function**: It receives generic push requests from Rocket.Chat servers. For each request, it:
    *   Authenticates the Rocket.Chat server using the `Push_secret_key`.
    *   Identifies the target devices and their push service (FCM or APN).
    *   Translates the generic payload into the specific format required by FCM or APN.
    *   Sends the notification to the respective native push service (FCM or APN).
    *   Handles potential errors or feedback from FCM/APN.

#### 5. Native Push Services (FCM / APN)

*   **Firebase Cloud Messaging (FCM)**: Google's service for sending push notifications to Android devices, web browsers, and iOS devices. The UPG uses FCM's API to send notifications.
*   **Apple Push Notification service (APN)**: Apple's service for sending push notifications to iOS and macOS devices. The UPG uses APN's API.
*   These services are responsible for delivering the notification reliably to the device, even if the app is closed.

#### 6. Client-side Reception and Display

*   **Mobile App (React Native)**:
    *   The mobile app's native code (Android/iOS) receives the push notification from FCM/APN.
    *   `react-native-push-notification` or similar libraries (often integrated with Firebase modules) handle the incoming notification in the JavaScript layer.
    *   The app parses the payload, extracts message details, and displays a system notification to the user.
    *   If the app is in the background, tapping the notification typically opens the app to the relevant chat room.
    *   **Relevant files**:
        *   `apps/mobile/src/notifications/LocalNotification.ts`: Logic for displaying and handling the received notification payload.
        *   `apps/mobile/src/services/deepLinking.ts`: Handles navigating to specific parts of the app when a notification is tapped (e.g., opening a specific room).

#### Desktop and Web Push

*   **Web Push**: For web browsers, the process is similar to Android, using FCM (or browser-specific push services) and Service Workers.
    *   `app/notifications/client/push.js` (legacy, but indicates client-side push setup).
    *   `app/push/client/push.js` (client-side Meteor package for push subscriptions).
*   **Desktop App**: Uses Electron's notification capabilities, often triggered by the same server-side push logic or specific desktop notification services.
    *   `app/notification-desktop/client/init.js`: Desktop-specific notification initialization.

By abstracting away the complexities of APN and FCM through the Unified Push Gateway, Rocket.Chat simplifies its server-side notification logic and allows for easier maintenance and scaling of push services.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,561 |
| Model | gemini-2.5-flash |
| Tools | NONE |
