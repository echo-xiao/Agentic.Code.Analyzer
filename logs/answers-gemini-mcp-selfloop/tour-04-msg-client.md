# How is a message sent on the client side in Rocket.Chat?

## Gemini Answer

A message is sent on the client side in Rocket.Chat through the following call chain:

1.  **`handleSendMessage`** in `apps/meteor/client/views/room/composer/messageBox/MessageBox.tsx`: This is the initial entry point when a user interacts with the message box to send a message.
2.  **`onSend`** in `apps/meteor/client/views/room/composer/messageBox/ComposerMessage.tsx`: `handleSendMessage` calls this function, which is responsible for further processing of the message.
3.  **`sendMessage`** in `apps/meteor/client/lib/chats/flows/sendMessage.ts`: `onSend` then calls this `sendMessage` function, which handles client-side message preparation, including joining a room if necessary, clearing unread marks, composing the message data, and handling file uploads.
4.  **`process`** in `apps/meteor/client/lib/chats/flows/sendMessage.ts`: Within the `sendMessage` function, the `process` function is called. This function is responsible for the actual dispatch of the message.
5.  **`call`** in `packages/ddp-client/src/MinimalDDPClient.ts`: The `process` function ultimately makes a DDP method call to the server using `MinimalDDPClient.call()`. This is the point where the client-side message sending logic transitions to network communication, sending the message data to the server via the DDP protocol over a WebSocket connection. The server-side `Meteor.methods({ sendMessage })` would then handle this incoming call.

## Tool Calls (6 calls, 41,089 tokens)

**Step 1:** `search({"query":"sendMessage","layer":"client"})` → 600 tokens
**Step 2:** `graph({"file":"apps/meteor/client/views/room/composer/messageBox/MessageBox.tsx","direction":"down","layer)` → 1699 tokens
**Step 3:** `implement({"filename":"packages/livechat/src/lib/LivechatClientImpl.ts","symbolName":"sendMessage"})` → 352 tokens
**Step 4:** `graph({"layer":"client","file":"apps/meteor/client/lib/chats/flows/sendMessage.ts","query":"sendMessage",")` → 1013 tokens
**Step 5:** `implement({"filename":"apps/meteor/client/lib/chats/flows/sendMessage.ts","symbolName":"sendMessage"})` → 625 tokens
**Step 6:** `graph({"file":"apps/meteor/client/lib/chats/flows/sendMessage.ts","direction":"down","query":"process","la)` → 1898 tokens

## Files Seen In Tool Results (19)

- `apps/meteor/client/lib/chats/flows/sendMessage.ts`
- `apps/meteor/app/lib/client/methods/sendMessage.ts`
- `apps/meteor/client/views/room/composer/messageBox/MessageBox.tsx`
- `apps/meteor/app/livechat/server/sendMessageBySMS.ts`
- `packages/livechat/src/lib/triggerActions.ts`
- `apps/meteor/app/livechat/server/hooks/sendToCRM.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `packages/rest-typings/src/v1/chat.ts`
- `apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-livechat.ts`
- `apps/meteor/tests/e2e/utils/omnichannel/rooms.ts`
- `apps/meteor/tests/data/messages.helper.ts`
- `apps/meteor/client/views/omnichannel/triggers/actions/SendMessageActionForm.tsx`
- `apps/meteor/client/lib/onClientBeforeSendMessage.ts`
- `ee/packages/omni-core-ee/src/outbound-communication/validators/canSendMessage.ts`
- `apps/meteor/tests/e2e/utils/sendMessage.ts`
- `apps/meteor/server/lib/sendMessagesToAdmins.ts`
- `apps/meteor/app/livechat/server/methods/sendMessageLivechat.ts`
- `apps/meteor/app/lib/server/methods/sendMessage.ts`
- `apps/meteor/app/authorization/server/functions/canSendMessage.ts`
