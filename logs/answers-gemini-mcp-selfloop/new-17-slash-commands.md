# How do slash commands work in Rocket.Chat — from registration to execution?

## Plan

intent: call-chain

## Gemini Answer

Slash commands in Rocket.Chat involve both registration and execution phases.

**Registration:**

1.  **`AppSlashCommandManager.addCommand`** (packages/apps-engine/src/server/managers/AppSlashCommandManager.ts): This method is responsible for adding a new slash command. It takes the `appId` and an `ISlashCommand` object as arguments.
2.  **`AppSlashCommandManager.registerCommand`** (packages/apps-engine/src/server/managers/AppSlashCommandManager.ts): This private method is called by `addCommand`. It interacts with the `CommandBridge` to register the command with the underlying system.
3.  **`CommandBridge.doRegisterCommand`** (packages/apps-engine/src/server/bridges/CommandBridge.ts): This method, part of the `CommandBridge`, is responsible for the actual registration of the slash command. It receives the `ISlashCommand` object and the `appId`.

**Execution:**

The execution of a slash command starts on the client-side and is then processed on the server.

1.  **`processSlashCommand`** (apps/meteor/client/lib/chats/flows/processSlashCommand.ts): This is the client-side entry point for handling slash commands. When a user types a slash command in the chat, this function is responsible for parsing, validating, and initiating the execution process. It likely sends the command to the server for further processing.
2.  **`AppSlashCommandManager.executeCommand`** (packages/apps-engine/src/server/managers/AppSlashCommandManager.ts): On the server, this method is responsible for executing the slash command. It receives the command string and a `SlashCommandContext` object, which contains information about the sender, room, and arguments. This method then delegates the execution to the appropriate app's command executor.

## Tool Calls (8 calls, 49,757 tokens)

**Step 1:** `plan({"question":"How do slash commands work in Rocket.Chat — from registration to execution?","intent":"call-chain"})` → 3161 tokens
**Step 2:** `search({"query":"registerCommand"})` → 151 tokens
**Step 3:** `graph({"file":"AppSlashCommandManager.ts","query":"registerCommand","depth":3,"move":"down"})` → 518 tokens
**Step 4:** `details({"filename":"CommandBridge.ts","symbolName":"doRegisterCommand"})` → 62 tokens
**Step 5:** `details({"filename":"CommandBridge.ts","symbolName":"doRegisterCommand"})` → 62 tokens
**Step 6:** `details({"filename":"AppSlashCommandManager.ts","symbolName":"AppSlashCommandManager"})` → 640 tokens
**Step 7:** `details({"filename":"AppSlashCommandManager.ts","symbolName":"AppSlashCommandManager.registerCommand"})` → 153 tokens
**Step 8:** `search({"query":"processSlashCommand"})` → 75 tokens

## Files Seen In Tool Results (32)

- `apps/meteor/app/integrations/server/lib/ScriptEngine.ts`
- `packages/models/src/models/Integrations.ts`
- `packages/ui-client/src/views/setupWizard/steps/RegisterServerStep.tsx`
- `packages/models/src/models/IntegrationHistory.ts`
- `apps/meteor/app/integrations/lib/outgoingEvents.ts`
- `apps/meteor/app/integrations/server/lib/validateOutgoingIntegration.ts`
- `apps/meteor/app/apps/server/bridges/commands.ts`
- `packages/apps-engine/src/server/managers/AppSlashCommand.ts`
- `packages/apps-engine/src/server/managers/AppSlashCommandManager.ts`
- `packages/apps-engine/src/definition/slashcommands/SlashCommandContext.ts`
- `packages/apps-engine/src/server/accessors/SlashCommandsExtend.ts`
- `packages/apps-engine/src/server/managers/UIActionButtonManager.ts`
- `packages/apps-engine/src/server/accessors/SlashCommandsModify.ts`
- `apps/meteor/app/api/server/ApiClass.ts`
- `packages/apps-engine/src/server/managers/AppApiManager.ts`
- `packages/apps-engine/src/server/runtime/AppsEngineRuntime.ts`
- `packages/apps-engine/src/server/managers/AppOutboundCommunicationProviderManager.ts`
- `apps/meteor/client/lib/errors/InvalidCommandUsage.ts`
- `packages/apps-engine/src/definition/App.ts`
- `apps/meteor/client/lib/errors/RocketChatError.ts`
- `packages/apps-engine/src/server/managers/AppExternalComponentManager.ts`
- `packages/apps-engine/src/server/errors/CommandAlreadyExistsError.ts`
- `packages/apps-engine/src/server/managers/AppOutboundCommunicationProvider.ts`
- `apps/meteor/ee/server/apps/communication/rest.ts`
- `packages/livechat/src/lib/triggers.js`
- `packages/apps-engine/src/server/accessors/UIExtend.ts`
- `packages/apps-engine/src/server/errors/CommandHasAlreadyBeenTouchedError.ts`
- `packages/apps-engine/src/server/bridges/CommandBridge.ts`
- `apps/meteor/app/apps/server/bridges/api.ts`
- `apps/meteor/client/lib/chats/flows/processSlashCommand.ts`
- `apps/meteor/client/serviceWorker.ts`
- `packages/apps-engine/tests/test-data/bridges/commandBridge.ts`
