# How do slash commands work in Rocket.Chat — from registration to execution?

## Baseline Answer (no tools)

Slash commands in Rocket.Chat are a powerful mechanism for users to interact with the system or external services directly from the chat input. They follow a well-defined lifecycle from registration to execution, involving both server-side processing and client-side submission.

Let's break down how they work:

### 1. Registration

Slash commands need to be registered with Rocket.Chat so the system knows what to do when a user types `/command`. There are three primary ways commands are registered:

#### a) Built-in (Core) Commands

These are commands shipped with Rocket.Chat and are available by default.

*   **Location:** They are typically defined in individual files within `app/slashcommands/server/commands/`.
*   **Registration:** The main server-side entry point for built-in commands is `app/slashcommands/server/server.js`. This file iterates through the command definitions and registers them using `RocketChat.slashCommands.add()`.
*   **Example (`/me` command):**
    *   **Definition:** `app/slashcommands/server/commands/Me.js`
        ```javascript
        RocketChat.slashCommands.add('me', async function(command, param, item) {
            // ... logic to send the message styled as an action ...
            const user = await API.v1.users.info({ userId: Meteor.userId() });
            const msg = `_${ param }_`;
            await ChatMessage.sendMessage(user, { _id: Random.id(), rid: item.rid, msg });
        }, {
            description: 'Displays a message about what you\'re doing',
            params: 'your_action',
        });
        ```
    *   This `RocketChat.slashCommands.add` function adds the command name (`'me'`), its callback function, and optional metadata (description, parameters) to an internal registry.

#### b) Custom Commands

Administrators can define custom slash commands via the Rocket.Chat UI (Administration > Workspace > Custom Commands). These are typically used for simple text responses or triggering webhooks.

*   **Storage:** Custom commands are stored in the `rocketchat_custom_commands` MongoDB collection.
*   **Loading:** On server startup, `app/custom-commands/server/server.js` listens for changes in this collection and registers/unregisters commands with `RocketChat.slashCommands.add()` or `RocketChat.slashCommands.remove()` accordingly.
*   **Callback:** The callback for custom commands is generic and often involves sending a predefined message or making an HTTP POST request to a configured URL (webhook).

#### c) Apps-Engine Commands

Rocket.Chat Apps can register their own slash commands, allowing for more complex integrations and dynamic behavior.

*   **Interface:** Apps define slash commands by implementing the `ISlashCommand` interface and registering them via the `IAppAccessors.slashCommands.registerCommand()` method during the app's initialization (`initialize` or `onEnable`).
*   **Runtime:** The Apps-Engine runtime (`app/apps/server/lib/RuntimeContext.js`) manages these commands. The `AppSlashCommandManager` (`app/apps/server/managers/AppSlashCommandManager.js`) handles their registration with Rocket.Chat's internal slash command registry.
*   **Execution:** When an Apps-Engine command is executed, the Apps-Engine isolates the execution context, allowing apps to perform complex logic, interact with external APIs, create modals, or send multiple messages.

### 2. Execution Flow

The execution of a slash command follows these steps:

#### a) Client-side Submission

1.  **Typing:** A user types a message starting with `/` (e.g., `/giphy funny cat`) into the message input field.
2.  **Sending:** When the user presses Enter or clicks Send, the client-side `sendMessage` logic (found in `client/lib/chat.js` or similar messaging components) prepares the message object.
3.  **Method Call:** The client then invokes the `Meteor.call('sendMessage', message)` method on the server.

#### b) Server-side Message Processing

1.  **`sendMessage` Method:** The `Meteor.methods.sendMessage` handler (`app/lib/server/methods/sendMessage.js`) on the server receives the message.
2.  **Callback Chain:** Before the message is actually saved to the database or broadcasted, Rocket.Chat runs a series of callbacks. The most critical one for slash commands is `beforeSaveMessage`.
    *   This callback chain is managed by `app/lib/server/lib/callbacks.js`.
    *   The `RocketChat.callbacks.run('beforeSaveMessage', message)` is executed.
3.  **Slash Command Recognition:** One of the functions hooked into `beforeSaveMessage` is `RocketChat.slashCommands.run(message)`. This is the core logic for identifying and executing slash commands:
    *   **Check Prefix:** It first checks if the `message.msg` starts with `/`.
    *   **Parse Command:** It then parses the message to extract the command name (e.g., `giphy` from `/giphy`) and any parameters (e.g., `funny cat`).
    *   **Lookup:** It looks up the extracted command name in its global registry of all registered slash commands (built-in, custom, and Apps-Engine).
    *   **Execute Callback:** If a matching command is found, `RocketChat.slashCommands.run` calls the associated callback function.
    *   **Return Value:** The callback function can:
        *   Perform its action and return `false`, indicating that the original message should *not* be saved or displayed (e.g., `/me` command, which sends a new styled message instead of the original raw `/me` message).
        *   Perform its action and return the modified `message` object, allowing it to proceed through the normal message saving process.

#### c) Command Execution

The command's callback function (whether it's for a built-in, custom, or Apps-Engine command) then performs its specific logic:

*   **Built-in:**
    *   `/me`: Sends a new message in the "action" style.
    *   `/topic`: Updates the room's topic.
    *   `/mute`, `/kick`: Perform moderation actions.
*   **Custom:**
    *   Sends a predefined message to the chat.
    *   Makes an HTTP POST request to a specified webhook URL, potentially receiving a response to be displayed in chat.
*   **Apps-Engine:**
    *   Executes the app's defined logic within an isolated runtime context.
    *   Can interact with other Rocket.Chat APIs (send messages, update user info, create modals).
    *   Can make external API calls.

### Key Components and File Paths:

*   **Slash Command Registry & Runner:**
    *   `app/slashcommands/server/server.js`: Main server-side logic for `RocketChat.slashCommands.add`, `run`, etc.
*   **Built-in Command Definitions:**
    *   `app/slashcommands/server/commands/*.js`: Individual command implementations (e.g., `Me.js`, `Topic.js`).
*   **Custom Commands (Admin UI):**
    *   `app/custom-commands/server/server.js`: Server-side logic for loading and managing custom commands from the database.
    *   `app/custom-commands/server/methods/updateCustomCommand.js`: Method for saving custom commands via the UI.
*   **Apps-Engine Commands:**
    *   `app/apps/server/lib/RuntimeContext.js`: Where App commands are registered with the system.
    *   `app/apps/server/managers/AppSlashCommandManager.js`: Manages the lifecycle of App slash commands.
*   **Message Processing Entry Point:**
    *   `app/lib/server/methods/sendMessage.js`: The server-side method that receives messages from the client.
*   **Callback System:**
    *   `app/lib/server/lib/callbacks.js`: Manages the `beforeSaveMessage` and other message-processing callbacks.

In summary, Rocket.Chat's slash command system is a well-integrated feature that leverages a robust server-side registry and callback mechanism to provide extensible and dynamic chat interactions.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,502 |
| Model | gemini-2.5-flash |
| Tools | NONE |
