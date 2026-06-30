# What is the complete call chain for sendMessage?

## Baseline Answer (no tools)

The complete call chain for `sendMessage` in Rocket.Chat, starting from a user typing in the UI, involves several layers from the frontend to the backend, leveraging Meteor's method calls and Rocket.Chat's internal message processing pipeline.

Here's a detailed breakdown:

### 1. Frontend - User Action & UI Component

*   **User Action:** A user types a message into the chat input field and presses `Enter` or clicks the "Send" button.
*   **Component:** The primary component responsible for handling message input is `Composer`.
    *   **File:** `client/views/room/Composer/Composer.js`
    *   **Action:** Inside this component, an event handler (e.g., `handleSend` or an internal function called by it) is triggered. This function gathers the message text, the current room ID, and other relevant context.
    *   **Call:** It then typically calls a prop function passed down from a parent container or directly triggers a `Meteor.call`. The message object is constructed here.

### 2. Frontend - Meteor Method Call

*   **File:** (Implicitly called from the component, e.g., `client/views/room/Composer/Composer.js`)
*   **Action:** The frontend makes a remote procedure call (RPC) to the Rocket.Chat server using Meteor's DDP protocol.
*   **Call:** `Meteor.call('sendMessage', messageObject);`
    *   `messageObject` typically contains:
        *   `rid`: Room ID
        *   `msg`: The actual message text
        *   (Potentially other fields like `attachments`, `file`, etc.)

### 3. Backend - Meteor Method Definition

*   **File:** `server/methods/sendMessage.js`
*   **Action:** This is the entry point on the server side for the `sendMessage` method.
*   **`Meteor.methods` Definition:**
    ```javascript
    Meteor.methods({
        sendMessage(message) {
            // ... initial validation and context setup ...
            // Calls a higher-level API wrapper for actual message processing
            return RocketChat.Message.sendMessage(Meteor.user(), message);
        }
    });
    ```
    *   **Validation:** Performs initial checks (e.g., `check(message, Object);`, ensures user is logged in, has permission to send messages in the room).
    *   **Permissions:** Verifies if the `userId` has permission to send messages in the specified room (`rid`).
    *   **Abstraction:** Delegates the core logic to `RocketChat.Message.sendMessage` for a more structured service layer approach.

### 4. Backend - `RocketChat.Message.sendMessage` (High-Level Service)

*   **File:** `app/lib/server/functions/sendMessage.js`
*   **Action:** This function orchestrates the complete message processing pipeline.
*   **`RocketChat.Message.sendMessage` Definition:**
    ```javascript
    RocketChat.Message.sendMessage = function (user, message, room) {
        // ... more extensive validation (room existence, user in room, message length, etc.) ...
        // Apply 'onValidateMessage' hooks
        // Process the message for markdown, mentions, unfurls, etc.
        const processedMessage = RocketChat.Message.processMessage(message, room, user);
        // Save the message to the database
        const savedMessage = RocketChat.Message.save(processedMessage, room, user);
        // ... update room's last message, notify users, apply 'onAfterSendMessage' hooks ...
        return savedMessage;
    };
    ```
    *   **Hooks (`onValidateMessage`):** Fires server-side hooks that allow plugins or custom logic to validate or modify the message *before* it's processed and saved.
    *   **Message Processing:** Calls `RocketChat.Message.processMessage` to handle transformations.
    *   **Message Saving:** Calls `RocketChat.Message.save` to persist the message.
    *   **Post-Save Actions:** Updates the room's `lastMessage`, handles notifications (push, desktop), and triggers `onAfterSendMessage` hooks.

### 5. Backend - `RocketChat.Message.processMessage` (Message Transformation)

*   **File:** `app/lib/server/functions/processMessage.js`
*   **Action:** This function takes the raw message object and transforms it into its final renderable and storable state.
*   **Processing Steps:**
    *   **Markdown:** Converts markdown syntax (e.g., `*bold*`, `_italic_`) into HTML.
    *   **Mentions:** Identifies `@username` and `@all/@here` mentions, linking them to users.
    *   **Channels:** Identifies `#channel` links.
    *   **Emojis:** Converts shortcodes (e.g., `:smile:`) to emoji characters or images.
    *   **Unfurls:** Processes URLs in the message to generate rich previews (link unfurling).
    *   **Attachments:** Handles pre-uploaded file attachments or any other custom message properties.
    *   **Returns:** A fully processed message object, ready for persistence.

### 6. Backend - `RocketChat.Message.save` (Persistence & Broadcasting)

*   **File:** `app/lib/server/functions/saveMessage.js`
*   **Action:** This is where the message is finally inserted into the database, and mechanisms for broadcasting are triggered.
*   **`RocketChat.Message.save` Definition:**
    ```javascript
    RocketChat.Message.save = function (message, room, user, subscription) {
        // ... prepare message object with _id, ts, u (user object), etc. ...
        // Apply 'onServerSendMessage' hooks
        const messageId = Messages.insert(message); // <- Actual database insert
        // ... update room (lastMessage, counter), user (message count) ...
        // Apply 'onAfterSaveMessage' hooks
        // Trigger push notifications
        // ... other side effects like sending webhooks, updating unreads ...
        return Messages.findOne(messageId);
    };
    ```
    *   **`Messages.insert(message)`:** Inserts the processed message into the `rocketchat_message` MongoDB collection.
    *   **Hooks (`onServerSendMessage`):** Fires hooks *just before* the message is inserted.
    *   **Room & User Updates:** Updates the `lastMessage` field in the `rocketchat_room` collection, increments message counters for the room and user.
    *   **Hooks (`onAfterSaveMessage`):** Fires hooks *after* the message has been saved to the database. These are often used for post-processing, integrations, or analytics.
    *   **Notifications:** Triggers `RocketChat.PushNotification.newMessage` and other notification handlers (desktop, email, webhooks).
    *   **DDP Reactivity:** Crucially, because `Messages` is a reactive collection, once the `insert` operation completes, Meteor's DDP server automatically pushes the new message to all clients *subscribed* to the relevant room's message publication. This is how other users in the chat room see the new message appear in real-time.

### Summary of the Call Chain:

1.  **`client/views/room/Composer/Composer.js`** (User input)
    *   Calls `Meteor.call('sendMessage', messageObject)`
2.  **`server/methods/sendMessage.js`** (Meteor Method)
    *   Calls `RocketChat.Message.sendMessage(user, message)`
3.  **`app/lib/server/functions/sendMessage.js`** (`RocketChat.Message.sendMessage`)
    *   Calls `RocketChat.Message.processMessage(message, room, user)`
    *   Calls `RocketChat.Message.save(processedMessage, room, user)`
4.  **`app/lib/server/functions/processMessage.js`** (`RocketChat.Message.processMessage`)
    *   Returns processed message.
5.  **`app/lib/server/functions/saveMessage.js`** (`RocketChat.Message.save`)
    *   `Messages.insert(message)` (Database write)
    *   Triggers DDP reactivity for clients.

This chain ensures thorough validation, processing, persistence, and real-time delivery of messages within Rocket.Chat.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,637 |
| Model | gemini-2.5-flash |
| Tools | NONE |
