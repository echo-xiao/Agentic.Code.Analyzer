# How do slash commands work in Rocket.Chat — from registration to execution?

## Gemini Answer

Slash commands in Rocket.Chat follow a client-server architecture, with registration and execution handled on the server.

**Call Chain:**

1.  **Client-side Parsing and Invocation:** When a user types a message in the client, `sendMessage` (part of the client-side flow) uses a regular expression (`/^\\/([^\\s]+)(.*)/`) to detect slash commands. The client does not execute the command directly but instead invokes a server method via `sdk.call('slashCommand', { cmd, params, msg, triggerId })`.
2.  **Server-side Method Call:** The `slashCommand` server method (defined in `apps/meteor/app/utils/server/slashCommand.ts`) is the entry point for handling slash commands on the server.
3.  **Command Registration:** Slash commands are registered on the server using the `slashCommands.add()` method, located in `apps/meteor/app/utils/server/slashCommand.ts`. This method stores command details such as the command name, a callback function for execution, parameters, description, permissions, and app ID (if applicable). Built-in commands like "invite", "kick", and "join" use this method to register themselves.
4.  **Command Execution:** When the `slashCommand` server method is called, it ultimately delegates to the `slashCommands.run()` method (also in `apps/meteor/app/utils/server/slashCommand.ts`). This method retrieves the registered command's callback function and executes it with the provided parameters, message details, user ID, and trigger ID.

**Key Files:**

*   **`apps/meteor/app/utils/server/slashCommand.ts`**: This file contains the `slashCommands` object, which manages the registration (`add` method) and execution (`run` method) of slash commands. It also defines the `slashCommand` Meteor method that the client calls.
*   **`packages/apps-engine/src/server/managers/AppSlashCommandManager.ts`**: This manager is involved in the registration of slash commands, likely for commands introduced by Rocket.Chat Apps.
*   **`packages/apps-engine/src/server/bridges/CommandBridge.ts`**: This file is mentioned in search results as related to how Apps can change system slash command behavior.

In summary, the client detects a slash command and sends it to the server. The server, through the `slashCommand` Meteor method and the `slashCommands` registry, executes the appropriate callback function associated with the command.

## Tool Calls (8 calls, 43,133 tokens)

**Step 1:** `search({"query":"registerCommand","layer":"server"})` → 116 tokens
**Step 2:** `graph({"file":"packages/apps-engine/src/server/managers/AppSlashCommandManager.ts","query":"AppSlashComman)` → 19 tokens
**Step 3:** `graph({"direction":"down","file":"packages/apps-engine/src/server/managers/AppSlashCommandManager.ts","que)` → 849 tokens
**Step 4:** `search({"layer":"server","query":"slash command"})` → 291 tokens
**Step 5:** `graph({"file":"apps/meteor/app/utils/server/slashCommand.ts","query":"slashCommand","direction":"down"})` → 719 tokens
**Step 6:** `implement({"symbolName":"slashCommands","filename":"apps/meteor/app/utils/server/slashCommand.ts"})` → 722 tokens
**Step 7:** `implement({"filename":"apps/meteor/app/utils/server/slashCommand.ts","symbolName":"slashCommand"})` → 55 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/utils/server/slashCommand.ts","symbolName":"file"})` → 55 tokens
