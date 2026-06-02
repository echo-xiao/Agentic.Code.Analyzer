# How do slash commands work in Rocket.Chat — from registration to execution?

## Baseline Answer (no tools)

Slash commands in Rocket.Chat provide a powerful way for users to interact with the system and installed apps by typing commands directly into the chat message input, prefixed with a slash (`/`). The process from registration to execution involves several key steps on the server-side.

Here's a breakdown:

## 1. Registration of Slash Commands

Slash commands need to be registered with the Rocket.Chat server so the system knows how to handle them. There are two primary ways commands are registered:

### a. Core (Built-in) Commands

Rocket.Chat ships with many built-in commands (e.g., `/help`, `/me`, `/msg`, `/invite`).
*   **Definition:** These commands are defined in individual files under `app/slashcommands/server/commands/`.
*   **Registration Logic:** Each command file typically imports the `SlashCommands` utility and calls its `register` method.
    *   **File:** `app/slashcommands/server/lib/SlashCommands.ts` (manages all registered commands).
    *   **Example (from `app/slashcommands/server/commands/MeCommand.ts`):**
        ```typescript
        import { SlashCommands } from '../lib/SlashCommands';
        import { Meteor } from 'meteor/meteor';

        SlashCommands.register({
            command: 'me',
            callback: async function meCommand(command, params, item) {
                // ... command logic ...
                const message = params.trim();
                if (!message) {
                    return; // No message provided, do nothing
                }
                Meteor.call('sendMessage', {
                    _id: Random.id(), // Generate a unique ID for the message
                    rid: item.rid,
                    msg: `_${message}_`, // Format message as italic
                    ts: new Date(),
                    u: item.u,
                    private: true, // This message should not be processed as a command again
                });
            },
            options: {
                description: 'Me_Description',
                params: 'your_message',
            },
        });
        ```
    *   The `register` method takes an object with:
        *   `command`: The string that triggers the command (e.g., `'me'`).
        *   `callback`: The actual function to execute when the command is called.
        *   `options`: An object for metadata like `description`, `params` (for UI help), `permission` (required role to execute).

### b. Apps-Engine Commands

Commands provided by Rocket.Chat Apps (installed via the Marketplace) are registered through the Apps-Engine API.
*   **App Definition:** An App defines its slash commands using the `ISlashCommand` interface and registers them during its initialization phase (e.g., in the `initialize` method of `RocketChatApp`).
*   **Apps-Engine to Core:** The Apps-Engine internally handles the translation and registration of these commands with the core `SlashCommands` utility. It essentially calls `SlashCommands.register` on behalf of the App, but instead of a direct `callback`, it registers a special executor that points back to the App's runtime. This ensures that when the command is invoked, the execution is routed back to the correct App in its isolated environment.

## 2. Message Processing and Command Detection

When a user sends a message, it goes through a server-side pipeline:

*   **Entry Point:** The primary function responsible for processing incoming messages is `sendMessage` on the server.
    *   **File:** `app/lib/server/functions/sendMessage.ts`
*   **Slash Command Check:** Inside `sendMessage`, one of the first checks performed is whether the message `msg` starts with a `/`.
    *   If `msg.startsWith('/')` is true, the message is then passed to the `SlashCommands.run()` function.
    *   **File:** `app/slashcommands/server/lib/SlashCommands.ts`
*   Crucially, if `SlashCommands.run()` successfully identifies and executes a command, the original message text (`/command params`) is typically *not* displayed in the chat. The command's output (e.g., a new message, a system notification) is shown instead.

## 3. Command Execution

The `SlashCommands.run()` function is the heart of the execution process:

*   **File:** `app/slashcommands/server/lib/SlashCommands.ts`
*   **Parsing:** `SlashCommands.run()` first extracts the command name (the word immediately after the `/`) and any parameters that follow.
*   **Lookup:** It then looks up the extracted command name in its internal registry (the `commands` map populated during registration).
*   **Permission Check:** If the registered command has a `permission` option, `SlashCommands.run()` verifies if the sending user has the necessary role/permission in the current room. If not, the command execution is aborted, and a permission error message might be sent back to the user.
*   **Dispatch:**
    *   **Core Commands:** If it's a core command, `SlashCommands.run()` directly invokes the `callback` function registered for that command. It passes arguments like:
        *   `command`: The command string itself (e.g., 'me').
        *   `params`: The string of parameters that followed the command.
        *   `item`: The original message object (`IMessage`).
        *   `room`: The `IRoom` object where the command was sent.
        *   `user`: The `IUser` object of the sender.
    *   **Apps-Engine Commands:** If it's an App-provided command, `SlashCommands.run()` calls the special `executor` function that was registered by the Apps-Engine. This executor then communicates with the Apps-Engine runtime, which dispatches the execution to the corresponding App's `executeCommand` method, ensuring the App's logic runs in its sandboxed environment.
*   **Post-Execution:** The callback or executor function performs the intended action of the command. This could involve:
    *   Calling `Meteor.call('sendMessage', ...)` to send new messages to the chat (e.g., `/giphy` or `/me`).
    *   Updating room settings or user preferences.
    *   Interacting with external APIs.
    *   Returning an error message if the command was used incorrectly.

In essence, slash commands provide an extensible server-side mechanism that intercepts user messages, parses them, performs permission checks, and then dispatches their execution to either built-in handlers or external App integrations.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,029 |
| Model | gemini-2.5-flash |
| Tools | NONE |
