# What is the blast radius of changing the Streamer module in Rocket.Chat?

## Baseline Answer (no tools)

The `app/streamer` module in Rocket.Chat is an absolutely *critical* and *pervasive* component responsible for real-time communication between the server and connected clients (web, desktop, mobile apps). It provides a publish/subscribe (pub/sub) mechanism over WebSockets (using `sockjs`) to deliver instant updates.

Changing the `Streamer` module has a **very large blast radius**, impacting almost every real-time aspect of Rocket.Chat.

Here's a breakdown of the areas and specific examples that would be affected:

1.  **Real-time Chat & Messages (Highest Impact):**
    *   **What it affects:** Sending new messages, message edits, message deletions, reactions, typing indicators, read receipts, pin/unpin messages, file uploads.
    *   **Why:** `Streamer` is the backbone for delivering these updates to all subscribed clients *instantly*.
        *   `app/streamer/lib/streamer.js`: The core implementation.
        *   `app/streamer/lib/streams/stream-room-messages.js`: The specific stream handling all room messages.
        *   `app/lib/server/functions/sendMessage.js`: This server-side function, after inserting a message into the database, uses `Streamer.emit('stream-room-messages', ...)` to notify clients.
        *   `app/lib/server/functions/updateMessage.js`, `app/lib/server/functions/deleteMessage.js`, etc.: Similar logic for other message operations.
        *   **Client-side:** All chat components (`client/views/room/...`, `client/components/message/...`) heavily rely on subscribing to `stream-room-messages` to render updates.

2.  **User Presence & Status:**
    *   **What it affects:** Showing users online/offline, away, busy statuses, and potentially typing indicators (though typing might also use `stream-room-messages`).
    *   **Why:** Streamer broadcasts user status changes.
        *   `app/streamer/lib/streams/stream-notify-user.js`: Used for user-specific notifications and presence.
        *   `app/presence/server/server.js`: Manages user presence and emits updates via `Streamer`.
        *   **Client-side:** User lists, direct message headers, and other UI elements showing user status would subscribe to these streams.

3.  **Notifications:**
    *   **What it affects:** In-app notifications (new messages, mentions, calls), desktop notifications, and even push notifications (as the server might trigger push based on Streamer events).
    *   **Why:** `Streamer` is used to push specific events directly to a user.
        *   `app/streamer/lib/streams/stream-notify-user.js`: Used to send notifications directly to a user's client(s).
        *   `app/streamer/lib/streams/stream-notify-room.js`: For room-specific notifications that all members should receive.
        *   `app/notifications/client/desktop.js`: Reacts to these stream events to display desktop notifications.
        *   `app/lib/server/functions/notifyUsersOnMessage.js`: This function would often utilize `Streamer` to inform users.

4.  **Livechat:**
    *   **What it affects:** All real-time aspects of the Livechat system – new visitor messages, agent replies, agent status, visitor status, room transfers, typing indicators, queue updates. Livechat relies extremely heavily on real-time updates.
    *   **Why:** Livechat agents and visitors need constant synchronization.
        *   `app/livechat/server/lib/livechat.js`: Contains logic for publishing Livechat events.
        *   `app/streamer/lib/streams/stream-livechat-room.js`: A dedicated stream for Livechat room messages and events.
        *   `app/livechat/client/views/...`: Numerous client components within Livechat subscribe to these streams.

5.  **File Upload Progress:**
    *   **What it affects:** The real-time progress bar displayed during file uploads.
    *   **Why:** Streamer is used to push progress updates from the server (or client) to the relevant UI components.
        *   `app/file-upload/server/lib/fileUpload.js`: Might use `Streamer` to emit upload progress events.
        *   `app/streamer/lib/streams/stream-file-upload.js`: A potential stream for file upload status.

6.  **Custom Integrations and APIs:**
    *   **What it affects:** Any custom modules, apps, or integrations that have been built to leverage Rocket.Chat's real-time capabilities by directly subscribing to or publishing on `Streamer` instances.
    *   **Why:** Developers often use `Streamer` directly for new real-time features.

7.  **Performance and Scalability:**
    *   **What it affects:** The overall performance, CPU usage, and memory footprint of the server, as well as network traffic.
    *   **Why:** Changes to `Streamer`'s internal logic for managing subscriptions, broadcasting events, or handling WebSocket connections can drastically impact how efficiently the server handles thousands of concurrent users and millions of messages. Bottlenecks here will affect the entire system.

8.  **Security:**
    *   **What it affects:** Authorization and access control for real-time data.
    *   **Why:** If the `Streamer` module's authorization logic is flawed (e.g., in `Streamer.allow` or `Streamer.deny` methods), sensitive information could be inadvertently broadcast to unauthorized users.

9.  **Mobile Applications:**
    *   **What it affects:** All real-time functionality within the Rocket.Chat mobile apps (iOS and Android).
    *   **Why:** The mobile apps use the same DDP/WebSocket connection and consume the same streams as the web client. Any breaking change in how streams are handled or data is formatted will directly break mobile app real-time features.

**In essence, if you change `app/streamer`, you should assume that ALL real-time functionality across the entire Rocket.Chat platform – web, desktop, and mobile – needs comprehensive regression testing.** Even seemingly minor changes can have cascading effects due to the module's foundational role in client-server communication.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,101 |
| Model | gemini-2.5-flash |
| Tools | NONE |
