# How do slash commands work in Rocket.Chat — from registration to execution?

## Plan

intent: call-chain

## Gemini Answer

Rocket.Chat's slash command system allows users to execute actions by typing commands like `/archive` or `/join`. These commands can be processed on either the client or server side, and some offer interactive previews.

**1. Registration:**

*   Slash commands are registered using the `slashCommands.add()` method. This method takes an object defining the command, its callback function, options, and whether it provides a preview.
*   The `slashCommands` object is a singleton that stores all registered commands.
*   **File:** `apps/meteor/app/utils/server/slashCommand.ts`

**2. Execution Flow:**

*   **Client-side processing:** When a user types a slash command, the `processSlashCommand` function in `apps/meteor/client/lib/chats/flows/processSlashCommand.ts` parses the message.
*   **Client-only commands:** If the command is marked as `clientOnly`, `processSlashCommand` directly executes the command's callback on the client. An example is the `/open` command, registered in `apps/meteor/app/slashcommands-open/client/client.ts`.
*   **Server-side commands:** If the command is not `clientOnly`, `processSlashCommand` makes an `sdk.call('slashCommand', ...)` to the server.
*   **Server-side execution:** On the server, the `Meteor.methods` for `slashCommand` in `apps/meteor/app/utils/server/slashCommand.ts` handles the execution. It retrieves the registered command and calls its `callback` function. This callback then performs the specific action, such as archiving a room for the `/archive` command (registered in `apps/meteor/app/slashcommands-archiveroom/server/server.ts`).

**Key Files:**

*   `apps/meteor/app/utils/server/slashCommand.ts`: Defines the `slashCommands` object, which handles adding, running, getting previews, and executing previews of slash commands. It also contains the `Meteor.methods` for `slashCommand` that the client calls for server-side execution.
*   `apps/meteor/client/lib/chats/flows/processSlashCommand.ts`: This client-side file is responsible for parsing user input, determining if a command is client-only or server-side, and initiating the appropriate execution path.

**Call Chain for Server-Side Command Execution:**

1.  **Entry:** User types a slash command in the chat.
2.  `processSlashCommand` (`apps/meteor/client/lib/chats/flows/processSlashCommand.ts`) parses the command.
3.  `sdk.call('slashCommand', ...)` (client-side) is made to the server.
4.  `slashCommand` (within `Meteor.methods` in `apps/meteor/app/utils/server/slashCommand.ts`) receives the call.
5.  `slashCommands.run()` (`apps/meteor/app/utils/server/slashCommand.ts`) is invoked.
6.  The `callback` function associated with the specific command is executed, performing the intended action.

## Tool Calls (8 calls, 48,076 tokens)

**Step 1:** `wiki({"question":"How do slash commands work in Rocket.Chat?"})` → 960 tokens
**Step 2:** `plan({"question":"How do slash commands work in Rocket.Chat — from registration to execution?","intent":"call-chain"})` → 81 tokens
**Step 3:** `search({"query":"slashCommands.add"})` → 297 tokens
**Step 4:** `graph({"move":"up","query":"slashCommands.add","depth":2})` → 14 tokens
**Step 5:** `search({"query":"slashCommands","layer":"server"})` → 436 tokens
**Step 6:** `details({"symbolName":"slashCommands","filename":"slashCommand.ts"})` → 718 tokens
**Step 7:** `search({"query":"processSlashCommand","layer":"client"})` → 75 tokens
**Step 8:** `graph({"file":"processSlashCommand.ts","move":"down","depth":5,"query":"processSlashCommand"})` → 5601 tokens

## Files Seen In Tool Results (27)

- `apps/meteor/app/slashcommands-archiveroom/server/server.ts`
- `apps/meteor/client/lib/chats/flows/processSlashCommand.ts`
- `apps/meteor/app/utils/server/slashCommand.ts`
- `apps/meteor/app/slashcommands-open/client/client.ts`
- `apps/meteor/client/hooks/useAppSlashCommands.ts`
- `apps/meteor/app/slashcommands-inviteall/server/server.ts`
- `apps/meteor/app/slashcommands-inviteall/client/client.ts`
- `apps/meteor/app/slashcommands-leave/server/leave.ts`
- `apps/meteor/app/slashcommands-ban/client/client.ts`
- `apps/meteor/app/slashcommands-mute/server/unmute.ts`
- `apps/meteor/app/slashcommands-mute/server/mute.ts`
- `apps/meteor/app/slashcommands-create/server/server.ts`
- `apps/meteor/app/slashcommands-create/client/client.ts`
- `apps/meteor/app/slashcommands-kick/server/server.ts`
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
- `apps/meteor/app/slashcommands-me/server/me.ts`
