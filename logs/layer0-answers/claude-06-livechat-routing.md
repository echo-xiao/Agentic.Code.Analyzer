# How are Livechat requests routed to the server-side in Rocket.Chat?

## Baseline Answer (no tools)

Livechat requests from the client-side (the Livechat widget embedded on a website) are routed to the Rocket.Chat server primarily through **DDP (Distributed Data Protocol) over WebSockets**. Rocket.Chat is built on Meteor, which inherently uses DDP for real-time client-server communication.

Here's a detailed breakdown of the routing process:

1.  **Client-Side Initiation (Livechat Widget):**
    *   When the Livechat widget loads on a guest's website, it establishes a **WebSocket connection** to the Rocket.Chat server.
    *   Over this WebSocket, it initiates a **DDP connection**.
    *   The widget then makes various requests as DDP method calls or subscribes to DDP publications.

    *   **Relevant Client-Side Files (modern structure):**
        *   `apps/livechat/client/widget/src/lib/ddp.ts`: Manages the DDP connection and client-side method calls.
        *   `apps/livechat/client/widget/src/api/lib.ts`: Provides an API wrapper for making DDP method calls from the widget, such as `api.callMethod('livechat:registerGuest', ...)`.

2.  **Server-Side DDP Endpoint (Meteor):**
    *   Rocket.Chat's Meteor application automatically provides a DDP server endpoint, typically at `/websocket`.
    *   When the WebSocket connection is established and DDP messages are sent, the Meteor server receives these messages.

3.  **DDP Method Routing:**
    *   For requests that trigger an action (e.g., sending a message, registering a guest, closing a conversation), the client calls a **DDP Method**.
    *   Meteor routes these incoming DDP method calls to the corresponding server-side JavaScript/TypeScript functions defined using `Meteor.methods({...})`.
    *   **Relevant Server-Side Files:** These methods are primarily located within the `apps/meteor/app/livechat/server/methods/` directory:
        *   `apps/meteor/app/livechat/server/methods/registerGuest.ts`: Handles the registration or identification of a Livechat visitor.
        *   `apps/meteor/app/livechat/server/methods/sendMessage.ts`: Processes incoming messages from the Livechat widget.
        *   `apps/meteor/app/livechat/server/methods/getInitialData.ts`: Fetches initial configuration and data for the widget.
        *   `apps/meteor/app/livechat/server/methods/closeConversation.ts`: Manages closing a Livechat room.
        *   `apps/meteor/app/livechat/server/methods/uploadFile.ts`: Handles file uploads from the widget.

4.  **DDP Publication Routing:**
    *   For requests that involve receiving real-time data updates (e.g., new messages, agent status, room changes), the client establishes a **DDP Subscription**.
    *   Meteor routes these incoming DDP subscription requests to the corresponding server-side functions defined using `Meteor.publish(...)`. These functions determine which data should be sent to the subscribing client.
    *   **Relevant Server-Side Files:** These publications are primarily located within the `apps/meteor/app/livechat/server/publications/` directory:
        *   `apps/meteor/app/livechat/server/publications/livechatMessages.ts`: Publishes messages within a specific Livechat room to the visitor.
        *   `apps/meteor/app/livechat/server/publications/livechatRoom.ts`: Publishes details about the Livechat room itself.
        *   `apps/meteor/app/livechat/server/publications/livechatVisitor.ts`: Publishes information about the current visitor.

5.  **Livechat Business Logic:**
    *   Once a method or publication function is invoked on the server, it interacts with the Livechat-specific collections (e.g., `LivechatInquiry`, `LivechatRoom`, `LivechatMessages`, `LivechatVisitors`) and applies the necessary business logic, such as:
        *   Creating or updating visitor records.
        *   Assigning inquiries to agents.
        *   Storing messages in the database.
        *   Notifying agents of new inquiries or messages.
        *   Broadcasting updates to subscribed clients (both visitors and agents).

In summary, the Livechat widget communicates with the Rocket.Chat server via DDP over WebSockets. DDP method calls trigger server-side functions for actions, and DDP subscriptions provide real-time data updates, all routed by Meteor to the specific Livechat business logic in `apps/meteor/app/livechat/server/`.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 2,815 |
| Model | gemini-2.5-flash |
| Tools | NONE |
