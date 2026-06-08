# How do slash commands work in Rocket.Chat — from registration to execution?

## Gemini Answer

Slash commands in Rocket.Chat follow a client-server architecture, involving a dedicated client-side processing flow, a server-side registry for command definitions, and a DDP (Distributed Data Protocol) method call for execution.

Here's a breakdown of the process from registration to execution:

### 1. Registration

Slash commands are registered on the server using the `slashCommands.add()` method, which resides in `apps/meteor/app/utils/server/slashCommand.ts`.

*   **Mechanism**: The `slashCommands.add()` method takes an object containing the command's name, a callback function (which defines the command's actual logic), optional parameters, a description, permissions, and other properties like `clientOnly` or preview-related functions. This information is stored in an internal `commands` registry.
*   **Examples**: Built-in commands like `/invite`, `/kick`, and `/join` are registered in their respective server-side files, such as `apps/meteor/app/slashcommands-invite/server/server.ts` or `apps/meteor/app/slashcommands-leave/server/leave.ts`, by calling `slashCommands.add()` with their specific details.

### 2. Client-side Processing

When a user types a message in the chat input, the client-side code intercepts and processes it to identify if it's a slash command.

*   **Entry Point**: The `processSlashCommand` function, located in `apps/meteor/client/lib/chats/flows/processSlashCommand.ts`, is responsible for this initial parsing.
*   **Parsing**: It uses a regular expression to detect messages starting with `/` followed by a command name.
*   **Validation & Client-only commands**: `processSlashCommand` checks for command permissions and handles commands marked as `clientOnly` directly on the client if applicable.
*   **Server Communication**: For server-side commands, the client does not execute the command directly. Instead, it constructs a DDP method call to the server using `sdk.call('slashCommand', { cmd: commandName, params, msg: message, triggerId })`. This call passes the command name, its parameters, the original message object, and a `triggerId` to the server.

### 3. Server-side Execution

Upon receiving the DDP method call, the server takes over to execute the registered command.

*   **Execution Method**: The `slashCommands.run()` method in `apps/meteor/app/utils/server/slashCommand.ts` is invoked.
*   **Command Retrieval**: `slashCommands.run()` looks up the command name in its internal `commands` registry.
*   **Callback Execution**: If the command is found and has a valid `callback` function, `slashCommands.run()` executes this callback, passing the `command`, `params`, `message`, `triggerId`, and `userId` as arguments. This callback contains the core logic of the slash command, such as sending messages, modifying room settings, or interacting with other server services.

**Call Chain:**

1.  **Client Entry**: User types `/command` in the chat input.
2.  **Client-side Processing**: `apps/meteor/client/lib/chats/flows/processSlashCommand.ts` (`processSlashCommand`) parses the message.
3.  **DDP Method Call**: `processSlashCommand` calls `sdk.call('slashCommand', { cmd, params, msg, triggerId })`.
4.  **Server-side Execution**: The DDP method `slashCommand` on the server eventually triggers `apps/meteor/app/utils/server/slashCommand.ts` (`slashCommands.run`).
5.  **Command Logic**: `slashCommands.run` executes the registered callback function (e.g., from `apps/meteor/app/slashcommands-invite/server/server.ts`) for the specific command.

## Tool Calls (7 calls, 30,069 tokens)

**Step 1:** `search({"query":"register slash command"})` → 17 tokens
**Step 2:** `search({"query":"slash command"})` → 592 tokens
**Step 3:** `graph({"query":"slashCommands","layer":"server","direction":"down"})` → 786 tokens
**Step 4:** `search({"query":"processSlashCommand","layer":"client"})` → 182 tokens
**Step 5:** `implement({"symbolName":"processSlashCommand","filename":"apps/meteor/client/lib/chats/flows/processSlashComma)` → 489 tokens
**Step 6:** `implement({"filename":"apps/meteor/app/utils/server/slashCommand.ts","symbolName":"slashCommands"})` → 722 tokens
**Step 7:** `search({"query":"slashCommands.add","layer":"server"})` → 413 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 5/6 |
| Symbols hit | 2/2 |
| Tool calls | 7 |
| Total tokens | 30,069 |
| Pass | YES |
