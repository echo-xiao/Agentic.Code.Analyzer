# What would be impacted if the afterSaveMessage callback system were changed?

## Gemini Answer

If the `afterSaveMessage` callback system were changed, the following modules would be impacted, as they register handlers for this event:

Call Chain: `afterSaveMessage event triggered` → `SlackBridge listener` → `Search listener`

Key files and their roles:

*   **apps/meteor/app/slackbridge/server/RocketAdapter.ts**: This file registers a handler (`this.onMessage`) to the `afterSaveMessage` event, indicating that the SlackBridge integration processes messages after they are saved.
*   **apps/meteor/app/search/server/events/index.ts**: This file also registers a handler (`afterSaveMessage`) to the `afterSaveMessage` event, suggesting that the search functionality updates its index or performs other search-related operations after a message is saved.

## Tool Calls (3 calls, 8,248 tokens)

**Step 1:** `search({"query":"afterSaveMessage"})` → 261 tokens
**Step 2:** `graph({"query":"afterSaveMessage","direction":"down","edgeTypes":["event_listen"]})` → 158 tokens
**Step 3:** `search({"query":"callbacks.add('afterSaveMessage'"})` → 263 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 1/4 |
| Tool calls | 3 |
| Total tokens | 8,248 |
| Pass | NO |
