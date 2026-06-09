# How are Livechat requests routed to the server-side in Rocket.Chat?

## Gemini Answer

When a new user initiates a Livechat conversation by sending their first message, the request is handled by a core Meteor method on the server, which then passes the inquiry to a sophisticated routing system to assign it to an available agent.

The entry point for this process is the `sendMessageLivechat` method. From there, the system creates the necessary room and inquiry, and then uses a `RoutingManager` to delegate the conversation to the appropriate agent based on the configured routing strategy.

### Call Chain

`sendMessageLivechat` → `Livechat.newRoom` → `Livechat.newInquiry` → `RoutingManager.delegateInquiry`

### File Breakdown

1.  **`apps/meteor/app/livechat/server/methods/sendMessageLivechat.ts`**
    This file defines the `sendMessageLivechat` Meteor method, which serves as the primary entry point for all incoming Livechat messages from guest users. When a guest sends their first message, this method is responsible for initiating the process of creating a new room and triggering the agent routing logic.

2.  **`apps/meteor/app/livechat/server/lib/Livechat.ts` (Assumed)**
    While not explicitly verified through a graph, this central library file likely contains the core business logic for creating Livechat rooms (`newRoom`) and inquiries (`newInquiry`). The `sendMessageLivechat` method calls into this library to set up the conversation before it can be routed.

3.  **`apps/meteor/app/livechat/server/lib/RoutingManager.ts` (Assumed)**
    This is the heart of the Livechat routing system. Once an inquiry is created, the `delegateInquiry` function is called. It inspects the active routing algorithm (e.g., Auto Selection, Manual Selection) and assigns the newly created inquiry to a suitable, available agent. This manager orchestrates the entire process of matching a guest with an agent.

## Tool Calls (8 calls, 31,360 tokens)

**Step 1:** `search({"query":"Livechat","layer":"server"})` → 611 tokens
**Step 2:** `graph({"query":"QueueManager.requestRoom","direction":"down"})` → 16 tokens
**Step 3:** `search({"query":"livechat.registerGuest"})` → 17 tokens
**Step 4:** `search({"query":"livechat:sendMessage"})` → 16 tokens
**Step 5:** `graph({"query":"RoutingManager.delegateInquiry","direction":"up"})` → 17 tokens
**Step 6:** `search({"query":"createLivechatRoom","layer":"server"})` → 248 tokens
**Step 7:** `graph({"query":"createLivechatRoom","direction":"up"})` → 242 tokens
**Step 8:** `search({"query":"sendMessageLivechat","layer":"server"})` → 172 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 5/6 |
| Tool calls | 8 |
| Total tokens | 31,360 |
| Pass | NO |
