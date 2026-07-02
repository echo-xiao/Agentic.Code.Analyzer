# What is the complete call chain for sendMessage?

## Gemini Answer

The complete call chain for `sendMessage` in Rocket.Chat is as follows:

**Entry Point (Client-side):**

1.  **Client-side DDP Method Call:** `methodCall('sendMessage')`
    *   File: `apps/meteor/tests/data/messages.helper.ts` (This file demonstrates how the client-side initiates the DDP method call to send a message.)

**Server-side DDP Method Handler:**

2.  **Server-side DDP Method:** `Meteor.methods({ sendMessage })`
    *   File: `apps/meteor/app/lib/server/methods/sendMessage.ts` (This is the server-side handler that receives the DDP call from the client.)

**Core Server-side Message Sending Function:**

3.  **Core Message Sending Function:** `sendMessage`
    *   File: `apps/meteor/app/lib/server/functions/sendMessage.ts` (This function contains the primary logic for processing, validating, and storing messages.)

**Internal Calls within the Core Function (`apps/meteor/app/lib/server/functions/sendMessage.ts`):**

4.  **Message Validation:** `validateMessage(message, room, user)`
    *   File: `apps/meteor/app/lib/server/functions/sendMessage.ts` (The call to validate the message content and structure.)
5.  **Message Preparation:** `prepareMessageObject(message, room._id, user)`
    *   File: `apps/meteor/app/lib/server/functions/sendMessage.ts` (The call to prepare the message object before persistence.)
6.  **Apps Engine Pre-Message Hooks:** `Apps.self?.triggerEvent(AppEvents.IPreMessageSentPrevent, message)`, `Apps.self?.triggerEvent(AppEvents.IPreMessageSentExtend, message)`, `Apps.self?.triggerEvent(AppEvents.IPreMessageSentModify, message)`
    *   File: `apps/meteor/app/lib/server/functions/sendMessage.ts` (These calls allow Rocket.Chat Apps to intercept and modify messages before they are saved.)
7.  **Message Pre-save Hook:** `Message.beforeSave({ message, room, user, previewUrls, parseUrls: message.parseUrls })`
    *   File: `apps/meteor/app/lib/server/functions/sendMessage.ts` (A hook for further processing or modification of the message object before it's written to the database.)
8.  **Database Persistence:** `Messages.updateOne(...)` or `Messages.insertOne(...)`
    *   File: `apps/meteor/app/lib/server/functions/sendMessage.ts` (These calls interact with the database to either update an existing message or insert a new one.)
9.  **Apps Engine Post-Message Hooks:** `Apps.self?.triggerEvent(messageEvent, message)` (where `messageEvent` is `AppEvents.IPostSystemMessageSent` or `AppEvents.IPostMessageSent`)
    *   File: `apps/meteor/app/lib/server/functions/sendMessage.ts` (These calls allow Rocket.Chat Apps to react to messages after they have been saved.)
10. **After Save Message Processing:** `afterSaveMessage(message, room, user)`
    *   File: `apps/meteor/app/lib/server/functions/sendMessage.ts` (This call initiates post-save processing for the message.)
    *   Implementation: `apps/meteor/app/lib/server/lib/afterSaveMessage.ts` (This file contains the implementation and various listeners for actions after a message is saved.)
11. **Room Change Notification:** `notifyOnRoomChangedById(message.rid)`
    *   File: `apps/meteor/app/lib/server/functions/sendMessage.ts` (This call triggers notifications to update clients about changes in the room.)
    *   Implementation: `apps/meteor/app/lib/server/lib/notifyListener.ts` (This file likely contains the implementation for notifying listeners about room changes.)

## Tool Calls (11 calls, 64,519 tokens)

**Step 1:** `plan({"intent":"call-chain","question":"What is the complete call chain for sendMessage?"})` → 81 tokens
**Step 2:** `search({"query":"sendMessage"})` → 832 tokens
**Step 3:** `graph({"query":"sendMessage","file":"apps/meteor/app/lib/server/functions/sendMessage.ts","depth":5,"move")` → 3279 tokens
**Step 4:** `graph({"depth":3,"move":"down","file":"apps/meteor/app/lib/server/methods/sendMessage.ts","query":"sendMes)` → 1085 tokens
**Step 5:** `details({"filename":"apps/meteor/client/lib/client/methods/sendMessage.ts","symbolName":"sendMessage"})` → 348 tokens
**Step 6:** `details({"filename":"apps/meteor/app/lib/server/methods/sendMessage.ts","symbolName":"sendMessage"})` → 509 tokens
**Step 7:** `details({"filename":"apps/meteor/app/lib/server/functions/sendMessage.ts","symbolName":"sendMessage"})` → 617 tokens
**Step 8:** `search({"query":"validateMessage"})` → 286 tokens
**Step 9:** `search({"query":"prepareMessageObject"})` → 99 tokens
**Step 10:** `search({"query":"Message.beforeSave"})` → 185 tokens
**Step 11:** `search({"query":"afterSaveMessage"})` → 270 tokens

## Files Seen In Tool Results (35)

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
- `apps/meteor/app/livechat/server/hooks/leadCapture.ts`
- `apps/meteor/app/importer-slack/server/SlackImporter.ts`
- `apps/meteor/app/message-pin/server/pinMessage.ts`
- `apps/meteor/app/lib/server/functions/updateMessage.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
- `apps/meteor/app/search/server/events/index.ts`
- `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`
- `apps/meteor/app/threads/server/hooks/aftersavemessage.ts`
