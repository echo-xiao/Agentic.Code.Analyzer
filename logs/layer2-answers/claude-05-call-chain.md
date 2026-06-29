# What is the complete call chain for sendMessage?

## Gemini Answer

The complete call chain for sending a message in Rocket.Chat starts with a client-side method call, which is handled by a server-side Meteor method, processed by a series of functions, and then broadcasted back to the clients.

Here is the explicit call chain:

`UI (Client) → DDP Method Call → Server Method Handler → Core Send Function → After-Save Hooks`

### 1. Entry Point: DDP Method (`sendMessage`)

The process starts when a client invokes the `sendMessage` Meteor method.

-   **File**: `apps/meteor/app/lib/server/methods/sendMessage.ts`
-   **Symbol**: `Meteor.methods({ sendMessage })`

This method is the server's entry point for receiving new messages from clients. It performs initial permission checks using `canSendMessage` and then calls the core `sendMessage` function.

### 2. Core Logic: `sendMessage` Function

This is the central function responsible for processing, validating, and saving the message.

-   **File**: `apps/meteor/app/lib/server/functions/sendMessage.ts`
-   **Symbol**: `sendMessage(user, message, room)`

The key steps inside this function are:
1.  **Validation**: It calls `validateMessage` to ensure the message content and structure are valid.
2.  **App Events**: It triggers `IPreMessageSentPrevent`, `IPreMessageSentExtend`, and `IPreMessageSentModify` events for the Apps-Engine, allowing apps to modify or block the message.
3.  **Database Insert**: It calls `Messages.insertOne(message)` to save the message to the database.
4.  **Post-Save Hooks**: It calls `afterSaveMessage(message, room, user)` to trigger follow-up actions.

### 3. After-Save Hooks: `afterSaveMessage`

After the message is saved, this function orchestrates all side effects, such as notifications, mentions, and integrations.

-   **File**: `apps/meteor/app/lib/server/functions/afterSaveMessage.ts`
-   **Symbol**: `afterSaveMessage(message, room, user)`

This function is a hub that uses the `callbacks.run` system to execute a series of actions:
*   Update unread message counts for other users.
*   Handle user mentions (`@username`, `@all`).
*   Send push notifications.
*   Execute webhooks (integrations).
*   Update the search index.
*   Forward the message to other services like the Slack Bridge or Apps-Engine listeners (`IPostMessageSent`).

## Tool Calls (8 calls, 48,084 tokens)

**Step 1:** `search({"query":"sendMessage","layer":"server"})` → 411 tokens
**Step 2:** `graph({"query":"sendMessage","direction":"down"})` → 1084 tokens
**Step 3:** `graph({"query":"sendMessage:apps/meteor/app/lib/server/functions/sendMessage.ts","direction":"down"})` → 26 tokens
**Step 4:** `graph({"query":"sendMessage:apps/meteor/app/lib/server/methods/sendMessage.ts","direction":"down"})` → 25 tokens
**Step 5:** `implement({"symbolName":"sendMessage","filename":"apps/meteor/app/lib/server/methods/sendMessage.ts"})` → 352 tokens
**Step 6:** `graph({"query":"sendMessage","direction":"down","layer":"server"})` → 637 tokens
**Step 7:** `implement({"symbolName":"sendMessage","filename":"apps/meteor/app/lib/server/functions/sendMessage.ts"})` → 621 tokens
**Step 8:** `graph({"direction":"down","query":"afterSaveMessage"})` → 862 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 3/8 |
| Tool calls | 8 |
| Total tokens | 48,084 |
| Pass | NO |
