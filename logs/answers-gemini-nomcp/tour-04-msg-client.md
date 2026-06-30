# How is a message sent on the client side in Rocket.Chat?

## Baseline Answer (no tools)

On the client side, sending a message in Rocket.Chat involves a series of steps, leveraging React components, custom hooks, Meteor methods, and optimistic UI updates.

Here's a breakdown of the process:

1.  **User Interaction (Composer Component):**
    *   The user types their message into the chat input field, which is part of the `Composer` component.
    *   This component is primarily located at: `client/views/room/Composer/Composer.tsx`
    *   When the user presses `Enter` (or clicks a send button, if available), an `onSubmit` or `onSend` event is triggered within this component.

2.  **Handling the Send Event:**
    *   Inside `Composer.tsx`, the `handleSend` function is responsible for processing the message text.
    *   This function typically calls a `sendMessage` function, which is provided by a custom hook.

3.  **The `useSendMessage` Hook:**
    *   The core logic for preparing and initiating the message send resides in the `useSendMessage` hook.
    *   You can find this hook at: `client/views/room/Composer/hooks/useSendMessage.ts`
    *   This hook performs several critical actions:
        *   **Message Object Construction:** It takes the raw message text and other context (like the current room ID `rid`, thread ID `tmid` if it's a reply, attachments, mentions, etc.) and constructs a complete message object.
        *   **Optimistic UI Update:** Rocket.Chat implements optimistic UI for messages. Before sending the message to the server, the client immediately inserts a temporary version of the message into its local data store (e.g., a local collection or state management system).
            *   This temporary message will have a client-generated `_id` and often a `temp: true` flag.
            *   This makes the message appear instantly in the chat feed for the sender, providing a smoother user experience.
            *   The logic for this might involve utilities like `client/lib/OptimisticCache.ts` or direct manipulation of the local `Messages` collection (if using MiniMongo).
        *   **Meteor Method Invocation:** The `useSendMessage` hook then calls a Meteor Method on the server. It typically uses the `useMethod` hook from `@rocket.chat/ui-contexts` to interact with server-side methods.

4.  **Meteor Method Call:**
    *   The specific Meteor Method called for sending a message is `sendMessage`.
    *   The client invokes this method with the constructed message object as an argument:
        ```typescript
        // Simplified example from useSendMessage.ts
        const sendMessageMethod = useMethod('sendMessage');

        // ... inside the sendMessage function ...
        sendMessageMethod({
            _id: tempMessageId, // The client-generated ID for optimistic UI
            rid: currentRoomId,
            msg: messageText,
            tmid: threadMessageId, // if applicable
            // ... other message properties like attachments, blocks, etc.
        });
        ```
    *   This `sendMessageMethod` call is handled by the Meteor DDP (Distributed Data Protocol) client, which serializes the request and sends it over a WebSocket connection to the Rocket.Chat server.

5.  **Server Response and UI Reconciliation:**
    *   Once the server receives the `sendMessage` method call, it processes the message, saves it to the database, and then publishes it back to all relevant clients (including the sender).
    *   When the sender's client receives the server-confirmed message (which will have the *actual* server-generated `_id` and `temp: false`), it reconciles this with the previously displayed optimistic message. The temporary message is either updated with the server's data or replaced, ensuring data consistency and removing the `temp` flag.

**In summary, the client-side flow is:**

1.  **`Composer.tsx`**: User input and `handleSend` trigger.
2.  **`useSendMessage.ts`**: Message object creation, optimistic UI update (displaying the message locally immediately), and invocation of the `sendMessage` Meteor Method.
3.  **`@rocket.chat/ui-contexts` (`useMethod`)**: Handles the actual DDP communication to send the method call to the server.
4.  **DDP Client**: Transmits the message data over WebSocket.
5.  **Server Response**: Confirmed message replaces/updates the optimistic one.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 2,623 |
| Model | gemini-2.5-flash |
| Tools | NONE |
