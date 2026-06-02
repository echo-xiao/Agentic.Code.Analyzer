# How is a message sent on the client side in Rocket.Chat?

## Gemini Answer

When a message is sent on the client side in Rocket.Chat, the process starts within the `MessageBox` component. This component is responsible for handling user input and triggering the message sending flow.

Here's the client-side call chain for sending a message:

`MessageBox` (`apps/meteor/client/views/room/composer/messageBox/MessageBox.tsx`)
*   The `MessageBox` component provides the UI for composing messages.
*   It utilizes a `chat` context, obtained via `useChat()` from `apps/meteor/client/views/room/contexts/ChatContext.ts`, which provides access to the `ComposerAPI`.
*   When the user types a message and triggers the send action (e.g., by pressing Enter), the `handleSendMessage` event handler is invoked.
*   `handleSendMessage` retrieves the message text from `chat.composer?.text` and then calls the `onSend` prop, passing an object containing the message `value`, `tshow`, `previewUrls`, and `isSlashCommandAllowed`.

At this point, the `onSend` prop of `MessageBox` is expected to lead to the `chat.flows.sendMessage()` function. Although the direct implementation of `chat.flows.sendMessage` was not explicitly retrieved, it's a critical step in the client-side message sending process, as indicated by architectural notes and usage in other client-side components. This function is ultimately responsible for initiating the communication with the server to persist and deliver the message, typically via `sdk.call('sendMessage')`, which crosses the DDP boundary to the server.

**Call Chain:**

`MessageBox` (`apps/meteor/client/views/room/composer/messageBox/MessageBox.tsx`) → `onSend` (prop) → `chat.flows.sendMessage()` → `sdk.call('sendMessage')`

## Tool Calls (8 calls, 81,675 tokens)

**Step 1:** `search({"query":"MessageBox","layer":"client"})` → 615 tokens
**Step 2:** `graph({"layer":"client","query":"MessageBox","direction":"down"})` → 452 tokens
**Step 3:** `implement({"symbolName":"MessageBox","filename":"apps/meteor/client/views/room/composer/messageBox/MessageBox.)` → 2897 tokens
**Step 4:** `search({"query":"chat.flows.sendMessage","layer":"client"})` → 155 tokens
**Step 5:** `search({"query":"useChat","layer":"client"})` → 120 tokens
**Step 6:** `implement({"filename":"apps/meteor/client/views/room/contexts/ChatContext.ts","symbolName":"useChat"})` → 39 tokens
**Step 7:** `search({"query":"ChatContext","layer":"client"})` → 31 tokens
**Step 8:** `implement({"filename":"apps/meteor/client/views/room/contexts/ChatContext.ts","symbolName":"ChatContext"})` → 38 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 4/5 |
| Tool calls | 8 |
| Total tokens | 81,675 |
