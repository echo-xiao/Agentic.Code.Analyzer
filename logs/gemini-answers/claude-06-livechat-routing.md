# How are Livechat requests routed to the server-side in Rocket.Chat?

## Gemini Answer

Livechat requests are routed to the server-side in Rocket.Chat starting with the `QueueManager.requestRoom()` method. This method initiates a new conversation by creating a room and an inquiry.

The call chain is as follows:

`QueueManager.requestRoom()` (located in `apps/meteor/app/livechat/server/lib/QueueManager.ts`)
→ `processNewInquiry()` (located in `apps/meteor/app/livechat/server/lib/QueueManager.ts`)

From `processNewInquiry()`, the routing branches:
*   If the inquiry status is `READY`, it proceeds to `RoutingManager.delegateInquiry()`.
*   If the inquiry is `QUEUED`, it is saved to a queue, and later processed by the `OmnichannelService`'s `OmnichannelQueue` worker, which then also calls `RoutingManager.delegateInquiry()`.

The `RoutingManager.delegateInquiry()` then applies a routing strategy (e.g., AutoSelection, Manual) and ultimately assigns an agent using `takeInquiry()` and `assignAgent()`.

**Key files:**
*   `apps/meteor/app/livechat/server/lib/QueueManager.ts`: Contains the `QueueManager` class with `requestRoom()` and `processNewInquiry()` methods.
*   `apps/meteor/app/livechat/server/lib/RoutingManager.ts`: Contains the `RoutingManager` class with `delegateInquiry()`, which handles routing strategies.
*   `apps/meteor/app/livechat/server/lib/OmnichannelService.ts`: Contains the `OmnichannelService` which starts the `OmnichannelQueue` worker for background processing of queued inquiries.

## Tool Calls (8 calls, 33,476 tokens)

**Step 1:** `search({"query":"Livechat request","layer":"server"})` → 390 tokens
**Step 2:** `graph({"layer":"server","direction":"down","query":"QueueManager.requestRoom"})` → 16 tokens
**Step 3:** `search({"layer":"server","query":"QueueManager"})` → 273 tokens
**Step 4:** `graph({"query":"QueueManager.requestRoom","direction":"down","layer":"server"})` → 16 tokens
**Step 5:** `implement({"filename":"apps/meteor/app/livechat/server/lib/QueueManager.ts","symbolName":"QueueManager"})` → 973 tokens
**Step 6:** `graph({"layer":"server","query":"QueueManager.requestRoom","direction":"down"})` → 16 tokens
**Step 7:** `search({"layer":"server","query":"Livechat API"})` → 390 tokens
**Step 8:** `search({"query":"Livechat POST","layer":"server"})` → 407 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 5/6 |
| Tool calls | 8 |
| Total tokens | 33,476 |
| Pass | NO |
