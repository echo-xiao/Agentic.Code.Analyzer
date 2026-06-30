# How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?

## Baseline Answer (no tools)

Rocket.Chat Apps leverage the **Apps Engine** to hook into various events throughout the Rocket.Chat lifecycle, including message saving, user creation, room changes, and more. This is achieved by implementing specific interfaces defined by the Apps Engine.

Let's break down how an App hooks into an event like `afterSaveMessage`.

### 1. The Apps Engine and Interfaces

The Apps Engine acts as a secure sandbox for your apps. Instead of directly modifying Rocket.Chat's core, your app declares its capabilities and intentions by implementing predefined interfaces. Each interface corresponds to a specific type of event or lifecycle hook.

For `afterSaveMessage`, the relevant interface is `IPostMessageSaved`.

### 2. Implementing `IPostMessageSaved` in Your App

Your Rocket.Chat App class (which extends `App` from `@rocket.chat/apps-engine/definition/App`) needs to implement the `IPostMessageSaved` interface. This signals to the Apps Engine that your app wants to be notified whenever a message has been successfully saved.

**File Path Example:** `your-app/RocketChatApp.ts`

```typescript
import {
    IAppAccessors,
    IAppInfo,
    IAppSettings,
    IConfigurationExtend,
    IHttp,
    ILogger,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/api';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IPostMessageSaved, IMessage } from '@rocket.chat/apps-engine/definition/messages';
import { ISetting } from '@rocket.chat/apps-engine/definition/settings';

// Your App's main class
export class MyAwesomeApp extends App implements IPostMessageSaved {
    constructor(info: IAppInfo, logger: ILogger) {
        super(info, logger);
    }

    // This method is required by the IPostMessageSaved interface
    // It will be called AFTER a message has been saved to the database.
    public async executePostMessageSaved(
        message: IMessage,
        read: IRead,
        http: IHttp,
        persistence: IPersistence,
        modify: IModify,
    ): Promise<void> {
        this.getLogger().info('A message was saved!');
        this.getLogger().info(`Message ID: ${message.id}`);
        this.getLogger().info(`Sender: ${message.sender?.username}`);
        this.getLogger().info(`Text: ${message.text}`);

        // Example: You could do something with the saved message
        // For instance, fetch a related thread, update a custom field,
        // or send a notification to another service.

        try {
            // Let's say you want to add a reaction to the message
            // (Note: This is an example of what you *could* do, not always best practice for 'post-save')
            // For a post-save hook, you'd typically react to the message's content
            // or trigger an external process.
            const reactionModifier = modify.getReactor();
            await reactionModifier.reactToMessage('rocket', message, message.sender);

        } catch (error) {
            this.getLogger().error('Error reacting to message:', error);
        }
    }

    // Other App lifecycle methods would go here (initialize, extendConfiguration, etc.)
    protected async extendConfiguration(
        configuration: IConfigurationExtend,
        environmentRead: IRead,
        _settings: IAppSettings,
    ): Promise<void> {
        // You can register settings, slash commands, APIs, etc., here.
    }
}
```

### 3. How Rocket.Chat Core Dispatches Events to Apps

The magic happens within the Rocket.Chat server when specific actions occur. When a message is saved, the core code responsible for message persistence will trigger the Apps Engine's event dispatcher.

Here's the simplified flow:

1.  **Core Action:** A user sends a message, and Rocket.Chat's server-side logic processes and saves it to the database.
    *   **Relevant File:** `app/lib/server/lib/messages.ts` (specifically the `sendMessage` and `saveMessage` functions).

2.  **Event Broadcast:** After successfully saving the message, the core code calls into the Apps Engine's API to broadcast the `postMessageSaved` event.
    *   **Example Code Snippet from `app/lib/server/lib/messages.ts` (simplified):**
        ```typescript
        import { Apps } from '../../../apps/server/orchestrator';
        // ...
        const messageId = await RocketChat.models.Messages.insert(message);
        // ...
        await Apps.api.getEventBridge().postMessageSaved(message);
        ```

3.  **Apps Engine Dispatcher:** The `Apps.api.getEventBridge().postMessageSaved(message)` call reaches the Apps Engine's internal `ServerRuntime`.
    *   **Relevant File:** `packages/apps-engine/src/server/ServerRuntime.ts`

4.  **Listener Manager:** The `ServerRuntime` delegates to the `AppListenerManager`. This manager keeps track of all installed and enabled apps and which interfaces they implement.
    *   **Relevant File:** `packages/apps-engine/src/server/managers/AppListenerManager.ts`

5.  **Execution:** The `AppListenerManager` identifies all enabled apps that implement `IPostMessageSaved`. For each such app, it then calls the `executePostMessageSaved` method, passing in the `IMessage` object and the various accessors (`IRead`, `IHttp`, `IPersistence`, `IModify`) that the app can use to interact with Rocket.Chat.

This architecture ensures a clear separation of concerns, allowing apps to extend Rocket.Chat's functionality without directly modifying its core codebase, while also providing a robust and secure execution environment.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 2,772 |
| Model | gemini-2.5-flash |
| Tools | NONE |
