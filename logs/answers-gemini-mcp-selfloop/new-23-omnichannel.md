# How does the Omnichannel queue process and close a livechat conversation?

## Plan

intent: call-chain

## Gemini Answer

The Omnichannel queue processes and closes a livechat conversation through a series of steps involving the `QueueManager`, `RoutingManager`, and the `OmnichannelQueue` worker.

**Processing a New Livechat Conversation:**

1.  **`QueueManager.requestRoom()`**: When a new conversation is initiated, this function creates a room and an inquiry in a database transaction.
2.  **`processNewInquiry()`**: This function checks the status of the inquiry.
    *   If the inquiry is `READY`, it is immediately delegated for routing.
    *   If the inquiry is `QUEUED`, it is saved to the queue.
3.  **`RoutingManager.delegateInquiry()`**: This is a crucial step where the routing strategy (e.g., AutoSelection, Manual) is applied.
4.  **`takeInquiry()`**: This function, located in `apps/meteor/app/livechat/server/lib/takeInquiry.ts`, is responsible for assigning an agent to the inquiry. It updates the room with the assigned agent's information.

**Background Queue Processing:**

1.  **`OmnichannelService`**: This service starts the `OmnichannelQueue` worker.
2.  **`OmnichannelQueue.execute()`**: This method, found in `apps/meteor/server/services/omnichannel/queue.ts`, runs in a loop, continuously processing queued inquiries. For each inquiry, it calls `RoutingManager.delegateInquiry()` to assign an agent.

**Closing a Livechat Conversation:**

1.  **`closeRoom()`**: This function executes within a MongoDB transaction. It performs the following actions:
    *   Closes the livechat room.
    *   Removes the associated inquiry.
    *   Removes any related subscriptions.
2.  **`afterRoomClosed()`**: After the room is closed, this function saves a system message to the chat history and triggers relevant application events.

**Key Files:**

*   `apps/meteor/app/livechat/server/lib/takeInquiry.ts`: Contains the `takeInquiry` function responsible for assigning agents.
*   `apps/meteor/app/livechat/server/lib/RoutingManager.ts`: Manages the delegation of inquiries and applies routing strategies.
*   `apps/meteor/app/livechat/server/lib/QueueManager.ts`: Handles the initial creation and queuing of livechat inquiries.
*   `apps/meteor/server/services/omnichannel/queue.ts`: Defines the `OmnichannelQueue` worker, which processes queued inquiries in the background.

## Tool Calls (8 calls, 44,341 tokens)

**Step 1:** `plan({"intent":"call-chain","question":"How does the Omnichannel queue process and close a livechat conversation?"})` → 280 tokens
**Step 2:** `search({"query":"takeInquiry"})` → 176 tokens
**Step 3:** `graph({"move":"down","depth":5,"query":"takeInquiry","file":"takeInquiry.ts"})` → 2530 tokens
**Step 4:** `search({"query":"assignAgent"})` → 142 tokens
**Step 5:** `graph({"move":"down","query":"assignAgent","depth":5,"file":"RoutingManager.ts"})` → 13 tokens
**Step 6:** `search({"query":"delegateInquiry"})` → 220 tokens
**Step 7:** `graph({"depth":5,"query":"delegateInquiry","move":"down","file":"RoutingManager.ts"})` → 14 tokens
**Step 8:** `details({"filename":"queue.ts","symbolName":"OmnichannelQueue"})` → 362 tokens

## Files Seen In Tool Results (11)

- `packages/models/src/models/LivechatInquiry.ts`
- `apps/meteor/tests/data/livechat/rooms.ts`
- `apps/meteor/app/livechat/server/lib/takeInquiry.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/hooks/checkAgentBeforeTakeInquiry.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/hooks/afterTakeInquiry.ts`
- `apps/meteor/app/livechat/server/lib/RoutingManager.ts`
- `apps/meteor/app/livechat/server/lib/Helper.ts`
- `apps/meteor/app/livechat/server/lib/rooms.ts`
- `apps/meteor/tests/unit/server/services/omnichannel/queue.tests.ts`
- `apps/meteor/app/livechat/server/lib/QueueManager.ts`
- `apps/meteor/server/services/omnichannel/queue.ts`
