# How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?

## Plan

intent: architecture

## Gemini Answer

Rocket.Chat Apps hook into events like `afterSaveMessage` through the Apps Engine by registering lifecycle methods within their `App` class. The core mechanism involves the `callbacks` system in Rocket.Chat's server-side code.

Here's the breakdown of the flow:

1.  **Core Message Saving:** When a message is saved in Rocket.Chat, the `afterSaveMessage` function in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts` is invoked.
2.  **Callback System:** Inside `afterSaveMessage`, the `callbacks.run('afterSaveMessage', message, { room, user, roomUpdater: updater })` line is crucial. This is where the Rocket.Chat callback system dispatches the `afterSaveMessage` event to any registered listeners.
3.  **Apps Engine Integration:** The Apps Engine, specifically the `App` class defined in `packages/apps-engine/src/definition/App.ts`, provides a set of lifecycle methods that an app can implement. While `IPreMessageAfterSave` was not found directly, the `App` class has methods like `initialize`, `onEnable`, `onSettingUpdated`, etc., which are part of the app's lifecycle. It's within these lifecycle methods, or through other mechanisms provided by the Apps Engine (like `IConfigurationExtend` for extending configurations), that an app would register its interest in specific events.

**Key Files:**

*   **`apps/meteor/app/lib/server/lib/afterSaveMessage.ts`**: This file contains the server-side logic for handling messages after they are saved, and it's the entry point for the `afterSaveMessage` callback.
*   **`packages/apps-engine/src/definition/App.ts`**: This file defines the abstract `App` class, which is the foundation for all Rocket.Chat Apps. Apps extend this class and implement its lifecycle methods to interact with the Apps Engine and the Rocket.Chat platform.

**Flow:**

Entry (`afterSaveMessage` in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`) → Callback System (`callbacks.run`) → Apps Engine (via registered app lifecycle methods or extensions within the `App` class in `packages/apps-engine/src/definition/App.ts`).

While the exact `IPreMessageAfterSave` interface wasn't found, the `App` class and the `callbacks.run` mechanism are the fundamental components that allow apps to hook into events. Apps would typically register their event handlers during their initialization or enablement phases, leveraging the `IConfigurationExtend` accessor to declare their intent to listen for specific events.

## Tool Calls (9 calls, 33,515 tokens)

**Step 1:** `plan({"question":"How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?","intent":"architect)` → 3828 tokens
**Step 2:** `search({"layer":"server","query":"afterSaveMessage"})` → 152 tokens
**Step 3:** `search({"query":"IPreMessageAfterSave","layer":"packages"})` → 27 tokens
**Step 4:** `search({"query":"App","file":"App.ts"})` → 482 tokens
**Step 5:** `details({"symbolName":"afterSaveMessage","filename":"afterSaveMessage.ts"})` → 184 tokens
**Step 6:** `details({"symbolName":"App","filename":"App.ts"})` → 700 tokens
**Step 7:** `search({"layer":"server","query":"callbacks.add.*Apps"})` → 27 tokens
**Step 8:** `search({"query":"IMessageEvent","layer":"packages"})` → 25 tokens
**Step 9:** `search({"query":"IHook","layer":"packages"})` → 23 tokens

## Files Seen In Tool Results (51)

- `apps/meteor/app/message-pin/server/pinMessage.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterReadMessages.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterDeleteRoom.ts`
- `apps/meteor/ee/server/api/chat.ts`
- `apps/meteor/app/search/server/events/index.ts`
- `apps/meteor/client/views/room/providers/DateListProvider.tsx`
- `apps/meteor/client/views/room/MessageList/lib/isMessageNewDay.ts`
- `packages/apps-engine/src/server/accessors/Http.ts`
- `apps/meteor/server/services/messages/service.ts`
- `packages/apps-engine/src/definition/App.ts`
- `packages/apps-engine/src/server/runtime/deno/AppsEngineDenoRuntime.ts`
- `apps/meteor/server/services/apps-engine/service.ts`
- `packages/apps-engine/src/server/accessors/EmailCreator.ts`
- `apps/meteor/app/apps/server/bridges/messages.ts`
- `packages/apps-engine/deno-runtime/handlers/app/construct.ts`
- `packages/apps-engine/deno-runtime/handlers/app/handleInitialize.ts`
- `apps/meteor/app/apps/server/converters/messages.js`
- `packages/apps-engine/deno-runtime/lib/accessors/notifier.ts`
- `packages/apps-engine/src/server/managers/UIActionButtonManager.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/modify/ModifyCreator.ts`
- `packages/apps-engine/src/definition/messages/IMessage.ts`
- `packages/apps-engine/src/server/managers/AppApiManager.ts`
- `packages/models/src/models/Messages.ts`
- `apps/meteor/app/ui/client/lib/CurrentEditingMessage.ts`
- `apps/meteor/app/ui-message/client/ActionManager.ts`
- `packages/apps-engine/deno-runtime/handlers/app/handleOnSettingUpdated.ts`
- `packages/apps-engine/src/server/AppManager.ts`
- `apps/meteor/app/ui-utils/client/lib/messageBox.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/mod.ts`
- `packages/apps-engine/src/server/accessors/ExperimentalRead.ts`
- `packages/apps-engine/src/client/AppsEngineUIHost.ts`
- `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`
- `apps/meteor/app/threads/server/hooks/aftersavemessage.ts`
- `packages/livechat/src/components/App/App.tsx`
- `packages/core-typings/src/Apps.ts`
- `packages/ui-client/src/components/MultiSelectCustom/MultiSelectCustomListWrapper.tsx`
- `packages/ui-client/src/components/EmojiPicker/EmojiPickerCategoryWrapper.tsx`
- `packages/ui-avatar/src/components/AppAvatar.tsx`
- `packages/rest-typings/src/apps/index.ts`
- `packages/rest-typings/src/apps/appLogsProps.ts`
- `packages/rest-typings/src/apps/appLogsExportProps.ts`
- `packages/omni-core/src/hooks/applyDepartmentRestrictions.ts`
- `packages/models/src/models/OAuthApps.ts`
- `packages/models/src/models/AppsPersistence.ts`
- `packages/models/src/models/Apps.ts`
- `packages/models/src/models/AppLogsModel.ts`
- `packages/model-typings/src/models/IOAuthAppsModel.ts`
- `packages/model-typings/src/models/IAppsPersistenceModel.ts`
- `packages/model-typings/src/models/IAppsModel.ts`
- `packages/model-typings/src/models/IAppLogsModel.ts`
