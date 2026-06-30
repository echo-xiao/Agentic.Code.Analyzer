# How are Livechat requests routed to the server-side in Rocket.Chat?

## Gemini Answer

Livechat requests are routed to the server-side in Rocket.Chat through a process that involves `QueueManager` and `RoutingManager`.

The initial entry point for a new Livechat conversation is `QueueManager.requestRoom()`. This function is responsible for creating a room and an inquiry in a transaction.

The call chain for Livechat request routing is as follows:

1.  **`QueueManager.requestRoom()`** (found in `apps/meteor/app/livechat/server/lib/rooms.ts`): This function initiates the process by creating a room and an inquiry.
2.  **`processNewInquiry()`**: After `requestRoom()`, this function checks the status of the inquiry.
    *   If the inquiry is `READY`, it immediately calls `RoutingManager.delegateInquiry()`.
    *   If the inquiry is `QUEUED`, it saves the inquiry to a queue.
3.  **`RoutingManager.delegateInquiry()`** (found in `apps/meteor/app/livechat/server/lib/QueueManager.ts`, `apps/meteor/app/livechat/server/lib/Helper.ts`, and `apps/meteor/server/services/omnichannel/queue.ts`): This is a crucial step where the routing strategy is applied (e.g., AutoSelection, Manual).
4.  **`takeInquiry()`**: This function assigns an agent based on the chosen routing strategy.
5.  **`assignAgent()`**: This function updates the room with the assigned agent.

Additionally, for queued inquiries, a background worker called `OmnichannelQueue` (started by `OmnichannelService` in `apps/meteor/server/services/omnichannel/queue.ts`) processes these inquiries in a loop, also calling `RoutingManager.delegateInquiry()`.

Therefore, the primary server-side routing mechanism for Livechat requests flows through `QueueManager.requestRoom()` which then delegates to `RoutingManager.delegateInquiry()` for agent assignment based on various routing strategies.

## Tool Calls (8 calls, 25,416 tokens)

**Step 1:** `search({"query":"Livechat request","layer":"server"})` → 255 tokens
**Step 2:** `graph({"direction":"down","layer":"server","query":"POSTLivechatMonitorCreateRequest"})` → 231 tokens
**Step 3:** `graph({"query":"QueueManager.requestRoom","direction":"down","layer":"server"})` → 16 tokens
**Step 4:** `search({"query":"QueueManager.requestRoom","layer":"server"})` → 266 tokens
**Step 5:** `graph({"direction":"down","file":"apps/meteor/app/livechat/server/lib/rooms.ts","query":"QueueManager.requ)` → 16 tokens
**Step 6:** `search({"query":"RoutingManager.delegateInquiry","layer":"server"})` → 352 tokens
**Step 7:** `graph({"direction":"down","layer":"server","file":"apps/meteor/app/livechat/server/lib/QueueManager.ts","q)` → 17 tokens
**Step 8:** `search({"layer":"server","query":"RoutingManager"})` → 366 tokens

## Files Seen In Tool Results (10)

- `packages/rest-typings/src/v1/omnichannel.ts`
- `apps/meteor/app/livechat/server/lib/rooms.ts`
- `apps/meteor/app/livechat/server/lib/QueueManager.ts`
- `apps/meteor/app/livechat/server/lib/Helper.ts`
- `apps/meteor/server/services/omnichannel/queue.ts`
- `apps/meteor/app/livechat/server/lib/RoutingManager.ts`
- `apps/meteor/definition/IRoutingManagerConfig.ts`
- `apps/meteor/app/lib/server/lib/notifyListener.ts`
- `apps/meteor/server/lib/migrations.ts`
- `apps/meteor/app/livechat/server/lib/hooks.ts`
