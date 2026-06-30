# How do slash commands work in Rocket.Chat — from registration to execution?

## Baseline Answer (no tools)

Rocket.Chat's slash commands provide a powerful way for users to interact with the system, trigger actions, or send special messages directly from the chat input. The mechanism involves both server-side registration and a client-server execution flow.

Let's break down how they work from registration to execution.

## 1. Registration of Slash Commands

Slash commands are primarily registered on the **server-side**. Rocket.Chat maintains a central registry for all available commands. There are three main types of commands:

### a. Built-in Commands

These are core commands shipped with Rocket.Chat (e.g., `/me`, `/topic`, `/msg`, `/shrug`). They are registered during server startup.

*   **Location:**
    *   The core registry is managed by the `SlashCommands` singleton: `app/slash-commands/server/lib/slashCommands.ts`
    *   Default commands are defined and registered in: `app/slash-commands/server/lib/defaultCommands.ts`
*   **How they are registered:**
    Each built-in command calls `SlashCommands.register()` with its details:
    ```typescript
    // Example from app/slash-commands/server/lib/defaultCommands.ts
    SlashCommands.register({
        command: 'me',
        callback: (command, params, item) => {
            // ... logic to send a /me message ...
            return false; // Prevent original message from being sent
        },
        options: {
            description: 'Me',
            params: 'your_message',
            permission: ['post-readonly', 'send-message'],
        },
    });
    ```
    The `callback` function is the actual logic that gets executed when the command is invoked.

### b. Custom Commands

Administrators can define custom slash commands via the Rocket.Chat UI (`Administration > Workspace > Custom Commands`). These commands are stored in the database and loaded into the `SlashCommands` registry when the server starts or when a custom command is added/updated.

*   **Location:**
    *   Loading logic: `app/slash-commands/server/lib/customCommands.ts`
    *   Database collection: `RocketChat.models.CustomCommands`
*   **How they are registered:**
    The `loadCustomCommands()` function in `customCommands.ts` fetches all custom commands from the database and registers them using `SlashCommands.register()`. For custom commands, the `callback` typically involves sending a predefined message or triggering a webhook.

### c. App-defined Commands

Rocket.Chat Apps (formerly Hubot-style integrations) can also register their own slash commands. This allows apps to extend Rocket.Chat's functionality directly.

*   **Location:**
    *   App command registration is handled by the Apps-Engine: `app/apps/server/lib/slash-commands/app-slash-commands.ts`
*   **How they are registered:**
    Apps use the Apps-Engine API to register commands. The Apps-Engine then acts as an intermediary, registering a generic callback with `SlashCommands.register()` that, when executed, delegates the call to the specific app's command handler.

## 2. Execution Flow

When a user types a message starting with `/` in the chat, here's what happens:

### a. Client-Side Input and Sending

1.  **User Types:** A user types `/command params` into the message input field.
2.  **Message Submission:** When the user presses Enter or clicks Send, the client-side code in `client/views/room/MessageInput/MessageInput.tsx` (or similar components) prepares the message.
3.  **`sendMessage` Method Call:** The client calls the `sendMessage` Meteor method on the server, passing the message object (which contains the raw text, room ID, etc.).
    *   `client/lib/sendTo and sendMessage.ts` (client-side wrapper)
    *   `Meteor.call('sendMessage', messageObject);`

### b. Server-Side Processing

The `sendMessage` Meteor method on the server is the entry point for all messages, including potential slash commands.

1.  **`sendMessage` Method Handler:**
    *   **Location:** `app/lib/server/methods/sendMessage.ts`
    *   This method calls the core server-side function `RocketChat.sendMessage()`.
    *   **Location:** `app/lib/server/functions/sendMessage.ts`

2.  **Slash Command Detection:**
    Inside `RocketChat.sendMessage()`, before the message is actually inserted into the database, there's a crucial check:
    ```typescript
    // Simplified logic from app/lib/server/functions/sendMessage.ts
    if (message.msg && message.msg.startsWith('/')) {
        const commandExecuted = await SlashCommands.run(
            message.msg.slice(1), // Remove the leading '/'
            message,
            room,
            user,
        );

        if (commandExecuted === true) {
            // Command was handled, prevent original message from being sent
            return;
        }
        // If commandExecuted is false or undefined, continue to send the message
        // (e.g., if it was a command that also sends a message, like /me)
    }
    ```

3.  **`SlashCommands.run()` Execution:**
    *   **Location:** `app/slash-commands/server/lib/slashCommands.ts`
    *   This is the core execution logic:
        *   **Parsing:** It parses the raw command string (e.g., `me my message`) into the command name (`me`) and its parameters (`my message`).
        *   **Lookup:** It looks up the command name in its internal registry.
        *   **Permissions Check:** It checks if the `user` has the necessary permissions to execute this specific `command` in the given `room`.
        *   **Callback Execution:** If the command is found and the user has permission, it executes the `callback` function associated with that command, passing the parsed command, parameters, the original message object, the room object, and the user object.
        *   **Return Value Handling:**
            *   If the callback returns `true`, it signifies that the command fully handled the message, and the original message should *not* be inserted into the chat.
            *   If the callback returns `false` or `undefined`, it means the command might have performed an action (like sending a new message) but the original message should still be processed (e.g., `/me` sends a new message, but the original `/me` text isn't inserted).

### c. Command Callback Logic

The `callback` function for each command is responsible for the actual action. It receives:

*   `command`: The name of the command (e.g., `'me'`).
*   `params`: The string of parameters following the command (e.g., `'my message'`).
*   `item`: The original message object (`IMessage`).
*   `room`: The room object (`IRoom`).
*   `user`: The user object (`IUser`).

**Typical actions within a callback:**

*   **Sending a new message:** Many commands (like `/me`, `/topic`) construct a new message object and call `RocketChat.sendMessage()` again to insert it into the chat.
*   **Modifying room state:** Commands like `/topic` update the `room.topic` in the database.
*   **Triggering external services:** App-defined commands might make API calls to external services.
*   **User actions:** Kicking, banning, muting users.

**Example: `/me` command callback (simplified)**

```typescript
// From app/slash-commands/server/lib/defaultCommands.ts
SlashCommands.register({
    command: 'me',
    callback: async (command, params, item) => {
        if (!params.trim()) {
            // Handle case where no message is provided
            return;
        }

        const user = await Users.findOneById(item.u._id);
        const room = await Rooms.findOneById(item.rid);

        if (!user || !room) {
            return;
        }

        // Construct a new message object
        const message = {
            _id: Random.id(),
            rid: item.rid,
            msg: params, // The actual message content
            u: item.u,
            ts: new Date(),
            _updatedAt: new Date(),
            t: 'me', // Special type for /me messages
        };

        // Insert the new message into the chat
        await RocketChat.sendMessage(user, message, room);

        return false; // Indicate that the original /me message should NOT be inserted
    },
    // ... options ...
});
```

In summary, Rocket.Chat's slash command system is a robust, extensible mechanism built around a central server-side registry and a clear client-server execution flow, allowing for both built-in functionality and powerful custom integrations.

**Key Files Summary:**

*   `app/slash-commands/server/lib/slashCommands.ts`: Central registry and execution logic (`SlashCommands.register`, `SlashCommands.run`).
*   `app/slash-commands/server/lib/defaultCommands.ts`: Definitions for built-in commands.
*   `app/slash-commands/server/lib/customCommands.ts`: Logic for loading and managing custom commands from the database.
*   `app/apps/server/lib/slash-commands/app-slash-commands.ts`: Integration point for App-defined commands.
*   `app/lib/server/methods/sendMessage.ts`: Meteor method entry point for all messages.
*   `app/lib/server/functions/sendMessage.ts`: Core server-side function that detects and executes slash commands.
*   `client/views/room/MessageInput/MessageInput.tsx`: Client-side component responsible for sending messages.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,840 |
| Model | gemini-2.5-flash |
| Tools | NONE |
