# How do slash commands work in Rocket.Chat — from registration to execution?

## Gemini Answer

Rocket.Chat's slash command functionality involves both client-side parsing and server-side registration and execution.

**Call Chain:**

1.  **Client-side Parsing and Initiation:**
    *   `apps/meteor/client/lib/chats/flows/processSlashCommand.ts` → `processSlashCommand`: This function is responsible for detecting slash commands in a user's message.
        *   It uses a `parse` function (likely in the same file or a utility) to extract the command and its parameters from the message using a regular expression (`/^\\/([^\\s]+)(.*)/`).
        *   If the command is client-only, it's handled immediately by a client-side callback.
        *   For server-side commands, it sends a telemetry event and generates a `triggerId`.
        *   It then makes an SDK call to the server: `sdk.call('slashCommand', { cmd: commandName, params, msg: message, triggerId })`. This call crosses the DDP (Distributed Data Protocol) to the server.

2.  **Server-side Registration and Execution:**
    *   `apps/meteor/app/utils/server/slashCommand.ts` → `slashCommands`: This object acts as the central registry and executor for slash commands on the server.
        *   `slashCommands.add()`: This method is used to register new slash commands. Many built-in commands (e.g., `/invite`, `/kick`, `/join`) register themselves using this method. It takes the command name, a callback function, and various options like permissions, description, and previewer functions.
        *   `slashCommands.run()`: This asynchronous method is invoked when the `slashCommand` DDP method is called from the client. It looks up the registered command by its name and executes its associated callback function, passing the command, parameters, message, trigger ID, and user ID.
        *   `slashCommands.getPreviews()` and `slashCommands.executePreview()`: These methods handle the preview functionality for slash commands, allowing apps to provide a dynamic preview of the command's effect before execution.

**In summary:**

*   The client (`apps/meteor/client/lib/chats/flows/processSlashCommand.ts`) identifies a slash command in a message, performs some initial checks, and then relays it to the server via `sdk.call('slashCommand')`.
*   The server (`apps/meteor/app/utils/server/slashCommand.ts`) maintains a registry of available slash commands (`slashCommands.commands`), added through `slashCommands.add()`. When a command is received from the client, `slashCommands.run()` executes the appropriate server-side logic defined in the command's callback.

## Tool Calls (8 calls, 48,974 tokens)

**Step 1:** `search({"query":"slash command registration"})` → 341 tokens
**Step 2:** `search({"query":"slash command"})` → 658 tokens
**Step 3:** `graph({"direction":"down","query":"slashCommand","file":"apps/meteor/app/utils/server/slashCommand.ts"})` → 568 tokens
**Step 4:** `search({"query":"slashCommands.add"})` → 403 tokens
**Step 5:** `search({"layer":"server","query":"slashCommands"})` → 771 tokens
**Step 6:** `implement({"symbolName":"slashCommands","filename":"apps/meteor/app/utils/server/slashCommand.ts"})` → 722 tokens
**Step 7:** `search({"layer":"client","query":"processSlashCommand"})` → 331 tokens
**Step 8:** `implement({"symbolName":"processSlashCommand","filename":"apps/meteor/client/lib/chats/flows/processSlashComma)` → 489 tokens
