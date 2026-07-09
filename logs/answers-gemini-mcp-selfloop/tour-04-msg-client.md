# How is a message sent on the client side in Rocket.Chat?

## Plan

intent: call-chain

## Gemini Answer

On the client side in Rocket.Chat, a message is sent through the following flow:

Entry: `sendMessage` function in `apps/meteor/client/lib/chats/flows/sendMessage.ts`
This function initiates the message sending process. It first checks if the user is subscribed to the room and attempts to join if not. It also handles message text cleaning and composition.

Step 1: `process` function in `apps/meteor/client/lib/chats/flows/sendMessage.ts`
The `sendMessage` function calls the `process` function, which orchestrates several preprocessing steps:
*   `processSetReaction`: Handles setting reactions.
*   `processTooLongMessage`: Checks if the message exceeds length limits.
*   `processSlashCommand`: Parses and handles slash commands.
*   `processMessageUploads`: Manages file attachments and uploads.
*   `onClientBeforeSendMessage`: A hook for additional client-side processing.
*   `processMessageEditing`: Handles logic for editing existing messages.

Step 2: Server Communication via SDK
After all preprocessing, the `process` function makes a call to the server using the SDK:
`await sdk.call('sendMessage', message, previewUrls);`
This invokes the `sendMessage` Meteor method on the server, sending the composed message and any preview URLs.

Step 3: Optimistic UI Update and Finalization
After the server request is complete, the client-side `Messages.state.update` is called to update the message's status, clearing its temporary flag and finalizing its display in the UI.

**Core Files:**
*   `apps/meteor/client/lib/chats/flows/sendMessage.ts`: Contains the `sendMessage` and `process` functions, which are central to the client-side message sending flow.

## Tool Calls (6 calls, 35,585 tokens)

**Step 1:** `plan({"question":"How is a message sent on the client side in Rocket.Chat?","intent":"call-chain"})` → 1038 tokens
**Step 2:** `search({"query":"sendMessage","layer":"client"})` → 150 tokens
**Step 3:** `graph({"move":"down","file":"sendMessage.ts","depth":5,"query":"sendMessage"})` → 2706 tokens
**Step 4:** `details({"filename":"sendMessage.ts","symbolName":"sendMessage"})` → 621 tokens
**Step 5:** `search({"query":"process","layer":"client"})` → 218 tokens
**Step 6:** `details({"symbolName":"process","filename":"sendMessage.ts"})` → 317 tokens

## Files Seen In Tool Results (13)

- `apps/meteor/client/lib/chats/flows/sendMessage.ts`
- `apps/meteor/server/lib/messages/sendMessage.ts`
- `apps/meteor/tests/end-to-end/api/chat.ts`
- `ee/packages/federation-matrix/tests/end-to-end/messaging.spec.ts`
- `apps/meteor/app/lib/client/methods/sendMessage.ts`
- `apps/meteor/client/views/omnichannel/triggers/actions/SendMessageActionForm.tsx`
- `apps/meteor/client/lib/onClientBeforeSendMessage.ts`
- `apps/meteor/client/lib/chats/flows/processTooLongMessage.ts`
- `apps/meteor/client/lib/chats/flows/processSlashCommand.ts`
- `apps/meteor/client/lib/chats/flows/processSetReaction.ts`
- `apps/meteor/client/lib/chats/flows/processMessageUploads.ts`
- `apps/meteor/client/lib/chats/flows/processMessageEditing.ts`
- `apps/meteor/client/lib/2fa/process2faReturn.ts`
