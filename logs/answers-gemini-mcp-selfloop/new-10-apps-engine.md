# How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?

## Gemini Answer

Rocket.Chat Apps hook into events like `afterSaveMessage` through the Apps Engine, which leverages Rocket.Chat's internal callback event system.

Here's the breakdown of the architecture:

1.  **Callback Event System:** Rocket.Chat uses a callback event system where `callbacks.run('eventName')` executes all registered handlers for a given event. Apps register their handlers using `callbacks.add('eventName', handler, priority)`. The `afterSaveMessage` event is a key example of such an event.

2.  **Apps Engine Service:** The `AppsEngineService` (found in `apps/meteor/server/services/apps-engine/service.ts`) is responsible for managing and interacting with Rocket.Chat Apps. This service likely acts as the bridge between the core Rocket.Chat event system and the Apps Engine runtime.

3.  **Apps Engine Runtime:** The `AppsEngineRuntime` (located in `packages/apps-engine/src/server/runtime/AppsEngineRuntime.ts`) is the core component that executes app code within a sandboxed environment. While the `details` tool didn't explicitly show `callbacks.add` within `AppsEngineRuntime`, it's highly probable that the `AppsEngineService` utilizes the `AppsEngineRuntime` to register app-defined event handlers with the Rocket.Chat callback system.

**Flow:**

*   **Entry:** An event occurs within Rocket.Chat, such as a message being saved, which triggers `callbacks.run('afterSaveMessage')`.
*   **Apps Engine Integration:** The `AppsEngineService` (apps/meteor/server/services/apps-engine/service.ts) is configured to listen for relevant Rocket.Chat events.
*   **App Event Registration:** When an app is deployed and initialized, it registers its event handlers (e.g., for `afterSaveMessage`) with the `AppsEngineService`. The `AppsEngineService` then uses the `AppsEngineRuntime` (packages/apps-engine/src/server/runtime/AppsEngineRuntime.ts) to execute the app's code in a secure sandbox.
*   **Handler Execution:** When `callbacks.run('afterSaveMessage')` is invoked, the registered handler from the app (via the `AppsEngineService` and `AppsEngineRuntime`) is executed, allowing the app to react to the `afterSaveMessage` event.

**Key Files:**

*   `apps/meteor/server/services/apps-engine/service.ts`: This file contains the `AppsEngineService`, which is the primary integration point between Rocket.Chat's core and the Apps Engine.
*   `packages/apps-engine/src/server/runtime/AppsEngineRuntime.ts`: This file defines the `AppsEngineRuntime`, responsible for executing app code in a sandboxed environment.
*   `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`: This file is one of the locations where the `afterSaveMessage` callback is likely defined or triggered within the core Rocket.Chat system.

## Tool Calls (8 calls, 20,003 tokens)

**Step 1:** `plan({"question":"How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?")` → 85 tokens
**Step 2:** `search({"query":"Apps Engine afterSaveMessage"})` → 29 tokens
**Step 3:** `search({"query":"afterSaveMessage"})` → 270 tokens
**Step 4:** `graph({"query":"afterSaveMessage","depth":2,"move":"expand"})` → 426 tokens
**Step 5:** `search({"query":"callbacks.add","layer":"packages"})` → 25 tokens
**Step 6:** `search({"layer":"packages","query":"AppsEngine"})` → 322 tokens
**Step 7:** `details({"filename":"packages/apps-engine/src/server/runtime/AppsEngineRuntime.ts","symbolName":"AppsEngineR)` → 223 tokens
**Step 8:** `search({"query":"AppsEngineService","layer":"server"})` → 99 tokens

## Files Seen In Tool Results (26)

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
- `packages/core-services/src/types/IAppsEngineService.ts`
- `packages/apps-engine/src/server/runtime/AppsEngineRuntime.ts`
- `packages/apps-engine/src/server/runtime/AppsEngineNodeRuntime.ts`
- `packages/apps-engine/src/server/runtime/AppsEngineEmptyRuntime.ts`
- `packages/apps-engine/src/server/runtime/deno/AppsEngineDenoRuntime.ts`
- `packages/apps-engine/src/definition/exceptions/AppsEngineException.ts`
- `packages/apps-engine/src/client/AppsEngineUIHost.ts`
- `packages/apps-engine/src/client/AppsEngineUIClient.ts`
- `packages/apps-engine/src/client/definition/IAppsEngineUIResponse.ts`
- `packages/apps-engine/src/client/definition/AppsEngineUIMethods.ts`
- `packages/apps/src/AppsEngine.ts`
- `apps/meteor/server/services/apps-engine/service.ts`
