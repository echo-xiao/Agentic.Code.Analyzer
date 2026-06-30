# What would be impacted if the afterSaveMessage callback system were changed?

## Gemini Answer

The `afterSaveMessage` callback system is triggered in two main locations:

*   **Entry → `callbacks.add('afterSaveMessage', this.onMessage.bind(this))` → `apps/meteor/app/slackbridge/server/RocketAdapter.ts`**:
    *   The `RocketAdapter.onMessage` method handles messages that need to be bridged to Slack.
    *   Impact: Changes to `afterSaveMessage` would affect how messages (new, edited, or with file shares) are processed and sent to connected Slack workspaces. It could break or alter the integration between Rocket.Chat and Slack.

*   **Entry → `callbacks.add('afterSaveMessage', afterSaveMessage, callbacks.priority.MEDIUM, 'search-events')` → `apps/meteor/app/search/server/events/index.ts`**:
    *   The `afterSaveMessage` function within this file calls `searchEventService.promoteEvent('message.save', m._id, m)`.
    *   Impact: Altering `afterSaveMessage` would directly impact the search event system, specifically the `message.save` event. This could lead to issues with message indexing, search result accuracy, or other functionalities dependent on the `searchEventService`.

In summary, changing the `afterSaveMessage` callback system would impact the **Slack Bridge integration** and the **Rocket.Chat search event processing**.

## Tool Calls (5 calls, 14,917 tokens)

**Step 1:** `search({"query":"afterSaveMessage"})` → 261 tokens
**Step 2:** `graph({"edgeTypes":["event_listen"],"query":"afterSaveMessage","direction":"down"})` → 158 tokens
**Step 3:** `search({"query":"callbacks.add('afterSaveMessage'"})` → 263 tokens
**Step 4:** `implement({"symbolName":"RocketAdapter.onMessage","filename":"apps/meteor/app/slackbridge/server/RocketAdapter)` → 275 tokens
**Step 5:** `implement({"filename":"apps/meteor/app/search/server/events/index.ts","symbolName":"afterSaveMessage"})` → 88 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 0/6 |
| Symbols hit | 1/4 |
| Tool calls | 5 |
| Total tokens | 14,917 |
| Pass | NO |
