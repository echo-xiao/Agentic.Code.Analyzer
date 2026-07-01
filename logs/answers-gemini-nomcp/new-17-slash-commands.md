# How do slash commands work in Rocket.Chat — from registration to execution?

## Baseline Answer (no tools)

Slash commands in Rocket.Chat provide a powerful way for users to interact with the system and integrated services directly from the chat input. Their lifecycle, from registration to execution, involves both client-side and server-side components.

Let's break it down:

## How Slash Commands Work in Rocket.Chat

### 1. Registration (Server-Side)

Slash commands are primarily registered on the server. Rocket.Chat maintains a global registry of available commands.

*   **The Registry:** The core object for managing slash commands is `RocketChat.slashCommands`. This singleton object holds all registered commands.
    *   **File:** `server/lib/slashCommands.js`

*   **Registration API:** Commands are added using `RocketChat.slashCommands.add(command, callback, options)`.
    *   `command`: The string that triggers the command (e.g., `'me'`, `'giphy'`).
    *   `callback`: The function that will be executed when the command is triggered. This function typically receives `(command, params, item)` where `item` contains `message`, `room`, and `user` objects.
    *   `options`: An object containing additional properties like:
        *   `description`: A user-friendly description (for autocomplete).
        *   `params`: A string describing expected parameters (for autocomplete).
        *   `permission`: The permission required to execute the command (e.g., `'slash-commands'`).
        *   `clientOnly`: (Rarely used for actual commands, more for client-side helpers).
        *   `restricted`: Boolean, if true, only users with `slash-commands-restricted` permission can use it.

*   **Built-in Commands:** Rocket.Chat comes with many built-in commands (e.g., `/me`, `/shrug`, `/giphy`, `/topic`). These are registered during server startup.
    *   **Example File:** `app/slash-commands/server/lib/default.js` (contains many default command registrations).
    *   **Example Registration:**
        ```javascript
        RocketChat.slashCommands.add('me', function(command, params, item) {
            if (_.trim(params)) {
                RocketChat.sendMessage(item.user, {
                    _id: Random.id(),
                    rid: item.rid,
                    msg: `_${params}_`, // Formats the message
                    ts: new Date(),
                    u: item.user,
                    _updatedAt: new Date(),
                }, item.room);
            }
        }, {
            description: 'Shows a /me action',
            params: 'your_message',
            permission: 'slash-commands',
        });
        ```

*   **Custom Commands (Apps Engine):** The Rocket.Chat Apps Engine allows developers to create custom slash commands. Apps register their commands using the `IAppSlashCommand` interface, and the App Engine internally uses `RocketChat.slashCommands.add` to integrate them.
    *   **File:** `app/apps/server/lib/slash-commands.js` (handles app command registration).

### 2. Client-Side Interaction & Sending

When a user types a message starting with `/` in the chat input:

*   **Autocomplete:**
    *   The client-side code (specifically the message input component) listens for input starting with `/`.
    *   It queries the server for available slash commands. The `RocketChat.slashCommands.commands` object (which is a subset of the server-side registry, exposed via a publication or method) is used to populate the autocomplete suggestions.
    *   **File:** `app/slash-commands/client/lib/slash-commands.js` (client-side registry and helper functions).
    *   **File:** `client/components/message/MessageInput.js` (or similar, handles the UI logic for autocomplete).

*   **Sending the Message:**
    *   When the user presses Enter, the client sends the entire message string (e.g., `/giphy cats`) to the server via the `sendMessage` DDP method.
    *   **File:** `client/lib/sendTo and sendMessage.js` (client-side method call).

### 3. Server-Side Processing & Execution

Upon receiving a message, the server goes through a series of steps to determine if it's a slash command and execute it.

*   **Entry Point:** The `Meteor.methods.sendMessage` is the primary entry point for all messages sent from the client.
    *   **File:** `server/methods/sendMessage.js`

*   **Message Interception (Callbacks):** Before a message is saved to the database, Rocket.Chat runs a series of `beforeSaveMessage` callbacks. One of these callbacks is responsible for checking for slash commands.
    *   **File:** `server/lib/callbacks.js` (manages callbacks).
    *   **File:** `app/slash-commands/server/lib/slashCommands.js` (contains the `beforeSaveMessage` callback that triggers command processing).

*   **Command Detection and Execution:**
    *   The `RocketChat.slashCommands.run(command, message, room, user)` method is called.
    *   **File:** `server/lib/slashCommands.js` (contains the `run` method).
    *   **Steps within `run`:**
        1.  **Parse Command:** It extracts the command string (e.g., `giphy`) and any parameters (e.g., `cats`) from the message.
        2.  **Lookup Command:** It searches its internal registry (`RocketChat.slashCommands.commands`) for a matching command.
        3.  **Permission Check:** It verifies if the `user` has the necessary `permission` to execute the command (if specified during registration).
        4.  **Execute Callback:** If the command is found and permissions are met, it calls the `callback` function associated with the command, passing the extracted `command`, `params`, and the `item` object (containing `message`, `room`, `user` details).
        5.  **Handle Result:**
            *   The callback function performs its intended action (e.g., sends a new message, updates room topic, interacts with an external API).
            *   If the command successfully handles the message, `RocketChat.slashCommands.run` returns `false` or a specific object, indicating that the original message should *not* be saved as a regular chat message.
            *   If the command is not found or fails, `RocketChat.slashCommands.run` might return `true` or throw an error, allowing the original message to be processed as a regular chat message or an error message to be sent back to the user.

*   **Example Callback Action:** For `/giphy cats`, the callback would typically:
    1.  Make an HTTP request to the Giphy API with "cats".
    2.  Receive a GIF URL.
    3.  Use `RocketChat.sendMessage` (or similar) to send a new message into the room containing the GIF.

### Summary Flow:

1.  **Registration:** Server registers commands with `RocketChat.slashCommands.add()`.
2.  **User Input:** User types `/command params` in the client.
3.  **Autocomplete:** Client suggests commands based on `RocketChat.slashCommands.commands` (client-side).
4.  **Send Message:** Client sends the full message string via `Meteor.methods.sendMessage`.
5.  **Server Intercept:** `sendMessage` method triggers `beforeSaveMessage` callbacks.
6.  **Command Detection:** A callback calls `RocketChat.slashCommands.run()`.
7.  **Execution:** `run()` parses, looks up, checks permissions, and executes the registered `callback` function.
8.  **Result:** The `callback` performs its action (e.g., sends a new message, updates state). The original message is often suppressed.

This robust system allows for highly extensible and interactive chat experiences within Rocket.Chat.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,275 |
| Model | gemini-2.5-flash |
| Tools | NONE |
