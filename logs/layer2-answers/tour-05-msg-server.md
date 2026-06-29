# How is a message sent on the server side in Rocket.Chat?

## Gemini Answer

On the server-side, sending a message in Rocket.Chat starts with a Meteor method that receives data from a client, processes it through a series of validation steps, hooks, and database operations, and finally notifies other clients of the new message.

The primary logic is encapsulated in the `sendMessage` function, which is called by the corresponding Meteor method.

### Call Chain

`Meteor.methods({ sendMessage })` → `functions.sendMessage` → `validateMessage` → `Messages.insertOne` → `afterSaveMessage`

---

### Detailed Breakdown

Here is a step-by-step explanation of the server-side message sending flow:

**1. Entry Point: The Meteor Method**

*   **File:** `apps/meteor/app/lib/server/methods/sendMessage.ts`
*   A client invokes the `sendMessage` method via a DDP call. This file defines the server-side endpoint for that call. It receives the message object from the client, identifies the user and the room, and then passes control to the core `sendMessage` function.

**2. Core Logic: The `sendMessage` Function**

*   **File:** `apps/meteor/app/lib/server/functions/sendMessage.ts`
*   This is the main function responsible for the entire message processing pipeline.
*   **Signature**: `export const sendMessage = async function (user, message, room, options)`

Its key responsibilities are:
1.  **Validation**: It first calls `validateMessage` to ensure the user has permission to post in the room and that the message content is valid.
2.  **Preparation**: The `prepareMessageObject` function enriches the message object with server-side information like the creation timestamp, user details (`u`), and room ID (`rid`).
3.  **App-Engine Hooks (Pre-send)**: Before saving, it triggers a sequence of events for the Rocket.Chat Apps Engine, allowing installed apps to prevent, extend, or modify the message content (`IPreMessageSentPrevent`, `IPreMessageSentModify`). The message is re-validated if any app modifies it.
4.  **Database Insertion**: The finalized message object is inserted into the `messages` collection in the database via `Messages.insertOne(message)`.
5.  **App-Engine Hooks (Post-send)**: After the message is successfully saved, it triggers post-send events (`IPostMessageSent`) to notify apps that a new message has been created.
6.  **Execute Side Effects**: It calls `afterSaveMessage`, a crucial function that handles mentions, push notifications, and broadcasting the message to other clients in the room via the subscriptions.
7.  **Notify Room Changes**: Finally, `notifyOnRoomChangedById` is called to inform clients that the room's state has been updated.

## Tool Calls (8 calls, 47,571 tokens)

**Step 1:** `search({"layer":"server","query":"sendMessage"})` → 411 tokens
**Step 2:** `graph({"query":"sendMessage","direction":"down"})` → 1084 tokens
**Step 3:** `graph({"query":"\"sendMessage\" from \"apps/meteor/app/lib/server/methods/sendMessage.ts\"","direction":"d)` → 27 tokens
**Step 4:** `search({"query":"apps/meteor/app/lib/server/methods/sendMessage.ts"})` → 178 tokens
**Step 5:** `graph({"query":"sendMessage","direction":"down","layer":"server"})` → 637 tokens
**Step 6:** `implement({"symbolName":"sendMessage","filename":"apps/meteor/app/lib/server/functions/sendMessage.ts"})` → 621 tokens
**Step 7:** `graph({"query":"\"sendMessage\" from \"apps/meteor/app/lib/server/functions/sendMessage.ts\"","direction":)` → 28 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/lib/server/methods/sendMessage.ts","symbolName":"sendMessage"})` → 352 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 4/6 |
| Symbols hit | 1/3 |
| Tool calls | 8 |
| Total tokens | 47,571 |
| Pass | NO |
