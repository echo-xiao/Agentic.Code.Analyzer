# What would be impacted if the afterSaveMessage callback system were changed?

## Gemini Answer

If the `afterSaveMessage` callback system were changed, the following areas would be impacted:

**Call Chain:**
`afterSaveMessage` (callback system)
  → `callbacks.add('afterSaveMessage', handler, ...)`
    → `apps/meteor/app/slackbridge/server/RocketAdapter.ts` (`RocketAdapter.onMessage` handler)
    → `apps/meteor/app/search/server/events/index.ts` (`afterSaveMessage` handler)

**Impacted Components:**

1.  **Slack Bridge Integration**:
    *   **File:** `apps/meteor/app/slackbridge/server/RocketAdapter.ts`
    *   **Symbol:** `RocketAdapter.onMessage`
    *   **Description:** This function is responsible for processing messages from Rocket.Chat and relaying them to connected Slack workspaces. Changes to `afterSaveMessage` would directly affect how messages are handled for Slack, including new messages, edited messages, and file shares, potentially breaking the integration.

2.  **Search Indexing**:
    *   **File:** `apps/meteor/app/search/server/events/index.ts`
    *   **Symbol:** `afterSaveMessage` (function within this file)
    *   **Description:** This function calls `searchEventService.promoteEvent('message.save', m._id, m);`. This indicates that it's crucial for indexing messages for Rocket.Chat's search functionality. Altering `afterSaveMessage` could lead to messages not being properly indexed, resulting in incomplete or outdated search results.

## Tool Calls (5 calls, 15,951 tokens)

**Step 1:** `search({"query":"afterSaveMessage","layer":"server"})` → 468 tokens
**Step 2:** `graph({"direction":"down","edgeTypes":["event_listen"],"query":"afterSaveMessage"})` → 175 tokens
**Step 3:** `search({"query":"callbacks.add('afterSaveMessage'","layer":"server"})` → 263 tokens
**Step 4:** `implement({"symbolName":"RocketAdapter.onMessage","filename":"apps/meteor/app/slackbridge/server/RocketAdapter)` → 275 tokens
**Step 5:** `implement({"filename":"apps/meteor/app/search/server/events/index.ts","symbolName":"afterSaveMessage"})` → 88 tokens

## Files Seen In Tool Results (13)

- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
- `apps/meteor/app/search/server/events/index.ts`
- `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`
- `apps/meteor/app/threads/server/hooks/aftersavemessage.ts`
- `apps/meteor/app/livechat/server/hooks/afterSaveOmnichannelMessage.ts`
- `apps/meteor/app/autotranslate/server/autotranslate.ts`
- `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts`
- `apps/meteor/app/search/server/events/EventService.ts`
- `apps/meteor/server/services/messages/service.ts`
- `apps/meteor/ee/server/lib/message-read-receipt/ReadReceipt.ts`
- `apps/meteor/app/lib/server/lib/notifyUsersOnMessage.ts`
- `apps/meteor/app/discussion/server/hooks/propagateDiscussionMetadata.ts`
- `apps/meteor/app/slackbridge/server/RocketAdapter.ts`
