# How are Livechat requests routed to the server-side in Rocket.Chat?

## Gemini Answer

Livechat requests are routed to the server-side in Rocket.Chat through the following call chain:

1.  **Entry Point:** A new livechat conversation is initiated, which triggers a call to `QueueManager.requestRoom()`. This function, located in `apps/meteor/app/livechat/server/lib/QueueManager.ts`, is responsible for creating a new room and an associated inquiry.

2.  **Inquiry Processing:** Following the creation of the room and inquiry, `QueueManager.requestRoom()` then calls `processNewInquiry()`, also found in `apps/meteor/app/livechat/server/lib/QueueManager.ts`.

3.  **Routing Decision:** Inside `processNewInquiry()`, the status of the inquiry is evaluated:
    *   **Immediate Routing (READY):** If the inquiry is in a `READY` state, it is immediately delegated for agent assignment by calling `RoutingManager.delegateInquiry()`. This function, as seen in `apps/meteor/app/livechat/server/lib/QueueManager.ts` (and other files like `apps/meteor/app/livechat/server/lib/Helper.ts` and `apps/meteor/server/services/omnichannel/queue.ts`), handles the routing strategy (e.g., AutoSelection, Manual) to assign an agent to the inquiry.
    *   **Queued Routing (QUEUED):** If the inquiry is `QUEUED`, it is saved to a queue. A background worker, the `OmnichannelQueue` (started by `OmnichannelService` in `apps/meteor/server/services/omnichannel/queue.ts`), will then periodically process these queued inquiries and eventually call `RoutingManager.delegateInquiry()` to assign an agent.

The primary server-side routing logic is encapsulated within `RoutingManager.delegateInquiry()`.

**Call Chain:**
`Livechat Request` → `QueueManager.requestRoom()` (apps/meteor/app/livechat/server/lib/QueueManager.ts) → `processNewInquiry()` (apps/meteor/app/livechat/server/lib/QueueManager.ts) → `RoutingManager.delegateInquiry()` (called from apps/meteor/app/livechat/server/lib/QueueManager.ts, apps/meteor/app/livechat/server/lib/Helper.ts, or apps/meteor/server/services/omnichannel/queue.ts).

## Tool Calls (8 calls, 33,381 tokens)

**Step 1:** `search({"query":"Livechat request","layer":"server"})` → 390 tokens
**Step 2:** `graph({"layer":"server","direction":"down","query":"QueueManager.requestRoom"})` → 16 tokens
**Step 3:** `search({"query":"QueueManager","layer":"server"})` → 273 tokens
**Step 4:** `graph({"query":"QueueManager.requestRoom","direction":"down","layer":"server"})` → 16 tokens
**Step 5:** `search({"layer":"server","query":"processNewInquiry"})` → 65 tokens
**Step 6:** `graph({"direction":"down","layer":"server","query":"processNewInquiry"})` → 1282 tokens
**Step 7:** `search({"layer":"server","query":"RoutingManager.delegateInquiry"})` → 352 tokens
**Step 8:** `graph({"query":"RoutingManager.delegateInquiry","direction":"down","layer":"server"})` → 17 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 5/6 |
| Tool calls | 8 |
| Total tokens | 33,381 |
| Pass | NO |
