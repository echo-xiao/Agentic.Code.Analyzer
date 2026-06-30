# How does a new message appear in real-time on the client after being saved to the database?

## Gemini Answer

A new message appears in real-time on the client after being saved to the database through the following server-side flow:

**Entry Point:** `sendMessage` in `apps/meteor/app/lib/server/functions/sendMessage.ts`

**Call Chain:**

1.  **`sendMessage`** (`apps/meteor/app/lib/server/functions/sendMessage.ts`): This function is responsible for validating, preparing, and saving the message to the `Messages` collection in the database.
    *   It calls `validateMessage` and `prepareMessageObject` for message processing.
    *   It triggers `AppEvents.IPreMessageSentPrevent`, `AppEvents.IPreMessageSentModify`, and `AppEvents.IPreMessageSentExtend` for Rocket.Chat App integrations.
    *   It persists the message to the database using `Messages.updateOne` or `Messages.insertOne`.
    *   It triggers `AppEvents.IPostSystemMessageSent` or `AppEvents.IPostMessageSent` for Rocket.Chat App integrations after saving.
    *   Finally, it calls `afterSaveMessage` and `notifyOnRoomChangedById`.

2.  **`notifyOnRoomChangedById`** (`apps/meteor/app/lib/server/lib/notifyListener.ts`): This function is called after a message is saved. Its purpose is to notify relevant listeners that a change has occurred in a room.
    *   It calls `LocalBroker.broadcast`.

3.  **`LocalBroker.broadcast`** (`packages/core-services/src/LocalBroker.ts`): This method is responsible for broadcasting an event to local listeners and emitting a "broadcast" event.
    *   It calls `this.broadcastLocal(event, ...args)` to handle local broadcasting.
    *   It then emits a generic `'broadcast'` event with the event name and arguments using `this.events.emit('broadcast', event, args)`. This `EventEmitter` mechanism is likely how the server-side pub/sub system triggers the real-time update to connected clients.

The `LocalBroker.broadcast` method, by emitting an event, signals to connected clients that a change has occurred, which then allows the client-side to react and display the new message in real-time. The exact mechanism for how the client subscribes and receives these broadcasts would involve DDP (Distributed Data Protocol) over WebSockets, with the client listening for specific events related to room changes or new messages.

## Tool Calls (8 calls, 47,494 tokens)

**Step 1:** `search({"query":"sendMessage","layer":"server"})` → 412 tokens
**Step 2:** `graph({"query":"sendMessage","layer":"server","file":"apps/meteor/app/lib/server/functions/sendMessage.ts")` → 900 tokens
**Step 3:** `implement({"symbolName":"sendMessage","filename":"apps/meteor/app/lib/server/functions/sendMessage.ts"})` → 621 tokens
**Step 4:** `graph({"layer":"server","direction":"down","query":"notifyOnRoomChangedById"})` → 359 tokens
**Step 5:** `implement({"symbolName":"broadcast","filename":"apps/meteor/app/lib/server/lib/LocalBroker.ts"})` → 141 tokens
**Step 6:** `implement({"symbolName":"broadcast","filename":"packages/core-services/src/LocalBroker.ts"})` → 140 tokens
**Step 7:** `implement({"filename":"packages/core-services/src/LocalBroker.ts","symbolName":"LocalBroker"})` → 462 tokens
**Step 8:** `implement({"filename":"packages/core-services/src/LocalBroker.ts","symbolName":"LocalBroker.broadcast"})` → 101 tokens
