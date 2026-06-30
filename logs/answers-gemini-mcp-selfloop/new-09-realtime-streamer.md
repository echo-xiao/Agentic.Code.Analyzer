# How does a new message appear in real-time on the client after being saved to the database?

## Gemini Answer

When a new message is saved to the database, Rocket.Chat leverages a real-time broadcast mechanism to update connected clients. The process begins with the `sendMessage` function on the server, which handles the message's persistence and subsequent notification.

Here's the call chain:

**Entry** → `sendMessage` (server-side message handling) → `notifyOnRoomChangedById` (room change notification) → `api.broadcast` (real-time client update)

1.  **Message Saving (`apps/meteor/app/lib/server/functions/sendMessage.ts`)**:
    The `sendMessage` function is responsible for validating and saving the new message to the database.
    *   It first performs validation checks using `validateMessage` and prepares the message object.
    *   It then checks for any Rocket.Chat Apps integrations that might prevent or modify the message.
    *   Finally, the message is inserted or updated in the `Messages` collection using `Messages.insertOne(message)` or `Messages.updateOne`.

2.  **Room Change Notification (`apps/meteor/app/lib/server/lib/notifyListener.ts`)**:
    After the message is successfully saved, the `sendMessage` function calls `void notifyOnRoomChangedById(message.rid);`. This function is located in `apps/meteor/app/lib/server/lib/notifyListener.ts`.
    *   `notifyOnRoomChangedById` takes the room ID (`message.rid`) and a `clientAction` (defaulting to 'updated').
    *   It retrieves the room information using `Rooms.findByIds`.
    *   For each eligible room, it calls `void api.broadcast('watch.rooms', { clientAction, room: item });`.

3.  **Real-time Broadcast (`api.broadcast`)**:
    The `api.broadcast('watch.rooms', { clientAction, room: item });` call is the crucial step for real-time updates. This function (likely part of the DDP/Meteor publication/subscription system) broadcasts a 'watch.rooms' event over WebSockets to all connected clients that are subscribed to room changes.
    *   Clients subscribed to the `'watch.rooms'` publication receive this event, which includes the `clientAction` (e.g., 'updated') and the `room` object containing the latest message details or other room updates.
    *   Upon receiving this broadcast, the client-side code updates the UI to display the new message in real-time without requiring a page refresh.

## Tool Calls (8 calls, 45,102 tokens)

**Step 1:** `search({"query":"sendMessage","layer":"server"})` → 411 tokens
**Step 2:** `graph({"direction":"down","depth":3,"query":"sendMessage","layer":"server"})` → 722 tokens
**Step 3:** `graph({"depth":4,"layer":"server","query":"sendMessage","direction":"down"})` → 637 tokens
**Step 4:** `search({"query":"stream-room-messages"})` → 16 tokens
**Step 5:** `implement({"filename":"apps/meteor/app/lib/server/functions/sendMessage.ts","symbolName":"sendMessage"})` → 621 tokens
**Step 6:** `search({"query":"notifyOnRoomChangedById","layer":"server"})` → 69 tokens
**Step 7:** `graph({"depth":3,"direction":"down","query":"notifyOnRoomChangedById","layer":"server"})` → 174 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/lib/server/lib/notifyListener.ts","symbolName":"notifyOnRoomChangedById)` → 146 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/5 |
| Symbols hit | 0/4 |
| Tool calls | 8 |
| Total tokens | 45,102 |
| Pass | NO |
