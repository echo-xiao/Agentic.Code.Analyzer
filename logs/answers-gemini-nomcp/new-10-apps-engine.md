# How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?

## Baseline Answer (no tools)

Rocket.Chat Apps hook into events like `afterSaveMessage` through the **Apps Engine's listener mechanism**. This involves the App declaring its intent to listen to specific events, and the Apps Engine acting as an intermediary to register these listeners with the Rocket.Chat core.

Here's a breakdown of the process:

1.  **App Declares Listeners:**
    *   An App, written using the Apps Engine SDK, defines which events it wants to listen to. This is typically done by implementing specific interfaces that extend `IListener` and are associated with an `IEvent`.
    *   For `afterSaveMessage`, an App would implement the `IMessageAfterSave` interface.

    **Example (within an App's `app.ts` or a dedicated listener file):**

    ```typescript
    import {
        IAppAccessors,
        IConfigurationExtend,
        IEnvironmentRead,
        ILogger,
    } from '@rocket.chat/apps-engine/definition/accessors';
    import { App } from '@rocket.chat/apps-engine/definition/App';
    import { IMessage, IMessageAfterSave } from '@rocket.chat/apps-engine/definition/messages';
    import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';

    export class MyAwesomeApp extends App implements IMessageAfterSave {
        constructor(info: IAppInfo, logger: ILogger) {
            super(info, logger);
        }

        public async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
            // You might register settings, slash commands, etc. here
        }

        // This is the hook for afterSaveMessage
        public async executeMessageAfterSave(
            message: IMessage,
            read: IEnvironmentRead,
            http: IAppAccessors,
            persist: IAppAccessors,
        ): Promise<void> {
            this.getLogger().info(`Message "${message.id}" by "${message.sender.username}" was saved!`);
            // Your custom logic here
        }
    }
    ```

2.  **Apps Engine Discovers Listeners:**
    *   When an App is loaded and initialized by the Apps Engine, the engine inspects the App's class definition.
    *   It checks which `IListener` interfaces the App class implements (e.g., `IMessageAfterSave`, `IUserCreate`, `IRoomAfterCreate`, etc.).
    *   The Apps Engine SDK provides helper functions to identify these listeners.

    **Relevant Apps Engine SDK file:**
    *   `@rocket.chat/apps-engine/definition/App.ts`: The base `App` class.
    *   `@rocket.chat/apps-engine/definition/messages/IMessageAfterSave.ts`: Defines the `IMessageAfterSave` interface and the `executeMessageAfterSave` method signature.
    *   `@rocket.chat/apps-engine/definition/listeners/IListener.ts`: The base interface for all listeners.

3.  **Apps Engine Registers with Rocket.Chat Core:**
    *   The Apps Engine (running within the Rocket.Chat server) has its own internal event bus and a mechanism to subscribe to core Rocket.Chat events.
    *   For each listener discovered in an App, the Apps Engine registers a corresponding handler with the Rocket.Chat core's event system.
    *   When a core event (like a message being saved) occurs, the Rocket.Chat core emits this event. The Apps Engine's registered handler catches it.

    **Relevant Rocket.Chat Core files:**
    *   `app/apps/server/bridges/MessageBridge.ts`: This bridge is responsible for interacting with messages. It has methods like `afterSave` which the Apps Engine calls.
    *   `app/apps/server/bridges/AppDetailBridge.ts`: Manages the details of loaded apps.
    *   `app/apps/server/bridges/AppActivationBridge.ts`: Handles app activation/deactivation.
    *   `app/apps/server/bridges/AppMessageBridge.ts`: Specifically deals with message-related events.
    *   `app/apps/server/bridges/AppListenerBridge.ts`: This is the core bridge that manages the registration and execution of app listeners. It contains the logic to map core events to app listener methods.

4.  **Event Execution Flow (specifically for `afterSaveMessage`):**
    *   A user sends a message in Rocket.Chat.
    *   The message is processed and saved to the database by the Rocket.Chat core.
    *   **After** the message is successfully saved, the core Rocket.Chat message saving logic (e.g., in `app/lib/server/functions/sendMessage.ts` or related message processing files) explicitly calls out to the Apps Engine.
    *   It typically does this by invoking a method on the `AppListenerBridge` (or a similar bridge) that corresponds to `afterSaveMessage`.
    *   The `AppListenerBridge` then iterates through all currently enabled Apps that have registered an `IMessageAfterSave` listener.
    *   For each such App, it calls the `executeMessageAfterSave` method, passing the message object and the necessary accessors (read, http, persist).
    *   The App's custom logic within `executeMessageAfterSave` is then executed.

**In summary:**

The Apps Engine acts as a robust abstraction layer. Apps declare their intent using SDK interfaces, and the Apps Engine handles the complex task of integrating these declarations with the underlying Rocket.Chat core's event system, ensuring that App logic is executed at the appropriate lifecycle points of various Rocket.Chat entities.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 1,569 |
| Model | gemini-2.5-flash |
| Tools | NONE |
