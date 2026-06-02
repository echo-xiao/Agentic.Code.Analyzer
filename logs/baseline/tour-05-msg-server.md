# How is a message sent on the server side in Rocket.Chat?

## Baseline Answer (no tools)

Sending a message on the server-side in Rocket.Chat is a multi-step process that involves validation, pre-processing, database insertion, and post-processing, all orchestrated to ensure message integrity, proper formatting, and real-time delivery.

Here's a detailed breakdown of the typical flow, including key files and components:

1.  **Client-Side Trigger**:
    *   When a user types a message and presses Enter (or clicks send), the client-side code initiates a Meteor method call.
    *   **`client/methods/sendMessage.js`** (or a similar location) will call `Meteor.call('sendMessage', { rid, msg, ... });`

2.  **Server-Side Method Call Entry Point**:
    *   The Meteor DDP (Distributed Data Protocol) layer routes the `sendMessage` method call to the server.
    *   **`app/lib/server/methods/sendMessage.js`**: This file defines the server-side `sendMessage` Meteor method. It acts as the initial entry point, performing basic authentication (checking `Meteor.userId()`) and often delegating the core logic to a shared server-side function.
    *   This method usually calls `RocketChat.sendMessage(Meteor.userId(), message)`.

3.  **Core Message Sending Logic**:
    *   **`app/lib/server/functions/sendMessage.js`**: This is the central function (`RocketChat.sendMessage`) responsible for processing and storing the message.
        *   **Initial Validation**:
            *   It first validates the input `userId`, `rid` (room ID), and `msg` (message content).
            *   `Rooms.findOne(rid)`: Ensures the target room actually exists.
            *   **`app/authorization/server/functions/canSendMessage.js`**: Checks if the `userId` has permission to send messages in the specified `rid` (e.g., not muted, not banned, room access permissions).
        *   **Message Object Construction**:
            *   A base message object is created, including `_id`, `rid`, `msg`, `ts` (timestamp), `u` (user object with `_id`, `username`, `name`), and `_updatedAt`.

4.  **Pre-processing (`beforeSaveMessage` Callbacks)**:
    *   Before saving the message to the database, Rocket.Chat leverages a powerful callback system.
    *   `callbacks.run('beforeSaveMessage', message, room)`: This executes a series of registered functions that can modify or enrich the `message` object.
    *   **Key processors/handlers in this phase include**:
        *   **`app/lib/server/lib/preProcessMessage.js`**: A general-purpose pre-processor that orchestrates other steps like:
            *   **`app/lib/server/lib/processSetMessage.js`**: Processes message text for things like special commands (`/me`, `/giphy`).
            *   **`app/mentions/server/server.js`**: Identifies `@username` mentions and adds them to `message.mentions` and `message.channels` arrays.
            *   **`app/autolinker/server/message.js`**: Parses URLs in the message text, extracts metadata (e.g., page title, description, image), and adds them as `message.attachments`.
            *   **`app/markdown/server/parse.js`**: Renders markdown formatting in the message content.
            *   **`app/integrations/server/lib/messageProcessors.js`**: Handles incoming webhooks or bot commands.
            *   **`app/file-upload/server/lib/FileUpload.js`**: If the message includes file attachments, this ensures they are correctly linked.

5.  **Database Insertion**:
    *   After all pre-processing, the finalized `message` object is inserted into the MongoDB collection.
    *   `ChatMessage.insert(message)`: `ChatMessage` is the server-side model for messages.
    *   **`app/models/server/models/Messages.js`**: Defines the `Messages` collection (which corresponds to `rocketchat_message` in MongoDB) and its schema.

6.  **Post-processing (`afterSaveMessage` Callbacks)**:
    *   Once the message is successfully saved to the database, another set of callbacks is triggered.
    *   `callbacks.run('afterSaveMessage', message, room, userId)`: These handlers perform actions that should happen *after* the message is persistent.
    *   **Key actions in this phase include**:
        *   **`app/lib/server/functions/updateMessageCount.js`**: Updates the `msgs` count in the `rocketchat_room` collection and the `messageCount` for the sending user.
        *   **`app/notifications/server/lib/Notifications.js`**: Triggers various types of notifications (push notifications to mobile apps, desktop notifications, email alerts) to relevant users based on mentions, room settings, and user preferences. This involves creating a notification payload and sending it via configured services.
        *   **`app/integrations/server/lib/messageProcessors.js`**: Triggers outgoing webhooks or custom integrations that react to new messages.
        *   **`app/statistics/server/lib/info.js`**: Updates server-wide message statistics.
        *   **`app/lib/server/functions/Omnichannel/setAndUnsetRoomOnHold.js`**: Specific to Omnichannel, handles actions like putting a conversation on hold.

7.  **Real-time Broadcasting**:
    *   Meteor's reactive data system automatically handles the broadcasting of the new message to connected clients.
    *   **`app/models/server/publications/messages.js`** (and other related publication files like `room.js`): Clients subscribe to these publications (e.g., `'stream-messages-roomid'`).
    *   When `ChatMessage.insert()` occurs, all active subscriptions observing that `rid` for new messages are notified, and the new message object is pushed to the client's local Minimongo collection, causing the UI to update in real-time.

This comprehensive workflow ensures that every message sent is properly validated, processed, stored, and delivered across the Rocket.Chat ecosystem.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,644 |
| Model | gemini-2.5-flash |
| Tools | NONE |
