# What happens when a user creates a new channel in Rocket.Chat?

## Plan

intent: call-chain

## Gemini Answer

When a user creates a new channel in Rocket.Chat, the process begins on the client-side with the `CreateChannelModal` component, located in `apps/meteor/client/navbar/NavBarPagesGroup/actions/CreateChannelModal.tsx`.

The flow is as follows:

1.  **Client-side initiation**: The `CreateChannelModal` component handles the user input for creating a new channel. Upon submission, it calls the `createChannel` function.
2.  **Server-side method call**: The `createChannel` function, found in `apps/meteor/app/api/server/v1/channels.ts`, acts as an API endpoint. It receives the channel creation parameters (name, members, read-only status, custom fields, and extra data) and then invokes the `createChannelMethod`.
3.  **Channel creation logic**: The `createChannelMethod`, located in `apps/meteor/app/lib/server/methods/createChannel.ts`, performs several crucial steps:
    *   **Validation**: It validates the provided channel name and members.
    *   **Permissions check**: It verifies if the `userId` has the necessary permissions to create a channel, especially for team channels (`create-team-channel`) or public channels (`create-c`).
    *   **Room creation**: It calls the `createRoom` function to handle the actual room creation in the database.
4.  **Core room creation**: The `createRoom` function, defined in `apps/meteor/app/lib/server/functions/createRoom.ts`, is responsible for the core logic of creating a new room (which includes channels). This function:
    *   **Federation check**: Determines if the room should be handled by federation, preventing federated users from being added to non-federated rooms.
    *   **Callback execution**: Runs `prepareCreateRoomCallback` and `beforeCreateRoomCallback` for any pre-creation hooks.
    *   **Room properties**: Constructs the `roomProps` object with all the necessary details for the new room, including name, type, owner, and initial settings.
    *   **Apps Engine events**: Triggers `IPreRoomCreatePrevent`, `IPreRoomCreateModify`, and `IPreRoomCreateExtend` events for Rocket.Chat Apps to interact with the channel creation process.
    *   **Database insertion**: Calls `Rooms.createWithFullRoomData(roomProps)` to insert the new room into the database.
    *   **Notifications**: Notifies about the room change (`notifyOnRoomChanged`).
    *   **Federation handling**: If the room is federated, it runs the `federation.afterCreateFederatedRoom` callback.
    *   **Subscriptions**: Creates user subscriptions for the new room using `createUsersSubscriptions`.
    *   **Post-creation callbacks**: Executes `afterCreateChannel` (for public channels), `afterCreatePrivateGroup` (for private groups), and `afterCreateRoom` callbacks.
    *   **Apps Engine post-event**: Triggers the `IPostRoomCreate` event for Rocket.Chat Apps.
    *   **Returns room ID**: Returns the ID of the newly created room.

In summary, creating a new channel in Rocket.Chat involves a client-side modal that triggers a server-side method. This method performs validation and permission checks before calling a core `createRoom` function. The `createRoom` function then handles the intricate details of database insertion, federation, and triggering various callbacks and Apps Engine events to ensure the channel is properly created and integrated into the Rocket.Chat ecosystem.

## Tool Calls (8 calls, 105,107 tokens)

**Step 1:** `plan({"question":"What happens when a user creates a new channel in Rocket.Chat?","intent":"call-chain"})` → 3803 tokens
**Step 2:** `search({"query":"CreateChannelModal","layer":"client"})` → 79 tokens
**Step 3:** `graph({"file":"CreateChannelModal.tsx","depth":5,"query":"CreateChannelModal","move":"down"})` → 3802 tokens
**Step 4:** `details({"filename":"CreateChannelModal.tsx","symbolName":"createChannel"})` → 198 tokens
**Step 5:** `search({"layer":"client","query":"createChannel"})` → 197 tokens
**Step 6:** `details({"filename":"createChannel.ts","symbolName":"createChannelMethod"})` → 395 tokens
**Step 7:** `graph({"query":"createRoom","file":"createChannel.ts","depth":5,"move":"down"})` → 2294 tokens
**Step 8:** `details({"filename":"createRoom.ts","symbolName":"createRoom"})` → 1364 tokens

## Files Seen In Tool Results (39)

- `apps/meteor/client/sidebar/hooks/useUnreadDisplay.ts`
- `apps/meteor/client/views/navigation/sidebar/hooks/useUnreadDisplay.ts`
- `apps/meteor/client/views/navigation/sidebar/badges/SidebarItemBadges.tsx`
- `apps/meteor/client/sidebar/hooks/useAvatarTemplate.tsx`
- `apps/meteor/client/views/navigation/sidepanel/hooks/useChannelsChildrenList.ts`
- `apps/meteor/client/views/home/HomePageHeader.tsx`
- `apps/meteor/client/views/home/cards/CustomContentCard.tsx`
- `apps/meteor/client/views/home/cards/CreateChannelsCard.tsx`
- `apps/meteor/client/views/home/cards/MobileAppsCard.tsx`
- `apps/meteor/client/views/home/cards/DocumentationCard.tsx`
- `apps/meteor/client/views/navigation/sidepanel/SidePanelInternal.tsx`
- `apps/meteor/client/views/navigation/sidepanel/SidePanel.tsx`
- `apps/meteor/client/views/navigation/sidepanel/SidepanelItem/SidepanelItem.tsx`
- `apps/meteor/client/views/room/index.ts`
- `apps/meteor/app/utils/client/lib/SDKClient.ts`
- `packages/apps-engine/src/server/accessors/ModifyExtender.ts`
- `apps/meteor/app/apps/server/bridges/messages.ts`
- `apps/meteor/app/lib/server/methods/createChannel.ts`
- `apps/meteor/app/apps/server/bridges/rooms.ts`
- `apps/meteor/ee/server/local-services/instance/service.ts`
- `ee/packages/network-broker/src/NetworkBroker.ts`
- `apps/meteor/client/lib/chats/data.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/modify/ModifyCreator.ts`
- `apps/meteor/app/apps/server/converters/users.js`
- `apps/meteor/client/hooks/useCreateChannelTypePermission.ts`
- `apps/meteor/app/slackbridge/server/RocketAdapter.ts`
- `apps/meteor/app/apps/server/bridges/uploads.ts`
- `apps/meteor/app/apps/server/bridges/users.ts`
- `apps/meteor/app/importer/server/classes/ImportDataConverter.ts`
- `apps/meteor/client/views/teams/contextualBar/channels/TeamsChannelsWithData.tsx`
- `packages/models/src/models/MediaCallChannels.ts`
- `apps/meteor/app/api/server/v1/channels.ts`
- `apps/meteor/app/importer/server/classes/converters/RoomConverter.ts`
- `apps/meteor/client/navbar/NavBarPagesGroup/actions/CreateChannelModal.tsx`
- `packages/apps-engine/deno-runtime/lib/accessors/modify/ModifyUpdater.ts`
- `apps/meteor/app/apps/server/bridges/oauthApps.ts`
- `packages/apps-engine/src/server/accessors/ModifyUpdater.ts`
- `packages/apps-engine/src/definition/accessors/IApiExtend.ts`
- `apps/meteor/app/lib/server/functions/createRoom.ts`
