# How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?

## Gemini Answer

Rocket.Chat Apps hook into events like `afterSaveMessage` through the Apps Engine, which uses a callback event system.

Here's the breakdown of the process:

1.  **Apps Engine Core:** The central component for managing app lifecycle and event listeners is the `AppListenerManager` located in `packages/apps-engine/src/server/managers/AppListenerManager.ts`.
2.  **Event Registration:** When an app is registered with the Apps Engine, it can declare its interest in various lifecycle hooks. The `AppListenerManager.registerListeners` method in `packages/apps-engine/src/server/managers/AppListenerManager.ts` is responsible for registering these app-defined listeners.
3.  **Event Triggering:** Rocket.Chat's core system (e.g., in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`) will trigger a generic `afterSaveMessage` event. This is part of a broader callback system where `callbacks.run('eventName')` executes all registered handlers for a given event.
4.  **Apps Engine Event Execution:** The `AppListenerManager` contains specific methods for executing different types of events. For an `afterSaveMessage` event, the relevant method is `AppListenerManager.executePostMessageSent` (found in `packages/apps-engine/src/server/managers/AppListenerManager.ts`). This method is responsible for taking the message data and dispatching it to any registered app listeners that have declared interest in `IPostMessageSent` (the Apps Engine equivalent of `afterSaveMessage`).

**Call Chain:**

`apps/meteor/app/lib/server/lib/afterSaveMessage.ts` (triggers general `afterSaveMessage` callback) → `packages/apps-engine/src/server/managers/AppListenerManager.ts` (`AppListenerManager.executePostMessageSent` handles the event for Apps)

The connection between the core `afterSaveMessage` callback and the Apps Engine's `AppListenerManager` is event-based, not import-based. The `AppListenerManager` acts as an intermediary, adapting core Rocket.Chat events into the Apps Engine's sandbox environment.

## Tool Calls (8 calls, 30,538 tokens)

**Step 1:** `search({"query":"Apps Engine event hook","layer":"server"})` → 17 tokens
**Step 2:** `search({"query":"Apps_Events","layer":"server"})` → 14 tokens
**Step 3:** `search({"layer":"packages","query":"afterSaveMessage"})` → 410 tokens
**Step 4:** `graph({"query":"afterSaveMessage","direction":"down","edgeTypes":["event_listen"]})` → 175 tokens
**Step 5:** `search({"query":"AppManager","layer":"packages"})` → 410 tokens
**Step 6:** `graph({"direction":"down","query":"AppManager","file":"packages/apps-engine/src/server/AppManager.ts"})` → 143 tokens
**Step 7:** `search({"layer":"packages","query":"AppListenerManager"})` → 288 tokens
**Step 8:** `implement({"filename":"packages/apps-engine/src/server/managers/AppListenerManager.ts","symbolName":"AppListen)` → 1892 tokens
