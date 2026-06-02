# How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?

## Gemini Answer

Rocket.Chat Apps hook into events like `afterSaveMessage` through the Apps Engine via the `AppListenerManager`.

Here's the breakdown of the process:

1.  **App Registration:** When an app is loaded and enabled, the `AppManager` (located at `packages/apps-engine/src/server/AppManager.ts`) registers the app's implemented listeners with the `AppListenerManager`.
2.  **Listener Management:** The `AppListenerManager` (located at `packages/apps-engine/src/server/managers/AppListenerManager.ts`) maintains a map of event interfaces (like `IPostMessageSent`, which is analogous to `afterSaveMessage`) to a list of app IDs that have registered for those events.
3.  **Event Execution:** When a core Rocket.Chat event occurs (e.g., a message is saved), the `AppListenerManager.executeListener` method is called with the specific event interface (e.g., `AppInterface.IPostMessageSent`) and the relevant data.
4.  **App Invocation:** Inside `executeListener`, the `AppListenerManager` iterates through all the app IDs registered for that event. For each registered app, it retrieves the `ProxiedApp` instance and then calls the corresponding method on the app's sandbox (e.g., `app.call(AppMethod.EXECUTEPOSTMESSAGESENT, data)`). This `app.call` mechanism acts as a bridge, allowing the core system to invoke methods defined within the isolated environment of the Rocket.Chat App.

Essentially, the `AppListenerManager` acts as the central dispatcher for events to all active Rocket.Chat Apps. Apps declare which events they are interested in, and the `AppListenerManager` ensures their corresponding handler methods are executed when those events fire in the core system.

**Call Chain:**

`AppManager` → `AppListenerManager.registerListeners` (during app enablement) → `AppListenerManager.executeListener` (when an event like `afterSaveMessage` occurs) → `ProxiedApp.call` (invokes the app's handler).

**Key Files:**

*   `packages/apps-engine/src/server/AppManager.ts`: Manages the lifecycle of apps, including registration of listeners.
*   `packages/apps-engine/src/server/managers/AppListenerManager.ts`: The core component responsible for dispatching events to registered app listeners.

## Tool Calls (8 calls, 132,521 tokens)

**Step 1:** `search({"query":"AppListenerManager"})` → 84 tokens
**Step 2:** `graph({"question":"How does AppListenerManager handle events?","direction":"down","query":"AppListenerMana)` → 45 tokens
**Step 3:** `search({"query":"executeListener","layer":"server"})` → 34 tokens
**Step 4:** `search({"layer":"server","query":"afterSaveMessage App"})` → 16 tokens
**Step 5:** `implement({"symbolName":"AppListenerManager","filename":"packages/apps-engine/src/server/managers/AppListenerM)` → 8358 tokens
**Step 6:** `search({"layer":"server","query":"AppListenerManager.executeListener"})` → 20 tokens
**Step 7:** `search({"layer":"server","query":"AppManager"})` → 78 tokens
**Step 8:** `implement({"symbolName":"AppManager","filename":"packages/apps-engine/src/server/AppManager.ts"})` → 8195 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 5/5 |
| Tool calls | 8 |
| Total tokens | 132,521 |
