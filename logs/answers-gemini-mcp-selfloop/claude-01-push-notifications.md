# How do push notifications work in Rocket.Chat?

## Plan

intent: architecture

## Gemini Answer

Push notifications in Rocket.Chat follow a structured flow, starting from message saving and culminating in platform-specific push services.

Here's the breakdown:

**1. Notification Trigger and Initial Processing:**
   - When a message is saved, an `afterSaveMessage` callback (with low priority) triggers the notification process.
   - This leads to `sendAllNotifications` (apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts), which then calls `sendMessageNotifications` (apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts).
   - `sendMessageNotifications` checks for the `Troubleshoot_Disable_Notifications` setting and, if enabled, exits. Otherwise, it determines notification recipients based on mentions, room settings, and user preferences.

**2. Per-User Notification Handling:**
   - For each eligible user, `sendMessageNotifications` calls `sendNotification` (apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts).
   - Inside `sendNotification`, several checks are performed:
     - It ensures the sender is not notified.
     - It handles group mention muting.
     - It verifies user permissions to view direct messages.
     - It parses the message text for the specific user.
     - It determines if the message is highlighted for the user.

**3. Notification Type Determination and Queuing:**
   - `sendNotification` then evaluates whether to send desktop, mobile (push), or email notifications based on user preferences and message characteristics:
     - **Desktop Notifications:** If `shouldNotifyDesktop` returns true, `notifyDesktopUser` is called immediately (not queued).
     - **Mobile Push Notifications:** If `shouldNotifyMobile` returns true, a `NotificationItem` of type 'push' is created with relevant data (using `getPushData`) and added to a queue.
     - **Email Notifications:** If `shouldNotifyEmail` returns true and the user has a verified email, a `NotificationItem` of type 'email' is created (using `getEmailData`) and added to a queue.
   - Finally, if there are any `queueItems`, `Notification.scheduleItem` (apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts) is called to add them to the notification queue.

**4. Notification Queue Processing (Conceptual):**
   - The `NotificationQueue` worker (as described in the plan, though not directly surfaced in the code details) processes these queued items.
   - For 'push' items, it calls `PushNotification.send()`, which then routes to `PushClass`.
   - `PushClass` handles the actual sending:
     - In gateway mode, it makes an HTTP POST request to the cloud gateway.
     - In native mode, it calls `sendAPN()` for Apple Push Notification service or `sendFCM()` for Google Firebase Cloud Messaging.

**Key Files:**

- **`apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts`**: This file contains the core logic for initiating and processing notifications, including `sendAllNotifications`, `sendMessageNotifications`, and `sendNotification`. It also handles the queuing of push and email notifications via `Notification.scheduleItem`.

## Tool Calls (8 calls, 36,497 tokens)

**Step 1:** `plan({"question":"How do push notifications work in Rocket.Chat?","intent":"architecture"})` → 292 tokens
**Step 2:** `search({"query":"sendAllNotifications","layer":"server"})` → 76 tokens
**Step 3:** `graph({"move":"down","query":"sendAllNotifications","file":"sendNotificationsOnMessage.ts","depth":4})` → 1140 tokens
**Step 4:** `details({"filename":"messenger.ts","symbolName":"sendNotification"})` → 85 tokens
**Step 5:** `search({"query":"Notification.scheduleItem","layer":"server"})` → 90 tokens
**Step 6:** `details({"filename":"sendNotificationsOnMessage.ts","symbolName":"sendNotificationsOnMessage.ts"})` → 65 tokens
**Step 7:** `details({"symbolName":"sendMessageNotifications","filename":"sendNotificationsOnMessage.ts"})` → 972 tokens
**Step 8:** `details({"symbolName":"sendNotification","filename":"sendNotificationsOnMessage.ts"})` → 1235 tokens

## Files Seen In Tool Results (2)

- `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts`
- `packages/apps-engine/deno-runtime/lib/messenger.ts`
