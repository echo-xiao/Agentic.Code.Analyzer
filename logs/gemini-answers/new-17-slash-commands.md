# How do slash commands work in Rocket.Chat — from registration to execution?

## Gemini Answer

The lifecycle of a slash command in Rocket.Chat involves three main stages: registration at server startup, client-side detection and invocation, and server-side execution via a central dispatcher.

Here is a step-by-step breakdown of how slash commands work, including the key files and functions involved.

### 1. Command Registration

Slash commands are registered when the server starts up. Each command has its own dedicated package (e.g., `slashcommands-invite`) which contains the command's logic and registration call.

*   **Entry Point**: During server initialization, the main file for the slash command package is loaded.
*   **Registration API**: The command registers itself using the `slashCommands.add()` function.

The central utility for managing the command registry is located in `apps/meteor/app/utils/server/slashCommand.ts`. This file exports the `slashCommands` object which contains the `add` and `run` methods.

An example is the `/invite` command:

*   **File:** `apps/meteor/app/slashcommands-invite/server/index.ts`
*   **Logic:** This file calls `slashCommands.add()` from `apps/meteor/app/utils/server/slashCommand.ts` to register the `invite` command, providing its name, the callback function to execute, and other options like required permissions and help text. The actual implementation of the invite logic is typically in a sibling file, `server.ts`.

### 2. Client-Side Detection and Invocation

When a user types a message starting with a `/`, the client-side UI intercepts it before sending it as a regular message.

*   **Detection**: A function on the client, `processSlashCommand()`, uses a regular expression to detect messages that look like commands.
*   **Invocation**: Instead of sending a standard chat message, the client makes a Meteor method call to the server using `sdk.call('slashCommand', { cmd, params, msg })`. This sends the command name (e.g., "invite"), its parameters, and the original message object to the server for execution.

### 3. Server-Side Execution

The server receives the method call and dispatches it to the appropriate command handler.

*   **Entry → `slashCommand` Meteor Method**: The `sdk.call` from the client invokes a Meteor method named `slashCommand`. This method serves as the single entry point for all slash command executions.
*   **→ `slashCommands.run`**: The `slashCommand` method looks up the command by name in its internal registry (the one populated by `slashCommands.add()` at startup). If a matching command is found, it calls the central `slashCommands.run()` function.
*   **→ Command Callback**: `slashCommands.run` executes the specific callback function that was registered for that command (e.g., the `invite` function from `apps/meteor/app/slashcommands-invite/server/server.ts`). This function contains the core logic for the command, such as adding a user to a room.

This architecture creates a clear separation of concerns: the client is only responsible for identifying and sending commands, while the server maintains a central, extensible registry for executing them.

## Tool Calls (8 calls, 25,027 tokens)

**Step 1:** `search({"query":"slashcommand create","layer":"server"})` → 16 tokens
**Step 2:** `search({"query":"slashcommand","layer":"server"})` → 552 tokens
**Step 3:** `graph({"query":"slashCommands.add","direction":"up"})` → 14 tokens
**Step 4:** `search({"query":"SlashCommand.add"})` → 15 tokens
**Step 5:** `graph({"query":"apps/meteor/app/utils/server/slashCommand.ts"})` → 21 tokens
**Step 6:** `search({"layer":"server","query":"slashcommands-invite"})` → 248 tokens
**Step 7:** `implement({"symbolName":"invite","filename":"apps/meteor/app/slashcommands-invite/server/server.ts"})` → 15 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/slashcommands-invite/server/server.ts","symbolName":"placeholder"})` → 16 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 4/6 |
| Symbols hit | 2/2 |
| Tool calls | 8 |
| Total tokens | 25,027 |
| Pass | NO |
