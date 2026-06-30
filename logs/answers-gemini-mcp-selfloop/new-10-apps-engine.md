# How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?

## Gemini Answer

Rocket.Chat Apps hook into events like `afterSaveMessage` through the Apps Engine's integration with Rocket.Chat's callback system.

Here's the call chain:

**Entry** (Event Trigger) → **Apps Engine Registration** → **App-Specific Event Handler**

1.  **Event Trigger**: The `afterSaveMessage` event is triggered in the core Rocket.Chat server.
    *   **File:** `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`
    *   **Mechanism**: Within this file, `callbacks.run('afterSaveMessage')` is invoked, which executes all registered handlers for this event.

2.  **Apps Engine Registration**: The Apps Engine is responsible for registering its own handlers with Rocket.Chat's callback system for events that apps wish to hook into. This registration is managed by key components of the Apps Engine.
    *   **Key Files**:
        *   `apps/meteor/ee/server/apps/orchestrator.js`: This file likely plays a role in orchestrating the overall Apps Engine functionality, including the management and loading of apps.
        *   `packages/apps-engine/src/server/AppManager.ts`: The `AppManager` is the central component within the Apps Engine responsible for managing the lifecycle of installed applications. It is highly probable that the `AppManager` discovers the event handlers (lifecycle methods) exposed by an installed app and uses `callbacks.add('afterSaveMessage', handler, priority)` to register these handlers with the Rocket.Chat core.

3.  **App-Specific Event Handler**: Once the Apps Engine's handler is registered and triggered by `callbacks.run('afterSaveMessage')`, it then dispatches the event to the specific `afterSaveMessage` lifecycle method implemented within an individual Rocket.Chat App. An app would define a method (e.g., `executeAfterSaveMessage`) corresponding to the event it wants to listen to.

## Tool Calls (8 calls, 27,165 tokens)

**Step 1:** `search({"query":"afterSaveMessage","layer":"server"})` → 262 tokens
**Step 2:** `graph({"query":"afterSaveMessage","layer":"server","direction":"down","edgeTypes":["event_listen"]})` → 175 tokens
**Step 3:** `search({"query":"Apps Engine hook","layer":"server"})` → 15 tokens
**Step 4:** `search({"layer":"server","query":"Apps_Engine"})` → 54 tokens
**Step 5:** `search({"layer":"packages","query":"callbacks.add Apps"})` → 16 tokens
**Step 6:** `search({"layer":"server","query":"Apps"})` → 425 tokens
**Step 7:** `graph({"file":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/ee/server/apps/orchestrator.js","dire)` → 40 tokens
**Step 8:** `search({"layer":"server","query":"Orchestrator"})` → 112 tokens
