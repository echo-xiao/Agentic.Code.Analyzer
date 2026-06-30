# How are Livechat requests routed to the server-side in Rocket.Chat?

## Baseline Answer (no tools)

Livechat requests in Rocket.Chat are routed to the server-side through a combination of **REST API endpoints** for initial setup and configuration, and **DDP (Distributed Data Protocol) over WebSockets** for real-time chat interactions.

Here's a breakdown of how these requests are handled:

### 1. REST API Endpoints (Initial Setup & Configuration)

For initial requests from the Livechat widget, such as fetching configuration, checking agent availability, or creating a new visitor session, Rocket.Chat exposes a set of REST API endpoints.

*   **Client-Side Initiation:** The Livechat widget, typically embedded on an external website, makes HTTP requests (GET, POST) to these endpoints. The client-side logic for making these calls can be found in files like:
    *   `app/livechat/client/lib/api.js`: This file contains the `Livechat` object which encapsulates methods for interacting with the server, including making REST API calls.

*   **Server-Side Routing:** Rocket.Chat uses the `rocketchat:api` package (which leverages `nimble:restivus`) to define and route these REST API calls.
    *   **Definition Files:** The primary definitions for Livechat REST API endpoints are located in:
        *   `app/api/server/v1/livechat.js`: This file defines most of the `/api/v1/livechat/*` endpoints, handling operations like getting visitor information, starting a new chat via API, fetching department information, etc.
        *   `app/api/server/v1/livechat/agent.js`: Contains API endpoints specifically for Livechat agents.
        *   `app/api/server/v1/livechat/department.js`: Contains API endpoints for Livechat departments.
    *   **Routing Mechanism:** When an HTTP request hits the Rocket.Chat server at a path like `/api/v1/livechat/config`, the `rocketchat:api` package matches the URL and HTTP method to the corresponding handler function defined in these files.

*   **Example Flow (Getting Configuration):**
    1.  Widget loads and calls `Livechat.api.get('livechat/config')` (client-side).
    2.  This translates to an HTTP GET request to `/api/v1/livechat/config`.
    3.  The server-side `app/api/server/v1/livechat.js` file has a definition like `API.v1.addRoute('livechat/config', { get() { ... } });`.
    4.  The `get()` handler function is executed, which retrieves the Livechat configuration from the database and returns it.

### 2. DDP (Distributed Data Protocol) over WebSockets (Real-time Chat)

Once a Livechat session is established, real-time communication, such as sending messages, typing indicators, and status updates, primarily occurs via DDP over WebSockets. This leverages Meteor's reactive capabilities.

*   **Client-Side Initiation:** The Livechat widget establishes a DDP connection to the Rocket.Chat server. When a visitor sends a message or performs an action that requires real-time server interaction, the client-side code calls a **Meteor Method**.
    *   `app/livechat/client/lib/api.js`: Contains methods like `Livechat.sendMessage` which internally call Meteor Methods.
    *   `app/livechat/client/lib/stream/livechat.js`: Manages the DDP stream for real-time updates from the server.

*   **Server-Side Routing (Meteor Methods):** Meteor's core framework handles the routing of DDP method calls.
    *   **Definition Files:** Server-side Meteor Methods for Livechat are primarily defined in the `app/livechat/server/methods/` directory. Each file typically defines one or more methods using `Meteor.methods({ ... })`.
        *   `app/livechat/server/methods/sendMessage.js`: Handles the `livechat:sendMessage` method call, processing messages sent by visitors.
        *   `app/livechat/server/methods/startLivechat.js`: Handles the `livechat:startLivechat` method call, initiating a new chat session.
        *   `app/livechat/server/methods/closeLivechat.js`: Handles closing a livechat session.
        *   `app/livechat/server/methods/visitorSetDepartment.js`: Handles setting a department for a visitor.
    *   **Routing Mechanism:** When a client calls a Meteor Method (e.g., `Meteor.call('livechat:sendMessage', ...) `), the Meteor server identifies the corresponding server-side method definition and executes its logic.

*   **Example Flow (Sending a Message):**
    1.  Visitor types a message and clicks send in the widget.
    2.  Client-side code in `app/livechat/client/lib/api.js` calls `Meteor.call('livechat:sendMessage', roomId, messageData)`.
    3.  The DDP connection sends this method call to the server.
    4.  The Meteor server finds the `livechat:sendMessage` method defined in `app/livechat/server/methods/sendMessage.js`.
    5.  The server-side method executes, saving the message to the database, potentially notifying agents, and broadcasting the message to all participants via DDP publications.

### 3. Core Livechat Business Logic

Regardless of whether the request comes via REST API or DDP Meteor Method, the routing mechanism ultimately dispatches it to the relevant server-side business logic. This logic is primarily contained within the `app/livechat/server/` directory:

*   `app/livechat/server/lib/Livechat.js`: This is a central file containing many core Livechat functions and utilities that are invoked by both API endpoints and Meteor methods to perform operations like creating rooms, assigning agents, handling visitor data, etc.
*   `app/livechat/server/lib/QueueManager.js`: Manages agent queues and routing logic.
*   `app/livechat/server/lib/Messages.js`: Handles message-related operations.
*   `app/livechat/server/lib/Visitor.js`: Handles visitor-related operations.

In summary, Rocket.Chat uses a dual-pronged approach for Livechat request routing: **REST APIs for initial interactions and DDP/WebSockets for real-time communication**, both funneling into a well-structured Livechat module on the server-side.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,384 |
| Model | gemini-2.5-flash |
| Tools | NONE |
