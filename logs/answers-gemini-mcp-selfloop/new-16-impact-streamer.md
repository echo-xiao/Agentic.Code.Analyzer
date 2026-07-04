# What is the blast radius of changing the Streamer module in Rocket.Chat?

## Plan

intent: impact

## Gemini Answer

The `Streamer` module, located at `apps/meteor/server/modules/streamer/streamer.module.ts`, is a core component in Rocket.Chat, and changes to it would have a significant blast radius across various parts of the application.

**Direct Callers:**
*   `Streamer` (instances) - `apps/meteor/server/modules/streamer/streamer.module.ts`
*   `Stream` - `ee/apps/ddp-streamer/src/Streamer.ts`
*   `Stream` - `apps/meteor/app/notifications/server/lib/Notifications.ts`

**Indirect Dependents (up to 5 hops):**

The impact extends to:

*   **API Endpoints:**
    *   `parseRequest` - `apps/meteor/app/api/server/lib/MultipartUploadHandler.ts`
    *   `upload` - `apps/meteor/app/livechat/imports/server/rest/upload.ts`
    *   `rooms` - `apps/meteor/app/api/server/v1/rooms.ts`
    *   `oauth2-server` - `apps/meteor/app/oauth2-server-config/server/oauth/oauth2-server.ts`
    *   `authenticationMiddleware`, `hasPermissionMiddleware` - `apps/meteor/app/api/server/middlewares/authentication.ts`
    *   `_appApiExecutor` - `apps/meteor/app/apps/server/bridges/api.ts`
*   **Admin Workspace:**
    *   `WorkspacePage` - `apps/meteor/client/views/admin/workspace/WorkspacePage.tsx`
    *   `handleInstancesModal`, `DeploymentCard` - `apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.tsx`
    *   `WorkspaceRoute` - `apps/meteor/client/views/admin/workspace/WorkspaceRoute.tsx`
    *   `Template` - `apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.stories.tsx`
*   **Client-side Functionalities (Uploads, Messaging, UI):**
    *   `uploadFile` - `packages/ddp-client/src/livechat/LivechatClientImpl.ts`
    *   `send` - `apps/meteor/client/lib/chats/uploads.ts`
    *   `MessageComposerFiles` - `apps/meteor/client/views/room/composer/messageBox/MessageComposerFiles.tsx`
    *   `MessageBox` - `apps/meteor/client/views/room/composer/messageBox/MessageBox.tsx`
    *   `handleUpload`, `WebdavFilePickerModal` - `apps/meteor/client/views/room/webdav/WebdavFilePickerModal/WebdavFilePickerModal.tsx`
    *   `useInstallApp` - `apps/meteor/client/views/marketplace/hooks/useInstallApp.tsx`
    *   `uploadFiles` - `apps/meteor/client/lib/chats/flows/uploadFiles.ts`
*   **Team Management Modals:**
    *   `RemoveUsersFirstStep`, `BaseRemoveUsersModal`, `RemoveUsersModal` - `apps/meteor/client/views/teams/contextualBar/members/RemoveUsersModal/RemoveUsersModal.tsx`
    *   `LeaveTeamModalChannels`, `LeaveTeamModal`, `ChannelsStep`, `LeaveTeamWithData` - `apps/meteor/client/views/teams/contextualBar/info/LeaveTeam/LeaveTeamModal/LeaveTeamModal.tsx`
    *   `DeleteTeamModal`, `DeleteTeamChannels`, `DeleteTeamModalWithRooms`, `ChannelsStep` - `apps/meteor/client/views/teams/contextualBar/info/DeleteTeam/DeleteTeamModal.tsx`
    *   `BaseConvertToChannelModal`, `FirstStep`, `ConvertToChannelModal` - `apps/meteor/client/views/teams/contextualBar/info/ConvertToChannelModal/ConvertToChannelModal.tsx`
*   **Side Panel Navigation:**
    *   `SidePanelInternal`, `createSidePanel` - `apps/meteor/client/views/navigation/sidepanel/SidePanelInternal.tsx`
    *   `SidePanelTeams`, `SidePanelMentions`, `SidePanelFavorites`, `SidePanelDiscussions`, `SidePanelRooms` - `apps/meteor/client/views/navigation/sidepanel/tabs/*.tsx`
    *   `SidePanelRouter` - `apps/meteor/client/views/navigation/sidepanel/SidePanelRouter.tsx`
*   **DDP Client and Dispatcher:**
    *   `onDispatchMessage`, `dispatch`, `sendOutstandingBlocks` - `packages/ddp-client/src/MinimalDDPClient.ts`, `packages/ddp-client/src/DDPDispatcher.ts`
*   **Enterprise Edition (EE) Features:**
    *   `uikit`, `routeHandler`, `unauthorized` - `apps/meteor/ee/server/apps/communication/uikit.ts`
    *   `downloadAndStoreRemoteFile` - `ee/packages/federation-matrix/src/services/MatrixMediaService.ts`
*   **Other:**
    *   `sendP2PCommand` - `packages/media-signaling/src/lib/services/webrtc/Processor.ts`

In summary, modifying the `Streamer` module would impact real-time communication, notifications, file uploads, API interactions, administrative features, team management, and various UI components across both the client and server, including specific Enterprise Edition functionalities.

## Tool Calls (4 calls, 13,003 tokens)

**Step 1:** `plan({"intent":"impact","question":"What is the blast radius of changing the Streamer module in Rocket.Chat?"})` → 80 tokens
**Step 2:** `search({"query":"Streamer"})` → 420 tokens
**Step 3:** `graph({"query":"Streamer","depth":5,"move":"up","file":"streamer.module.ts"})` → 1396 tokens
**Step 4:** `details({"filename":"Streamer.ts","symbolName":"Streamer"})` → 108 tokens

## Files Seen In Tool Results (63)

- `ee/apps/ddp-streamer/src/Streamer.ts`
- `apps/meteor/server/modules/streamer/streamer.module.ts`
- `apps/meteor/client/lib/streamer/streamer.ts`
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
- `apps/meteor/server/modules/streamer/types.ts`
- `apps/meteor/client/lib/streamer/index.ts`
- `apps/meteor/client/lib/streamer/emitter.ts`
- `apps/meteor/client/lib/streamer/ddp.ts`
- `apps/meteor/app/notifications/server/lib/Notifications.ts`
- `apps/meteor/app/api/server/lib/MultipartUploadHandler.ts`
- `apps/meteor/client/views/admin/workspace/WorkspacePage.tsx`
- `apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.tsx`
- `apps/meteor/app/livechat/imports/server/rest/upload.ts`
- `apps/meteor/app/api/server/v1/rooms.ts`
- `apps/meteor/client/views/admin/workspace/WorkspaceRoute.tsx`
- `apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.stories.tsx`
- `packages/ddp-client/src/livechat/LivechatClientImpl.ts`
- `apps/meteor/client/lib/chats/uploads.ts`
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
- `apps/meteor/app/oauth2-server-config/server/oauth/oauth2-server.ts`
- `apps/meteor/app/api/server/middlewares/authentication.ts`
- `apps/meteor/ee/server/apps/communication/uikit.ts`
- `apps/meteor/app/apps/server/bridges/api.ts`
- `packages/livechat/src/routes/Chat/container.js`
- `ee/packages/federation-matrix/src/services/MatrixMediaService.ts`
- `apps/meteor/client/views/room/webdav/WebdavFilePickerModal/WebdavFilePickerModal.tsx`
- `apps/meteor/client/views/marketplace/hooks/useInstallApp.tsx`
- `apps/meteor/client/lib/chats/flows/uploadFiles.ts`
- `packages/media-signaling/src/lib/services/webrtc/Processor.ts`
- `apps/meteor/client/views/room/composer/messageBox/MessageBox.tsx`
- `apps/meteor/client/views/teams/contextualBar/members/RemoveUsersModal/RemoveUsersModal.tsx`
- `apps/meteor/client/views/teams/contextualBar/info/LeaveTeam/LeaveTeamModal/LeaveTeamModal.stories.tsx`
- `apps/meteor/client/views/teams/contextualBar/info/LeaveTeam/LeaveTeamWithData.tsx`
- `apps/meteor/client/views/teams/contextualBar/info/DeleteTeam/DeleteTeamModalWithRooms.tsx`
- `apps/meteor/client/views/teams/contextualBar/info/DeleteTeam/DeleteTeamModal.stories.tsx`
- `apps/meteor/client/views/teams/contextualBar/info/ConvertToChannelModal/ConvertToChannelModal.tsx`
- `apps/meteor/client/views/navigation/sidepanel/tabs/SidePanelRooms.tsx`
- `apps/meteor/client/views/navigation/sidepanel/SidePanelRouter.tsx`
- `packages/ddp-client/src/MinimalDDPClient.ts`
- `packages/ddp-client/src/DDPDispatcher.ts`
