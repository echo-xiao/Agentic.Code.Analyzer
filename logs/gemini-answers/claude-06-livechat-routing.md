# How are Livechat requests routed to the server-side in Rocket.Chat?

## Gemini Answer

Livechat requests are routed to the server-side in Rocket.Chat through a multi-step process, starting with `QueueManager.requestRoom()`.

The routing process unfolds as follows:

1.  **Entry Point: `QueueManager.requestRoom()`**
    *   A new Livechat conversation begins with a call to `QueueManager.requestRoom()`. This method, found in `apps/meteor/app/livechat/server/lib/QueueManager.ts`, is responsible for creating a new room and an associated inquiry within a database transaction.

2.  **Inquiry Processing: `processNewInquiry()`**
    *   After creating the inquiry, `QueueManager.requestRoom()` triggers `processNewInquiry()` (also part of the `QueueManager`'s logic or a closely related server-side function).
    *   This function evaluates the status of the inquiry:
        *   If the inquiry status is `READY`, it immediately proceeds to delegate the inquiry.
        *   If the inquiry status is `QUEUED`, it saves the inquiry to a queue for later processing.

3.  **Routing Delegation: `RoutingManager.delegateInquiry()`**
    *   The core routing logic resides within `RoutingManager.delegateInquiry()`. This function takes the inquiry and applies a specific routing strategy (e.g., `AutoSelection`, `Manual`).
    *   Once a strategy is determined, it calls `takeInquiry()` to assign an agent to the conversation.

4.  **Agent Assignment: `takeInquiry()` → `assignAgent()`**
    *   `takeInquiry()` selects an agent based on the chosen routing strategy.
    *   Subsequently, `assignAgent()` updates the Livechat room to reflect the assigned agent.

**Background Queue Processing:**

*   Inquiries initially marked as `QUEUED` are handled by a background process.
*   The `OmnichannelService` initiates an `OmnichannelQueue` worker.
*   This worker continuously executes a loop to process queued inquiries, eventually calling `RoutingManager.delegateInquiry()` for each of them to assign an agent.

**Call Chain:**

`QueueManager.requestRoom()` (apps/meteor/app/livechat/server/lib/QueueManager.ts) → `processNewInquiry()` → `RoutingManager.delegateInquiry()` → `takeInquiry()` → `assignAgent()`

**Key Files:**

*   `apps/meteor/app/livechat/server/lib/QueueManager.ts`: Contains the `QueueManager` class, including the `requestRoom` and `processNewInquiry` methods, which are the initial entry points for Livechat requests on the server-side.
*   Implicitly, server-side files related to `RoutingManager`, `OmnichannelService`, and `OmnichannelQueue` worker (not explicitly located in the provided search results but mentioned in the architectural overview).

## Tool Calls (8 calls, 40,704 tokens)

**Step 1:** `search({"layer":"server","query":"Livechat request"})` → 390 tokens
**Step 2:** `graph({"direction":"down","query":"QueueManager.requestRoom","layer":"server"})` → 16 tokens
**Step 3:** `search({"layer":"server","query":"Livechat"})` → 611 tokens
**Step 4:** `graph({"layer":"server","query":"Livechat","direction":"down"})` → 764 tokens
**Step 5:** `search({"query":"livechat/room","layer":"server"})` → 238 tokens
**Step 6:** `search({"layer":"server","query":"QueueManager"})` → 273 tokens
**Step 7:** `implement({"filename":"apps/meteor/app/livechat/server/lib/QueueManager.ts","symbolName":"QueueManager"})` → 973 tokens
**Step 8:** `graph({"direction":"up","layer":"server","query":"QueueManager.requestRoom"})` → 16 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 5/6 |
| Tool calls | 8 |
| Total tokens | 40,704 |
| Pass | NO |
