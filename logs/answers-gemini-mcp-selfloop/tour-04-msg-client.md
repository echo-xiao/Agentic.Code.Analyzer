# How is a message sent on the client side in Rocket.Chat?

## Gemini Answer

A message is sent on the client side in Rocket.Chat through the following call chain:

**Entry → Step 1 → Step 2 → Step 3**

1.  **`handleSendMessage`** in `apps/meteor/client/views/room/composer/messageBox/MessageBox.tsx`: This is the initial entry point when a user interacts with the message box to send a message.
2.  **`onSend`** in `apps/meteor/client/views/room/composer/messageBox/ComposerMessage.tsx`: This function is called by `handleSendMessage` and is responsible for further processing the message.
3.  **`sendMessage`** in `apps/meteor/client/lib/chats/flows/sendMessage.ts`: This function is called by `onSend` and prepares the message for transmission.
4.  **`sendMessage`** in `packages/ddp-client/src/livechat/LivechatClientImpl.ts`: This is the final client-side function that dispatches the message. It makes a `POST` request to the `/v1/livechat/message` API endpoint.

The `LivechatClientImpl.sendMessage` method in `packages/ddp-client/src/livechat/LivechatClientImpl.ts` is responsible for sending the message to the server via a REST API call. It takes `OperationParams<'POST', '/v1/livechat/message'>` as input and returns a `Promise` of the serialized result.

## Tool Calls (8 calls, 69,447 tokens)

**Step 1:** `search({"layer":"client","query":"sendMessage"})` → 600 tokens
**Step 2:** `graph({"query":"handleSendMessage","file":"apps/meteor/client/views/room/composer/messageBox/MessageBox.ts)` → 1699 tokens
**Step 3:** `implement({"filename":"packages/livechat/src/lib/LivechatClientImpl.ts","symbolName":"sendMessage"})` → 352 tokens
**Step 4:** `graph({"file":"apps/meteor/client/lib/chats/flows/sendMessage.ts","direction":"down","query":"sendMessage")` → 1013 tokens
**Step 5:** `implement({"filename":"packages/livechat/src/lib/LivechatClientImpl.ts","symbolName":"sendMessage"})` → 352 tokens
**Step 6:** `search({"layer":"packages","query":"sendMessage"})` → 483 tokens
**Step 7:** `implement({"symbolName":"sendMessage","filename":"packages/ddp-client/src/livechat/LivechatClientImpl.ts"})` → 510 tokens
**Step 8:** `implement({"filename":"packages/ddp-client/src/livechat/LivechatClientImpl.ts","symbolName":"LivechatClientImp)` → 1617 tokens

## Files Seen In Tool Results (33)

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
- `packages/ddp-client/src/livechat/LivechatClientImpl.ts`
- `packages/ddp-client/src/legacy/RocketchatSDKLegacy.ts`
- `ee/packages/federation-matrix/src/FederationMatrix.ts`
- `packages/apps-engine/src/server/managers/AppOutboundCommunicationProviderManager.ts`
- `apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-livechat-embedded.ts`
- `apps/meteor/tests/e2e/page-objects/fragments/home-content.ts`
- `apps/meteor/tests/e2e/federation/page-objects/fragments/home-content.ts`
- `apps/meteor/tests/data/chat.helper.ts`
- `apps/meteor/tests/data/livechat/rooms.ts`
- `apps/meteor/server/services/messages/service.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/api/lib/outbound.ts`
- `apps/meteor/app/slackbridge/server/SlackAPI.ts`
- `apps/meteor/app/livechat/server/lib/messages.ts`
- `apps/meteor/app/integrations/server/lib/triggerHandler.ts`
