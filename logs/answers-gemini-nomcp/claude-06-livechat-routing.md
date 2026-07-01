# How are Livechat requests routed to the server-side in Rocket.Chat?

## Baseline Answer (no tools)

Livechat requests in Rocket.Chat are primarily routed to the server-side using **DDP (Distributed Data Protocol) over WebSockets**, which is the core real-time communication mechanism of Meteor applications. Additionally, some initial setup and widget serving utilize standard HTTP routes.

Here's a breakdown of how Livechat requests are routed:

1.  **Client-Side Widget Initialization (HTTP)**
    *   When a website embeds the Rocket.Chat Livechat widget, it typically includes a script tag pointing to a Rocket.Chat server endpoint.
    *   This endpoint serves the necessary JavaScript bundle for the widget.
    *   **Routing:** These HTTP requests are handled by specific server-side routes.
        *   **File:** `app/livechat/server/routes.js`
        *   **Example Routes:**
            *   `/livechat/i.js`: Serves the iframe embed script.
            *   `/livechat/livechat.js`: Serves the main Livechat widget script.
            *   `/livechat/widget.js`: Serves the widget's main entry point.

2.  **WebSocket Connection Establishment**
    *   Once the `livechat.js` script loads in the user's browser, it establishes a WebSocket connection to the Rocket.Chat server.
    *   This connection is the foundation for all subsequent real-time DDP communication.

3.  **DDP Method Calls (Actions)**
    *   After the WebSocket connection is established, the Livechat widget (client) interacts with the server by calling DDP methods. These methods perform specific actions like registering a guest, sending a message, or fetching initial data.
    *   **Routing:** DDP method calls are routed to server-side Meteor methods.
    *   **Key Server-Side Files:** These methods are typically defined in `app/livechat/server/methods/`.
    *   **Examples:**
        *   **`livechat:getInitialData`**: Fetches initial configuration and visitor data.
            *   **File:** `app/livechat/server/methods/getInitialData.js`
        *   **`livechat:registerGuest`**: Registers a new guest visitor or identifies an existing one.
            *   **File:** `app/livechat/server/methods/registerGuest.js`
        *   **`livechat:sendMessage`**: Sends a message from the guest to the Livechat room.
            *   **File:** `app/livechat/server/methods/sendMessage.js`
        *   **`livechat:closeRoom`**: Allows the guest to close the conversation.
            *   **File:** `app/livechat/server/methods/closeRoom.js`
        *   **`livechat:sendTranscript`**: Sends the chat transcript to the guest's email.
            *   **File:** `app/livechat/server/methods/sendTranscript.js`

4.  **DDP Subscriptions (Real-time Data Streams)**
    *   To receive real-time updates (like new messages from an agent, room status changes, etc.), the Livechat widget subscribes to DDP publications.
    *   **Routing:** DDP subscriptions are routed to server-side Meteor publications.
    *   **Key Server-Side Files:** These publications are typically defined in `app/livechat/server/publications/`.
    *   **Examples:**
        *   **`livechat:stream-room-messages`**: Streams messages for a specific Livechat room.
            *   **File:** `app/livechat/server/publications/roomMessages.js`
        *   **`livechat:stream-livechat-room`**: Streams updates related to the Livechat room itself (e.g., agent assigned, room status).
            *   **File:** `app/livechat/server/publications/room.js`
        *   **`livechat:visitorPageStream`**: Streams visitor page tracking data.
            *   **File:** `app/livechat/server/publications/visitorPageStream.js`

5.  **REST API (Less common for real-time chat, more for integrations/admin)**
    *   While DDP handles the real-time chat, Rocket.Chat also exposes a REST API for Livechat. This is typically used by external systems, integrations, or for administrative tasks, rather than the Livechat widget itself for sending individual chat messages.
    *   **Routing:** Standard HTTP REST endpoints.
    *   **Key Server-Side Files:** `app/livechat/server/api/v1/livechat/index.js` and other files within `app/livechat/server/api/` define these endpoints.
    *   **Example Endpoints:**
        *   `/api/v1/livechat/visitor`: For managing visitor data.
        *   `/api/v1/livechat/room`: For managing Livechat rooms.
        *   `/api/v1/livechat/message`: For sending messages via API (e.g., from a bot).

In summary, the primary routing for real-time Livechat interactions (sending messages, receiving updates) is through **DDP methods and publications over a WebSocket connection**. The initial loading of the widget and some administrative tasks leverage standard HTTP routes and the REST API.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 2,675 |
| Model | gemini-2.5-flash |
| Tools | NONE |
