# How is a message sent on the server side in Rocket.Chat?

## Gemini Answer

On the server side, a message in Rocket.Chat is sent through a series of validations, preparations, app integrations, and database operations, orchestrated by the `sendMessage` function.

The call chain for sending a message on the server side is as follows:

`sendMessage` (apps/meteor/app/lib/server/functions/sendMessage.ts)
  → `validateMessage` (likely within apps/meteor/app/lib/server/functions/sendMessage.ts or a related file)
  → `prepareMessageObject` (likely within apps/meteor/app/lib/server/functions/sendMessage.ts or a related file)
  → `Apps.self?.triggerEvent` (packages/apps-engine/src/server/Apps.ts) - for pre-message events
  → `Message.beforeSave` (apps/meteor/app/lib/server/lib/Message.ts)
  → `Messages.updateOne` or `Messages.insertOne` or `Messages.findOneById` (apps/meteor/app/lib/server/lib/Messages.ts) - for database persistence
  → `Apps.self?.triggerEvent` (packages/apps-engine/src/server/Apps.ts) - for post-message events
  → `afterSaveMessage` (likely within apps/meteor/app/lib/server/functions/sendMessage.ts or a related file)
  → `notifyOnRoomChangedById` (apps/meteor/app/lib/server/functions/notifyListener.ts)

Here's a detailed breakdown of the process:

1.  **Initial Validation and Preparation**: The `sendMessage` function, located in `apps/meteor/app/lib/server/functions/sendMessage.ts`, first validates the user, message, and room. It then prepares the message object, adding necessary fields like `_id`, `ts` (timestamp), and `u` (user information). If read receipts are enabled, the message is marked as `unread`.

2.  **Rocket.Chat Apps Integration (Pre-send)**: Before the message is saved, Rocket.Chat Apps can interact with it. The system triggers `IPreMessageSentPrevent`, `IPreMessageSentExtend`, and `IPreMessageSentModify` events via `Apps.self?.triggerEvent` (defined in `packages/apps-engine/src/server/Apps.ts`). This allows installed apps to prevent the message from being sent, extend its data, or modify its content.

3.  **`Message.beforeSave` Hook**: The message then passes through the `Message.beforeSave` hook (likely defined in `apps/meteor/app/lib/server/lib/Message.ts`), which performs further processing or transformations before persistence.

4.  **Database Persistence**:
    *   If the message has an `_id` and the `upsert` option is true, the system updates an existing message in the `Messages` collection using `Messages.updateOne` (from `apps/meteor/app/lib/server/lib/Messages.ts`).
    *   Otherwise, it checks if a message with the given `_id` already exists using `Messages.findOneById`. If not, the new message is inserted into the `Messages` collection using `Messages.insertOne` (both from `apps/meteor/app/lib/server/lib/Messages.ts`).

5.  **Rocket.Chat Apps Integration (Post-send)**: After the message is successfully saved to the database, Rocket.Chat Apps are notified. The system triggers either `IPostSystemMessageSent` (for system messages) or `IPostMessageSent` (for regular messages) events via `Apps.self?.triggerEvent`.

6.  **`afterSaveMessage` Hook**: A final `afterSaveMessage` hook is called (likely within `apps/meteor/app/lib/server/functions/sendMessage.ts` or a related file) for any post-save processing.

7.  **Client Notification**: Finally, `notifyOnRoomChangedById` (from `apps/meteor/app/lib/server/functions/notifyListener.ts`) is called to inform clients about the change in the room, ensuring real-time updates.

## Tool Calls (3 calls, 16,827 tokens)

**Step 1:** `search({"layer":"server","query":"sendMessage"})` → 588 tokens
**Step 2:** `graph({"file":"apps/meteor/app/lib/server/functions/sendMessage.ts","query":"sendMessage","layer":"server")` → 1882 tokens
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
