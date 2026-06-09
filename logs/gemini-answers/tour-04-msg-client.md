# How is a message sent on the client side in Rocket.Chat?

## Gemini Answer

The process of sending a message on the client-side in Rocket.Chat starts from the user interface, specifically the message composer, and flows through a series of React hooks and context providers, ultimately resulting in a call to the server.

Here is the explicit call chain and the key files involved:

**Call Chain:**

`MessageComposer` (UI) → `useChat().actions.sendMessage` → `ChatProvider` → `useChatMessagesInstance` → `sendMessage` flow → `sdk.call('sendMessage', ...)`

---

### 1. User Interface: The Message Composer

- **File**: `apps/meteor/client/views/room/composer/MessageComposer.tsx` (and related components)

The user interacts with the `MessageComposer` component to type and send a message. This component and its children handle user input and trigger the sending process upon submission (e.g., pressing Enter or clicking the send button).

### 2. Chat Context and Hooks

- **File**: `apps/meteor/client/views/room/providers/ChatProvider.tsx`
- **File**: `apps/meteor/client/views/room/contexts/ChatContext.ts`
- **File**: `apps/meteor/client/views/room/providers/hooks/useChatMessagesInstance.ts`

The `MessageComposer` is a child of the `ChatProvider`. This provider sets up a React context (`ChatContext`) that exposes the chat functionalities.

1.  **`ChatProvider`**: This component initializes the chat logic for a given room (`rid`) using the `useChatMessagesInstance` hook.

    
```typescript
    // apps/meteor/client/views/room/providers/ChatProvider.tsx
    const ChatProvider = ({ children, tmid }: ChatProviderProps): ReactElement => {
        const { _id: rid, encrypted } = useRoom();
        const value = useChatMessagesInstance({ rid, tmid, encrypted }); // Creates the chat instance

        return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
    };
    ```


2.  **`useChat`**: The `MessageComposer` (or its parent components) uses the `useChat()` hook to access the chat instance and its methods from the context. This hook simply returns the `value` provided by `ChatProvider`.

3.  **`useChatMessagesInstance`**: This is the core hook where the message sending logic is assembled. It returns an object containing state and `actions`, including the function responsible for sending the message.

    
```typescript
    // apps/meteor/client/views/room/providers/hooks/useChatMessagesInstance.ts
    // (Simplified)
    export const useChatMessagesInstance = (args) => {
        // ... lots of logic for message management ...

        const composer = useMessageComposer({ rid: args.rid });

        const sendMessage = async (message: MessageToSend): Promise<void> => {
            // ... logic to prepare the message ...
            await executeSendMessage(composer.rid, message);
        };

        return {
            // ... other properties
            actions: {
                sendMessage,
                // ... other actions
            },
        };
    };
    ```


### 3. The `sendMessage` Flow

- **File**: `apps/meteor/client/lib/chats/flows/sendMessage.ts`

The `sendMessage` action from the `useChatMessagesInstance` hook calls into a dedicated flow. This file contains the primary client-side logic for sending a message. It runs a series of callbacks (`onClientBeforeSendMessage`) before finally dispatching the message to the server via a DDP method call.

### 4. DDP Method Call to Server

- **File**: `apps/meteor/app/lib/client/methods/sendMessage.ts`

This is where the client officially sends the message data to the server. It uses the `sdk.call` API, which is a wrapper around `Meteor.call`, to invoke the `sendMessage` method on the server. This is an asynchronous operation over a WebSocket connection.

When the user clicks send, the `sendMessage` action from the `useChat` hook is invoked, which triggers this chain, sending the message content to the server for processing and broadcasting to other clients.

## Tool Calls (8 calls, 39,942 tokens)

**Step 1:** `search({"layer":"client","query":"sendMessage"})` → 243 tokens
**Step 2:** `graph({"query":"sendMessage","direction":"down"})` → 1084 tokens
**Step 3:** `search({"query":"MessageComposer","layer":"client"})` → 288 tokens
**Step 4:** `search({"layer":"client","query":"useChat"})` → 147 tokens
**Step 5:** `graph({"query":"useChat","direction":"down"})` → 46 tokens
**Step 6:** `search({"query":"ChatProvider","layer":"client"})` → 89 tokens
**Step 7:** `graph({"query":"ChatProvider","direction":"down"})` → 417 tokens
**Step 8:** `implement({"filename":"apps/meteor/client/views/room/providers/ChatProvider.tsx","symbolName":"ChatProvider"})` → 117 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 1/5 |
| Tool calls | 8 |
| Total tokens | 39,942 |
| Pass | NO |
