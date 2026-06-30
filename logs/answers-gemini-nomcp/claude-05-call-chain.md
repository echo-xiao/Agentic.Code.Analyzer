# What is the complete call chain for sendMessage?

## Baseline Answer (no tools)

The `sendMessage` call chain in Rocket.Chat is quite extensive, involving client-side UI, Meteor method calls, server-side processing, database interactions, and real-time updates.

Here's a complete breakdown, starting from the user interface:

---

### 1. Client-Side Initiation (UI & Meteor Method Call)

1.  **User Input in Chat Input Component:**
    *   The user types a message into the chat input field.
    *   **File:** `app/ui-sidenav/client/components/ChatInput/ChatInput.tsx`
    *   When the user presses `Enter` or clicks the send button, an event handler is triggered.

2.  **`useChatInput` Hook:**
    *   The `ChatInput` component uses the `useChatInput` hook to manage its state and actions.
    *   **File:** `app/ui-sidenav/client/components/ChatInput/hooks/useChatInput.ts`
    *   This hook prepares the message data (text, attachments, thread ID if applicable) and calls the `handleSendMessage` function.

3.  **`handleSendMessage` Function:**
    *   This function is responsible for invoking the Meteor method.
    *   It typically calls `Meteor.call('sendMessage', rid, messageText, messageOptions)`.
    *   **File:** `app/ui-sidenav/client/components/ChatInput/hooks/useChatInput.ts` (within the hook)

---

### 2. Server-Side Meteor Method Execution

1.  **Meteor Method Definition:**
    *   The `sendMessage` Meteor method is defined on the server. This is the primary entry point for the client's request.
    *   **File:** `app/lib/server/methods/sendMessage.ts`
    *   This method typically performs initial validation and then delegates the core logic to a server-side helper function.

2.  **`RocketChat.sendMessage` (Server-Side Helper Function):**
    *   The Meteor method usually calls a more generic server-side function, `RocketChat.sendMessage`, which encapsulates the core message sending logic. This function can also be called by other server-side processes (e.g., API endpoints, integrations).
    *   **File:** `app/lib/server/functions/sendMessage.ts`
    *   This function takes `user`, `message`, and `room` objects as arguments.

3.  **Permissions and Validation:**
    *   Inside `RocketChat.sendMessage`, extensive checks are performed:
        *   **User Permissions:** `hasPermission('sendMessage', rid, user._id)` to ensure the user can send messages in the room.
        *   **Room Access:** `canAccessRoom(room, user)` to ensure the user is a member of the room.
        *   **Room State:** Checks if the room is read-only, archived, or if the user is muted.
        *   **Message Content:** Basic validation of message length, type, etc.
    *   **Files:** `app/authorization/server/functions/hasPermission.ts`, `app/lib/server/functions/canAccessRoom.ts`

4.  **Message Pre-processing:**
    *   **`parseMessage`:** This is a critical step that processes the raw message text.
        *   Parses markdown (bold, italics, code).
        *   Detects and extracts mentions (`@username`).
        *   Detects and extracts channel mentions (`#channel`).
        *   Detects and extracts URLs.
        *   Detects and converts emojis.
        *   **File:** `app/lib/server/lib/parseMessage.ts`
    *   **Bad Word Filter:** If enabled, the message is checked against a list of prohibited words.
        *   **File:** `app/lib/server/functions/filterBadWords.ts`
    *   **Custom Message Transformations:** Any configured custom transformations are applied.

5.  **`beforeSaveMessage` Callbacks:**
    *   Rocket.Chat uses a robust callback system. Before the message is saved to the database, the `beforeSaveMessage` callbacks are executed.
    *   **File:** `app/lib/server/lib/callbacks.ts`
    *   Examples of modules that might hook into `beforeSaveMessage`:
        *   Auto-translate (to detect language).
        *   Link previews (to fetch metadata for URLs).
        *   Federation (to prepare messages for federated servers).

6.  **Database Insertion:**
    *   The processed message object is inserted into the `Messages` collection.
    *   **File:** `app/models/server/raw/Messages.ts` (for the raw collection access)
    *   `Messages.insertOne(messageObject)`

7.  **Room and User Updates:**
    *   **Room Update:** The `Rooms` collection is updated to reflect the new `lastMessage` and `_updatedAt` timestamp for the room.
        *   **File:** `app/models/server/raw/Rooms.ts`
    *   **User Update:** The `Users` collection might be updated for the sending user (e.g., `lastMessageSentAt`).
        *   **File:** `app/models/server/raw/Users.ts`

8.  **`afterSaveMessage` Callbacks:**
    *   After the message is successfully saved to the database, the `afterSaveMessage` callbacks are executed. This is where many side effects and notifications are triggered.
    *   **File:** `app/lib/server/lib/callbacks.ts`
    *   Examples of modules that hook into `afterSaveMessage`:
        *   **Notifications:** `sendNotifications` (push, email, desktop, webhooks).
            *   **File:** `app/lib/server/functions/notifications/sendNotifications.ts`
        *   **Thread Updates:** If the message is part of a thread, the thread's metadata is updated.
        *   **Mention Handling:** Updates unread counts for mentioned users.
        *   **Unread Counts:** Updates unread message counts for all room members.
        *   **Livechat:** Specific processing for livechat messages.
        *   **Federation:** Propagates the message to federated servers.
        *   **Analytics:** Logs message sending for usage statistics.
        *   **Message Link Handler:** Processes specific types of links (e.g., YouTube, Twitter) to embed content.
        *   **Auto-translate:** Translates the message if auto-translate is enabled and the language differs.

---

### 3. Real-time Propagation (DDP)

1.  **Meteor's Reactive Data:**
    *   Because `Messages.insert` was used, Meteor's DDP (Distributed Data Protocol) automatically detects the change in the `Messages` collection.
    *   Any client subscribed to the messages of that specific room will receive the new message data in real-time.
    *   This pushes the new message to all active clients in the room without explicit server-side code for each client.

---

### Summary of Key Files and Components:

*   **Client UI:** `app/ui-sidenav/client/components/ChatInput/ChatInput.tsx`
*   **Client Hook:** `app/ui-sidenav/client/components/ChatInput/hooks/useChatInput.ts`
*   **Server Meteor Method:** `app/lib/server/methods/sendMessage.ts`
*   **Core Server Logic:** `app/lib/server/functions/sendMessage.ts`
*   **Message Parsing:** `app/lib/server/lib/parseMessage.ts`
*   **Callbacks System:** `app/lib/server/lib/callbacks.ts`
*   **Database Models:**
    *   `app/models/server/raw/Messages.ts`
    *   `app/models/server/raw/Rooms.ts`
    *   `app/models/server/raw/Users.ts`
*   **Permissions:** `app/authorization/server/functions/hasPermission.ts`
*   **Notifications:** `app/lib/server/functions/notifications/sendNotifications.ts`

This comprehensive chain ensures that a message is properly handled from user input to database persistence and real-time delivery to all relevant clients, while also triggering various side effects and integrations.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,829 |
| Model | gemini-2.5-flash |
| Tools | NONE |
