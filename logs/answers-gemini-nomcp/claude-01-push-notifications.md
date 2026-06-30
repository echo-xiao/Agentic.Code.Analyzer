# How do push notifications work in Rocket.Chat?

## Baseline Answer (no tools)

Push notifications in Rocket.Chat are a critical component for real-time communication, ensuring users are notified of new messages, mentions, and other events even when they are not actively using the application. The system has evolved, but the core principles remain.

Here's a detailed breakdown of how push notifications work in Rocket.Chat, including the server-side logic, external services, and client-side reception:

## High-Level Overview

1.  **Event Trigger:** A new message or event occurs on the Rocket.Chat server.
2.  **Notification Logic:** The server determines which users should receive a notification based on their preferences and the event type.
3.  **Token Retrieval:** For each eligible user, the server retrieves their registered device tokens (APN for iOS, FCM for Android/Web).
4.  **Payload Construction:** A notification payload (containing message details, sender, room ID, etc.) is created.
5.  **Push Gateway Interaction:** The Rocket.Chat server sends this payload to the appropriate external push notification service (APN or FCM).
6.  **External Service Delivery:** APN/FCM deliver the notification to the user's device.
7.  **Client Reception:** The mobile app or web browser (via Service Worker) receives and processes the notification.

## Detailed Flow and Components

### 1. Event Trigger and Notification Determination (Server-Side)

*   **Trigger:** The primary trigger is a new message being sent in a channel or direct message. Other triggers can include mentions, direct messages, or specific system events.
*   **Core Logic:** When a message is inserted into the database, a server-side hook or observer is activated.
    *   **File:** `app/lib/server/lib/sendNotificationsOnMessage.ts` is a key file responsible for orchestrating the notification process for new messages.
*   **User Preferences & Room Settings:** Before sending, Rocket.Chat checks:
    *   **User's Global Preferences:** `User Menu > My Account > Preferences > Notifications`. This includes settings like "Desktop Notifications," "Mobile Notifications," "Email Notifications," and "Audio Notifications."
    *   **Room-Specific Preferences:** Users can mute specific rooms or customize notification settings per room.
    *   **Message Type:** Is it a direct message, a mention, or a regular message in a channel? This influences the notification type and content.
    *   **User Status:** Is the user online, away, or offline? Notifications might be suppressed or delayed if the user is actively online in the same room.

### 2. Push Token Registration and Storage

*   **Client-Side Registration:** When a user logs into a Rocket.Chat mobile app (iOS/Android) or enables web push notifications in a browser, the client-side code registers with the respective push service (APN or FCM) to obtain a unique device token.
*   **Server-Side Storage:** This device token is then sent to the Rocket.Chat server and stored in the `users` collection in MongoDB.
    *   **Collection:** `users`
    *   **Field:** `services.push.apn` (for iOS tokens) and `services.push.gcm` (for Android/Web tokens). Each can be an array of tokens if a user has multiple devices.
    *   **Example:**
        ```json
        {
          "_id": "userId123",
          "username": "john.doe",
          "services": {
            "push": {
              "apn": [
                {
                  "token": "apn_device_token_1",
                  "appName": "mainApp",
                  "userId": "userId123"
                }
              ],
              "gcm": [
                {
                  "token": "fcm_device_token_1",
                  "appName": "mainApp",
                  "userId": "userId123"
                },
                {
                  "token": "fcm_web_token_2",
                  "appName": "web",
                  "userId": "userId123"
                }
              ]
            }
          }
        }
        ```
*   **Retrieval:** When a notification needs to be sent, the server queries the `users` collection to get the relevant tokens for the target user(s).
    *   **File:** `app/models/server/raw/Users.ts` (or `RocketChat.models.Users` methods) handles database interactions.

### 3. Payload Construction

*   The server constructs a JSON payload containing all necessary information for the client to display and process the notification.
*   **Common Payload Fields:**
    *   `title`: The notification title (e.g., sender's name).
    *   `text`: The notification body (e.g., message content).
    *   `messageId`: The ID of the message that triggered the notification.
    *   `rid`: The room ID.
    *   `sender`: Details about the sender.
    *   `type`: `MESSAGE`, `MENTION`, `DM`, etc.
    *   `badge`: Number of unread messages (for app icon badge).
    *   `sound`: Notification sound.
    *   `image`: URL to an image (e.g., sender's avatar).
*   **File:** `app/lib/server/lib/sendNotificationsOnMessage.ts` is where the payload is formatted.

### 4. Sending to Push Gateways (Rocket.Chat Push Module)

Rocket.Chat uses its internal push module (historically `rocketchat:push` package, now integrated) to interact with external push services.

*   **Orchestration:** `app/push/server/lib/PushNotification.ts` acts as the central point for sending notifications. It determines whether to use APN or FCM based on the device token type.
*   **APN (Apple Push Notification service):**
    *   Used for iOS devices.
    *   **File:** `app/push/server/lib/APN.ts` contains the logic for connecting to APN, signing requests with certificates/keys, and sending the APN-specific payload.
    *   Requires an Apple Developer account and APN certificates/keys configured in Rocket.Chat's administration settings.
*   **FCM (Firebase Cloud Messaging):**
    *   Used for Android devices and Web Push notifications.
    *   **File:** `app/push/server/lib/FCM.ts` contains the logic for connecting to FCM and sending the FCM-specific payload.
    *   Requires a Firebase project and a Server Key configured in Rocket.Chat's administration settings.

#### Legacy Rocket.Chat Push Gateway (Deprecated for New Setups)

In older versions or specific deployments, Rocket.Chat could be configured to send all push notifications to a central Rocket.Chat Push Gateway (e.g., `push.rocket.chat`). This gateway acted as a proxy, forwarding the notifications to APN/FCM.

*   **Pros:** Simplified setup for admins (didn't need to configure APN/FCM directly).
*   **Cons:** Added an extra hop, potential privacy concerns (though the gateway only saw encrypted payloads), and reliance on an external service.
*   **Modern Approach:** Direct integration with FCM/APN is now the recommended and default approach, giving administrators full control and potentially better performance.

### 5. External Service Delivery (APN/FCM)

*   APN and FCM are highly scalable, reliable services designed to deliver notifications to devices globally.
*   They handle device connectivity, network conditions, and power management to ensure efficient delivery.

### 6. Client-Side Reception and Processing

*   **Mobile Apps (iOS/Android):**
    *   The native operating system receives the push notification.
    *   The Rocket.Chat mobile app (built with React Native) has native modules that listen for these notifications.
    *   Upon reception, the app processes the payload:
        *   Displays a system notification (banner, sound, vibration).
        *   Updates the app icon badge count.
        *   If the app is in the foreground, it might update the UI directly or trigger a local notification.
        *   The app can use the `messageId` and `rid` to navigate to the correct message/room when the user taps the notification.
*   **Web/Desktop Apps:**
    *   **Service Workers:** For web push notifications, the browser's Service Worker (a JavaScript file running in the background) receives the notification.
        *   **File:** `public/service-worker.js` (or similar) contains the logic for handling push events.
        *   The Service Worker then uses the browser's Notification API to display the notification to the user.
    *   **Electron Desktop App:** The Electron app behaves similarly to a web app but has more direct access to system notifications. It uses the same underlying web push mechanisms or specific Electron APIs for notifications.

## Administration Settings

Administrators configure push notifications via:

*   **Administration > Workspace > Push**
    *   `Push_Enable`: Global toggle for push notifications.
    *   `Push_Gateway`: (Legacy) URL of the Rocket.Chat Push Gateway.
    *   `Push_APN_Cert`, `Push_APN_Key`: APN certificate and key for iOS.
    *   `Push_GCM_API_Key`: FCM Server Key for Android/Web.
    *   `Push_GCM_Project_Number`: FCM Project Number.

## Key Files and Modules

*   `app/lib/server/lib/sendNotificationsOnMessage.ts`: Main entry point for message-based notifications.
*   `app/push/server/lib/PushNotification.ts`: Orchestrates sending push notifications.
*   `app/push/server/lib/APN.ts`: APN specific implementation.
*   `app/push/server/lib/FCM.ts`: FCM specific implementation.
*   `app/models/server/raw/Users.ts`: Handles user data, including push tokens.
*   `app/settings/server/settings.ts`: Where push-related administration settings are defined and loaded.
*   `public/service-worker.js`: Client-side logic for web push notifications.

By combining these server-side processes with external push services and client-side handling, Rocket.Chat delivers a robust and reliable push notification experience.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 4,154 |
| Model | gemini-2.5-flash |
| Tools | NONE |
