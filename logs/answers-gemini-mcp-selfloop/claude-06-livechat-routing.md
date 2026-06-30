# How are Livechat requests routed to the server-side in Rocket.Chat?

## Gemini Answer

The routing of Livechat requests to the server-side in Rocket.Chat appears to follow this general architecture:

**Entry → `QueueManager.requestRoom()` → `processNewInquiry()` → `RoutingManager.delegateInquiry()`**

Here's a breakdown of the process:

1.  **New Conversation Initiation:** A new Livechat conversation starts with a call to `QueueManager.requestRoom()`. This function is responsible for creating a new room and an associated inquiry within a database transaction.
    *   **File:** `apps/meteor/app/livechat/server/lib/rooms.ts` (based on `search` results, `QueueManager.requestRoom` is called in this file to create a room).

2.  **Inquiry Processing:** After creating the room and inquiry, `processNewInquiry()` is invoked. This function checks the status of the newly created inquiry.

3.  **Inquiry Delegation:**
    *   If the inquiry status is `READY`, `RoutingManager.delegateInquiry()` is called immediately. This function then applies a specific routing strategy (e.g., AutoSelection, Manual) to assign an agent to the inquiry. The `takeInquiry()` and `assignAgent()` functions within this process update the room with the assigned agent.
    *   If the inquiry status is `QUEUED`, it is saved to a queue.

4.  **Background Queue Processing:** The `OmnichannelService` starts an `OmnichannelQueue` worker. This worker has an `execute()` loop that periodically processes queued inquiries, calling `RoutingManager.delegateInquiry()` for each.

5.  **Room Creation (Upstream):** While `QueueManager.requestRoom` initiates the Livechat room, the `createRoom` function in `apps/meteor/app/livechat/server/lib/rooms.ts` is a key component in the actual room creation process. Based on the `graph(up)` results, `createRoom` is called by various methods related to sending messages and managing rooms, including:
    *   `getRoom` in `apps/meteor/app/livechat/server/lib/rooms.ts`
    *   `sendMessage` in `apps/meteor/app/livechat/server/lib/messages.ts` (which is further called by various REST API endpoints like `sms` in `apps/meteor/app/livechat/imports/server/rest/sms.ts` and `message` in `apps/meteor/app/livechat/server/api/v1/message.ts`).
    *   `createRoom` in `apps/meteor/app/apps/server/bridges/livechat.ts` (which interacts with the Apps Engine).

In essence, incoming Livechat requests are first handled by `QueueManager.requestRoom` to establish the initial inquiry and room, then processed through `processNewInquiry` and routed by `RoutingManager.delegateInquiry` based on their status and the configured routing strategy. The underlying `createRoom` function in `apps/meteor/app/livechat/server/lib/rooms.ts` is a core utility for actual room generation, invoked by various higher-level Livechat functionalities.

## Tool Calls (8 calls, 42,461 tokens)

**Step 1:** `search({"layer":"server","query":"Livechat request"})` → 390 tokens
**Step 2:** `graph({"direction":"down","layer":"server","query":"QueueManager.requestRoom"})` → 16 tokens
**Step 3:** `search({"layer":"server","query":"Livechat"})` → 611 tokens
**Step 4:** `graph({"file":"/Users/echoooooo/Desktop/code/Rocket.Chat/packages/livechat/src/api.ts","query":"Livechat",)` → 769 tokens
**Step 5:** `search({"query":"QueueManager.requestRoom"})` → 266 tokens
**Step 6:** `graph({"direction":"down","file":"apps/meteor/app/livechat/server/lib/rooms.ts","query":"QueueManager.requ)` → 16 tokens
**Step 7:** `search({"file":"apps/meteor/app/livechat/server/lib/rooms.ts","query":"createRoom"})` → 658 tokens
**Step 8:** `graph({"direction":"up","file":"apps/meteor/app/livechat/server/lib/rooms.ts","query":"createRoom"})` → 1829 tokens
