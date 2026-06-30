# How is a message sent on the server side in Rocket.Chat?

## Gemini Answer

The server-side message sending process in Rocket.Chat is primarily handled by the `sendMessage` function.

**Call Chain:**

`apps/meteor/app/lib/server/functions/sendMessage.ts` → `Messages.updateOne` / `Messages.insertOne`

**Detailed Steps:**

1.  **Entry Point (`apps/meteor/app/lib/server/functions/sendMessage.ts`)**: The `sendMessage` function is the central point for sending messages on the server. It takes the `user`, `message` object, and `room` as arguments.
2.  **Validation and Preparation**:
    *   The message undergoes initial validation using `validateMessage` to ensure it meets requirements for the room and user.
    *   `prepareMessageObject` is called to add necessary server-side fields to the message, such as `_id`, `ts` (timestamp), and user details (`u`).
    *   If the `Message_Read_Receipt_Enabled` setting is active, the `message.unread` flag is set to `true`.
3.  **Apps Engine Hooks (Pre-Send)**:
    *   The Rocket.Chat Apps Engine provides several hooks that can interact with the message before it's saved to the database:
        *   `AppEvents.IPreMessageSentPrevent`: Apps can use this hook to prevent the message from being sent entirely.
        *   `AppEvents.IPreMessageSentExtend`: Apps can extend the message object with additional data.
        *   `AppEvents.IPreMessageSentModify`: Apps can modify the message content or attributes.
    *   After app modifications, the message is re-validated with `validateMessage`.
4.  **Before Save Hook**:
    *   `Message.beforeSave` is invoked, allowing other server-side logic (e.g., URL parsing, markdown processing) to modify the message one last time before it hits the database.
5.  **Database Interaction (`packages/models/src/models/Messages.ts`)**:
    *   The function then checks if the message is an update (`message._id` exists and `upsert` is true) or a new message.
    *   If it's an update, `Messages.updateOne` is called to update the existing message in the `messages` collection.
    *   If it's a new message, a check is performed to prevent duplicates, and then `Messages.insertOne` is called to insert the new message into the `messages` collection. The `_id` of the newly inserted message is assigned back to the message object.
6.  **Apps Engine Hooks (Post-Send)**:
    *   After the message is successfully saved, the Apps Engine triggers post-send events:
        *   `AppEvents.IPostSystemMessageSent` (for system messages).
        *   `AppEvents.IPostMessageSent` (for regular user messages).
7.  **Post-Save Actions**:
    *   `afterSaveMessage` is called to handle any further processing required after the message is saved (e.g., updating room activity, notifying other services).
    *   `notifyOnRoomChangedById` is called to inform clients about changes in the room due to the new message.

**Key Files Involved:**

*   `apps/meteor/app/lib/server/functions/sendMessage.ts`: The main server-side function orchestrating message sending.
*   `packages/models/src/models/Messages.ts`: Defines the `Messages` collection and provides methods like `insertOne` and `updateOne` for interacting with the database.

## Tool Calls (8 calls, 74,703 tokens)

**Step 1:** `search({"query":"sendMessage","layer":"server"})` → 412 tokens
**Step 2:** `graph({"direction":"down","file":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/app/lib/server/fun)` → 1530 tokens
**Step 3:** `graph({"query":"sendMessage","direction":"down","file":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/met)` → 1529 tokens
**Step 4:** `implement({"symbolName":"sendMessage","filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/app/li)` → 621 tokens
**Step 5:** `search({"query":"Messages","layer":"server"})` → 592 tokens
**Step 6:** `search({"layer":"server","query":"Messages"})` → 592 tokens
**Step 7:** `search({"query":"Messages.ts"})` → 589 tokens
**Step 8:** `implement({"filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/packages/models/src/models/Messages.ts","symb)` → 68 tokens
