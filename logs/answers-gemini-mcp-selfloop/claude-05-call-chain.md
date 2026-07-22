# What is the complete call chain for sendMessage?

## Plan

intent: call-chain

## Gemini Answer

The `sendMessage` functionality in Rocket.Chat has both client-side and server-side components.

**Client-side Call Chain:**

The client-side initiation of `sendMessage` is found in:
*   `apps/meteor/client/lib/chats/flows/sendMessage.ts`

This client-side `sendMessage` function orchestrates the message sending flow. It performs initial checks, composes the message object, and then calls a `process` function.

The `process` function, also located in `apps/meteor/client/lib/chats/flows/sendMessage.ts`, handles various pre-sending steps:
*   `processSetReaction`
*   `processTooLongMessage`
*   `processSlashCommand` (if `isSlashCommandAllowed` is true)
*   `processMessageUploads`
*   `onClientBeforeSendMessage` (a client-side hook for message modification)
*   `processMessageEditing`

Finally, the client-side `process` function makes a call to the server using the SDK:
*   `sdk.call('sendMessage', message, previewUrls)`

**Server-side Call Chain:**

The server-side `sendMessage` function is located in:
*   `apps/meteor/app/lib/server/functions/sendMessage.ts`

This server-side function is responsible for validating, preparing, and persisting the message. Its key steps include:
1.  `validateMessage`: Validates the message, room, and user.
2.  `prepareMessageObject`: Prepares the message object with necessary data.
3.  **Apps Engine Integration**: If the Apps Engine is loaded, it triggers several events:
    *   `AppEvents.IPreMessageSentPrevent`: Allows apps to prevent message sending.
    *   `AppEvents.IPreMessageSentExtend`: Allows apps to extend the message object.
    *   `AppEvents.IPreMessageSentModify`: Allows apps to modify the message object.
4.  `Message.beforeSave`: A hook for further message processing before saving.
5.  **Database Operations**:
    *   If `message._id` exists and `upsert` is true, it updates an existing message using `Messages.updateOne`.
    *   Otherwise, it inserts a new message using `Messages.insertOne`.
6.  **Apps Engine Post-Send**: If the Apps Engine is loaded, it triggers post-send events:
    *   `AppEvents.IPostSystemMessageSent` (for system messages)
    *   `AppEvents.IPostMessageSent` (for regular messages)
7.  `afterSaveMessage`: A hook for actions to be performed after the message is saved.
8.  `notifyOnRoomChangedById`: Notifies clients about changes in the room.

**Summary of the complete call chain:**

Client-side:
`apps/meteor/client/lib/chats/flows/sendMessage.ts::sendMessage`
  → `apps/meteor/client/lib/chats/flows/sendMessage.ts::process`
    → `sdk.call('sendMessage', ...)`

Server-side:
`apps/meteor/app/lib/server/functions/sendMessage.ts::sendMessage`
  → `apps/meteor/app/lib/server/functions/sendMessage.ts::validateMessage`
  → `apps/meteor/app/lib/server/functions/sendMessage.ts::prepareMessageObject`
  → `Apps.self?.triggerEvent(AppEvents.IPreMessageSentPrevent, ...)`
  → `Apps.self?.triggerEvent(AppEvents.IPreMessageSentExtend, ...)`
  → `Apps.self?.triggerEvent(AppEvents.IPreMessageSentModify, ...)`
  → `Message.beforeSave(...)`
  → `Messages.updateOne(...)` or `Messages.insertOne(...)`
  → `Apps.self?.triggerEvent(AppEvents.IPostSystemMessageSent | AppEvents.IPostMessageSent, ...)`
  → `afterSaveMessage(...)`
  → `notifyOnRoomChangedById(...)`

## Tool Calls (8 calls, 116,878 tokens)

**Step 1:** `plan({"question":"What is the complete call chain for sendMessage?","intent":"call-chain"})` → 3547 tokens
**Step 2:** `search({"query":"sendMessage"})` → 728 tokens
**Step 3:** `graph({"move":"down","query":"sendMessage","depth":5,"file":"sendMessage.ts"})` → 2706 tokens
**Step 4:** `graph({"file":"sendMessage.ts","query":"sendMessage","depth":5,"move":"down"})` → 2706 tokens
**Step 5:** `details({"filename":"sendMessage.ts","symbolName":"sendMessage"})` → 509 tokens
**Step 6:** `details({"symbolName":"sendMessage","filename":"sendMessage.ts"})` → 617 tokens
**Step 7:** `details({"filename":"sendMessage.ts","symbolName":"sendMessage"})` → 621 tokens
**Step 8:** `details({"filename":"sendMessage.ts","symbolName":"process"})` → 317 tokens

## Files Seen In Tool Results (52)

- `apps/meteor/app/message-pin/server/pinMessage.ts`
- `packages/ui-composer/src/MessageFooterCallout/MessageFooterCalloutContent.tsx`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterReadMessages.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterDeleteRoom.ts`
- `apps/meteor/ee/server/api/chat.ts`
- `packages/ui-composer/src/MessageComposer/MessageComposer.tsx`
- `packages/ui-composer/src/MessageComposer/MessageComposerIcon.tsx`
- `apps/meteor/app/api/server/v1/chat.ts`
- `apps/meteor/app/ui-utils/client/lib/messageBox.ts`
- `packages/core-services/src/LocalBroker.ts`
- `apps/meteor/client/lib/onClientMessageReceived.ts`
- `apps/meteor/server/services/messages/service.ts`
- `apps/meteor/app/livechat/server/api/v1/message.ts`
- `apps/meteor/client/lib/onClientBeforeSendMessage.ts`
- `apps/meteor/client/lib/chats/flows/sendMessage.ts`
- `packages/core-typings/src/IMessage/MessageAttachment/MessageQuoteAttachment.ts`
- `apps/meteor/app/livechat/server/api/v1/offlineMessage.ts`
- `packages/message-parser/src/definitions.ts`
- `apps/meteor/app/ui/client/lib/ChatMessages.ts`
- `apps/meteor/app/autotranslate/server/methods/translateMessage.ts`
- `apps/meteor/app/ui/client/lib/CurrentEditingMessage.ts`
- `apps/meteor/app/livechat/server/methods/sendMessageLivechat.ts`
- `apps/meteor/app/livechat/server/lib/messages.ts`
- `apps/meteor/app/lib/server/methods/sendMessage.ts`
- `apps/meteor/app/lib/client/methods/sendMessage.ts`
- `apps/meteor/client/views/room/MessageList/MessageListItem.tsx`
- `apps/meteor/app/lib/server/functions/insertMessage.ts`
- `apps/meteor/app/livechat/imports/server/rest/sms.ts`
- `apps/meteor/client/views/room/MessageList/lib/isMessageNewDay.ts`
- `apps/meteor/client/views/room/MessageList/lib/isMessageSequential.ts`
- `packages/apps-engine/src/definition/messages/IMessage.ts`
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
- `apps/meteor/ee/app/livechat-enterprise/server/api/lib/outbound.ts`
- `apps/meteor/app/slackbridge/server/SlackAPI.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `apps/meteor/app/integrations/server/lib/triggerHandler.ts`
- `ee/packages/omni-core-ee/src/outbound-communication/validators/canSendMessage.ts`
- `apps/meteor/tests/e2e/utils/sendMessage.ts`
- `apps/meteor/server/lib/sendMessagesToAdmins.ts`
- `apps/meteor/client/views/omnichannel/triggers/actions/SendMessageActionForm.tsx`
- `apps/meteor/app/livechat/server/sendMessageBySMS.ts`
- `apps/meteor/app/authorization/server/functions/canSendMessage.ts`
