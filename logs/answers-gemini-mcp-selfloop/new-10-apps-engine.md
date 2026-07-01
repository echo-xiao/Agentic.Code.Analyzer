# How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?

## Gemini Answer

Rocket.Chat Apps hook into events like `afterSaveMessage` through the Apps Engine's event system. The core mechanism relies on a callback pattern where events are registered and then executed.

Here's the call chain:

`afterSaveMessage` (event) → `afterSaveMessage` (event listener)

1.  **`apps/meteor/app/lib/server/lib/afterSaveMessage.ts`**: This file likely contains the core logic for the `afterSaveMessage` event, where the event is initially triggered.
2.  **`apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`**: This is an example of a specific module (in this case, the Enterprise Edition's message read receipt feature) that registers a handler for the `afterSaveMessage` event.
3.  **`apps/meteor/app/search/server/events/index.ts`**: Another example of a module registering a handler for the `afterSaveMessage` event, likely related to search indexing.

The Apps Engine itself, specifically the `AppManager` in `packages/apps-engine/src/server/AppManager.ts`, is responsible for managing the lifecycle of installed apps, including their event listeners. The `AppManager` has an `AppListenerManager` which is responsible for handling the registration and execution of app-defined event listeners. When an app is installed and enabled, its event listeners are registered with the `AppListenerManager`, which then hooks them into the Rocket.Chat server's callback system.

Therefore, when `callbacks.run('afterSaveMessage')` is executed in the Rocket.Chat server, all registered handlers, including those from the Apps Engine, are sequentially executed.

## Tool Calls (8 calls, 29,729 tokens)

**Step 1:** `search({"query":"afterSaveMessage","layer":"packages"})` → 410 tokens
**Step 2:** `graph({"edgeTypes":["event_listen"],"direction":"down","query":"afterSaveMessage"})` → 175 tokens
**Step 3:** `search({"query":"Apps Engine afterSaveMessage","layer":"packages"})` → 18 tokens
**Step 4:** `search({"layer":"packages","query":"Apps Engine event handler"})` → 17 tokens
**Step 5:** `search({"layer":"packages","query":"Apps Engine bridge"})` → 372 tokens
**Step 6:** `graph({"query":"AppManager.add","direction":"down","file":"packages/apps-engine/src/server/AppManager.ts"})` → 13 tokens
**Step 7:** `graph({"direction":"down","file":"packages/apps-engine/src/server/AppManager.ts","query":"AppManager.add"})` → 13 tokens
**Step 8:** `implement({"filename":"packages/apps-engine/src/server/AppManager.ts","symbolName":"AppManager"})` → 1718 tokens

## Files Seen In Tool Results (21)

- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
- `apps/meteor/app/search/server/events/index.ts`
- `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`
- `apps/meteor/app/threads/server/hooks/aftersavemessage.ts`
- `apps/meteor/app/livechat/server/hooks/afterSaveOmnichannelMessage.ts`
- `packages/models/src/models/BaseRaw.ts`
- `packages/models/src/updater.ts`
- `packages/core-typings/src/IMessage/IMessage.ts`
- `packages/core-typings/src/IRoom.ts`
- `packages/model-typings/src/updater.ts`
- `packages/apps-engine/src/server/bridges/LivechatBridge.ts`
- `apps/meteor/client/views/marketplace/sidebarItems.tsx`
- `packages/apps-engine/src/server/managers/AppPermissionManager.ts`
- `packages/apps-engine/src/server/errors/PermissionDeniedError.ts`
- `packages/apps-engine/src/definition/permissions/IPermission.ts`
- `packages/apps-engine/src/server/bridges/RoomBridge.ts`
- `packages/apps-engine/src/server/bridges/CloudWorkspaceBridge.ts`
- `packages/apps-engine/src/server/bridges/UiInteractionBridge.ts`
- `packages/apps-engine/src/server/AppManager.ts`
- `apps/meteor/client/views/marketplace/components/MarketplaceRequestBadge.tsx`
- `packages/apps-engine/src/server/bridges/VideoConferenceBridge.ts`
