# How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?

## Gemini Answer

The Rocket.Chat Apps Engine hooks into events like `afterSaveMessage` through the `callbacks` system.

Call Chain:
`apps/meteor/app/lib/server/lib/afterSaveMessage.ts` → `callbacks.run('afterSaveMessage')`

1.  **`afterSaveMessage` function:** Located in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`, this function is the entry point for the `afterSaveMessage` event.
2.  **`callbacks.run`:** Inside `afterSaveMessage.ts`, `callbacks.run('afterSaveMessage', ...)` is invoked. This executes all registered handlers for the `'afterSaveMessage'` event.
3.  **Apps Engine Integration (Implicit):** While I could not find a direct `callbacks.add` call within the `AppsEngine` package itself in the current search, the general pattern of the `callbacks` system indicates that the Apps Engine would register its own handlers for specific events using `callbacks.add('eventName', handler, priority)`. This allows the Apps Engine to listen for and react to these events.

Therefore, the Apps Engine integrates by registering its functions as handlers with the `callbacks` system for specific events like `afterSaveMessage`.

## Tool Calls (8 calls, 25,548 tokens)

**Step 1:** `search({"query":"afterSaveMessage","layer":"server"})` → 261 tokens
**Step 2:** `graph({"direction":"down","edgeTypes":["event_listen"],"query":"afterSaveMessage"})` → 158 tokens
**Step 3:** `implement({"filename":"apps/meteor/app/lib/server/lib/afterSaveMessage.ts","symbolName":"afterSaveMessage"})` → 189 tokens
**Step 4:** `search({"query":"Apps_Engine afterSaveMessage","layer":"server"})` → 18 tokens
**Step 5:** `search({"layer":"server","query":"AppsEngine"})` → 172 tokens
**Step 6:** `implement({"filename":"packages/apps-engine/src/server/runtime/AppsEngineRuntime.ts","symbolName":"AppsEngineR)` → 229 tokens
**Step 7:** `search({"layer":"server","query":"AppsEngine callbacks.add"})` → 17 tokens
**Step 8:** `search({"query":"AppsEngine events","layer":"packages"})` → 15 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 0/6 |
| Symbols hit | 0/5 |
| Tool calls | 8 |
| Total tokens | 25,548 |
| Pass | NO |
