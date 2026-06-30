# How is a message sent on the server side in Rocket.Chat?

## Gemini Answer

A message is sent on the server side in Rocket.Chat through the `sendMessage` function, which is located in `apps/meteor/app/lib/server/functions/sendMessage.ts`. This function orchestrates the entire process, from validation to persistence and real-time notification.

The call chain is as follows:

`apps/meteor/app/lib/server/functions/sendMessage.ts` (`sendMessage`)
1.  **Validation and Preparation**: The message is validated and prepared using `validateMessage` and `prepareMessageObject` (exact files for these functions are not shown in the `implement` output but are implicitly called).
2.  **App Event Hooks**:
    *   `Apps.self?.triggerEvent(AppEvents.IPreMessageSentPrevent, message)`: Allows Rocket.Chat Apps to prevent the message from being sent.
    *   `Apps.self?.triggerEvent(AppEvents.IPreMessageSentExtend, message)`: Allows Apps to extend the message.
    *   `Apps.self?.triggerEvent(AppEvents.IPreMessageSentModify, message)`: Allows Apps to modify the message.
3.  **Before Save Hook**: `Message.beforeSave({ message, room, user, previewUrls, parseUrls: message.parseUrls })` is called to perform any actions before the message is saved to the database.
4.  **Database Persistence**:
    *   If `message._id` exists and `upsert` is true, `Messages.updateOne` is called to update the message in the database.
    *   Otherwise, `Messages.insertOne` is called to insert a new message into the database. These methods interact with the `Messages` collection, likely managed by a file such as `packages/rocketchat-models/src/models/Messages.ts` or a similar data access layer.
5.  **App Event Hooks (Post-save)**:
    *   `Apps.self?.triggerEvent(messageEvent, message)`: Triggers `IPostSystemMessageSent` or `IPostMessageSent` depending on the message type.
6.  **After Save Hook**: `afterSaveMessage(message, room, user)` is called for any post-save processing.
7.  **Real-time Notification**: `notifyOnRoomChangedById(message.rid)` (from `apps/meteor/server/lib/notifyListener.ts`) is called to notify clients about the room change, ensuring real-time updates for the newly sent message.

## Tool Calls (3 calls, 16,410 tokens)

**Step 1:** `search({"query":"sendMessage","layer":"server"})` → 588 tokens
**Step 2:** `graph({"direction":"down","query":"sendMessage","file":"apps/meteor/app/lib/server/functions/sendMessage.t)` → 2057 tokens
**Step 3:** `implement({"filename":"apps/meteor/app/lib/server/functions/sendMessage.ts","symbolName":"sendMessage"})` → 621 tokens
