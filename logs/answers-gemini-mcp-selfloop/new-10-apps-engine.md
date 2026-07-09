# How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?

## Plan

intent: unknown

## Gemini Answer

Rocket.Chat Apps hook into events like `afterSaveMessage` through the Apps Engine by implementing specific interfaces that define event handlers. The core components involved in this process are the `AppsEngineService` and the `AppListenerManager`.

Here's the flow:

1.  **App Registration (App Side):** A Rocket.Chat App, during its lifecycle, declares that it implements certain event interfaces. For an `afterSaveMessage` event, an app would implement the `IPostMessageUpdated` interface. This interface, defined in `packages/apps-engine/src/definition/messages/IPostMessageUpdated.ts`, requires the app to provide an `executePostMessageUpdated` method. This method contains the custom logic the app wants to run after a message has been updated.

    *   **Key File:** `packages/apps-engine/src/definition/messages/IPostMessageUpdated.ts` (defines the interface an app implements)

2.  **Core Event Trigger (Rocket.Chat Core):** When a message is saved or updated within Rocket.Chat, the core system emits an internal event signifying this action.

3.  **AppsEngineService Mediation:** The `AppsEngineService`, located at `apps/meteor/server/services/apps-engine/service.ts`, acts as a central intermediary. It subscribes to various system-wide events, including message updates.

    *   **Key File:** `apps/meteor/server/services/apps-engine/service.ts` (central service for Apps Engine)

4.  **AppListenerManager Dispatch:** Upon detecting a relevant event (e.g., a message update), the `AppsEngineService` (or a component it utilizes) delegates the handling to the `AppListenerManager`. The `AppListenerManager`, found at `packages/apps-engine/src/server/managers/AppListenerManager.ts`, is responsible for managing all registered app listeners and dispatching events to them.

    *   **Key File:** `packages/apps-engine/src/server/managers/AppListenerManager.ts` (manages and dispatches events to app hooks)

5.  **Hook Execution:** The `AppListenerManager` has specific methods for each event type, such as `executePostMessageUpdated`. When a message update event occurs, it calls this method. The `executePostMessageUpdated` method then iterates through all installed apps that have registered to handle `IPostMessageUpdated` events. For each such app, it invokes the app's `executePostMessageUpdated` method, passing the updated message object and other necessary accessors (like `IRead`, `IHttp`, `IPersistence`, `IModify`) that allow the app to interact with the Rocket.Chat environment.

In summary, the flow is:

**Rocket.Chat Core Event → `AppsEngineService` → `AppListenerManager` → App's `executePostMessageUpdated` method (implementing `IPostMessageUpdated`)**

## Tool Calls (8 calls, 27,591 tokens)

**Step 1:** `wiki({"question":"How does the Rocket.Chat Apps Engine handle events and hooks?"})` → 1128 tokens
**Step 2:** `search({"query":"IPostMessageUpdated","layer":"packages"})` → 78 tokens
**Step 3:** `graph({"move":"up","file":"IPostMessageUpdated.ts","depth":2,"query":"IPostMessageUpdated"})` → 60 tokens
**Step 4:** `search({"query":"AppsEngineService","layer":"server"})` → 99 tokens
**Step 5:** `details({"filename":"service.ts","symbolName":"AppsEngineService"})` → 248 tokens
**Step 6:** `search({"query":"AppListenerManager"})` → 76 tokens
**Step 7:** `details({"filename":"AppListenerManager.symbolName","symbolName":"AppListenerManager"})` → 1898 tokens
**Step 8:** `details({"filename":"IPostMessageUpdated.ts","symbolName":"IPostMessageUpdated"})` → 290 tokens

## Files Seen In Tool Results (4)

- `packages/apps-engine/src/definition/messages/IPostMessageUpdated.ts`
- `apps/meteor/server/services/apps-engine/service.ts`
- `packages/core-services/src/types/IAppsEngineService.ts`
- `packages/apps-engine/src/server/managers/AppListenerManager.ts`
