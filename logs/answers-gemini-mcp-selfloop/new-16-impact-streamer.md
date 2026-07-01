# What is the blast radius of changing the Streamer module in Rocket.Chat?

## Gemini Answer

Changing the `Streamer` module, located at `ee/apps/ddp-streamer/src/Streamer.ts`, has a significant blast radius across various parts of Rocket.Chat, affecting real-time communication, file uploads, administrative interfaces, and core services.

The impact analysis reveals the following call chain and affected components:

**Entry Point:** `Streamer` (ee/apps/ddp-streamer/src/Streamer.ts)

**Call Chain:**

*   **Direct Callers (1-hop):**
    *   `Stream` (ee/apps/ddp-streamer/src/Streamer.ts)
    *   `instances` (apps/meteor/server/modules/streamer/streamer.module.ts)
    *   `instances` (apps/meteor/client/lib/streamer/streamer.ts)
    *   `Stream` (apps/meteor/app/notifications/server/lib/Notifications.ts)
    *   `getStreamer` (apps/meteor/client/lib/streamer/streamer.ts)

*   **Indirect Dependents (2-hop):**
    *   `parseRequest` (apps/meteor/app/api/server/lib/MultipartUploadHandler.ts)
    *   `WorkspacePage` (apps/meteor/client/views/admin/workspace/WorkspacePage.tsx)
    *   `handleInstancesModal` (apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.tsx)
    *   `DeploymentCard` (apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.tsx)
    *   `Presence` (apps/meteor/app/notifications/client/lib/Presence.ts)

*   **3-hop Dependents:**
    *   `upload` (apps/meteor/app/livechat/imports/server/rest/upload.ts)
    *   `rooms` (apps/meteor/app/api/server/v1/rooms.ts)
    *   `WorkspaceRoute` (apps/meteor/client/views/admin/workspace/WorkspaceRoute.tsx)
    *   `Template` (apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.stories.tsx)
    *   `service` (ee/apps/presence-service/src/service.ts)
    *   `registerServices` (apps/meteor/server/services/startup.ts)

*   **4-hop Dependents:**
    *   `uploadFile` (packages/ddp-client/src/livechat/LivechatClientImpl.ts)
    *   `send` (apps/meteor/client/lib/chats/uploads.ts)
    *   `main` (apps/meteor/server/main.ts)
    *   Numerous client-side JSX components, including:
        *   `MessageComposerFiles` (apps/meteor/client/views/room/composer/messageBox/MessageComposerFiles.tsx)
        *   `RemoveUsersFirstStep` (apps/meteor/client/views/teams/contextualBar/members/RemoveUsersModal/RemoveUsersFirstStep.tsx)
        *   `BaseRemoveUsersModal` (apps/meteor/client/views/teams/contextualBar/members/RemoveUsersModal/BaseRemoveUsersModal.tsx)
        *   `LeaveTeamModalChannels` (apps/meteor/client/views/teams/contextualBar/info/LeaveTeam/LeaveTeamModal/LeaveTeamModalChannels.tsx)
        *   `LeaveTeamModal` (apps/meteor/client/views/teams/contextualBar/info/LeaveTeam/LeaveTeamModal/LeaveTeamModal.tsx)
        *   `DeleteTeamModal` (apps/meteor/client/views/teams/contextualBar/info/DeleteTeam/DeleteTeamModal.tsx)
        *   `DeleteTeamChannels` (apps/meteor/client/views/teams/contextualBar/info/DeleteTeam/DeleteTeamChannels.tsx)
        *   `BaseConvertToChannelModal` (apps/meteor/client/views/teams/contextualBar/info/ConvertToChannelModal/BaseConvertToChannelModal.tsx)
        *   `FirstStep` (apps/meteor/client/views/teams/contextualBar/info/ConvertToChannelModal/ModalSteps/FirstStep.tsx)
        *   `SidePanelInternal` (apps/meteor/client/views/navigation/sidepanel/SidePanelInternal.tsx)
        *   `createSidePanel` (apps/meteor/client/views/navigation/sidepanel/SidePanelInternal.tsx)
        *   `SidePanelTeams` (apps/meteor/client/views/navigation/sidepanel/tabs/SidePanelTeams.tsx)
        *   `SidePanelMentions` (apps/meteor/client/views/navigation/sidepanel/tabs/SidePanelMentions.tsx)
        *   `SidePanelFavorites` (apps/meteor/client/views/navigation/sidepanel/tabs/SidePanelFavorites.tsx)
        *   `SidePanelDiscussions` (apps/meteor/client/views/navigation/sidepanel/tabs/SidePanelDiscussions.tsx)
        *   ...and more.

**Summary of Impact:**

A change to the `Streamer` module would impact:

*   **Real-time Communication:** Core real-time updates and notifications on both the client and server.
*   **File Uploads:** Functionality for uploading files, particularly in Livechat and general API endpoints.
*   **Administrative UI:** Components related to workspace administration, deployment, and instance management.
*   **Presence:** Client-side presence updates.
*   **Core Services:** Server startup processes and various core services.
*   **Client-side UI:** A wide array of user interface components involved in messaging, team/channel management, and side panels, due to their reliance on real-time data streams.

## Tool Calls (2 calls, 10,039 tokens)

**Step 1:** `search({"query":"Streamer"})` → 623 tokens
**Step 2:** `graph({"file":"ee/apps/ddp-streamer/src/Streamer.ts","direction":"up","query":"Streamer","mode":"impact"})` → 970 tokens

## Files Seen In Tool Results (50)

- `ee/apps/ddp-streamer/src/Streamer.ts`
- `apps/meteor/server/modules/streamer/streamer.module.ts`
- `apps/meteor/client/lib/streamer/streamer.ts`
- `apps/meteor/app/notifications/server/lib/Presence.ts`
- `apps/meteor/ee/server/apps/communication/websockets.ts`
- `packages/ddp-client/src/types/streams.ts`
- `apps/meteor/client/lib/streamer/index.ts`
- `apps/meteor/server/modules/streamer/types.ts`
- `ee/apps/ddp-streamer/src/service.ts`
- `ee/apps/ddp-streamer/src/proxy.ts`
- `ee/apps/ddp-streamer/src/constants.ts`
- `ee/apps/ddp-streamer/src/configureServer.ts`
- `ee/apps/ddp-streamer/src/Server.ts`
- `ee/apps/ddp-streamer/src/Publication.ts`
- `ee/apps/ddp-streamer/src/DDPStreamer.ts`
- `ee/apps/ddp-streamer/src/Client.ts`
- `ee/apps/ddp-streamer/src/types/IPacket.ts`
- `ee/apps/ddp-streamer/src/lib/utils.ts`
- `ee/apps/ddp-streamer/src/lib/Autoupdate.ts`
- `apps/meteor/client/lib/streamer/emitter.ts`
- `apps/meteor/client/lib/streamer/ddp.ts`
- `apps/meteor/app/authorization/server/streamer/permissions/index.ts`
- `apps/meteor/app/notifications/server/lib/Notifications.ts`
- `apps/meteor/app/api/server/lib/MultipartUploadHandler.ts`
- `apps/meteor/client/views/admin/workspace/WorkspacePage.tsx`
- `apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.tsx`
- `apps/meteor/app/notifications/client/lib/Presence.ts`
- `apps/meteor/app/livechat/imports/server/rest/upload.ts`
- `apps/meteor/app/api/server/v1/rooms.ts`
- `apps/meteor/client/views/admin/workspace/WorkspaceRoute.tsx`
- `apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.stories.tsx`
- `ee/apps/presence-service/src/service.ts`
- `apps/meteor/server/services/startup.ts`
- `packages/ddp-client/src/livechat/LivechatClientImpl.ts`
- `apps/meteor/client/lib/chats/uploads.ts`
- `apps/meteor/server/main.ts`
- `apps/meteor/client/views/room/composer/messageBox/MessageComposerFiles.tsx`
- `apps/meteor/client/views/teams/contextualBar/members/RemoveUsersModal/RemoveUsersFirstStep.tsx`
- `apps/meteor/client/views/teams/contextualBar/members/RemoveUsersModal/BaseRemoveUsersModal.tsx`
- `apps/meteor/client/views/teams/contextualBar/info/LeaveTeam/LeaveTeamModal/LeaveTeamModalChannels.tsx`
- `apps/meteor/client/views/teams/contextualBar/info/LeaveTeam/LeaveTeamModal/LeaveTeamModal.tsx`
- `apps/meteor/client/views/teams/contextualBar/info/DeleteTeam/DeleteTeamModal.tsx`
- `apps/meteor/client/views/teams/contextualBar/info/DeleteTeam/DeleteTeamChannels.tsx`
- `apps/meteor/client/views/teams/contextualBar/info/ConvertToChannelModal/BaseConvertToChannelModal.tsx`
- `apps/meteor/client/views/teams/contextualBar/info/ConvertToChannelModal/ModalSteps/FirstStep.tsx`
- `apps/meteor/client/views/navigation/sidepanel/SidePanelInternal.tsx`
- `apps/meteor/client/views/navigation/sidepanel/tabs/SidePanelTeams.tsx`
- `apps/meteor/client/views/navigation/sidepanel/tabs/SidePanelMentions.tsx`
- `apps/meteor/client/views/navigation/sidepanel/tabs/SidePanelFavorites.tsx`
- `apps/meteor/client/views/navigation/sidepanel/tabs/SidePanelDiscussions.tsx`
