# What is the blast radius of changing the Streamer module in Rocket.Chat?

## Plan

intent: impact

## Gemini Answer

The blast radius of changing the `Streamer` module in `apps/meteor/server/modules/streamer/streamer.module.ts` is extensive, impacting core real-time communication, notifications, DDP services, file uploads, API endpoints, authentication, the Apps Engine, federation, and a wide range of client-side UI components.

Here's a breakdown of the impact:

**Entry Point:**
*   `Streamer` in `apps/meteor/server/modules/streamer/streamer.module.ts`

**Direct Callers (1-hop dependents):**
*   `Streamer` in `apps/meteor/server/modules/streamer/streamer.module.ts`: This indicates internal usage within the module itself.
*   `Stream` in `ee/apps/ddp-streamer/src/Streamer.ts`: The DDP streamer service extends the base `Streamer`, meaning any changes will directly affect how DDP publications and methods are handled in a microservices environment.
*   `Stream` in `apps/meteor/app/notifications/server/lib/Notifications.ts`: The server-side notifications module relies on `Streamer` for real-time event broadcasting.

**Indirect Dependents (2-hop to 5-hop):**

*   **File Uploads and API:**
    *   `parseRequest` in `apps/meteor/app/api/server/lib/MultipartUploadHandler.ts` (2-hop)
    *   `upload` in `apps/meteor/app/livechat/imports/server/rest/upload.ts` (3-hop)
    *   `rooms` in `apps/meteor/app/api/server/v1/rooms.ts` (3-hop)
    *   `uploadFile` in `packages/ddp-client/src/livechat/LivechatClientImpl.ts` (4-hop)
    *   `send` in `apps/meteor/client/lib/chats/uploads.ts` (4-hop)
    *   `doFileUpload` in `packages/livechat/src/routes/Chat/container.js` (5-hop)
    *   `downloadAndStoreRemoteFile` in `ee/packages/federation-matrix/src/services/MatrixMediaService.ts` (5-hop)
    *   `handleUpload` in `apps/meteor/client/views/room/webdav/WebdavFilePickerModal/WebdavFilePickerModal.tsx` (5-hop)
    *   `uploadFiles` in `apps/meteor/client/lib/chats/flows/uploadFiles.ts` (5-hop)
    This indicates that file uploads across various features (Livechat, general chat, WebDAV, federation) and related API endpoints will be affected.

*   **Admin UI and Workspace Management:**
    *   `WorkspacePage` in `apps/meteor/client/views/admin/workspace/WorkspacePage.tsx` (2-hop)
    *   `handleInstancesModal` in `apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.tsx` (2-hop)
    *   `DeploymentCard` in `apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.tsx` (2-hop)
    *   `WorkspaceRoute` in `apps/meteor/client/views/admin/workspace/WorkspaceRoute.tsx` (3-hop)
    *   `Template` in `apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.stories.tsx` (3-hop)
    Changes could impact the real-time display and management of workspace and deployment information in the administration panel.

*   **Client-Side UI and Features:** A large number of client-side JSX components are affected, indicating a broad impact on user interface elements that rely on real-time data or interactions. These include:
    *   `MessageComposerFiles` in `apps/meteor/client/views/room/composer/messageBox/MessageComposerFiles.tsx` (4-hop)
    *   Modals for user removal, team leaving, team deletion, and converting to channels (e.g., `RemoveUsersFirstStep`, `LeaveTeamModal`, `DeleteTeamModal`, `BaseConvertToChannelModal`) (4-hop)
    *   Various `SidePanel` tabs (e.g., `SidePanelInternal`, `SidePanelTeams`, `SidePanelMentions`, `SidePanelFavorites`, `SidePanelDiscussions`, `SidePanelRooms`, `SidePanelRouter`) (4-hop, 5-hop)
    *   `MessageBox` in `apps/meteor/client/views/room/composer/messageBox/MessageBox.tsx` (5-hop)

*   **Authentication and API Middleware:**
    *   `oauth2-server` in `apps/meteor/app/oauth2-server-config/server/oauth/oauth2-server.ts` (5-hop)
    *   `authenticationMiddleware` in `apps/meteor/app/api/server/middlewares/authentication.ts` (5-hop)
    *   `hasPermissionMiddleware` in `apps/meteor/app/api/server/middlewares/authentication.ts` (5-hop)
    This suggests that authentication and permission checks for API endpoints might be tied to `Streamer` functionality.

*   **Apps Engine and Federation:**
    *   `uikit` in `apps/meteor/ee/server/apps/communication/uikit.ts` (5-hop)
    *   `_appApiExecutor` in `apps/meteor/app/apps/server/bridges/api.ts` (5-hop)
    *   `downloadAndStoreRemoteFile` in `ee/packages/federation-matrix/src/services/MatrixMediaService.ts` (5-hop)
    The Apps Engine and Federation features (specifically Matrix media services) are also impacted, indicating that real-time communication for apps and federated instances relies on `Streamer`.

*   **DDP Client and Event Dispatching:**
    *   `onDispatchMessage` in `packages/ddp-client/src/MinimalDDPClient.ts` (5-hop)
    *   `dispatch` in `packages/ddp-client/src/MinimalDDPClient.ts` (5-hop)
    *   `sendOutstandingBlocks` in `packages/ddp-client/src/DDPDispatcher.ts` (5-hop)
    Changes will affect how the DDP client receives, dispatches, and processes real-time messages.

*   **Real-time Communication (P2P):**
    *   `sendP2PCommand` in `packages/media-signaling/src/lib/services/webrtc/Processor.ts` (5-hop)
    This indicates that peer-to-peer communication features also depend on the `Streamer` module.

In summary, modifying the `Streamer` module would necessitate thorough testing across all real-time features, including notifications, DDP communication, file uploads, API interactions, authentication, Apps Engine functionality, federation, and a wide array of client-side UI components that display or interact with real-time data. Both monolithic and microservices deployments would be affected.

## Tool Calls (3 calls, 13,627 tokens)

**Step 1:** `plan({"question":"What is the blast radius of changing the Streamer module in Rocket.Chat?","intent":"impact"})` → 1391 tokens
**Step 2:** `search({"query":"Streamer"})` → 420 tokens
**Step 3:** `graph({"move":"up","depth":5,"query":"Streamer","file":"streamer.module.ts"})` → 1396 tokens

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
