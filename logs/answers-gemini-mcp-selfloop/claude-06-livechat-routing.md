# How are Livechat requests routed to the server-side in Rocket.Chat?

## Plan

intent: routing

## Gemini Answer

Livechat requests in Rocket.Chat are routed to the server-side primarily through REST API endpoints and a dedicated Livechat widget script. The core server-side logic for managing these requests resides within the `QueueManager` and `RoutingManager` classes.

Here's a breakdown of the routing process:

**1. Entry Points:**

*   **Livechat Widget:** The widget, embedded on a website, sends requests to the server. The widget script is served from the `/livechat` endpoint. Interactions with the widget typically call the `livechat/room` API endpoint to initiate or resume a chat.
*   **REST API Endpoints:**
    *   `/livechat/room` (GET): This is a primary entry point for visitors to start or resume a chat, handling the initial request to create a livechat room and an inquiry.
    *   `/livechat/message` (POST): Used for sending messages within an ongoing livechat conversation.
    *   `/livechat.sms.incoming` (POST): Handles incoming SMS messages, validating the provider, registering the visitor, and creating/retrieving a room before sending the message.
    *   `/livechat/offline.message` (POST): Used for sending messages when agents are offline.

**2. Request Processing Flow (Orchestrated by `QueueManager` and `RoutingManager`):**

*   **Guest Registration:** For new visitors, the `registerGuest()` function is called to create or update a visitor record. This is often triggered by the `GET /livechat/room` endpoint.
*   **Room and Inquiry Creation:** The `QueueManager.requestRoom()` method is central to initiating a chat.
    *   It calls `prepareLivechatRoom()` to construct the `IOmnichannelRoom` object.
    *   Then, `startConversation()` is invoked to create both the `LivechatRoom` and `LivechatInquiry` records. The inquiry represents the conversation waiting for an agent.
*   **Inquiry Status Determination:** The `QueueManager.getInquiryStatus()` function determines the initial status of the inquiry (e.g., `READY`, `QUEUED`, `VERIFYING`) based on factors like contact verification, maximum concurrent chats, and waiting queue settings.
*   **Routing to Agents:** After the inquiry is created, `QueueManager.processNewInquiry()` is called.
    *   If the inquiry status is `READY`, the `RoutingManager.delegateInquiry()` method is used to assign an agent.
    *   The `RoutingManager` utilizes registered routing methods (e.g., `Load_Rotation`) to find the next available agent.
    *   If no agent is immediately available and `Livechat_accept_chats_with_no_agents` is enabled, the chat might be accepted but not routed, or it might be queued. If this setting is false and no agents are online, the request will fail.
    *   The `beforeRouteChat` hook can also influence routing, for example, by moving an inquiry to a fallback department if the original department has no online agents.

**Key Files:**

*   **`apps/meteor/app/livechat/server/lib/QueueManager.ts`**: This file contains the `QueueManager` class, which is responsible for managing the livechat queue, creating rooms and inquiries, and processing new inquiries.
*   **`apps/meteor/app/livechat/server/lib/RoutingManager.ts`**: This file contains the `RoutingManager` class, which handles the assignment of agents to livechat inquiries based on various routing methods.

## Tool Calls (8 calls, 29,846 tokens)

**Step 1:** `wiki({"question":"How are Livechat requests routed to the server-side in Rocket.Chat?"})` → 1095 tokens
**Step 2:** `plan({"question":"How are Livechat requests routed to the server-side in Rocket.Chat?","intent":"routing"})` → 89 tokens
**Step 3:** `search({"query":"/livechat/room"})` → 63 tokens
**Step 4:** `search({"query":"QueueManager","layer":"server"})` → 98 tokens
**Step 5:** `graph({"file":"QueueManager.ts","query":"QueueManager","move":"expand","depth":2})` → 67 tokens
**Step 6:** `details({"filename":"QueueManager.ts","symbolName":"QueueManager"})` → 969 tokens
**Step 7:** `graph({"depth":4,"move":"down","query":"QueueManager.requestRoom","file":"QueueManager.ts"})` → 16 tokens
**Step 8:** `search({"layer":"server","query":"requestRoom"})` → 70 tokens

## Files Seen In Tool Results (3)

- `apps/meteor/tests/data/livechat/rooms.ts`
- `apps/meteor/app/livechat/server/lib/QueueManager.ts`
- `apps/meteor/app/livechat/client/lib/stream/queueManager.ts`
