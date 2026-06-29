# How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?

## Baseline Answer (no tools)

Rocket.Chat Apps hook into events via the Apps Engine using a well-defined interface and bridge pattern. The core idea is that an App declares its interest in specific events by implementing corresponding interfaces, and the Apps Engine runtime dispatches these events from the core Rocket.Chat server to the App's methods.

Let's break down how an App hooks into an event like `afterSaveMessage`.

### 1. Event Definition in the Apps Engine

The Apps Engine defines a set of interfaces for various lifecycle and message-related events. All supported event types are enumerated in:

*   **`Rocket.Chat.Apps-engine/src/definition/api/IEvent.ts`**
    ```typescript
    export enum AppInterface {
        // ... many other interfaces
        IPostMessageSaved = 'IPostMessageSaved',
        // ...
    }
    ```
    This `AppInterface` enum maps directly to the TypeScript interfaces that an App can implement. For `afterSaveMessage`, the relevant interface is `IPostMessageSaved`.

### 2. App Implementation

To subscribe to the `afterSaveMessage` event, your Rocket.Chat App needs to:

1.  **Implement the `IPostMessageSaved` interface** in its main `App` class.
2.  **Provide an implementation for the `executePostMessageSaved` method**.

Here's an example of how your App's main class (`your-app/src/MyAwesomeApp.ts`) would look:

```typescript
import {
    IAppAccessors,
    ILogger,
    IConfigurationExtend,
    IAppUtils,
    IMessage,
    IRoom,
    IPostMessageSaved // Import the specific interface
} from '@rocket.Chat/apps-engine/definition/api';
import {
    IRead,
    IModify,
    IHttp,
    IPersistence
} from '@rocket.Chat/apps-engine/definition/accessors';
import {
    App
} from '@rocket.Chat/apps-engine/definition/App';
import {
    IAppInfo
} from '@rocket.Chat/apps-engine/definition/metadata';

export class MyAwesomeApp extends App implements IPostMessageSaved {
    constructor(info: IAppInfo, logger: ILogger) {
        super(info, logger);
    }

    protected async extendConfiguration(
        configuration: IConfigurationExtend,
        environment: IAppUtils
    ): Promise<void> {
        // Define your app's settings, commands, slash commands, etc.
    }

    /**
     * This method is executed AFTER a message has been saved to the database.
     * It allows your App to perform actions based on the saved message.
     *
     * @param message The message that was just saved.
     * @param room The room where the message was saved.
     * @param read Accessor for reading data.
     * @param http Accessor for making HTTP requests.
     * @param persistence Accessor for persisting data related to the App.
     * @param modify Accessor for modifying data (e.g., sending new messages, updating existing ones).
     * @param logger The App's logger instance.
     */
    public async executePostMessageSaved(
        message: IMessage,
        room: IRoom,
        read: IRead,
        http: IHttp,
        persistence: IPersistence,
        modify: IModify,
        logger: ILogger,
    ): Promise<void> {
        this.getLogger().info(`[${this.getName()}] Message saved in room "${room.slugifiedName}" by "${message.sender.username}": "${message.text}"`);

        // Example: Send a follow-up message if the saved message contains "hello"
        if (message.text && message.text.toLowerCase().includes('hello')) {
            const appUser = await read.getUserReader().getAppUser(this.getID());
            if (appUser) {
                const builder = modify.getCreator().startMessage()
                    .setRoom(room)
                    .setText(`Hello, ${message.sender.username}! I saw your message.`);

                // You can optionally set the sender to the App itself
                builder.setSender(appUser);

                await modify.getCreator().finish(builder);
            }
        }

        // Add any other custom logic here
    }
}
```

### 3. Apps Engine Bridge and Managers

When Rocket.Chat loads your App, the Apps Engine runtime scans your App's class to determine which interfaces it implements. It then registers these implementations.

*   **`AppManager`**: This central manager in the Apps Engine handles the lifecycle of all Apps, including identifying their implemented interfaces.
*   **`AppEvents`**: This module within the Apps Engine bridge is responsible for dispatching events from the core server to the appropriate App methods.
    *   **File:** `app/apps/server/lib/AppEvents.ts` (within the main Rocket.Chat repository)
        This file contains the `AppEvents.trigger()` method, which is the core mechanism for notifying Apps of events.

### 4. Core Rocket.Chat Trigger Points

The core Rocket.Chat server code, at various points in its execution flow, explicitly calls the Apps Engine bridge to trigger events.

For the `afterSaveMessage` event, the flow is as follows:

1.  **Message Saving Logic**: When a message is sent and saved to the database, the core `saveMessage` function is invoked.
    *   **File:** `app/lib/server/functions/saveMessage.ts`
        ```typescript
        import {
            triggerPostMessageSaved
        } from '../../apps/server/lib/misc'; // Imports the wrapper function
        import {
            IMessage,
            IRoom
        } from '@rocket.Chat/apps-engine/definition/messages'; // Correct import for IMessage/IRoom

        export async function saveMessage(message: IMessage, room: IRoom, uid: string): Promise<IMessage> {
            // ... (Core logic to save the message to the database, e.g., using Messages.upsert) ...

            const savedMessage = await Messages.upsert({ _id: message._id }, message); // Simplified example

            // --- THIS IS THE CRUCIAL PART ---
            // AFTER the message has been successfully saved to the database,
            // the core system explicitly triggers the Apps Engine event:
            await triggerPostMessageSaved(savedMessage, room);

            return savedMessage;
        }
        ```

2.  **Apps Engine Wrapper Trigger**: The `triggerPostMessageSaved` function acts as an intermediary, calling the Apps Engine's dispatch mechanism.
    *   **File:** `app/apps/server/lib/misc.ts`
        ```typescript
        import {
            AppEvents
        } from './AppEvents'; // The actual Apps Engine event dispatcher
        import {
            AppInterface
        } from '@rocket.Chat/apps-engine/definition/api';
        import {
            IMessage,
            IRoom
        } from '@rocket.Chat/apps-engine/definition/messages'; // Correct import for IMessage/IRoom

        export async function triggerPostMessageSaved(message: IMessage, room: IRoom): Promise<void> {
            // This line tells the Apps Engine that a message has been saved
            await AppEvents.trigger(AppInterface.IPostMessageSaved, message, room);
        }
        ```

3.  **Apps Engine Dispatch**: The `AppEvents.trigger()` method (within `app/apps/server/lib/AppEvents.ts`) then iterates through all currently enabled Apps. For each App that has implemented the `IPostMessageSaved` interface, it calls its `executePostMessageSaved` method, passing in the relevant `message` and `room` data, along with the necessary accessor objects (`read`, `modify`, `http`, `persistence`, `logger`).

This architecture ensures a clean separation of concerns, allowing Apps to extend Rocket.Chat's functionality without directly modifying its core codebase, promoting stability and upgradeability.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 4,342 |
| Model | gemini-2.5-flash |
| Tools | NONE |
