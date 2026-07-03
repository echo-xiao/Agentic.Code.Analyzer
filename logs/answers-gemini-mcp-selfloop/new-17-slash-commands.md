# How do slash commands work in Rocket.Chat — from registration to execution?

## Plan

intent: call-chain

## Gemini Answer

Slash commands in Rocket.Chat involve both client-side processing and server-side execution.

**Registration:**

1.  **Server-side Registration:** Slash commands are registered on the server using the `slashCommands.add()` method, located in `apps/meteor/app/utils/server/slashCommand.ts`. This method takes parameters such as the command name, a callback function for execution, and optional settings like description, permissions, and whether it provides a preview.

**Execution Flow:**

1.  **Client-side Processing:** When a user types a message, the client-side `processSlashCommand()` function in `apps/meteor/client/lib/chats/flows/processSlashCommand.ts` is responsible for identifying if the message is a slash command. It parses the message using a regular expression (`/^\\/([^\\s]+)(.*)/`) to extract the command and its parameters.
2.  **DDP Call to Server:** The client does not execute the command directly. Instead, it makes a DDP (Distributed Data Protocol) call to the server using `sdk.call('slashCommand', { cmd, params, msg, triggerId })`. This call is handled by the `call` method in `MinimalDDPClient.ts`.
3.  **Server-side Execution:** On the server, the `slashCommands.run()` method in `apps/meteor/app/utils/server/slashCommand.ts` is responsible for executing the command. It retrieves the registered command based on the `command` parameter received from the client.
4.  **Callback Execution:** If a valid command and its callback function are found, `slashCommands.run()` then invokes the associated `callback` function, passing the command, parameters, message details, and user ID. This callback function contains the actual logic for the slash command.

**Key Files:**

*   **`apps/meteor/app/utils/server/slashCommand.ts`**: This file defines the `slashCommands` object, which is central to both registering (`add`) and running (`run`) slash commands on the server. It also handles preview functionality (`getPreviews`, `executePreview`).
*   **`apps/meteor/client/lib/chats/flows/processSlashCommand.ts`**: This client-side file is responsible for detecting slash commands in user messages and initiating the DDP call to the server for execution.

## Tool Calls (8 calls, 36,662 tokens)

**Step 1:** `plan({"question":"How do slash commands work in Rocket.Chat — from registration to execution?","intent":"call-chain"})` → 202 tokens
**Step 2:** `search({"query":"slashCommands","layer":"server"})` → 436 tokens
**Step 3:** `graph({"move":"down","file":"slashCommand.ts","depth":3,"query":"slashCommands"})` → 422 tokens
**Step 4:** `details({"filename":"slashCommand.ts","symbolName":"slashCommands"})` → 718 tokens
**Step 5:** `search({"layer":"client","query":"processSlashCommand"})` → 75 tokens
**Step 6:** `graph({"move":"down","file":"processSlashCommand.ts","query":"processSlashCommand","depth":3})` → 873 tokens
**Step 7:** `search({"layer":"server","query":"slashCommand"})` → 443 tokens
**Step 8:** `search({"layer":"server","query":"Meteor.methods({ slashCommand:"})` → 30 tokens

## Files Seen In Tool Results (19)

- `apps/meteor/app/utils/server/slashCommand.ts`
- `packages/apps-engine/src/server/accessors/SlashCommandsModify.ts`
- `packages/apps-engine/src/server/accessors/SlashCommandsExtend.ts`
- `apps/meteor/app/statistics/server/functions/slashCommandsStats.ts`
- `apps/meteor/app/slashcommands-unarchiveroom/server/server.ts`
- `apps/meteor/app/slashcommands-unarchiveroom/server/index.ts`
- `apps/meteor/app/slashcommands-topic/server/topic.ts`
- `apps/meteor/app/slashcommands-topic/server/index.ts`
- `apps/meteor/app/slashcommands-status/server/status.ts`
- `apps/meteor/app/slashcommands-status/server/index.ts`
- `apps/meteor/app/slashcommands-mute/server/unmute.ts`
- `apps/meteor/app/slashcommands-mute/server/mute.ts`
- `apps/meteor/app/slashcommands-mute/server/index.ts`
- `apps/meteor/app/slashcommands-msg/server/server.ts`
- `apps/meteor/app/slashcommands-msg/server/index.ts`
- `apps/meteor/app/slashcommands-me/server/me.ts`
- `apps/meteor/client/lib/chats/flows/processSlashCommand.ts`
- `packages/apps-engine/src/server/managers/AppSlashCommandManager.ts`
- `packages/apps-engine/src/server/managers/AppSlashCommand.ts`
