# What happens when a user creates a new channel in Rocket.Chat?

## Gemini Answer

When a user creates a new channel in Rocket.Chat, the following process takes place:

**Call Chain:** `Client (via Meteor.call) → createChannelMethod → hasPermissionAsync → createRoom → Rooms.createWithFullRoomData`

1.  **Client Invocation**: The user's action on the client-side triggers a Meteor method call to `createChannelMethod` on the server.
    *   File: `apps/meteor/app/lib/server/methods/createChannel.ts` (Entry Point)

2.  **Permission Check**: The `createChannelMethod` first performs a permission check to ensure the user has the necessary rights to create a channel (e.g., `create-c` permission or `create-team-channel` if part of a team).
    *   File: `apps/meteor/app/authorization/server/functions/hasPermission.ts`

3.  **Room Creation Initiation**: If permissions are granted, `createChannelMethod` then calls the central `createRoom` function, passing 'c' as the type to indicate a channel, along with the channel name, owner, members, and other optional data.
    *   File: `apps/meteor/app/lib/server/methods/createChannel.ts`

4.  **`createRoom` Function Execution**: The `createRoom` function handles the core logic for creating the room.
    *   File: `apps/meteor/app/lib/server/functions/createRoom.ts` (Core Logic)
    *   **Federation Checks**: It checks for federated members and owner federation access if the room is intended to be federated.
    *   **Pre-creation Callbacks/Hooks**: It runs `prepareCreateRoomCallback`, `IPreRoomCreatePrevent`, `IPreRoomCreateExtend`, and `IPreRoomCreateModify` for Apps Engine integrations.
    *   **Room Properties Setup**: It constructs the room object (`roomProps`) with details like the generated name (using `getValidRoomName`), type ('c' for channel), owner, initial message count, user count, and read-only status.
    *   **`beforeCreateRoomCallback`**: This callback is executed just before the room is inserted into the database.
    *   **`beforeCreateChannel`**: Specifically for channels, this callback is run to allow further customization or validation before database insertion.

5.  **Database Insertion**: The `Rooms.createWithFullRoomData(roomProps)` command then inserts the newly defined room into the database.
    *   File: `packages/models/src/models/Rooms.ts` (Database Interaction)

6.  **Notifications and Federation**:
    *   `notifyOnRoomChanged`: Notifies relevant listeners that a new room has been created.
    *   `federation.afterCreateFederatedRoom`: If the channel is federated, this callback is triggered to handle the creation of the corresponding Matrix room and send invites.

7.  **User Subscriptions**: `createUsersSubscriptions` is called to create subscriptions for all members in the newly created channel, and synchronizes their room role priority.
    *   File: `apps/meteor/app/lib/server/functions/createRoom.ts`

8.  **Post-creation Callbacks/Hooks**: Finally, several asynchronous callbacks are run:
    *   `afterCreateChannel`: Specific to channel creation.
    *   `afterCreateRoom`: General callback for any room creation.
    *   `IPostRoomCreate`: An Apps Engine event is triggered after the room is successfully created.

This sequence ensures that a new channel is properly created, permissions are respected, and all relevant system components and integrations are notified.

## Tool Calls (5 calls, 123,966 tokens)

**Step 1:** `search({"query":"create channel","layer":"server"})` → 301 tokens
**Step 2:** `graph({"query":"createChannelMethod","layer":"server","direction":"down"})` → 1144 tokens
**Step 3:** `implement({"symbolName":"createRoom","filename":"apps/meteor/app/livechat/server/lib/livechat.ts"})` → 19929 tokens
**Step 4:** `implement({"filename":"apps/meteor/app/lib/server/functions/createRoom.ts","symbolName":"createRoom"})` → 1341 tokens
**Step 5:** `implement({"filename":"apps/meteor/app/lib/server/methods/createChannel.ts","symbolName":"createChannelMethod")` → 370 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 4/6 |
| Symbols hit | 2/3 |
| Tool calls | 5 |
| Total tokens | 123,966 |
