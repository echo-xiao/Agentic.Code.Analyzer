# How are Livechat requests routed to the server-side in Rocket.Chat?

## Baseline Answer (no tools)

Livechat requests in Rocket.Chat are primarily routed to the server-side using **DDP (Distributed Data Protocol) over WebSockets**. The Livechat widget, which is embedded on an external website, acts as a DDP client, establishing a real-time connection to the Rocket.Chat instance and invoking specific DDP methods.

Here's a detailed breakdown of how this routing works:

1.  **Client-Side Initiation (Livechat Widget):**
    *   When a user visits a website with the Rocket.Chat Livechat widget embedded, a JavaScript file (e.g., `livechat.js`) is loaded.
    *   This script initiates a **WebSocket connection** to the Rocket.Chat server (e.g., `wss://your-rocketchat-instance.com/websocket`).
    *   Once the WebSocket connection is established, the widget uses the DDP protocol to communicate. It behaves like a DDP client, capable of calling server-side methods and subscribing to data.
    *   When a visitor starts a chat, sends a message, or performs any other action, the client-side Livechat logic invokes specific DDP methods on the server.

    *Relevant Client-Side File:*
    *   The core communication logic for the widget is found within `app/livechat/client/lib/client.js` and other files in `app/livechat/client`.

2.  **Transport Layer (DDP over WebSockets):**
    *   All communication between the Livechat widget and the Rocket.Chat server flows over this single, persistent WebSocket connection.
    *   **DDP** (Distributed Data Protocol) is the application-level protocol used by Meteor (on which Rocket.Chat is built) for real-time, bi-directional communication. It enables remote procedure calls (RPC for method invocations) and subscriptions to data.

3.  **Server-Side DDP Method Handling:**
    *   On the server, Rocket.Chat defines a dedicated set of DDP methods specifically for Livechat operations. These methods are typically prefixed with `livechat:` to distinguish them from regular user methods.
    *   When the DDP server receives a method invocation from the Livechat widget (e.g., `livechat:getInitialData`, `livechat:sendMessage`), the Meteor framework dispatches this call to the corresponding server-side function.
    *   These server-side methods contain the business logic to handle Livechat requests, such as:
        *   Registering new visitors.
        *   Creating and managing chat rooms.
        *   Routing chats to available agents.
        *   Storing messages and chat transcripts.
        *   Updating visitor information.

    *Relevant Server-Side Files:*
    *   The primary place where Livechat DDP methods are defined is:
        *   **`app/livechat/server/lib/methods.js`**: This file contains the implementations for most Livechat-related DDP methods, such as `livechat:getInitialData`, `livechat:registerGuest`, `livechat:sendMessage`, `livechat:setCustomFields`, `livechat:closeRoom`, etc.
    *   These methods often delegate to core Livechat service logic found in:
        *   **`app/livechat/server/lib/Livechat.js`**: Contains the main business logic for Livechat operations (e.g., creating rooms, assigning agents, processing messages).
        *   **`app/livechat/server/lib/routing.js`**: Handles the logic for routing incoming Livechat requests to available agents or queues.
        *   **`app/livechat/server/lib/queueManager.js`**: Manages the queuing of Livechat requests when agents are unavailable.
    *   Initializations and startup tasks related to Livechat are often found in:
        *   **`app/livechat/server/startup.js`**

4.  **Distinguishing Livechat Requests:**
    *   Livechat requests are differentiated from regular logged-in user requests by:
        *   **Method Prefix:** The `livechat:` prefix on the DDP method names clearly indicates their purpose.
        *   **Context:** Livechat sessions are typically associated with an anonymous `visitor` (identified by a `visitorToken`) rather than a logged-in Rocket.Chat user. The server-side methods validate this `visitorToken` and operate within the context of a guest user.

**Example Flow for a New Livechat Request:**

1.  A visitor clicks the Livechat widget on an external website.
2.  The widget invokes the DDP method `livechat:getInitialData` on the Rocket.Chat server, potentially providing an existing `visitorToken` or requesting a new one.
3.  The server-side `livechat:getInitialData` method (in `app/livechat/server/lib/methods.js`) processes this, fetching settings, creating a new `visitor` if needed, and returning initial chat data.
4.  When the visitor types and sends a message, the widget invokes the `livechat:sendMessage` DDP method, passing the message content and visitor details.
5.  The server-side `livechat:sendMessage` method (also in `app/livechat/server/lib/methods.js`) then:
    *   Creates a chat room if one doesn't exist for the visitor.
    *   Uses logic from `app/livechat/server/lib/routing.js` and `app/livechat/server/lib/queueManager.js` to find and assign an available agent.
    *   Saves the message to the database.
    *   Notifies the assigned agent (via DDP subscriptions) of the new incoming message.

In essence, Rocket.Chat leverages its robust DDP/WebSocket infrastructure to provide a real-time, event-driven mechanism for routing and handling all Livechat interactions, treating the external widget as a specialized DDP client.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,145 |
| Model | gemini-2.5-flash |
| Tools | NONE |
