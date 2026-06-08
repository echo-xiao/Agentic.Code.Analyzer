# How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?

## Gemini Answer

Rocket.Chat Apps hook into events like `afterSaveMessage` (which corresponds to `IPostMessageSent` in the Apps Engine) through a mechanism orchestrated by the `Apps` object and managed by the `AppListenerManager`.

Here's the call chain:

**Rocket.Chat Core Action → Apps.triggerEvent → AppListenerManager.executeListener → App's Registered Hook**

1.  **Rocket.Chat Core Action (e.g., Message Saving):** When a significant event occurs in Rocket.Chat, such as a message being saved, the core system invokes the Apps Engine's event triggering mechanism.
2.  **`Apps.triggerEvent()`:** The core Rocket.Chat code calls `Apps.triggerEvent()` with the specific event type (e.g., `AppEvents.IPostMessageSent`) and relevant data. An example of `Apps.triggerEvent` usage can be found in `apps/meteor/app/lib/server/functions/createRoom.ts`, which calls `await Apps.triggerEvent(AppEvents.IPreRoomCreateExtend, tmp)`. The `Apps` object acts as an orchestrator for these events.
3.  **`AppListenerManager.executeListener()`:** The `Apps` orchestrator dispatches the event to the `AppListenerManager`, located at `packages/apps-engine/src/server/managers/AppListenerManager.ts`. The `AppListenerManager` is responsible for knowing which apps have registered listeners for the triggered event. It then calls `executeListener()` to invoke the appropriate handler within each registered app.
4.  **App's Registered Hook:** An individual Rocket.Chat App, during its lifecycle, registers various lifecycle hooks (e.g., `IPreMessageSent`, `IPostMessageSent`, `IPostRoomCreate`). When `AppListenerManager.executeListener()` is called for an event that an app has registered a hook for, the app's specific implementation of that hook is executed within its isolated sandbox.

## Tool Calls (8 calls, 24,993 tokens)

**Step 1:** `search({"layer":"packages","query":"Apps Engine event handler"})` → 17 tokens
**Step 2:** `search({"layer":"packages","query":"IEvent"})` → 177 tokens
**Step 3:** `graph({"direction":"down","layer":"packages","query":"AppListenerManager"})` → 151 tokens
**Step 4:** `search({"query":"Apps.triggerEvent"})` → 83 tokens
**Step 5:** `graph({"query":"Apps.triggerEvent","layer":"server","direction":"down"})` → 14 tokens
**Step 6:** `search({"layer":"server","query":"Apps"})` → 425 tokens
**Step 7:** `graph({"query":"AppManager","layer":"packages","direction":"down"})` → 143 tokens
**Step 8:** `implement({"symbolName":"Apps.triggerEvent","filename":"apps/meteor/ee/server/apps/orchestrator.js"})` → 48 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 4/5 |
| Tool calls | 8 |
| Total tokens | 24,993 |
| Pass | NO |
