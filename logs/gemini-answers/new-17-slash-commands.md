# How do slash commands work in Rocket.Chat — from registration to execution?

## Gemini Answer

Slash commands in Rocket.Chat follow a client-server architecture, with registration and execution handled on the server.

**1. Registration:**
   - Slash commands are registered on the server-side using `slashCommands.add()`. This method is found in `apps/meteor/app/utils/server/slashCommand.ts`.
   - The `add` method takes an object with properties like `command` (the command string, e.g., "invite"), `callback` (the function to execute), `options` (parameters, description, permission, etc.), `providesPreview`, `previewer`, `previewCallback`, and `appId`.
   - Examples of built-in commands registering themselves can be seen in files like:
     - `apps/meteor/app/slashcommands-inviteall/server/server.ts`
     - `apps/meteor/app/slashcommands-leave/server/leave.ts`
     - `apps/meteor/app/slashcommands-mute/server/unmute.ts`
     - `apps/meteor/app/slashcommands-create/server/server.ts`
     - `apps/meteor/app/slashcommands-kick/server/server.ts`
     - `apps/meteor/app/slashcommands-invite/server/server.ts`
     - `apps/meteor/app/slashcommands-me/server/me.ts`
     - `apps/meteor/app/slashcommands-ban/server/ban.ts`

**2. Execution:**
   - **Client-side:** When a user types a message, the `sendMessage` flow on the client-side uses `processSlashCommand()` to parse the message. It uses a regex (`/^\\/([^\\s]+)(.*)/`) to detect slash commands.
   - **Client to Server Communication:** The client does not execute commands directly. Instead, it calls `sdk.call('slashCommand', { cmd, params, msg, triggerId })`. This call crosses the DDP (Distributed Data Protocol) boundary to the server.
   - **Server-side Execution:** The server-side `slashCommands` registry, specifically the `run()` method in `apps/meteor/app/utils/server/slashCommand.ts`, is responsible for executing the command.
     - The `run()` method takes `command`, `message`, `params`, `triggerId`, and `userId` as arguments.
     - It retrieves the registered command from `this.commands[command]`.
     - If a valid `callback` function is found for the command, it executes the `callback` with the provided context (`command`, `params`, `message`, `triggerId`, `userId`).
     - Error handling is in place to ensure a message with a room ID (`rid`) is provided for command execution.

**Call Chain:**

`Client-side (sendMessage flow) → processSlashCommand() → sdk.call('slashCommand', { ... }) → Server-side (DDP method call) → slashCommands.run()`

## Tool Calls (8 calls, 37,084 tokens)

**Step 1:** `search({"query":"registerSlashCommand"})` → 16 tokens
**Step 2:** `search({"query":"slash command register"})` → 17 tokens
**Step 3:** `search({"query":"slash command"})` → 592 tokens
**Step 4:** `graph({"filename":"apps/meteor/app/utils/server/slashCommand.ts","query":"slashCommands","direction":"down)` → 995 tokens
**Step 5:** `graph({"query":"slashCommands.add","direction":"up","layer":"server"})` → 14 tokens
**Step 6:** `implement({"symbolName":"slashCommands","filename":"apps/meteor/app/utils/server/slashCommand.ts"})` → 722 tokens
**Step 7:** `graph({"query":"slashCommands.add","direction":"up","layer":"server"})` → 14 tokens
**Step 8:** `search({"query":"slashCommands.add","layer":"server"})` → 413 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 4/6 |
| Symbols hit | 2/2 |
| Tool calls | 8 |
| Total tokens | 37,084 |
| Pass | NO |
