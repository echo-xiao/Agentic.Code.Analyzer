# How does a new message appear in real-time on the client after being saved to the database?

## Baseline Answer (no tools)

Rocket.Chat leverages Meteor's real-time capabilities, specifically its **Distributed Data Protocol (DDP)** over **WebSockets**, to achieve real-time message delivery. Here's a step-by-step breakdown of how a new message appears in real-time on the client:

1.  **Client Sends Message (Method Call):**
    *   When a user types a message and hits enter, the client-side code (typically in `app/ui-message/client/messageBox.js` or a similar component for newer React UI) makes a Meteor Method call to the server.
    *   The primary method for sending messages is often `sendMessage` (or similar, sometimes wrapped by API calls).
    *   **Example Call:**
        ```javascript
        Meteor.call('sendMessage', {
            _id: Random.id(), // Client-side simulation ID
            rid: currentRoomId,
            msg: messageText,
            ts: new Date()
        }, (err, result) => {
            // Handle callback, message might appear instantly via client-side simulation
        });
        ```
    *   *Note:* Meteor often has client-side "latency compensation" where it optimistically simulates the method's effect on the client's local data (Minimongo) *before* the server responds. This makes the message appear almost instantly on the sender's screen.

2.  **Server Saves to Database (Method Implementation):**
    *   The Meteor server receives the `sendMessage` method call.
    *   The server-side method implementation (e.g., in `app/lib/server/methods/sendMessage.js` or related API endpoints in `app/api/server/v1/chat.js`) performs:
        *   Validation and permissions checks.
        *   Processing (e.g., mention parsing, markdown conversion, file attachment handling).
        *   Finally, it inserts the message into the `rocketchat_message` MongoDB collection.
    *   **Collection Path:** `app/models/server/models/Messages.js` (defines the `Messages` collection).
    *   **Database Operation:** `Messages.insert(messageObject);`

3.  **Server-Side Reactivity (Meteor, Oplog, Publications):**
    *   This is where Meteor's "magic" happens. When `Messages.insert()` is called on the server, Meteor (in production environments, via **oplog tailing** on MongoDB) detects the change in the `rocketchat_message` collection.
    *   Rocket.Chat has **Publications** defined for message streams. A common one for general chat rooms is `chat.messages`.
    *   **Publication Example:** You can find message-related publications in files like `app/lib/server/publications/chatMessages.js` (for the `chat.messages` publication) or other specific modules depending on the context (e.g., `app/livechat/server/publications/messages.js` for Livechat).
    *   These publications return a cursor (e.g., `Messages.find({ rid: roomId }, { sort: { ts: 1 }, limit: someLimit })`).
    *   Because the `Messages.find()` cursor is "reactive," when the database detects a new message matching the publication's query (i.e., for a `roomId` that a client is subscribed to), Meteor automatically pushes the new message document down to all subscribed clients via DDP over their established WebSocket connection.

4.  **Client Subscribes and Receives (DDP, Minimongo):**
    *   When a Rocket.Chat client navigates to a specific room (e.g., `app/ui-utils/client/lib/chatRoom.js` or `app/channel-settings/client/tabs/integrations/integrationNew.js` might trigger this), it subscribes to the relevant publications.
    *   **Subscription Example:** `Meteor.subscribe('chat.messages', roomId, messageLimit);`
    *   This subscription establishes a reactive link. When the server pushes new data (the new message), the client's local in-memory database, called **Minimongo**, is updated.
    *   The client's `Messages` collection (which is a local, reactive cache of the server's `rocketchat_message` collection for the subscribed data) now contains the new message.

5.  **Client Renders UI (Reactive Templates/Components):**
    *   Rocket.Chat's UI components (traditionally Blaze templates, but increasingly React components) are built to react to changes in Minimongo collections.
    *   **Blaze Example:** A template helper like `Template.room.helpers({ messages() { return Messages.find({ rid: Template.instance().data.rid }, { sort: { ts: 1 } }); } });`
    *   **React Example:** A component using `withTracker` or `useTracker` from `meteor-react-data` to observe `Messages.find()`.
    *   When Minimongo is updated with the new message, the reactive helper or tracker automatically re-runs. This triggers the UI to re-render, adding the new message to the message list without requiring a page refresh or manual polling.

In summary, the combination of MongoDB's oplog (for server-side change detection), Meteor's reactive publications, DDP over WebSockets for real-time data push, and client-side Minimongo and reactive UI components ensures that messages appear almost instantaneously across all connected and subscribed clients.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 2,788 |
| Model | gemini-2.5-flash |
| Tools | NONE |
