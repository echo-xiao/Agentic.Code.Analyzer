# How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?

## Gemini Answer

A Rocket.Chat App hooks into the `afterSaveMessage` event through a bridge that connects the core application's callback system to the Apps-Engine. The event is fired in the core, caught by a listener in the Apps-Engine bridge, and then relayed to any installed App that implements the appropriate listener method.

Here is the step-by-step call chain:

`sendMessage` → `afterSaveMessage` → `callbacks.run('afterSaveMessage')` → `AppEvents` Listener → Apps-Engine → `App.executePostMessageSent()`

1.  **Event Origination**: The process begins after a message is saved. The function `afterSaveMessage` located in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts` is called.

    
```typescript
    // apps/meteor/app/lib/server/lib/afterSaveMessage.ts
    export async function afterSaveMessage(message: IMessage, room: IRoom, user: IUser, /* ... */): Promise<IMessage> {
        // ...
        await callbacks.run('afterSaveMessage', message, { room, user, /* ... */ });
        // ...
        return data;
    }
    ```


2.  **Callback Execution**: The `afterSaveMessage` function uses the core callback system to execute all registered listeners for the `'afterSaveMessage'` event.

3.  **Apps-Engine Bridge**: The Apps-Engine registers its own listener for this core event. This is handled within the `AppEvents` bridge, which listens for various core events and forwards them to the Apps-Engine. The key file for this is `apps/meteor/ee/server/apps/communication/events.ts`. This file adds a callback that takes the data from the core event and passes it to the Apps-Engine framework.

4.  **App-Side Implementation**: For an App to receive this event, it must implement the `IPostMessageSent` interface. The Apps-Engine invokes the `executePostMessageSent` method on any App that has this interface implemented when the `afterSaveMessage` event occurs.

    An app developer would add the following to their main class:

    
```typescript
    import { IPostMessageSent } from '@rocket.chat/apps-engine/definition/messages';

    class MyAwesomeApp extends App implements IPostMessageSent {
      public async executePostMessageSent(message: IMessage, read: IRead, http: IHttp, persistence: IPersistence, modify: IModify): Promise<void> {
        // App logic goes here
        // This method is executed after a message has been sent and saved.
      }
    }
    ```


In summary, the connection is established by the Apps-Engine framework registering a listener on the core `callbacks` system and then dispatching that event to the corresponding methods within installed Apps.

## Tool Calls (8 calls, 37,505 tokens)

**Step 1:** `search({"query":"afterSaveMessage","layer":"server"})` → 261 tokens
**Step 2:** `graph({"direction":"down","query":"afterSaveMessage"})` → 862 tokens
**Step 3:** `graph({"query":"afterSaveMessage in apps/meteor/app/lib/server/lib/afterSaveMessage.ts"})` → 27 tokens
**Step 4:** `implement({"filename":"apps/meteor/app/lib/server/lib/afterSaveMessage.ts","symbolName":"afterSaveMessage"})` → 189 tokens
**Step 5:** `graph({"direction":"down","query":"afterSaveMessage","edgeTypes":["event_listen"]})` → 158 tokens
**Step 6:** `graph({"direction":"down","query":"'afterSaveMessage'","edgeTypes":["event_listen"]})` → 14 tokens
**Step 7:** `search({"query":"callbacks.add('afterSaveMessage'","layer":"server"})` → 263 tokens
**Step 8:** `search({"query":"AppEvents","layer":"server"})` → 59 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 0/6 |
| Symbols hit | 1/5 |
| Tool calls | 8 |
| Total tokens | 37,505 |
| Pass | NO |
