# How is a message sent on the server side in Rocket.Chat?

## Plan

intent: call-chain

## Gemini Answer

A message is sent on the server-side in Rocket.Chat through a series of validation, preparation, and persistence steps, orchestrated by the `sendMessage` function.

Here's the call chain:

1.  **`sendMessage`** (at `apps/meteor/app/lib/server/functions/sendMessage.ts`): This is the primary entry point for sending messages.
    *   It first performs essential checks for the `user`, `message`, and `room` objects.
    *   It calls `validateMessage` to ensure the message content is valid.
    *   It then calls `prepareMessageObject` to format the message for storage.
    *   If read receipts are enabled, it sets `message.unread = true`.
    *   It integrates with the Apps Engine, triggering `IPreMessageSentPrevent`, `IPreMessageSentExtend`, and `IPreMessageSentModify` events, allowing Rocket.Chat Apps to modify or prevent message sending.
    *   Crucially, it calls **`Message.beforeSave`** to apply various server-side hooks and transformations to the message.
    *   After `beforeSave`, it either updates an existing message in the `Messages` collection (if `upsert` is true and `_id` exists) or inserts a new message.
    *   Finally, it triggers `IPostSystemMessageSent` or `IPostMessageSent` events for the Apps Engine and calls `afterSaveMessage` for post-save processing.
    *   It then notifies clients about the room change using `notifyOnRoomChangedById`.

2.  **`Message.beforeSave`**: While the `sendMessage` function calls `Message.beforeSave`, the `Message` object itself (at `apps/meteor/app/ui-utils/server/Message.ts`) primarily handles message parsing for display purposes (e.g., converting newlines to `<br/>`, escaping HTML). The `beforeSave` method called within `sendMessage` is a server-side hook that is part of the `MessageService` (at `apps/meteor/server/services/messages/service.ts`). This `beforeSave` hook is responsible for applying a series of transformations and validations to the message before it's persisted to the database. These transformations can include things like markdown parsing, mention processing, bad word filtering, and more, often implemented as separate hooks.

In summary, the server-side message sending flow is:

`sendMessage` (apps/meteor/app/lib/server/functions/sendMessage.ts)
  → `validateMessage`
  → `prepareMessageObject`
  → Apps Engine `IPreMessageSentPrevent`, `IPreMessageSentExtend`, `IPreMessageSentModify` events
  → `Message.beforeSave` (implemented in `MessageService` at apps/meteor/server/services/messages/service.ts, which orchestrates various `beforeSave` hooks)
  → `Messages.updateOne` or `Messages.insertOne` (database persistence)
  → Apps Engine `IPostSystemMessageSent` or `IPostMessageSent` events
  → `afterSaveMessage`
  → `notifyOnRoomChangedById`

## Tool Calls (8 calls, 88,673 tokens)

**Step 1:** `plan({"question":"How is a message sent on the server side in Rocket.Chat?","intent":"call-chain"})` → 3715 tokens
**Step 2:** `search({"layer":"server","query":"sendMessage"})` → 318 tokens
**Step 3:** `graph({"file":"sendMessage.ts","query":"sendMessage","depth":5,"move":"down"})` → 2707 tokens
**Step 4:** `details({"filename":"sendMessage.ts","symbolName":"sendMessage"})` → 617 tokens
**Step 5:** `search({"query":"Message.beforeSave","layer":"server"})` → 185 tokens
**Step 6:** `search({"query":"Message","layer":"server"})` → 555 tokens
**Step 7:** `details({"filename":"Message.ts","symbolName":"Message"})` → 176 tokens
**Step 8:** `search({"query":"beforeSave","layer":"server"})` → 510 tokens

## Files Seen In Tool Results (68)

- `apps/meteor/app/message-pin/server/pinMessage.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterReadMessages.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterDeleteRoom.ts`
- `apps/meteor/ee/server/api/chat.ts`
- `packages/ui-composer/src/MessageComposer/MessageComposer.tsx`
- `packages/ui-composer/src/MessageComposer/MessageComposerIcon.tsx`
- `packages/ui-composer/src/MessageFooterCallout/MessageFooterCalloutContent.tsx`
- `apps/meteor/server/services/messages/service.ts`
- `apps/meteor/app/message-star/server/starMessage.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `packages/apps-engine/src/definition/messages/IMessage.ts`
- `packages/apps-engine/src/server/accessors/MessageRead.ts`
- `apps/meteor/app/apps/server/bridges/messages.ts`
- `apps/meteor/app/irc/server/irc-bridge/peerHandlers/sentMessage.js`
- `apps/meteor/app/apps/server/converters/messages.js`
- `apps/meteor/app/ui/client/lib/ChatMessages.ts`
- `ee/packages/federation-matrix/src/helpers/message.parsers.ts`
- `packages/models/src/models/Messages.ts`
- `apps/meteor/app/ui/client/lib/CurrentEditingMessage.ts`
- `apps/meteor/app/lib/server/functions/isTheLastMessage.ts`
- `apps/meteor/app/lib/server/functions/processWebhookMessage.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/notifier.ts`
- `ee/packages/federation-matrix/src/events/message.ts`
- `apps/meteor/app/version-check/server/functions/buildVersionUpdateMessage.ts`
- `apps/meteor/app/api/server/v1/chat.ts`
- `apps/meteor/client/views/room/contextualBar/MessageListTab.tsx`
- `apps/meteor/app/ui-utils/client/lib/messageBox.ts`
- `apps/meteor/client/lib/chats/flows/processTooLongMessage.ts`
- `apps/meteor/client/views/room/MessageList/MessageListItem.tsx`
- `apps/meteor/app/api/server/v1/instances.ts`
- `packages/apps-engine/deno-runtime/handlers/api-handler.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/api/lib/outbound.ts`
- `apps/meteor/app/slackbridge/server/SlackAPI.ts`
- `apps/meteor/app/livechat/server/lib/messages.ts`
- `apps/meteor/app/lib/server/methods/sendMessage.ts`
- `apps/meteor/app/integrations/server/lib/triggerHandler.ts`
- `apps/meteor/server/lib/sendMessagesToAdmins.ts`
- `apps/meteor/app/livechat/server/sendMessageBySMS.ts`
- `apps/meteor/app/livechat/server/methods/sendMessageLivechat.ts`
- `apps/meteor/app/authorization/server/functions/canSendMessage.ts`
- `apps/meteor/app/lib/server/functions/updateMessage.ts`
- `packages/apps-engine/src/server/runtime/deno/ProcessMessenger.ts`
- `packages/apps-engine/src/server/messages/Message.ts`
- `apps/meteor/app/ui-utils/server/Message.ts`
- `packages/apps-engine/src/server/bridges/OutboundMessagesBridge.ts`
- `packages/apps-engine/src/server/bridges/MessageBridge.ts`
- `packages/apps-engine/src/server/accessors/MessageExtender.ts`
- `packages/apps-engine/src/server/accessors/MessageBuilder.ts`
- `packages/apps-engine/src/server/accessors/LivechatMessageBuilder.ts`
- `apps/meteor/tests/unit/server/services/messages/hooks/BeforeSaveSpotify.tests.ts`
- `apps/meteor/tests/unit/server/services/messages/hooks/BeforeSavePreventMention.tests.ts`
- `apps/meteor/tests/unit/server/services/messages/hooks/BeforeSaveMarkdownParser.tests.ts`
- `apps/meteor/tests/unit/server/services/messages/hooks/BeforeSaveJumpToMessage.tests.ts`
- `apps/meteor/tests/unit/server/services/messages/hooks/BeforeSaveCheckMAC.tests.ts`
- `apps/meteor/tests/unit/server/services/messages/hooks/BeforeSaveBadWords.tests.ts`
- `apps/meteor/tests/unit/app/lib/server/lib/validateCustomMessageFields.tests.ts`
- `apps/meteor/tests/unit/app/lib/server/functions/notifications/messageContainsHighlight.tests.ts`
- `apps/meteor/tests/unit/app/apps/server/messages.tests.js`
- `apps/meteor/server/services/messages/hooks/BeforeSaveSpotify.ts`
- `apps/meteor/server/services/messages/hooks/BeforeSavePreventMention.ts`
- `apps/meteor/server/services/messages/hooks/BeforeSaveMentions.ts`
- `apps/meteor/server/services/messages/hooks/BeforeSaveMarkdownParser.ts`
- `apps/meteor/server/services/messages/hooks/BeforeSaveJumpToMessage.ts`
- `apps/meteor/server/services/messages/hooks/BeforeSaveCheckMAC.ts`
- `apps/meteor/server/services/messages/hooks/BeforeSaveBadWords.ts`
- `apps/meteor/ee/tests/unit/server/hooks/messages/BeforeSaveCannedResponse.tests.ts`
- `apps/meteor/ee/server/hooks/messages/BeforeSaveCannedResponse.ts`
