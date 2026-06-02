# What is the complete call chain for sendMessage?

## Gemini Answer

The `sendMessage` function follows this call chain:

1.  **`MessageBox`** (`apps/meteor/client/views/room/composer/messageBox/MessageBox.tsx`): This React component is the UI element where users type their messages. When a user sends a message (e.g., by pressing Enter or clicking the send button), the `handleSendMessage` useEffectEvent is triggered. This event calls the `onSend` prop, passing an object containing the message `value` (text) and other relevant data.

2.  **`ComposerMessage`** (`apps/meteor/client/views/room/composer/ComposerMessage.tsx`): This component wraps `MessageBox` and provides the `onSend` prop to it. The `onSend` prop in `ComposerMessage` is an asynchronous function that first stops any typing indication (`chat?.action.stop('typing')`) and then calls `chat?.flows.sendMessage`.

3.  **`chat?.flows.sendMessage`** (from `ChatContext` - `apps/meteor/client/views/room/contexts/ChatContext.ts`): The `useChat` hook (defined in `apps/meteor/client/views/room/contexts/ChatContext.ts`) provides access to the `ChatContextValue`, which includes `chat.flows`. This `sendMessage` method within `chat.flows` is responsible for handling the client-side logic of sending a message. This function is the ultimate client-side entry point for sending a message, before crossing the DDP boundary.

The `ChatContext` itself is a React Context, and the `useChat` hook simply provides access to its value. The actual implementation of `chat.flows.sendMessage` would be defined within the provider of this context, which likely makes a DDP call to the server (e.g., `sdk.call('sendMessage')`) to persist the message.

## Tool Calls (8 calls, 85,881 tokens)

**Step 1:** `search({"layer":"client","query":"MessageBox"})` → 615 tokens
**Step 2:** `graph({"layer":"client","direction":"down","query":"MessageBox"})` → 452 tokens
**Step 3:** `implement({"filename":"apps/meteor/client/views/room/composer/messageBox/MessageBox.tsx","symbolName":"Message)` → 2897 tokens
**Step 4:** `search({"query":"ComposerMessage","layer":"client"})` → 134 tokens
**Step 5:** `implement({"symbolName":"ComposerMessage","filename":"apps/meteor/client/views/room/composer/ComposerMessage.t)` → 495 tokens
**Step 6:** `search({"query":"useChat"})` → 120 tokens
**Step 7:** `implement({"symbolName":"useChat","filename":"apps/meteor/client/views/room/contexts/ChatContext.ts"})` → 39 tokens
**Step 8:** `search({"query":"ChatContext"})` → 31 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 0/6 |
| Symbols hit | 1/8 |
| Tool calls | 8 |
| Total tokens | 85,881 |
