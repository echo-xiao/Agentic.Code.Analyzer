# What happens when a user creates a new channel in Rocket.Chat?

## Plan

intent: call-chain

## Gemini Answer

When a user creates a new channel in Rocket.Chat, the process follows a chain of server-side operations:

**Flow:**

1.  **API Endpoint Call**: A client-side action (e.g., clicking "Create Channel" in the UI) triggers an API call to the server. This call is handled by the `createChannel` endpoint defined in `apps/meteor/app/api/server/v1/channels.ts`.
2.  **Server Method Invocation**: The API endpoint then invokes the `createChannel` method, which is defined in `apps/meteor/app/lib/server/methods/createChannel.ts`.
3.  **Core Channel Creation Logic**: The `createChannel` method (in `apps/meteor/app/lib/server/methods/createChannel.ts`) performs initial validation and permission checks:
    *   It validates the provided `name` and `members`.
    *   It verifies the `userId` and ensures the user exists.
    *   If the channel is part of a team, it checks for `create-team-channel` permission. Otherwise, it checks for `create-c` permission (for public channels).
    *   Finally, it calls the central `createRoom` function, passing in the channel type ('c' for public channel), name, owner, members, read-only status, and any custom or extra data.
4.  **Room Creation Details**: The `createRoom` function, located in `apps/meteor/app/lib/server/functions/createRoom.ts`, handles the comprehensive logic for creating the room:
    *   **Federation Checks**: It determines if any members are federated users and ensures the room is appropriately configured for federation if so. It also verifies the owner's authorization for federation.
    *   **Input Validation**: It validates the room name, ensures members are provided as usernames, and confirms the owner's existence.
    *   **Owner Inclusion**: The owner is automatically added to the member list unless explicitly excluded.
    *   **Broadcast Handling**: If the channel is a broadcast channel, it's set to read-only.
    *   **Room Properties Setup**: A `roomProps` object is constructed with all necessary details, including the channel type, name, owner information, and timestamps. If a `teamId` is provided, the team is fetched and linked to the room.
    *   **App Integration Hooks (Pre-creation)**: Several hooks are triggered, allowing Rocket.Chat Apps to prevent or modify the room creation process (`IPreRoomCreatePrevent`, `IPreRoomCreateModify`, `IPreRoomCreateExtend`, `beforeCreateRoomCallback`, `beforeCreateChannel`).
    *   **Database Insertion**: The room data is then inserted into the database using `Rooms.createWithFullRoomData(roomProps)`.
    *   **Notification**: A notification is sent about the newly inserted room (`notifyOnRoomChanged`).
    *   **Federation (Post-creation)**: If the room is federated, a callback (`federation.afterCreateFederatedRoom`) is run to handle the creation of the corresponding Matrix room and sending invites.
    *   **User Subscriptions**: Subscriptions are created for all members of the new room (`createUsersSubscriptions`).
    *   **App Integration Hooks (Post-creation)**: Additional asynchronous callbacks are executed after the channel is created (`afterCreateChannel`, `afterCreatePrivateGroup`, `afterCreateRoom`, `IPostRoomCreate`), allowing apps to react to the new channel.
    *   **Return Value**: The function returns an object containing the new room's ID and other details.

**Key Files:**

*   **`apps/meteor/app/api/server/v1/channels.ts`**: API endpoint for channel creation.
*   **`apps/meteor/app/lib/server/methods/createChannel.ts`**: Server-side method for initial validation and orchestrating channel creation.
*   **`apps/meteor/app/lib/server/functions/createRoom.ts`**: Core function responsible for the detailed process of creating a room/channel, including database interaction and integration with other Rocket.Chat features.

## Tool Calls (8 calls, 35,464 tokens)

**Step 1:** `plan({"question":"What happens when a user creates a new channel in Rocket.Chat?","intent":"call-chain"})` → 81 tokens
**Step 2:** `search({"query":"create channel"})` → 274 tokens
**Step 3:** `graph({"file":"channels.ts","move":"down","depth":5,"query":"create channel"})` → 13 tokens
**Step 4:** `search({"query":"createChannel"})` → 197 tokens
**Step 5:** `graph({"file":"channels.ts","move":"down","depth":5,"query":"createChannel"})` → 2603 tokens
**Step 6:** `details({"symbolName":"createChannelMethod","filename":"createChannel.ts"})` → 395 tokens
**Step 7:** `graph({"file":"createChannel.ts","depth":1,"query":"createRoom","move":"down"})` → 79 tokens
**Step 8:** `details({"filename":"createRoom.ts","symbolName":"createRoom"})` → 1364 tokens

## Files Seen In Tool Results (13)

- `apps/meteor/tests/end-to-end/api/teams.ts`
- `apps/meteor/ee/server/lib/oauth/Manager.ts`
- `apps/meteor/tests/end-to-end/api/channels.ts`
- `apps/meteor/app/slackbridge/server/RocketAdapter.ts`
- `apps/meteor/ee/server/lib/ldap/Manager.ts`
- `apps/meteor/tests/end-to-end/api/rooms.ts`
- `apps/meteor/app/lib/server/methods/createChannel.ts`
- `apps/meteor/app/apps/server/bridges/rooms.ts`
- `apps/meteor/app/api/server/v1/channels.ts`
- `apps/meteor/client/views/home/cards/CreateChannelsCard.tsx`
- `apps/meteor/client/navbar/NavBarPagesGroup/actions/CreateChannelModal.tsx`
- `apps/meteor/client/hooks/useCreateChannelTypePermission.ts`
- `apps/meteor/app/lib/server/functions/createRoom.ts`
