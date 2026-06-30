# How is a message sent on the server side in Rocket.Chat?

## Gemini Answer

On the server side, a message in Rocket.Chat is sent through a comprehensive process orchestrated by the `sendMessage` function. This function handles validation, preparation, integration with Rocket.Chat Apps, database operations, and post-send notifications.

The call chain for sending a message on the server side is as follows:

`Entry Point (e.g., a DDP method call from the client) → sendMessage (apps/meteor/app/lib/server/functions/sendMessage.ts)`

Within `sendMessage` (located at `apps/meteor/app/lib/server/functions/sendMessage.ts`), the following key steps occur:

1.  **Validation and Preparation**:
    *   The message, room, and user are validated.
    *   The message object is prepared with necessary details.
    *   If read receipts are enabled, the message is marked as unread.

2.  **Rocket.Chat Apps Integration**:
    *   **`Apps.self?.triggerEvent(AppEvents.IPreMessageSentPrevent, message)`**: Rocket.Chat Apps can prevent the message from being sent.
    *   **`Apps.self?.triggerEvent(AppEvents.IPreMessageSentModify, ...)`** and **`Apps.self?.triggerEvent(AppEvents.IPreMessageSentExtend, message)`**: Apps can modify or extend the message content before it is saved.

3.  **Before Save Hook**:
    *   **`Message.beforeSave({ message, room, user, previewUrls, parseUrls: message.parseUrls })`**: A hook is executed to allow for additional processing or modifications before the message is persisted.

4.  **Database Operations**:
    *   The message is either inserted as a new document or an existing one is updated in the `Messages` collection. This is handled by **`Messages.updateOne(...)`** or **`Messages.insertOne(message)`**.

5.  **After Save Hook and Notifications**:
    *   **`Apps.self?.triggerEvent(messageEvent, message)`**: Post-message-sent events (`IPostSystemMessageSent` for system messages or `IPostMessageSent` for regular messages) are triggered for Rocket.Chat Apps.
    *   **`afterSaveMessage(message, room, user)`**: A hook is executed after the message has been successfully saved.
    *   **`notifyOnRoomChangedById(message.rid)`**: Clients are notified about changes in the room where the message was sent, ensuring real-time updates.

The primary file responsible for orchestrating this process is:
*   `apps/meteor/app/lib/server/functions/sendMessage.ts`
*   Database interactions occur via the `Messages` collection, likely defined in `packages/rocketchat-lib/server/lib/Messages.ts` or similar model files.
*   Notifications are handled by `notifyOnRoomChangedById` which is likely in `apps/meteor/server/lib/notifyListener.ts`.

## Tool Calls (3 calls, 16,745 tokens)

**Step 1:** `search({"query":"sendMessage","layer":"server"})` → 588 tokens
**Step 2:** `graph({"file":"apps/meteor/app/lib/server/functions/sendMessage.ts","direction":"down","layer":"server","q)` → 2057 tokens
**Step 3:** `implement({"filename":"apps/meteor/app/lib/server/functions/sendMessage.ts","symbolName":"sendMessage"})` → 621 tokens

## Files Seen In Tool Results (18)

- `apps/meteor/server/services/messages/service.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/api/lib/outbound.ts`
- `apps/meteor/app/slackbridge/server/SlackAPI.ts`
- `apps/meteor/app/livechat/server/lib/messages.ts`
- `apps/meteor/app/lib/server/methods/sendMessage.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `apps/meteor/app/integrations/server/lib/triggerHandler.ts`
- `apps/meteor/app/livechat/server/sendMessageBySMS.ts`
- `apps/meteor/app/livechat/server/hooks/sendToCRM.ts`
- `packages/livechat/src/lib/triggerActions.ts`
- `apps/meteor/client/views/room/composer/messageBox/MessageBox.tsx`
- `packages/rest-typings/src/v1/chat.ts`
- `packages/apps-engine/src/server/managers/AppOutboundCommunicationProviderManager.ts`
- `apps/meteor/server/features/EmailInbox/EmailInbox_Outgoing.ts`
- `apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-livechat.ts`
- `apps/meteor/server/lib/sendMessagesToAdmins.ts`
- `apps/meteor/app/livechat/server/methods/sendMessageLivechat.ts`
- `apps/meteor/app/authorization/server/functions/canSendMessage.ts`
