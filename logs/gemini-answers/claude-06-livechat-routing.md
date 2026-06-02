# How are Livechat requests routed to the server-side in Rocket.Chat?

## Gemini Answer

Livechat requests are routed to the server-side in Rocket.Chat through the `RoutingManager` located at `apps/meteor/app/livechat/server/lib/RoutingManager.ts`.

Here's a breakdown of the server-side routing process:

*   **`RoutingManager`**: This is the central component for managing Livechat routing. It provides methods to register different routing algorithms, get the currently active routing method, and handle the delegation and assignment of inquiries to agents.
    *   `isMethodSet()`: Checks if a routing method is currently configured.
    *   `registerMethod(name, Method)`: Allows different routing algorithms (e.g., "Round Robin," "Longest Idle") to be registered with the `RoutingManager`. Each method is an instance of a `Method` class.
    *   `getMethod()`: Retrieves the currently configured routing method based on the `Livechat_Routing_Method` setting.
    *   `getNextAgent(department, ignoreAgentId)`: This crucial method uses the configured routing method to determine the next available agent for a given department, optionally ignoring a specific agent.
    *   `delegateInquiry(inquiry, agent, options, room)`: This function is responsible for finding and assigning an agent to an inquiry. If no agent is provided or the provided agent is offline, it calls `getNextAgent` to find a suitable agent.
    *   `assignAgent(inquiry, agent)`: Once an agent is selected, this method creates a Livechat subscription for the room, updates the room with the assigned agent, and dispatches various events related to agent assignment.
    *   `takeInquiry(inquiry, agent, options, room)`: Handles the process of an agent taking an inquiry, including locking the agent, running callbacks, and updating the inquiry and room status.

The `RoutingManager` interacts with the `LivechatInquiry` model, which is proxified from `ILivechatInquiryModel` in `packages/model-typings/src/models/ILivechatInquiryModel.ts`. The actual implementation of `LivechatInquiry` for enterprise versions can be found in `apps/meteor/ee/server/models/LivechatInquiry.ts` and `apps/meteor/ee/server/models/raw/LivechatInquiry.ts`, showcasing how inquiries are managed and updated during the routing process.

**Call Chain:**

1.  **`RoutingManager`** (`apps/meteor/app/livechat/server/lib/RoutingManager.ts`): Acts as the entry point for server-side Livechat routing operations.
2.  **`RoutingManager.getNextAgent()`**: Determines the next available agent based on the configured routing method.
3.  **`RoutingManager.delegateInquiry()`**: Orchestrates the assignment of an inquiry to an agent, potentially calling `getNextAgent()` if an agent needs to be found.
4.  **`RoutingManager.assignAgent()`**: Updates the Livechat room and inquiry with the assigned agent.
5.  **`LivechatInquiry`** (proxied from `packages/model-typings/src/models/ILivechatInquiryModel.ts`, implemented in `apps/meteor/ee/server/models/LivechatInquiry.ts` and `apps/meteor/ee/server/models/raw/LivechatInquiry.ts`): This model is updated throughout the routing process to reflect the status and assignment of the Livechat inquiry.

## Tool Calls (8 calls, 72,914 tokens)

**Step 1:** `search({"query":"RoutingManager","layer":"server"})` → 57 tokens
**Step 2:** `graph({"direction":"down","layer":"server","query":"RoutingManager"})` → 806 tokens
**Step 3:** `implement({"symbolName":"RoutingManager","filename":"apps/meteor/app/livechat/server/lib/RoutingManager.ts"})` → 2441 tokens
**Step 4:** `search({"query":"LivechatInquiry","layer":"server"})` → 75 tokens
**Step 5:** `implement({"filename":"packages/models/src/index.ts","symbolName":"LivechatInquiry"})` → 36 tokens
**Step 6:** `implement({"filename":"apps/meteor/ee/server/models/LivechatInquiry.ts","symbolName":"LivechatInquiry"})` → 36 tokens
**Step 7:** `search({"query":"ILivechatInquiryModel","layer":"server"})` → 35 tokens
**Step 8:** `search({"layer":"server","query":"startLivechat"})` → 32 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 3/6 |
| Tool calls | 8 |
| Total tokens | 72,914 |
