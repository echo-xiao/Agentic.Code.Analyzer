# What is the complete call chain for sendMessage?

## Baseline Answer (no tools)

The `sendMessage` functionality in Rocket.Chat involves a comprehensive call chain, starting from the client-side user interface, through DDP (Distributed Data Protocol), to the server-side business logic, and finally to database persistence and real-time updates.

Here is the complete call chain:

1.  **Client-side UI Event (User Action)**
    *   The user types a message in the chat input field (e.g., in a channel, direct message, or thread).
    *   This interaction is primarily handled by the React component:
        *   `client/views/room/MessageInput/MessageInput.tsx` (or similar components in `ee/client/views/room/MessageInput` for Enterprise features).
    *   When the user presses `Enter` or clicks the `Send` button, an event handler (e.g., `handleSend`) in this component is triggered. This handler prepares the message data.

2.  **Client-side Orchestrator Function**
    *   The UI event handler typically calls a dedicated client-side function to manage the message sending process.
    *   **File:** `app/ui-message/client/lib/sendMessages.ts`
    *   **Function:** `sendMessages(params: IMessageParams, tmid?: string)`
    *   This function constructs the `IMessage` object, including properties like `_id`, `rid` (room ID), `msg` (message content), `ts` (timestamp), `u` (user data), and potentially `attachments`, `tmid` (thread message ID), etc.
    *   It then wraps the server-side method invocation in a Promise:
        ```typescript
        // From app/ui-message/client/lib/sendMessages.ts
        return new Promise<void>((resolve, reject) => {
            Meteor.call('sendMessage', message, (error: Meteor.Error, result: IMessage) => {
                if (error) {
                    return reject(error);
                }
                resolve();
            });
        });
        ```

3.  **DDP (Distributed Data Protocol)**
    *   `Meteor.call('sendMessage', message)` uses Meteor's DDP client to send the `sendMessage` method invocation and the prepared `message` object to the Rocket.Chat server.

4.  **Server-side `sendMessage` Method Definition**
    *   This is the entry point on the server for the `sendMessage` DDP call.
    *   **File:** `app/api/server/lib/methods/sendMessage.ts`
    *   **Function:** `Meteor.methods({ sendMessage(message) { ... } })`
    *   This method performs initial validation (e.g., user authentication (`this.userId`), basic message object structure).
    *   It then delegates the core message processing to a shared server-side function:
        ```typescript
        // Simplified from app/api/server/lib/methods/sendMessage.ts
        const sendMessageMethod = function (message) {
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }
            // ... other validations ...
            return sendMessage(this.userId, message, this); // Calls the core logic
        };
        Meteor.methods({
            sendMessage: sendMessageMethod,
        });
        ```
    *   The `sendMessage` function called here is imported from `app/lib/server/functions/sendMessage.ts`.

5.  **Core Server-side Message Processing Function**
    *   This function contains the bulk of the business logic for handling a new message.
    *   **File:** `app/lib/server/functions/sendMessage.ts`
    *   **Function:** `sendMessage(user: IUser, msg: IMessage, room?: IRoom, originalMessage?: IMessage, { email, ...options }: ISendMessageOptions = {})`
    *   **Key steps within this function:**
        *   **Retrieve User and Room:** Fetches the `IUser` and `IRoom` objects from the database.
        *   **Permissions:** Checks if the `user` has permission to send messages in the `room` using `roomAccesses.hasPermission('sendMessage', room._id, user._id)`.
        *   **Callbacks (`beforeSaveMessage`):**
            *   `callbacks.run('beforeSaveMessage', msg, room, user)`: A critical hook point where other modules can modify the message object or prevent it from being saved (e.g., profanity filters, integrations, bot pre-processing).
            *   Referenced in: `app/lib/callbacks/server/index.ts`, `app/lib/callbacks/server/message/beforeSave.ts`.
        *   **Message Processing:**
            *   **Mentions:** `MessageMentions.extractAndPopulate(msg, room)` (from `app/lib/server/lib/MessageMentions.ts`) processes `@user` mentions.
            *   **Channel Mentions:** `MessageChannels.extractAndPopulate(msg, room)` (from `app/lib/server/lib/MessageChannels.ts`) processes `#channel` mentions.
            *   **URLs:** `MessageUrls.extractAndPopulate(msg, room)` (from `app/lib/server/lib/MessageUrls.ts`) extracts and processes URLs, often creating preview attachments.
            *   **Timestamps & Metadata:** Adds/updates `_id`, `ts`, `editedAt`, `editedBy`, `unread` status, etc.
        *   **Persistence (Database Insert/Update):**
            *   `Messages.insertOne(msg)` (for new messages) or `Messages.update({ _id: msg._id }, { $set: msg })` (for edited messages).
            *   Database interaction handled by `app/models/server/raw/Messages.ts`.
        *   **Room Activity Update:**
            *   `Rooms.touch(room._id)`: Updates the room's `_updatedAt` timestamp.
            *   `Rooms.incMsgCount(room._id, 1)`: Increments the message count for the room.
            *   Database interaction handled by `app/models/server/raw/Rooms.ts`.
        *   **Callbacks (`afterSaveMessage`):**
            *   `callbacks.run('afterSaveMessage', msg, room, user, originalMessage)`: Another crucial hook for post-save actions.
            *   **Notifications:** This callback triggers `app/lib/server/functions/notifications/messages.ts` to send push, email, and desktop notifications.
            *   **Integrations:** Can trigger outgoing webhooks or bot responses (e.g., via `app/integrations/lib/callHandler.ts`).
        *   **Real-time Updates (DDP Streams):**
            *   `api.broadcast('room', room._id, [message])`: Broadcasts the new message to all clients subscribed to the room. This is handled by `app/api/server/api.ts` which utilizes `RocketChat.stream.emit` or similar internal mechanisms.
            *   The streaming infrastructure is managed by `app/stream/index.ts`.
        *   **Return Value:** The function returns the processed `IMessage` object.

This detailed chain outlines the complete flow from a user typing a message to it being saved in the database and visible to other users in real-time.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 4,561 |
| Model | gemini-2.5-flash |
| Tools | NONE |
