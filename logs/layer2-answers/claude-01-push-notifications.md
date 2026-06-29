# How do push notifications work in Rocket.Chat?

## Gemini Answer

Push notifications in Rocket.Chat are triggered after a message is saved and processed through a queueing system before being dispatched to Apple's (APN) or Google's (FCM) services.

Here is the step-by-step breakdown of the flow:

**Call Chain:** `afterSaveMessage` → `sendAllNotifications` → `sendMessageNotifications` → `sendNotification` → `Notification.scheduleItem` → (NotificationQueue) → `Push.send` → (APN/FCM)

---

### 1. Message Save Hook

The process starts when a new message is saved. A callback function, `afterSaveMessage`, is triggered. This hook initiates the notification sending process for the message.

### 2. Notification Dispatch

The initial dispatch logic resides in `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts`.

-   **`sendAllNotifications`**: This is the entry function called by the `afterSaveMessage` hook.
-   **`sendMessageNotifications`**: This function is called by `sendAllNotifications` and iterates through all the users in a room who might need to be notified.
-   **`sendNotification`**: For each user, this function is called. It checks the user's notification preferences and the device status (online, offline) to decide which types of notifications should be sent: desktop, email, or mobile (push).

### 3. Queueing Push Notifications

If `sendNotification` determines that a push notification should be sent (based on the `shouldNotifyMobile` check), it doesn't send it immediately. Instead, it schedules it for later delivery using a queue.

-   **File**: `apps/meteor/app/push-notifications/server/lib/PushNotification.ts`
-   **Function**: `Notification.scheduleItem({type: 'push', ...})`
-   **Logic**: This function adds a job to the `NotificationQueue`. The delay depends on the user's status:
    -   **Online**: The job is delayed (e.g., by 120 seconds) to avoid sending a push if the user reads the message on another client.
    -   **Offline**: The job is scheduled with no delay.

### 4. Processing the Queue

A background worker constantly processes the `NotificationQueue`. When it picks up a 'push' item, it triggers the final sending logic.

### 5. Sending to Mobile Gateways

The final step involves communicating with the platform-specific push notification gateways.

-   **File**: `apps/meteor/app/push/server/push.ts`
-   **Function**: The worker ultimately calls a function like `Push.send`. This central `Push` service handles the dispatch.
-   **Logic**: The `Push.send` function determines how to send the notification:
    1.  **Gateway Mode**: If the server is configured to use the Rocket.Chat push gateway, it sends an authenticated HTTP POST request to the gateway, which then relays the notification to APN or FCM.
    2.  **Native Mode**: If the server is configured with its own mobile certificates and keys, it connects and sends the payload directly to the appropriate service:
        -   `sendAPN()` for Apple devices.
        -   `sendFCM()` for Google/Android devices.

## Tool Calls (8 calls, 31,701 tokens)

**Step 1:** `search({"query":"send push notification"})` → 107 tokens
**Step 2:** `search({"query":"sendPush"})` → 62 tokens
**Step 3:** `search({"query":"Push","layer":"server"})` → 583 tokens
**Step 4:** `graph({"query":"PushNotification.send","direction":"down"})` → 15 tokens
**Step 5:** `search({"query":"PushNotification file:app/push-notifications/server/lib/PushNotification.ts"})` → 30 tokens
**Step 6:** `search({"query":"sendNotification","layer":"server"})` → 273 tokens
**Step 7:** `graph({"query":"sendNotification file:app/lib/server/lib/sendNotificationsOnMessage.ts","direction":"down")` → 27 tokens
**Step 8:** `graph({"direction":"down","query":"sendNotification"})` → 1045 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 4/5 |
| Tool calls | 8 |
| Total tokens | 31,701 |
| Pass | NO |
