# How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?

## Gemini Answer

Rocket.Chat Apps hook into events like `afterSaveMessage` through the `callbacks` system. The `callbacks.add` function is used to register event listeners.

Here's the general flow:

1.  **Event Trigger**: An action within Rocket.Chat (e.g., saving a message) triggers a `callbacks.run('eventName')` call. For `afterSaveMessage`, this happens in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`.
2.  **Listener Registration**: Apps Engine, during its initialization or when an app is enabled, registers its own handlers for specific events using `callbacks.add('eventName', handlerFunction, priority, 'handlerId')`.
3.  **Execution**: When `callbacks.run('afterSaveMessage')` is executed, all registered `handlerFunction`s for that event are called sequentially, ordered by their priority.

While I couldn't pinpoint the exact file where the Apps Engine specifically calls `callbacks.add` for `afterSaveMessage` with the provided tools, the `search` results for `callbacks.add` show numerous examples of how other modules register their own handlers for various events, including `afterSaveMessage` (e.g., `apps/meteor/app/slackbridge/server/RocketAdapter.ts`). This indicates that the Apps Engine would follow a similar pattern to register its event listeners.

**Call Chain:**

`apps/meteor/app/lib/server/lib/afterSaveMessage.ts` (where `afterSaveMessage` is run) → Apps Engine's internal event handler (registered via `callbacks.add`)

## Tool Calls (8 calls, 27,006 tokens)

**Step 1:** `search({"query":"afterSaveMessage","layer":"server"})` → 468 tokens
**Step 2:** `graph({"edgeTypes":["event_listen"],"layer":"server","query":"afterSaveMessage","direction":"down"})` → 175 tokens
**Step 3:** `search({"layer":"server","query":"Apps Engine event"})` → 77 tokens
**Step 4:** `search({"layer":"packages","query":"callbacks.add afterSaveMessage"})` → 19 tokens
**Step 5:** `search({"layer":"packages","query":"Apps Engine event listener"})` → 85 tokens
**Step 6:** `search({"layer":"server","query":"Apps Engine initialize"})` → 17 tokens
**Step 7:** `search({"query":"Apps Engine register event","layer":"packages"})` → 18 tokens
**Step 8:** `search({"layer":"server","query":"callbacks.add"})` → 496 tokens

## Files Seen In Tool Results (22)

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
- `packages/rest-typings/src/v1/omnichannel.ts`
- `apps/meteor/ee/server/hooks/federation/index.ts`
- `apps/meteor/app/integrations/server/triggers.ts`
- `apps/meteor/app/livechat/server/business-hour/BusinessHourManager.ts`
- `apps/meteor/app/livechat/server/hooks/sendToCRM.ts`
- `apps/meteor/ee/app/authorization/server/callback.ts`
- `apps/meteor/app/slackbridge/server/RocketAdapter.ts`
- `apps/meteor/app/livechat/server/hooks/afterUserActions.ts`
- `apps/meteor/ee/server/lib/engagementDashboard/startup.ts`
- `apps/meteor/app/markdown/server/index.ts`
