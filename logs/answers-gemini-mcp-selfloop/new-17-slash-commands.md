# How do slash commands work in Rocket.Chat — from registration to execution?

## Plan

intent: call-chain

## Gemini Answer

Rocket.Chat's slash command system allows users to execute actions via chat commands. This system involves both client-side and server-side components for registration and execution.

**1. Command Registration:**

*   **Core Slash Commands:** Core commands are registered directly using `slashCommands.add`. This method stores the command definition in the `slashCommands.commands` object, making it available for execution. This occurs on both the client and server.
    *   **Client-side registration:** `apps/meteor/app/utils/client/slashCommand.ts`
    *   **Server-side registration:** `apps/meteor/app/utils/server/slashCommand.ts`
*   **App-Provided Slash Commands:**
    1.  **App Initialization:** During an App's initialization, it can call `provideSlashCommand` via the `ISlashCommandsExtend` accessor.
    2.  **Adding the Command:** The `SlashCommandsExtend` accessor uses the `AppSlashCommandManager` to `addCommand`. This method stores the command internally and marks it as "touched" by the App.
    3.  **Registration with Bridge:** When an App is enabled, the `AppSlashCommandManager`'s `registerCommands` method iterates through the App's commands and calls `this.bridge.doRegisterCommand` for each. The `AppCommandsBridge` then adds the command to the global `slashCommands.commands` object.
        *   **AppCommandsBridge:** `apps/meteor/app/apps/server/bridges/commands.ts`

**2. Command Execution:**

The execution flow begins on the client when a user types a message starting with `/`.

*   **Client-side Parsing:** The `processSlashCommand` function (not detailed in the provided tools, but mentioned in the wiki) parses the message to extract the command and its parameters.
*   **Client-Only Commands:** If a command is marked as `clientOnly`, its `callback` function is executed directly on the client.
    *   **Client-side `slashCommands.run`:** `apps/meteor/app/utils/client/slashCommand.ts`
*   **Server-side Execution:** For commands that are not client-only, the client makes a `POST` request to the `/v1/commands.run` API endpoint.
    *   **Server-side API Endpoint:** The `API.v1.post('commands.run')` handler on the server receives the request, validates the command and user permissions.
    *   **`slashCommands.run`:** The API handler then calls `slashCommands.run` with the command details. This method retrieves the command's definition from `slashCommands.commands` and executes its `callback` function.
        *   **Server-side `slashCommands.run`:** `apps/meteor/app/utils/server/slashCommand.ts`
    *   **App Command Execution:** If the command was provided by an App, the `callback` function in `AppCommandsBridge` (`_appCommandExecutor`) is invoked. This executor communicates with the App's runtime controller to execute the command's logic within the App's isolated environment.

**3. Command Previews:**

Some slash commands can provide interactive previews.

*   **Getting Previews:** If a command `providesPreview`, the client can request previews by calling `slashCommands.getPreviews`. This, in turn, calls the command's `previewer` function.
    *   **Client-side `slashCommands.getPreviews`:** `apps/meteor/app/utils/client/slashCommand.ts`
    *   **Server-side `slashCommands.getPreviews`:** `apps/meteor/app/utils/server/slashCommand.ts`
*   **Executing a Preview Item:** When a user selects a preview item, `slashCommands.executePreview` is called, which executes the command's `previewCallback` function.
    *   **Client-side `slashCommands.executePreview`:** `apps/meteor/app/utils/client/slashCommand.ts`
    *   **Server-side `slashCommands.executePreview`:** `apps/meteor/app/utils/server/slashCommand.ts`

## Tool Calls (8 calls, 45,439 tokens)

**Step 1:** `wiki({"question":"How do slash commands work in Rocket.Chat?"})` → 833 tokens
**Step 2:** `plan({"intent":"call-chain","question":"How do slash commands work in Rocket.Chat — from registration to execution?"})` → 1520 tokens
**Step 3:** `search({"query":"slashCommands.add"})` → 297 tokens
**Step 4:** `graph({"move":"down","file":"client.ts","query":"slashCommands.add","depth":3})` → 14 tokens
**Step 5:** `search({"query":"slashCommands"})` → 482 tokens
**Step 6:** `details({"symbolName":"slashCommands","filename":"slashCommand.ts"})` → 639 tokens
**Step 7:** `details({"filename":"slashCommand.ts","symbolName":"slashCommands"})` → 718 tokens
**Step 8:** `search({"query":"AppCommandsBridge"})` → 72 tokens

## Files Seen In Tool Results (28)

- `apps/meteor/client/lib/chats/flows/processSlashCommand.ts`
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
- `apps/meteor/app/utils/server/slashCommand.ts`
- `apps/meteor/app/utils/client/slashCommand.ts`
- `packages/core-typings/src/SlashCommands/index.ts`
- `packages/apps-engine/src/server/accessors/SlashCommandsModify.ts`
- `packages/apps-engine/src/server/accessors/SlashCommandsExtend.ts`
- `packages/apps-engine/src/definition/slashcommands/index.ts`
- `packages/apps-engine/src/definition/slashcommands/SlashCommandContext.ts`
- `packages/apps-engine/src/definition/slashcommands/ISlashCommandPreview.ts`
- `packages/apps-engine/src/definition/slashcommands/ISlashCommand.ts`
- `packages/apps-engine/src/definition/accessors/ISlashCommandsModify.ts`
- `packages/apps-engine/src/definition/accessors/ISlashCommandsExtend.ts`
- `apps/meteor/tests/data/slashcommands.helpers.ts`
- `apps/meteor/client/startup/slashCommands/index.ts`
- `apps/meteor/client/startup/slashCommands/federation.ts`
- `apps/meteor/app/statistics/server/functions/slashCommandsStats.ts`
- `apps/meteor/app/slashcommands-unarchiveroom/server/server.ts`
- `apps/meteor/app/apps/server/bridges/commands.ts`
