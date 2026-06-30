# How are Livechat requests routed to the server-side in Rocket.Chat?

## Gemini Answer

Livechat requests are routed to the server-side starting with the `QueueManager.requestRoom` method. This method is responsible for initiating a new conversation by creating a room and an inquiry.

The call chain for Livechat request routing on the server-side is as follows:

**Entry → Step 1 → Step 2 → Step 3 → Final**

1.  **Entry Point**: A Livechat request from the client-side hits the server, initiating the process.
2.  **`QueueManager.requestRoom`** (`apps/meteor/app/livechat/server/lib/QueueManager.ts`): This function handles the initial setup for a new conversation. It performs checks for online agents and then proceeds to create the room and inquiry in a transactional manner.
3.  **`QueueManager.startConversation`** (called within `QueueManager.requestRoom` in `apps/meteor/app/livechat/server/lib/QueueManager.ts`): This method is responsible for the transactional creation of the Livechat room and the associated inquiry.
4.  **`QueueManager.processNewInquiry`** (called within `QueueManager.requestRoom` in `apps/meteor/app/livechat/server/lib/QueueManager.ts`): After the room and inquiry are created, `processNewInquiry` evaluates the inquiry's status.
    *   If the inquiry is **READY**, it is immediately routed via `RoutingManager.delegateInquiry()`.
    *   If the inquiry is **QUEUED**, it is saved to a queue, to be processed later by a background worker (`OmnichannelQueue worker` started by `OmnichannelService`).
5.  **`RoutingManager.delegateInquiry`** (architectural detail, called by `processNewInquiry`): This is where the actual routing strategy (e.g., AutoSelection, Manual) is applied to assign an agent to the inquiry and update the room.

In summary, the server-side routing for Livechat requests begins with `QueueManager.requestRoom`, which orchestrates the creation of the chat room and inquiry, and then delegates the inquiry based on its status, either immediately or via a queuing mechanism.

**Key files involved:**
*   `apps/meteor/app/livechat/server/lib/QueueManager.ts` (for `QueueManager.requestRoom`, `startConversation`, and `processNewInquiry`)
*   `packages/rest-typings/src/v1/omnichannel.ts` (defining `POSTLivechatMonitorCreateRequest` as a related API endpoint)

## Tool Calls (8 calls, 31,491 tokens)

**Step 1:** `search({"layer":"server","query":"Livechat request"})` → 255 tokens
**Step 2:** `graph({"direction":"down","layer":"server","query":"POSTLivechatMonitorCreateRequest"})` → 231 tokens
**Step 3:** `graph({"query":"QueueManager.requestRoom","layer":"server","direction":"down"})` → 16 tokens
**Step 4:** `search({"query":"Livechat API","layer":"server"})` → 450 tokens
**Step 5:** `search({"query":"QueueManager","layer":"server"})` → 273 tokens
**Step 6:** `graph({"file":"apps/meteor/app/livechat/server/lib/QueueManager.ts","query":"QueueManager.requestRoom","la)` → 16 tokens
**Step 7:** `implement({"filename":"apps/meteor/app/livechat/server/lib/QueueManager.ts","symbolName":"QueueManager.request)` → 908 tokens
**Step 8:** `graph({"layer":"server","direction":"down","file":"apps/meteor/app/livechat/server/lib/QueueManager.ts","q)` → 17 tokens
