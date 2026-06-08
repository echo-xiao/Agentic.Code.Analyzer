# How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?

## Gemini Answer

To understand how the Rocket.Chat Apps Engine hooks into events like `afterSaveMessage`, we need to trace how events are triggered and how the Apps Engine registers its listeners.

Here's the current understanding based on the available information:

1.  **`afterSaveMessage` Callback Execution:** The `afterSaveMessage` function, located at `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`, explicitly calls `callbacks.run('afterSaveMessage', message, { room, user, roomUpdater: updater })`. This indicates that `afterSaveMessage` is a general callback event that other modules can subscribe to.

2.  **Missing Apps Engine Hook Registration:** While we know `afterSaveMessage` is a callback, the specific mechanism for how the Apps Engine registers its hooks for this event is not directly evident from the `search` and `graph` results for "Apps Engine event," "Apps Engine listener," "Apps Engine IHook," or "Apps Engine register hook." Similarly, searching for "callbacks.add afterSaveMessage" did not yield direct results within the `packages` layer.

**Call Chain (Partial):**

`afterSaveMessage` (in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`) → `callbacks.run('afterSaveMessage', ...)`

**Next Steps (Hypothesized):**

The Apps Engine likely uses `callbacks.add` internally to register its own event handlers for `afterSaveMessage` and other lifecycle events. To fully understand the connection, one would need to:

1.  **Search for `callbacks.add` within the Apps Engine codebase** (likely in `packages/` or `ee/packages/`) to find where the Apps Engine registers its listeners.
2.  **Investigate the Apps Engine's internal event handling mechanism** to see how it maps platform events (like `afterSaveMessage`) to the `IHook` implementations provided by individual apps.

## Tool Calls (8 calls, 25,807 tokens)

**Step 1:** `search({"query":"Apps Engine event","layer":"packages"})` → 193 tokens
**Step 2:** `search({"query":"Apps Engine listener","layer":"packages"})` → 195 tokens
**Step 3:** `search({"query":"afterSaveMessage","layer":"packages"})` → 261 tokens
**Step 4:** `graph({"query":"afterSaveMessage","direction":"down","edgeTypes":["event_listen"]})` → 158 tokens
**Step 5:** `search({"layer":"packages","query":"callbacks.add afterSaveMessage"})` → 19 tokens
**Step 6:** `search({"query":"Apps Engine IHook","layer":"packages"})` → 15 tokens
**Step 7:** `search({"layer":"packages","query":"Apps Engine register hook"})` → 17 tokens
**Step 8:** `implement({"symbolName":"afterSaveMessage","filename":"apps/meteor/app/lib/server/lib/afterSaveMessage.ts"})` → 189 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 0/6 |
| Symbols hit | 0/5 |
| Tool calls | 8 |
| Total tokens | 25,807 |
| Pass | NO |
