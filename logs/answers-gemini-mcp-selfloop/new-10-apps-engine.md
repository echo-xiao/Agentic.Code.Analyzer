# How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?

## Plan

intent: unknown

## Gemini Answer

The Rocket.Chat Apps Engine allows apps to hook into events like `afterSaveMessage` through a system of interfaces and event listeners.

Here's a breakdown of how it works:

1.  **Event Definition:** The Apps Engine defines various events using interfaces. For example, `IPostMessageSent` (defined in `packages/apps-engine/src/definition/messages/IPostMessageSent.ts`) is the interface for handling events *after* a message has been sent. This interface includes methods like `checkPostMessageSent` (to determine if the handler should execute) and `executePostMessageSent` (the actual logic to run after the message is sent).

2.  **App Implementation:** A Rocket.Chat App that wants to react to an event like `afterSaveMessage` would implement the corresponding interface (e.g., `IPostMessageSent`). The app would then provide its custom logic within the `executePostMessageSent` method.

3.  **Event Triggering:** Within the Rocket.Chat server, when an action occurs (like a message being saved), the Apps Engine triggers the relevant event. For instance, after a message is saved, an event corresponding to `IPostMessageSent` would be dispatched.

4.  **Apps Engine Service:** The `AppsEngineService` (and `AppServerListener`) listens for these events. When an event is triggered, the service identifies all installed apps that have implemented the corresponding interface.

5.  **Execution:** For each app that has registered a listener for the event, the Apps Engine executes the app's `check` method (if present) and then its `execute` method (e.g., `executePostMessageSent`), passing in relevant data like the message object, environment accessors (`IRead`, `IHttp`), and persistence (`IPersistence`).

In essence, the flow is:

**Rocket.Chat Action (e.g., message saved) → Apps Engine Event Trigger (`IPostMessageSent`) → Apps Engine Service identifies listening Apps → App's `executePostMessageSent` method is called.**

While `afterSaveMessage` is a server-side hook in Rocket.Chat, the Apps Engine provides the `IPostMessageSent` interface as the mechanism for apps to interact with this type of event. The `AppEvents` enum (aliased from `AppInterface` in `packages/apps-engine/src/definition/metadata/AppInterface.ts`) lists all the events an app can subscribe to, including "pre" and "post" hooks for various actions.

## Tool Calls (8 calls, 22,994 tokens)

**Step 1:** `wiki({"question":"How does the Rocket.Chat Apps Engine handle events and hooks?"})` → 1204 tokens
**Step 2:** `search({"query":"AppEvents"})` → 68 tokens
**Step 3:** `search({"query":"IPostMessageSent"})` → 106 tokens
**Step 4:** `search({"query":"afterSaveMessage"})` → 152 tokens
**Step 5:** `details({"symbolName":"IPostMessageSent","filename":"IPostMessageSent.ts"})` → 282 tokens
**Step 6:** `details({"filename":"events.ts","symbolName":"AppEvents"})` → 58 tokens
**Step 7:** `search({"query":"AppInterface"})` → 72 tokens
**Step 8:** `details({"symbolName":"AppInterface","filename":"AppInterface.ts"})` → 63 tokens

## Files Seen In Tool Results (9)

- `packages/apps-engine/deno-runtime/handlers/app/handler.ts`
- `apps/meteor/ee/server/apps/communication/events.ts`
- `packages/apps-engine/src/definition/messages/IPostMessageSent.ts`
- `packages/apps-engine/src/definition/messages/IPostMessageSentToBot.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
- `apps/meteor/app/search/server/events/index.ts`
- `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`
- `apps/meteor/app/threads/server/hooks/aftersavemessage.ts`
- `packages/apps-engine/src/definition/metadata/AppInterface.ts`
