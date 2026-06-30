# How do slash commands work in Rocket.Chat — from registration to execution?

## Gemini Answer

Slash commands in Rocket.Chat follow a client-server architecture, involving both registration and execution phases.

**1. Registration:**

*   **Server-side registration:** Slash commands are registered on the server using `slashCommands.add()`. This function, located in `apps/meteor/app/utils/server/slashCommand.ts`, takes an object conforming to `ISlashCommandAddParams` which includes the command name, a callback function for its execution, optional parameters, description, and permissions. This `slashCommands` object acts as a registry, storing the command details.
*   **AppSlashCommand:** The `AppSlashCommand` symbol in `packages/apps-engine/src/server/managers/AppSlashCommand.ts` suggests that applications can also register their own slash commands, likely using a similar mechanism that ultimately ties into the `slashCommands` registry.

**2. Execution:**

*   **Client-side detection:** When a user types a message in the client, `processSlashCommand()` in `apps/meteor/client/lib/chats/flows/processSlashCommand.ts` is responsible for parsing the message. It uses a regular expression (`/^\\/([^\\s]+)(.*)/`) to detect if the message starts with a slash and extracts the command and its parameters.
*   **DDP Call to Server:** The client does not execute the command directly. Instead, `processSlashCommand()` makes a Distributed Data Protocol (DDP) call to the server using `sdk.call('slashCommand', { cmd, params, msg, triggerId })`. This call transmits the command name, parameters, the message object, and a trigger ID to the server.
*   **Server-side Execution:** On the server, the DDP call is handled, and the `slashCommands.run()` method, defined in `apps/meteor/app/utils/server/slashCommand.ts`, is invoked.
    *   `slashCommands.run()` retrieves the registered command from its `commands` registry based on the `command` name.
    *   It performs a basic validation to ensure a room ID (`message.rid`) is provided.
    *   Finally, it executes the `callback` function associated with the registered command, passing the command, parameters, message, trigger ID, and user ID.

**Call Chain:**

1.  `apps/meteor/client/lib/chats/flows/processSlashCommand.ts` (client)
2.  `MinimalDDPClient.ts` (client - initiates DDP call)
3.  (DDP communication)
4.  `apps/meteor/app/utils/server/slashCommand.ts` (`slashCommands.run()` on server)
5.  Registered command's `callback` function (server - specific command logic)

## Tool Calls (8 calls, 54,407 tokens)

**Step 1:** `search({"layer":"server","query":"slash command"})` → 297 tokens
**Step 2:** `graph({"layer":"server","direction":"down","query":"slashCommands"})` → 786 tokens
**Step 3:** `implement({"symbolName":"slashCommands.add","filename":"apps/meteor/app/utils/server/slashCommand.ts"})` → 51 tokens
**Step 4:** `implement({"filename":"apps/meteor/app/utils/server/slashCommand.ts","symbolName":"slashCommands"})` → 722 tokens
**Step 5:** `search({"query":"slashCommand","layer":"client"})` → 542 tokens
**Step 6:** `graph({"direction":"down","layer":"client","query":"processSlashCommand"})` → 2064 tokens
**Step 7:** `search({"layer":"server","query":"Meteor.methods.slashCommand"})` → 18 tokens
**Step 8:** `graph({"layer":"server","query":"slashCommands.run","direction":"up"})` → 14 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 2/2 |
| Tool calls | 8 |
| Total tokens | 54,407 |
| Pass | NO |
