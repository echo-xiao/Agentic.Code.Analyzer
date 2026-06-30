# How is a message sent on the client side in Rocket.Chat?

## Gemini Answer

On the client side, sending a message in Rocket.Chat follows this call chain:

**Entry → Step 1 → Step 2 → Step 3 → Final (DDP Method Dispatch)**

1.  **Entry Point:** The process begins in `apps/meteor/client/views/room/composer/messageBox/MessageBox.tsx`, where the `handleSendMessage` function is triggered when a user attempts to send a message.
2.  **Composer Action:** `handleSendMessage` in `apps/meteor/client/views/room/composer/messageBox/MessageBox.tsx` then calls `onSend` in `apps/meteor/client/views/room/composer/messageBox/ComposerMessage.tsx`.
3.  **Client-side Flow Logic:** The `onSend` function in `apps/meteor/client/views/room/composer/messageBox/ComposerMessage.tsx` invokes the `sendMessage` function located in `apps/meteor/client/lib/chats/flows/sendMessage.ts`. This `sendMessage` function is responsible for initial message processing and composition (`chat.data.composeMessage`).
4.  **Message Processing and Server Hand-off:** Inside `apps/meteor/client/lib/chats/flows/sendMessage.ts`, the `sendMessage` function calls a `process` function (also within the same file). This `process` function is where the client-side flow culminates in a call to the server.
5.  **DDP Method Dispatch:** The `process` function in `apps/meteor/client/lib/chats/flows/sendMessage.ts` executes `sdk.call('sendMessage', message, previewUrls)`. This `sdk.call` is a crucial step as it dispatches a DDP (Distributed Data Protocol) method named 'sendMessage' to the Rocket.Chat server, passing the message data and any associated preview URLs.

The server-side handling for this DDP method would typically be defined in files like `apps/meteor/app/lib/server/methods/sendMessage.ts` or `apps/meteor/server/services/messages/service.ts`, where the server processes the incoming message.

## Tool Calls (8 calls, 86,754 tokens)

**Step 1:** `search({"layer":"client","query":"sendMessage"})` → 600 tokens
**Step 2:** `graph({"layer":"client","query":"handleSendMessage","file":"apps/meteor/client/views/room/composer/message)` → 1699 tokens
**Step 3:** `implement({"filename":"apps/meteor/client/lib/chats/flows/sendMessage.ts","symbolName":"sendMessage"})` → 625 tokens
**Step 4:** `graph({"direction":"down","file":"apps/meteor/client/lib/chats/flows/sendMessage.ts","query":"sendMessage")` → 2726 tokens
**Step 5:** `implement({"filename":"apps/meteor/client/lib/chats/flows/sendMessage.ts","symbolName":"process"})` → 320 tokens
**Step 6:** `search({"layer":"server","query":"sendMessage"})` → 588 tokens
**Step 7:** `implement({"filename":"apps/meteor/app/lib/server/methods/sendMessage.ts","symbolName":"sendMessage"})` → 509 tokens
**Step 8:** `implement({"filename":"apps/meteor/server/services/messages/service.ts","symbolName":"sendMessage"})` → 509 tokens
