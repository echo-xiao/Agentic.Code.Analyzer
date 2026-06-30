# How is a message sent on the server side in Rocket.Chat?

## Baseline Answer (no tools)

Sending a message on the server side in Rocket.Chat involves a well-defined flow, starting from the API or Meteor method call, going through validation, persistence, and finally real-time propagation and notifications.

Here's a detailed breakdown of the process, including key file paths:

### 1. Entry Point: Receiving the Message Request

The server can receive a message sending request through two primary channels:

*   **REST API:**
    *   For programmatic message sending (e.g., bots, integrations), the `POST /api/v1/chat.postMessage` or `POST /api/v1/chat.sendMessage` endpoints are used.
    *   **File:** `app/api/server/v1/chat.js`
    *   These API endpoints typically call a shared server-side function to handle the actual message logic.

*   **Meteor Method (DDP):**
    *   When a user sends a message from the Rocket.Chat client (web, desktop, mobile), it invokes the `sendMessage` Meteor method via DDP.
    *   **File:** `app/lib/server/methods/sendMessage.js`
    *   This method also delegates to a core server-side function.

### 2. Core Message Sending Logic: `sendMessage` Function

Both the REST API and the Meteor method ultimately call a central server-side function, often named `sendMessage`, which encapsulates the core logic.

*   **File:** `app/lib/server/functions/sendMessage.js`

This function takes parameters like the `user` object, the `message` object (containing `rid` for room ID and `msg` for text), and potentially `extraData`.

### 3. Validation and Pre-processing

Inside the `sendMessage` function, several crucial steps occur before the message is persisted:

*   **User and Room Validation:**
    *   Checks if the `user` is authenticated and authorized to send messages.
    *   Verifies that the `room` (`rid`) exists and the `user` is a member of that room.
    *   **Files:** `app/models/server/raw/Rooms.js`, `app/models/server/raw/Subscriptions.js`

*   **Message Content Validation:**
    *   Validates the message text (e.g., length constraints).
    *   Handles different message types (e.g., `t` field for `message_pinned`, `message_removed`, etc.).

*   **Hooks (`beforeSaveMessage`):**
    *   Rocket.Chat utilizes a powerful callback system. The `callbacks.run('beforeSaveMessage', message, room)` hook is executed.
    *   This allows custom code, integrations, or plugins to modify the message object (e.g., censor words, add metadata) or even prevent it from being sent.
    *   **File:** `app/lib/server/lib/callbacks.js` (where the callback system is defined)

*   **Parsing Mentions and URLs:**
    *   The message text is parsed to identify user mentions (`@username`) and channel mentions (`#channel`). These are stored in the `mentions` array of the message object.
    *   URLs within the message are also extracted and stored in the `urls` array.
    *   **Files:** `app/lib/server/lib/parseMentions.js`, `app/lib/server/lib/parseUrls.js`

*   **Markdown to HTML Conversion:**
    *   The message text, often written in Markdown, is converted to HTML for proper rendering in the client.

### 4. Message Creation and Persistence

After pre-processing, the message object is finalized and saved to the database.

*   **`createMessage` Function:**
    *   The `sendMessage` function often delegates the actual message object construction and database insertion to a helper function like `createMessage`.
    *   **File:** `app/lib/server/functions/createMessage.js`
    *   This function constructs the complete message document, including fields like `_id`, `rid`, `msg`, `ts` (timestamp), `u` (user object), `mentions`, `urls`, `_updatedAt`, etc.

*   **Database Insertion:**
    *   The constructed message object is then inserted into the `rocketchat_message` MongoDB collection.
    *   **File:** `app/models/server/raw/Messages.js` (This file defines the `Messages` model, which interacts with the `rocketchat_message` collection).
    *   The insertion is typically done via `Messages.insert(messageObject)`.

### 5. Post-Persistence Actions

Once the message is saved, several follow-up actions are triggered:

*   **Update Room Last Message:**
    *   The `rocketchat_room` collection is updated to reflect the `lastMessage` and `_updatedAt` fields for the room where the message was sent. This is crucial for displaying the latest message in the room list on the client.
    *   **File:** `app/models/server/raw/Rooms.js` (specifically `Rooms.updateLastMessage(rid, message)`)

*   **Hooks (`afterSaveMessage`):**
    *   The `callbacks.run('afterSaveMessage', message, room)` hook is executed.
    *   This allows for post-save actions such as logging, triggering external services, or further processing.

*   **Real-time Propagation (DDP/Publications):**
    *   As Rocket.Chat is built on Meteor, the insertion into the `Messages` collection automatically triggers updates to any clients subscribed to the relevant Meteor publications (e.g., `roomMessages` publication).
    *   Clients receive the new message via DDP (Distributed Data Protocol) and update their UI in real-time without needing to refresh.

*   **Notifications:**
    *   The server determines if notifications need to be sent based on user preferences, room type (e.g., direct message), and message content (e.g., mentions).
    *   This can include:
        *   **Push Notifications:** For mobile devices (via APN/FCM).
        *   **Email Notifications:** If configured.
        *   **Desktop Notifications:** For web/desktop clients.
    *   **File:** `app/lib/server/lib/sendNotifications.js` (or related modules that handle notification logic).

*   **Livechat Specifics:**
    *   If the message is part of a Livechat conversation, additional logic might be triggered, such as updating visitor status, routing the conversation, or sending automated responses.

### Summary of the Server-Side Flow:

1.  **Client/API Call** (`sendMessage` Meteor Method or `chat.postMessage` REST API)
2.  **`app/lib/server/methods/sendMessage.js`** (or `app/api/server/v1/chat.js`)
3.  Calls **`app/lib/server/functions/sendMessage.js`**
4.  **Validation & Pre-processing:**
    *   User/Room checks
    *   `callbacks.run('beforeSaveMessage')`
    *   Mentions/URL parsing
5.  Calls **`app/lib/server/functions/createMessage.js`**
6.  **Database Persistence:**
    *   `Messages.insert(messageObject)` (via `app/models/server/raw/Messages.js`)
7.  **Post-Persistence Actions:**
    *   `Rooms.updateLastMessage(rid, message)` (via `app/models/server/raw/Rooms.js`)
    *   `callbacks.run('afterSaveMessage')`
    *   **Real-time Updates** (DDP to subscribed clients)
    *   **Notifications** (Push, Email, Desktop via `app/lib/server/lib/sendNotifications.js`)

This comprehensive process ensures that messages are properly validated, stored, and propagated to all relevant clients and notification services in a robust and real-time manner.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,621 |
| Model | gemini-2.5-flash |
| Tools | NONE |
