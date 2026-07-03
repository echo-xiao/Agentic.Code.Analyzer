# What is the complete call chain for sendMessage?

## Plan

intent: call-chain

## Gemini Answer

The complete call chain for `sendMessage` involves both client-side and server-side components, connected via a DDP method call.

**Call Chain:**

1.  **Entry Point (Client-side):** `sendMessage` in `apps/meteor/client/lib/chats/flows/sendMessage.ts`
    *   This function handles the initial client-side logic for sending a message, including joining rooms, clearing unread marks, and composing the message object.

2.  **Processing (Client-side):** `process` in `apps/meteor/client/lib/chats/flows/sendMessage.ts`
    *   Called by the client-side `sendMessage` function.
    *   This function performs various pre-processing steps like handling reactions, long messages, slash commands, and message uploads.
    *   Crucially, it makes the DDP method call to the server.

3.  **DDP Method Dispatch:** `sdk.call('sendMessage', message, previewUrls)`
    *   This is the mechanism by which the client communicates with the server. The `sdk.call` function dispatches the `sendMessage` method to the server over the DDP protocol.

4.  **Method Handler (Server-side):** `sendMessage` in `apps/meteor/app/lib/server/methods/sendMessage.ts`
    *   This is the server-side `Meteor.methods` handler that receives the `sendMessage` call from the client.
    *   It performs server-side operations such as permission checks, database updates, and notifications.

## Tool Calls (7 calls, 54,696 tokens)

**Step 1:** `plan({"question":"What is the complete call chain for sendMessage?","intent":"call-chain"})` → 191 tokens
**Step 2:** `search({"query":"sendMessage"})` → 728 tokens
**Step 3:** `graph({"query":"sendMessage","move":"down","depth":5,"file":"sendMessage.ts"})` → 3176 tokens
**Step 4:** `details({"filename":"sendMessage.ts","symbolName":"sendMessage"})` → 520 tokens
**Step 5:** `details({"filename":"sendMessage.ts","symbolName":"sendMessage"})` → 621 tokens
**Step 6:** `graph({"file":"sendMessage.ts","depth":5,"query":"sendMessage","move":"down"})` → 3176 tokens
**Step 7:** `details({"symbolName":"process","filename":"sendMessage.ts"})` → 317 tokens

## Files Seen In Tool Results (27)

- `packages/ddp-client/src/livechat/LivechatClientImpl.ts`
- `packages/ddp-client/src/legacy/RocketchatSDKLegacy.ts`
- `ee/packages/federation-matrix/src/FederationMatrix.ts`
- `apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-livechat.ts`
- `apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-livechat-embedded.ts`
- `apps/meteor/tests/e2e/page-objects/fragments/home-content.ts`
- `apps/meteor/tests/e2e/federation/page-objects/fragments/home-content.ts`
- `apps/meteor/tests/data/messages.helper.ts`
- `apps/meteor/tests/data/chat.helper.ts`
- `apps/meteor/tests/data/livechat/rooms.ts`
- `apps/meteor/server/services/messages/service.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/api/lib/outbound.ts`
- `apps/meteor/client/lib/chats/flows/sendMessage.ts`
- `apps/meteor/app/slackbridge/server/SlackAPI.ts`
- `apps/meteor/app/livechat/server/lib/messages.ts`
- `apps/meteor/app/lib/server/methods/sendMessage.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `apps/meteor/app/lib/client/methods/sendMessage.ts`
- `apps/meteor/app/integrations/server/lib/triggerHandler.ts`
- `ee/packages/omni-core-ee/src/outbound-communication/validators/canSendMessage.ts`
- `apps/meteor/tests/e2e/utils/sendMessage.ts`
- `apps/meteor/server/lib/sendMessagesToAdmins.ts`
- `apps/meteor/client/views/omnichannel/triggers/actions/SendMessageActionForm.tsx`
- `apps/meteor/client/lib/onClientBeforeSendMessage.ts`
- `apps/meteor/app/livechat/server/sendMessageBySMS.ts`
- `apps/meteor/app/livechat/server/methods/sendMessageLivechat.ts`
- `apps/meteor/app/authorization/server/functions/canSendMessage.ts`
