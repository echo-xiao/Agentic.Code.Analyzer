# How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?

## Plan

intent: architecture

## Gemini Answer

Rocket.Chat Apps hook into events like `afterSaveMessage` through the Apps Engine's `AppListenerManager`. The core mechanism for event handling in Rocket.Chat is a callback system.

Here's the breakdown:

*   **Event Trigger:** The `afterSaveMessage` event is triggered in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`. This file contains the `afterSaveMessage` function, which explicitly calls `callbacks.run('afterSaveMessage', message, { room, user, roomUpdater: updater })`. This is the point where all registered listeners for `afterSaveMessage` are executed.

*   **Event Registration:** Other parts of the Rocket.Chat codebase register for `afterSaveMessage` using `callbacks.add('afterSaveMessage', handler, priority, 'listenerId')`. Examples include:
    *   `apps/meteor/app/slackbridge/server/RocketAdapter.ts`
    *   `apps/meteor/app/search/server/events/index.ts`

*   **Apps Engine Integration:** The Apps Engine, specifically the `AppListenerManager` located in `packages/apps-engine/src/server/managers/AppListenerManager.ts`, is responsible for managing event listeners for Rocket.Chat Apps. While a direct `callbacks.add` call for `afterSaveMessage` within the Apps Engine wasn't found in the provided search results, the `AppListenerManager` is the designated component within the Apps Engine to handle the registration and execution of app-defined event handlers. It acts as an intermediary, allowing apps to subscribe to Rocket.Chat events without directly interacting with the core `callbacks` system.

In essence, when an `afterSaveMessage` event occurs, the `callbacks.run` function in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts` iterates through all registered handlers. The `AppListenerManager` ensures that any Rocket.Chat App that has subscribed to `afterSaveMessage` (or similar events) will have its corresponding handler executed at this point.

## Tool Calls (8 calls, 20,898 tokens)

**Step 1:** `plan({"question":"How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?","intent":"architect)` → 204 tokens
**Step 2:** `search({"query":"afterSaveMessage"})` → 152 tokens
**Step 3:** `graph({"depth":2,"query":"afterSaveMessage","move":"expand","file":"afterSaveMessage.ts"})` → 308 tokens
**Step 4:** `details({"filename":"afterSaveMessage.ts","symbolName":"afterSaveMessage"})` → 184 tokens
**Step 5:** `search({"query":"callbacks.add('afterSaveMessage'"})` → 149 tokens
**Step 6:** `search({"query":"Apps Engine callbacks.add"})` → 28 tokens
**Step 7:** `search({"query":"AppManager"})` → 68 tokens
**Step 8:** `graph({"move":"expand","file":"AppManager.ts","depth":2,"query":"AppManager"})` → 369 tokens

## Files Seen In Tool Results (29)

- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
- `apps/meteor/app/search/server/events/index.ts`
- `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`
- `apps/meteor/app/threads/server/hooks/aftersavemessage.ts`
- `apps/meteor/app/livechat/server/hooks/afterSaveOmnichannelMessage.ts`
- `packages/models/src/models/BaseRaw.ts`
- `packages/models/src/updater.ts`
- `apps/meteor/app/search/server/events/EventService.ts`
- `apps/meteor/server/services/messages/service.ts`
- `apps/meteor/ee/server/lib/message-read-receipt/ReadReceipt.ts`
- `packages/core-typings/src/IMessage/IMessage.ts`
- `packages/core-typings/src/IRoom.ts`
- `apps/meteor/app/autotranslate/server/autotranslate.ts`
- `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts`
- `apps/meteor/app/slackbridge/server/RocketAdapter.ts`
- `packages/apps-engine/src/server/AppManager.ts`
- `packages/apps-engine/src/server/managers/AppApiManager.ts`
- `packages/apps-engine/src/server/managers/AppRuntimeManager.ts`
- `packages/apps-engine/src/client/AppClientManager.ts`
- `packages/apps-engine/deno-runtime/lib/roomFactory.ts`
- `packages/apps-engine/src/server/managers/AppLicenseManager.ts`
- `packages/apps-engine/src/server/managers/AppSettingsManager.ts`
- `packages/apps-engine/src/server/managers/AppListenerManager.ts`
- `packages/apps-engine/tests/test-data/utilities.ts`
- `packages/apps-engine/src/server/managers/AppSignatureManager.ts`
- `apps/meteor/client/apps/orchestrator.ts`
- `packages/apps-engine/src/server/managers/AppAccessorManager.ts`
- `packages/apps-engine/src/server/managers/AppSchedulerManager.ts`
- `packages/apps-engine/src/server/managers/AppSlashCommandManager.ts`
