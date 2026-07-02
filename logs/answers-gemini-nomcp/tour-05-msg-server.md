# How is a message sent on the server side in Rocket.Chat?

## Baseline Answer (no tools)

Sending a message on the server side in Rocket.Chat involves a well-defined flow, leveraging Meteor's DDP (Distributed Data Protocol), MongoDB for persistence, and a robust system of hooks and functions.

Here's a breakdown of the process, including key file paths:

### 1. Entry Point: Meteor Method Call

The process begins when a client (web, desktop, mobile) invokes a Meteor Method. The primary method for sending a message is `sendMessage`.

*   **File:** `app/lib/server/methods/sendMessage.ts` (or `server/methods/sendMessage.ts` in newer structures)

This method receives the message payload (room ID, message text, attachments, etc.) from the client.

### 2. Initial Validation & Authorization

Inside the `sendMessage` method:

*   **User Authentication:** It first verifies that the user is logged in.
*   **Room Access:** Checks if the user has permission to send messages in the specified room (`rid`).
*   **Rate Limiting:** May apply rate limits to prevent spamming.

### 3. Message Pre-processing & Construction

If validation passes, the server starts constructing the full message object. This involves several steps, often delegated to helper functions:

*   **File:** `app/lib/server/functions/sendMessage.ts` (This is a crucial orchestrator function)
*   **File:** `app/lib/server/functions/parseMessage.ts` (Handles parsing mentions, links, markdown)
*   **File:** `app/lib/server/functions/getMessageType.ts` (Determines if it's a special command like `/me`, `/giphy`, etc.)
*   **File:** `app/lib/server/functions/processMessage.ts` (A more general processor that might orchestrate other parsing functions)

Key pre-processing steps include:

*   **Markdown Rendering:** Converts markdown syntax to HTML.
*   **Mentions Parsing:** Identifies `@username` and `#channel` mentions, linking them to user/room IDs.
*   **Link Previews:** If enabled, fetches metadata for URLs to create rich link previews.
*   **Emoji Conversion:** Converts shortcodes (e.g., `:smile:`) to actual emoji characters or images.
*   **Attachments:** Processes any attached files (uploading, storing metadata).
*   **Custom Message Types:** If the message starts with a command (e.g., `/me`), it's handled as a special message type.

At this stage, a comprehensive message object (`IMessage`) is built, containing all necessary metadata, parsed content, and references.

### 4. Before Save Hooks

Rocket.Chat has a powerful callback system. Before the message is saved to the database, `beforeSaveMessage` hooks are triggered. These are used by various modules and integrations to modify or validate the message further.

*   **File:** `app/lib/server/lib/callbacks.ts` (Defines the callback system)
*   **Example Usage:** Many integrations or custom apps might register callbacks here.

### 5. Database Persistence

The fully constructed and processed message object is then inserted into the `rocketchat_message` MongoDB collection.

*   **File:** `app/models/server/raw/Messages.ts` (Provides the interface for interacting with the `rocketchat_message` collection)

### 6. After Save Hooks & Post-Persistence Actions

Immediately after the message is saved:

*   **`afterSaveMessage` Hooks:** These are triggered, allowing modules to react to the message being saved (e.g., updating search indexes, logging).
*   **Room Activity Update:** The `lastMessage` field and `lm` (last message timestamp) of the room are updated in the `rocketchat_room` collection.
    *   **File:** `app/models/server/raw/Rooms.ts`
*   **User Message Count:** The sender's message count might be incremented.
    *   **File:** `app/models/server/raw/Users.ts`
*   **Thread Updates:** If it's a reply to a thread, the thread's metadata (e.g., `tcount`, `tlm`) is updated.
*   **Webhooks:** If outgoing webhooks are configured for the room, the message data is sent to the webhook URL.
    *   **File:** `app/integrations/server/lib/webhooks.ts`

### 7. Real-time Notifications (DDP & Push)

This is where Meteor's reactivity shines:

*   **DDP (Data Distribution Protocol):** Because clients are subscribed to publications that include messages for their active rooms, the insertion of a new message into `rocketchat_message` automatically triggers a real-time update to all subscribed clients. Meteor handles pushing the new message data to them.
    *   **File:** `app/lib/server/publications/messages.ts` (Defines the publication for messages)
*   **`api.broadcast`:** For certain events or to ensure all clients receive a specific message update, Rocket.Chat also uses its own broadcast mechanism.
    *   **File:** `app/lib/server/lib/broadcast.ts`
*   **Push Notifications:** If the message is directed to users who are not currently active in the room (e.g., mentions, direct messages), push notifications are generated and sent via configured push gateways (e.g., FCM, APN).
    *   **File:** `app/lib/server/lib/sendNotifications.ts`

### 8. After Send Hooks

Finally, `afterSendMessage` hooks are triggered. These are typically used for actions that should happen *after* the message has been fully processed and sent to clients, such as logging, analytics, or further integration with external systems.

### Summary of the Flow:

1.  **Client calls `sendMessage` Meteor Method.**
2.  **Server validates** user and room permissions.
3.  **Message content is pre-processed** (markdown, mentions, links, attachments).
4.  **`beforeSaveMessage` hooks** are executed.
5.  **Message is inserted into `rocketchat_message` collection** in MongoDB.
6.  **`afterSaveMessage` hooks** are executed.
7.  **Room and user metadata are updated.**
8.  **Real-time updates** are pushed to subscribed clients via DDP.
9.  **Push notifications** are sent to relevant users.
10. **`afterSendMessage` hooks** are executed.

This modular and hook-driven architecture allows Rocket.Chat to be highly extensible and integrate various features and third-party services seamlessly.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 2,866 |
| Model | gemini-2.5-flash |
| Tools | NONE |
