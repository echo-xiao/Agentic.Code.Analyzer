# How is a message sent on the server side in Rocket.Chat?

## Plan

intent: call-chain

## Gemini Answer

On the server side in Rocket.Chat, a message is sent through the following flow:

1.  **`sendMessage`** in `apps/meteor/app/lib/server/functions/sendMessage.ts`: This function appears to be a high-level entry point for sending messages. It likely handles initial processing and validation before delegating to other functions.
2.  **`insertMessage`** in `apps/meteor/app/lib/server/functions/insertMessage.ts`: This function is responsible for inserting the message into the database. It performs the following steps:
    *   Validates the message, room, and user.
    *   Prepares the message object.
    *   Parses URLs within the message.
    *   If `upsert` is true and a message with the same `_id` exists, it updates the existing message; otherwise, it inserts a new message.
    *   Increments the message count for the room.
    *   Returns the inserted or updated message.

The `Messages.insertOne` and `Messages.updateOne` calls within `insertMessage` are the direct interactions with the database to persist the message.

## Tool Calls (8 calls, 86,231 tokens)

**Step 1:** `plan({"intent":"call-chain","question":"How is a message sent on the server side in Rocket.Chat?"})` → 81 tokens
**Step 2:** `search({"query":"sendMessage","layer":"server"})` → 318 tokens
**Step 3:** `graph({"depth":5,"move":"down","file":"sendMessage.ts","query":"sendMessage"})` → 2707 tokens
**Step 4:** `graph({"query":"sendMessage","depth":5,"file":"service.ts","move":"down"})` → 2706 tokens
**Step 5:** `search({"query":"insert message","layer":"server"})` → 26 tokens
**Step 6:** `search({"layer":"server","query":"Messages.insert"})` → 141 tokens
**Step 7:** `graph({"file":"insertMessage.ts","depth":5,"query":"insertMessage","move":"down"})` → 3506 tokens
**Step 8:** `details({"filename":"insertMessage.ts","symbolName":"insertMessage"})` → 286 tokens

## Files Seen In Tool Results (13)

- `apps/meteor/server/services/messages/service.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/api/lib/outbound.ts`
- `apps/meteor/app/slackbridge/server/SlackAPI.ts`
- `apps/meteor/app/livechat/server/lib/messages.ts`
- `apps/meteor/app/lib/server/methods/sendMessage.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `apps/meteor/app/integrations/server/lib/triggerHandler.ts`
- `apps/meteor/server/lib/sendMessagesToAdmins.ts`
- `apps/meteor/app/livechat/server/sendMessageBySMS.ts`
- `apps/meteor/app/livechat/server/methods/sendMessageLivechat.ts`
- `apps/meteor/app/authorization/server/functions/canSendMessage.ts`
- `apps/meteor/app/lib/server/functions/insertMessage.ts`
- `apps/meteor/app/discussion/server/methods/createDiscussion.ts`
