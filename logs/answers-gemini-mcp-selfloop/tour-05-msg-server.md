# How is a message sent on the server side in Rocket.Chat?

## Plan

intent: call-chain

## Gemini Answer

The process of sending a message on the server side in Rocket.Chat primarily involves the `executeSendMessage` function, which then calls the core `sendMessage` function.

Here's the call chain:

**Entry Points:**

1.  **Meteor Method:** The `sendMessage` Meteor method, defined in `apps/meteor/app/lib/server/methods/sendMessage.ts`, serves as one of the entry points.
2.  **REST API Endpoint:** The `chat.sendMessage` REST API endpoint (though the exact file path was not confirmed by the grounding footer, the wiki indicates its existence) is another entry point.

**Core Message Sending Flow:**

1.  **`executeSendMessage`** (`apps/meteor/app/lib/server/methods/sendMessage.ts`): This function is responsible for initial validation and preparation.
    *   It validates the message timestamp, ensuring it's within an acceptable range.
    *   It checks if the message size exceeds the `Message_MaxAllowedSize` setting.
    *   It retrieves user and room information.
    *   It verifies if the user has permission to send messages in the given room using `canSendMessageAsync` (found in `apps/meteor/app/authorization/server/functions/canSendMessage.ts`).
    *   For encrypted rooms, it enforces that only E2E messages can be sent if `E2E_Allow_Unencrypted_Messages` is disabled.
    *   Finally, it calls the core `sendMessage` function.

2.  **`sendMessage`** (`apps/meteor/app/lib/server/functions/sendMessage.ts`): This is the core function for message persistence and post-processing.
    *   It validates the message object and prepares it with user and room details.
    *   It handles message attachments and custom fields validation.
    *   It integrates with Rocket.Chat Apps, allowing them to prevent, extend, or modify messages before they are saved.
    *   The `Message.beforeSave` hook is triggered for further processing.
    *   The message is then inserted into the `Messages` collection.
    *   After saving, Apps are notified via `IPostMessageSent` or `IPostSystemMessageSent` events.
    *   Finally, `afterSaveMessage` is called for post-save operations, and `notifyOnRoomChangedById` broadcasts changes to relevant clients.

## Tool Calls (8 calls, 51,355 tokens)

**Step 1:** `plan({"question":"How is a message sent on the server side in Rocket.Chat?","intent":"call-chain"})` → 1149 tokens
**Step 2:** `search({"query":"sendMessage","layer":"server"})` → 318 tokens
**Step 3:** `search({"layer":"server","query":"executeSendMessage"})` → 73 tokens
**Step 4:** `graph({"move":"down","depth":3,"file":"sendMessage.ts","query":"executeSendMessage"})` → 1220 tokens
**Step 5:** `details({"filename":"sendMessage.ts","symbolName":"executeSendMessage"})` → 850 tokens
**Step 6:** `details({"filename":"sendMessage.ts","symbolName":"sendMessage"})` → 617 tokens
**Step 7:** `details({"filename":"sendMessage.ts","symbolName":"sendMessage"})` → 520 tokens
**Step 8:** `details({"filename":"sendMessage.ts","symbolName":"*"})` → 14 tokens

## Files Seen In Tool Results (25)

- `apps/meteor/server/lib/messages/sendMessage.ts`
- `apps/meteor/app/lib/server/methods/sendMessage.ts`
- `apps/meteor/server/api/v1/chat.ts`
- `apps/meteor/server/services/messages/service.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/api/lib/outbound.ts`
- `apps/meteor/app/slackbridge/server/SlackAPI.ts`
- `apps/meteor/app/livechat/server/lib/messages.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `apps/meteor/app/integrations/server/lib/triggerHandler.ts`
- `apps/meteor/server/lib/sendMessagesToAdmins.ts`
- `apps/meteor/app/livechat/server/sendMessageBySMS.ts`
- `apps/meteor/app/livechat/server/methods/sendMessageLivechat.ts`
- `apps/meteor/app/authorization/server/functions/canSendMessage.ts`
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
- `apps/meteor/client/lib/chats/flows/sendMessage.ts`
- `apps/meteor/app/lib/client/methods/sendMessage.ts`
