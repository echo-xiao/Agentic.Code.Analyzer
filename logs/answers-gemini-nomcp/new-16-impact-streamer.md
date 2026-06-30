# What is the blast radius of changing the Streamer module in Rocket.Chat?

## Baseline Answer (no tools)

The `Streamer` module in Rocket.Chat is one of the most fundamental and critical components, responsible for all real-time communication between the server and connected clients (web, desktop, mobile apps). Changing it has an **extremely wide and high-impact blast radius**.

It's the backbone of Rocket.Chat's real-time experience, built on Meteor's Distributed Data Protocol (DDP) over WebSockets.

Here's a breakdown of the blast radius:

### 1. Core Real-time Functionality (Highest Impact)

Any change here can break the fundamental user experience:

*   **Message Delivery:** New messages, message edits, deletions, reactions, threads, and replies.
    *   **Server-side publishers:** `app/lib/server/lib/stream/messages.js`
    *   **Client-side consumers:** `client/views/room/lib/MessageStream.ts`, `client/views/room/MessageList/hooks/useMessages.ts`, and many other components that display messages.
*   **User Presence:** Online/offline status, typing indicators.
    *   **Server-side publishers:** `app/presence/server/lib/streamer.js`
    *   **Client-side consumers:** `client/components/UserAvatar/UserAvatar.tsx`, `client/views/room/Header/RoomHeader.tsx`, user lists.
*   **Room Updates:** New rooms, room name changes, topic changes, user joins/leaves, unread counts.
    *   **Server-side publishers:** `app/lib/server/lib/stream/rooms.js`
    *   **Client-side consumers:** `client/views/sidebar/sections/OmnichannelSection/OmnichannelSection.tsx`, `client/views/sidebar/sections/DirectMessagesSection/DirectMessagesSection.tsx`, `client/views/room/Header/RoomHeader.tsx`.
*   **Notifications:** Desktop, mobile, and in-app notifications.
    *   **Server-side publishers:** `app/notifications/server/lib/Notifications.js`
    *   **Client-side consumers:** `client/lib/notifications/Notifications.ts`.
*   **Livechat:** All real-time aspects of Livechat, including new incoming chats, agent assignment, message exchange, and visitor status.
    *   **Server-side publishers:** `app/livechat/server/lib/stream/` (e.g., `messages.js`, `rooms.js`, `visitors.js`)
    *   **Client-side consumers:** `app/livechat/client/views/app/livechatRoom.js`, `client/views/omnichannel/currentChats/CurrentChatsPage.tsx`.

### 2. Client-Side UI Reactivity (Massive Impact)

Virtually every reactive element in the Rocket.Chat UI relies on data pushed via `Streamer`.

*   **Any component that displays real-time data:** This includes almost all parts of the chat interface, user lists, admin panels, settings pages (for real-time updates), etc.
*   **Meteor's Reactive Data Sources:** Many `Tracker.autorun` blocks and reactive computations implicitly or explicitly depend on `Streamer` data.
*   **React Hooks:** Modern React components often use hooks that subscribe to `Streamer` events or reactive data sources backed by `Streamer`.

### 3. Server-Side Architecture & Scalability

*   **`StreamerCentral` (`app/streamer/lib/StreamerCentral.js`):** This component is crucial for multi-node deployments. It ensures that events published on one Rocket.Chat instance are propagated to all other instances in the cluster, allowing clients connected to any node to receive real-time updates. Changes here could break horizontal scaling and lead to inconsistent data across users.
*   **DDP Protocol:** `Streamer` is a wrapper around DDP. Fundamental changes to how DDP messages are structured or handled would break compatibility with all clients.
*   **Event Bus:** `Streamer` effectively acts as a global event bus for real-time events.

### 4. Mobile Apps & External Clients

*   **React Native Apps:** The official Rocket.Chat mobile apps (and older Cordova apps) connect via DDP/WebSockets and are entirely dependent on the `Streamer` module for all real-time updates.
*   **Custom DDP Clients:** Any third-party application or integration that connects to Rocket.Chat via DDP for real-time data will be affected.

### 5. App Engine & Integrations

*   **Rocket.Chat Apps (App Engine):** Apps can subscribe to specific `Streamer` events or publish their own. Changes could break existing apps or the App Engine's ability to interact with the real-time system.
    *   **Bridge:** `app/apps/server/bridges/StreamerBridge.ts`
*   **Webhooks/Integrations:** While many integrations are pull-based, some might rely on real-time events or trigger events that are then streamed.

### 6. Performance & Resource Usage

*   **WebSocket Connections:** `Streamer` manages all WebSocket connections. Changes could impact connection stability, latency, and server resource usage (CPU, memory, network I/O).
*   **Event Filtering & Authorization:** `Streamer` includes mechanisms for filtering events based on user permissions and subscriptions. Breaking this could lead to security vulnerabilities (users seeing data they shouldn't) or performance issues (sending too much data).

### Specific File Paths to Consider

*   **Core Streamer Definition:** `app/streamer/lib/streamer.js`
*   **StreamerCentral (Clustering):** `app/streamer/lib/StreamerCentral.js`
*   **Streamer Publishers (Examples):**
    *   `app/lib/server/lib/stream/messages.js`
    *   `app/lib/server/lib/stream/rooms.js`
    *   `app/presence/server/lib/streamer.js`
    *   `app/notifications/server/lib/Notifications.js`
    *   `app/livechat/server/lib/stream/` (various files)
*   **Client-side Streamer Instances (Examples):**
    *   `client/lib/stream/` (e.g., `messages.ts`, `rooms.ts`, `users.ts`)
    *   `client/views/room/lib/MessageStream.ts`
    *   `client/views/room/MessageList/hooks/useMessages.ts`
    *   `client/lib/notifications/Notifications.ts`

### Conclusion

Modifying the `Streamer` module is akin to changing the nervous system of Rocket.Chat. Even seemingly small changes can have cascading effects across the entire application, from core messaging to scalability and external integrations.

**Any changes to `Streamer` require:**

1.  **Extensive Unit and Integration Testing:** Covering all major real-time features.
2.  **Thorough Manual QA:** Across web, desktop, and mobile clients.
3.  **Performance Testing:** To ensure no regressions in latency or resource usage.
4.  **Multi-node Deployment Testing:** To verify `StreamerCentral` functionality.
5.  **Security Review:** To ensure event filtering and authorization remain robust.

Proceed with extreme caution and a deep understanding of its role.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,385 |
| Model | gemini-2.5-flash |
| Tools | NONE |
