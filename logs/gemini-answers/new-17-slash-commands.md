# How do slash commands work in Rocket.Chat — from registration to execution?

## Gemini Answer

Slash commands in Rocket.Chat are managed through a central `slashCommands` object, responsible for both registration and execution.

**1. Registration:**

*   **Entry Point:** New slash commands are registered using the `slashCommands.add` method, which is typically called during server startup or module initialization.
*   **Mechanism:** The `slashCommands.add` method (defined in `apps/meteor/app/utils/server/slashCommand.ts`) takes an object with properties such as:
    *   `command`: The name of the slash command (e.g., "mute").
    *   `callback`: The function to execute when the command is invoked.
    *   `options`: Additional settings like `params`, `description`, and `permission`.
    *   `appId`: (Optional) The ID of the App that registered the command.
    *   `providesPreview`, `previewer`, `previewCallback`: For commands that offer previews before full execution.
*   **Storage:** Registered commands are stored in the `slashCommands.commands` object, which acts as a registry mapping command names to their respective configurations and callback functions.

**Example Registration:**
Many core slash commands, like `/mute`, `/invite`, `/create`, are registered using `slashCommands.add` in their respective server-side files (e.g., `apps/meteor/app/slashcommands-mute/server/mute.ts`).

**2. Execution:**

*   **Entry Point:** When a user types a slash command in the chat, the execution flow is initiated by a call to the `slashCommands.run` method.
*   **REST API Integration:** The `slashCommands.run` method is exposed to the client-side via a REST API endpoint. The specific endpoint handling command execution is registered using `API.v1.addRoute` in `apps/meteor/app/api/server/v1/commands.ts`.
*   **Mechanism:**
    1.  The `slashCommands.run` method (defined in `apps/meteor/app/utils/server/slashCommand.ts`) receives the `command` name, `params`, `message` object (containing `rid` and `_id`), `userId`, and an optional `triggerId`.
    2.  It retrieves the corresponding command configuration from `this.commands[command]`.
    3.  It performs a basic validation to ensure a `message.rid` is present.
    4.  Finally, it executes the `callback` function associated with the registered command, passing the command details as arguments.
*   **Previews:** For commands that support previews, `slashCommands.getPreviews` is called to fetch preview information, and `slashCommands.executePreview` handles the execution of a selected preview item.

**Call Chain:**

1.  **Client-side (User input):** User types `/command` in the chat.
2.  **Server-side (REST API):** A client-side component makes an API call to the `/api/v1/commands.run` endpoint (defined in `apps/meteor/app/api/server/v1/commands.ts`).
3.  **Command Execution:** The API endpoint's handler calls `slashCommands.run` (from `apps/meteor/app/utils/server/slashCommand.ts`).
4.  **Callback Execution:** `slashCommands.run` invokes the `callback` function registered for the specific command.

## Tool Calls (8 calls, 61,437 tokens)

**Step 1:** `search({"query":"slashCommands"})` → 442 tokens
**Step 2:** `graph({"layer":"server","query":"slashCommands","direction":"down"})` → 672 tokens
**Step 3:** `implement({"symbolName":"slashCommands","filename":"apps/meteor/app/utils/server/slashCommand.ts"})` → 694 tokens
**Step 4:** `graph({"direction":"up","layer":"server","query":"slashCommands.add"})` → 14 tokens
**Step 5:** `search({"layer":"server","query":"slashCommands.add"})` → 605 tokens
**Step 6:** `search({"layer":"server","query":"slashCommands.run"})` → 77 tokens
**Step 7:** `implement({"symbolName":"slashCommands.run","filename":"apps/meteor/app/api/server/v1/commands.ts"})` → 18 tokens
**Step 8:** `search({"query":"API.v1.addRoute","filename":"apps/meteor/app/api/server/v1/commands.ts","layer":"server"})` → 1467 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 4/6 |
| Symbols hit | 1/2 |
| Tool calls | 8 |
| Total tokens | 61,437 |
