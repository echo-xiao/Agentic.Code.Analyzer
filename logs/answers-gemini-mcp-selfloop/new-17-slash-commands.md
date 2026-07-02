# How do slash commands work in Rocket.Chat — from registration to execution?

## Gemini Answer

Rocket.Chat slash commands work through a client-server interaction, involving both registration and execution phases.

**1. Registration:**

*   **Server-side registration:** Built-in slash commands (like `/invite`, `/kick`, `/join`, etc.) are registered on the server using `slashCommands.add()`. This function is found in `apps/meteor/app/utils/server/slashCommand.ts`. Many individual command files, such as `apps/meteor/app/slashcommands-inviteall/server/server.ts` and `apps/meteor/app/slashcommands-leave/server/leave.ts`, demonstrate this registration pattern.
*   **App-Engine registration:** For custom slash commands provided by Rocket.Chat Apps, the `ISlashCommandsExtend` accessor (defined in `packages/apps-engine/src/definition/accessors/ISlashCommandsExtend.ts`) provides methods for adding these commands.

**2. Execution Flow:**

*   **Client-side detection:** When a user types a message, the client-side function `processSlashCommand()` (located in `apps/meteor/client/lib/chats/flows/processSlashCommand.ts`) is responsible for parsing the message. It uses a regular expression (`/^\\/([^\\s]+)(.*)/`) to detect if the message starts with a slash command.
*   **Server-side invocation:** The client does not execute the command directly. Instead, `processSlashCommand()` makes a DDP (Distributed Data Protocol) call to the server using `sdk.call('slashCommand', { cmd, params, msg, triggerId })`. This effectively sends the command and its parameters to the server for processing.
*   **Server-side execution:** On the server, the `slashCommands` registry (from `apps/meteor/app/utils/server/slashCommand.ts`) has a `run()` method that is responsible for executing the registered slash command based on the `cmd` received from the client.

**Key Files:**

*   **`apps/meteor/client/lib/chats/flows/processSlashCommand.ts`**: This client-side file is responsible for detecting slash commands in user messages and initiating the server-side call.
*   **`apps/meteor/app/utils/server/slashCommand.ts`**: This server-side file contains the core `slashCommands` object, which handles both the registration (`add()`) and execution (`run()`) of slash commands.
*   **`packages/apps-engine/src/definition/accessors/ISlashCommandsExtend.ts`**: This file defines the interface for extending slash commands, primarily used by Rocket.Chat Apps.

## Tool Calls (8 calls, 25,328 tokens)

**Step 1:** `plan({"intent":"call-chain","question":"How do slash commands work in Rocket.Chat — from registration to )` → 81 tokens
**Step 2:** `search({"query":"slash command registration"})` → 29 tokens
**Step 3:** `search({"query":"slash command"})` → 442 tokens
**Step 4:** `graph({"depth":3,"query":"ISlashCommandsExtend","move":"down"})` → 162 tokens
**Step 5:** `search({"query":"processSlashCommand","layer":"client"})` → 189 tokens
**Step 6:** `graph({"move":"down","depth":3,"file":"apps/meteor/client/lib/chats/flows/processSlashCommand.ts","query":)` → 987 tokens
**Step 7:** `search({"layer":"server","query":"slashCommands.add"})` → 421 tokens
**Step 8:** `search({"query":"slashCommands","layer":"server"})` → 550 tokens

## Files Seen In Tool Results (34)

- `packages/apps-engine/src/definition/accessors/ISlashCommandsModify.ts`
- `apps/meteor/tests/data/rooms.helper.ts`
- `packages/apps-engine/src/server/bridges/CommandBridge.ts`
- `packages/apps-engine/src/definition/accessors/ISlashCommandsExtend.ts`
- `packages/apps-engine/src/definition/slashcommands/SlashCommandContext.ts`
- `apps/meteor/tests/end-to-end/apps/installation.ts`
- `packages/apps-engine/src/server/managers/AppSlashCommandManager.ts`
- `packages/apps-engine/src/definition/App.ts`
- `packages/apps-engine/src/definition/accessors/IConfigurationModify.ts`
- `packages/apps-engine/src/definition/slashcommands/ISlashCommand.ts`
- `apps/meteor/client/lib/chats/flows/processSlashCommand.ts`
- `apps/meteor/app/slashcommands-inviteall/server/server.ts`
- `apps/meteor/app/slashcommands-leave/server/leave.ts`
- `apps/meteor/app/slashcommands-mute/server/unmute.ts`
- `apps/meteor/app/slashcommands-mute/server/mute.ts`
- `apps/meteor/app/slashcommands-create/server/server.ts`
- `apps/meteor/app/slashcommands-kick/server/server.ts`
- `apps/meteor/app/slashcommands-invite/server/server.ts`
- `apps/meteor/app/slashcommands-me/server/me.ts`
- `apps/meteor/app/slackbridge/server/slackbridge_import.server.ts`
- `apps/meteor/app/slashcommands-ban/server/ban.ts`
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
- `apps/meteor/app/slashcommands-mute/server/index.ts`
- `apps/meteor/app/slashcommands-msg/server/server.ts`
- `apps/meteor/app/slashcommands-msg/server/index.ts`
