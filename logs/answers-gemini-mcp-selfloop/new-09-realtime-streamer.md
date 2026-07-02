# How does a new message appear in real-time on the client after being saved to the database?

## Gemini Answer

A new message appears in real-time on the client after being saved to the database through the following flow:

1.  **`sendMessage`** (apps/meteor/app/lib/server/functions/sendMessage.ts): This server-side function is responsible for handling the initial message saving process.
2.  **`notifyOnRoomChangedById`** (apps/meteor/app/lib/server/lib/notifyListener.ts): After a message is saved, `sendMessage` calls this function to notify about changes in the room where the message was sent.
3.  **`api.broadcast`** (packages/core-services/src/lib/Api.ts): Inside `notifyOnRoomChangedById`, the `api.broadcast` method is invoked with the event `'watch.rooms'` and the updated room information. This broadcasts the change to all connected clients.

The `api.broadcast` method, part of the `Api` class in `packages/core-services/src/lib/Api.ts`, is a core mechanism for real-time communication in Rocket.Chat. It uses a broker (likely a message broker like Redis or a similar pub/sub system) to distribute events to all subscribed clients, ensuring that any client currently viewing the room receives the new message in real-time.

## Tool Calls (8 calls, 51,717 tokens)

**Step 1:** `plan({"question":"How does a new message appear in real-time on the client after being saved to the datab)` → 81 tokens
**Step 2:** `search({"query":"sendMessage","layer":"server"})` → 421 tokens
**Step 3:** `graph({"file":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/app/lib/server/functions/sendMessage.)` → 3279 tokens
**Step 4:** `details({"filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/server/lib/notifyListener.ts","sy)` → 139 tokens
**Step 5:** `details({"filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/server/lib/api.ts","symbolName":")` → 61 tokens
**Step 6:** `search({"layer":"client","query":"watch.rooms"})` → 25 tokens
**Step 7:** `details({"filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/app/lib/server/lib/notifyListener)` → 54 tokens
**Step 8:** `details({"symbolName":"Api","filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/packages/core-services/src)` → 325 tokens

## Files Seen In Tool Results (15)

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
- `apps/meteor/app/lib/server/lib/notifyListener.ts`
- `apps/meteor/server/lib/api.ts`
- `packages/core-services/src/api.ts`
- `packages/core-services/src/lib/Api.ts`
