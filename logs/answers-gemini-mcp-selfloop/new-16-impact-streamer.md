# What is the blast radius of changing the Streamer module in Rocket.Chat?

## Plan

intent: impact

## Gemini Answer

The blast radius of changing the `Streamer` module, specifically the implementation in `apps/meteor/server/modules/streamer/streamer.module.ts`, is extensive, impacting core real-time communication, notifications, file handling, API endpoints, app integrations, and a significant portion of the client-side user interface.

Here's a breakdown of the impact by hop distance:

**Entry Point:** `Streamer` in `apps/meteor/server/modules/streamer/streamer.module.ts`

**Direct Callers (1 hop):**
*   `instances` in `apps/meteor/server/modules/streamer/streamer.module.ts`: Internal management of streamer instances.
*   `Stream` in `ee/apps/ddp-streamer/src/Streamer.ts`: The Enterprise Edition's DDP Streamer directly utilizes this module.
*   `Stream` in `apps/meteor/app/notifications/server/lib/Notifications.ts`: The server-side notification system relies on `Streamer` for real-time updates.

**Indirect Dependents (2 hops):**
*   **Server-side:** `parseRequest` in `apps/meteor/app/api/server/lib/MultipartUploadHandler.ts`: Suggests involvement in handling multipart file uploads.
*   **Client-side UI (Admin Workspace):** `WorkspacePage` in `apps/meteor/client/views/admin/workspace/WorkspacePage.tsx`, `handleInstancesModal` and `DeploymentCard` in `apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.tsx`: These components likely display or manage streaming-related configurations or data within the admin panel.

**3-hop Dependents:**
*   **Server-side API:** `upload` in `apps/meteor/app/livechat/imports/server/rest/upload.ts` and `rooms` in `apps/meteor/app/api/server/v1/rooms.ts`: API endpoints for Livechat uploads and general room operations are affected.
*   **Client-side UI (Admin Workspace):** `WorkspaceRoute` in `apps/meteor/client/views/admin/workspace/WorkspaceRoute.tsx` and `Template` in `apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.stories.tsx`: Further UI components related to the admin workspace.

**4-hop Dependents:**
*   **Client-side (Livechat/Uploads):** `uploadFile` in `packages/ddp-client/src/livechat/LivechatClientImpl.ts` and `send` in `apps/meteor/client/lib/chats/uploads.ts`: Client-side file upload mechanisms, particularly for Livechat.
*   **Client-side UI (Various):** A broad range of JSX components including `MessageComposerFiles` in `apps/meteor/client/views/room/composer/messageBox/MessageComposerFiles.tsx`, various team management modals (e.g., `RemoveUsersFirstStep`, `LeaveTeamModal`, `DeleteTeamModal`, `ConvertToChannelModal` in `apps/meteor/client/views/teams/contextualBar/members/RemoveUsersModal/RemoveUsersFirstStep.tsx`, `apps/meteor/client/views/teams/contextualBar/info/LeaveTeam/LeaveTeamModal/LeaveTeamModal.tsx`, `apps/meteor/client/views/teams/contextualBar/info/DeleteTeam/DeleteTeamModal.tsx`, `apps/meteor/client/views/teams/contextualBar/info/ConvertToChannelModal/BaseConvertToChannelModal.tsx`), and side panel navigation components (e.g., `SidePanelInternal`, `SidePanelTeams`, `SidePanelMentions`, `SidePanelFavorites`, `SidePanelDiscussions` in `apps/meteor/client/views/navigation/sidepanel/SidePanelInternal.tsx`, `apps/meteor/client/views/navigation/sidepanel/tabs/SidePanelTeams.tsx`).

**5-hop Dependents:**
*   **Core Real-time Communication:** `onDispatchMessage`, `dispatch`, `sendOutstandingBlocks` in `packages/ddp-client/src/MinimalDDPClient.ts` and `packages/ddp-client/src/DDPDispatcher.ts`: The fundamental DDP client responsible for real-time communication is deeply intertwined.
*   **Server-side (Core/API/Apps):** `sendToManySubscriptions` in `apps/meteor/server/modules/streamer/streamer.module.ts` (internal), `oauth2-server` in `apps/meteor/app/oauth2-server-config/server/oauth/oauth2-server.ts`, `authenticationMiddleware` and `hasPermissionMiddleware` in `apps/meteor/app/api/server/middlewares/authentication.ts`, `uikit`, `routeHandler`, `unauthorized` in `apps/meteor/ee/server/apps/communication/uikit.ts`, `_appApiExecutor` in `apps/meteor/app/apps/server/bridges/api.ts`, `doFileUpload` in `packages/livechat/src/routes/Chat/container.js`, `downloadAndStoreRemoteFile` in `ee/packages/federation-matrix/src/services/MatrixMediaService.ts`, `handleUpload` in `apps/meteor/client/views/room/webdav/WebdavFilePickerModal/WebdavFilePickerModal.tsx`, `useInstallApp` in `apps/meteor/client/views/marketplace/hooks/useInstallApp.tsx`, `uploadFiles` in `apps/meteor/client/lib/chats/flows/uploadFiles.ts`, `sendP2PCommand` in `packages/media-signaling/src/lib/services/webrtc/Processor.ts`. This indicates a broad impact on server-side authentication, API execution, app integrations, federation, and various upload/download functionalities.
*   **Client-side UI:** Further UI components such as `MessageBox` in `apps/meteor/client/views/room/composer/messageBox/MessageBox.tsx`, `RemoveUsersModal` in `apps/meteor/client/views/teams/contextualBar/members/RemoveUsersModal/RemoveUsersModal.tsx`, `LeaveTeamWithData` in `apps/meteor/client/views/teams/contextualBar/info/LeaveTeam/LeaveTeamWithData.tsx`, `DeleteTeamModalWithRooms` in `apps/meteor/client/views/teams/contextualBar/info/DeleteTeam/DeleteTeamModalWithRooms.tsx`, `ConvertToChannelModal` in `apps/meteor/client/views/teams/contextualBar/info/ConvertToChannelModal/ConvertToChannelModal.tsx`, `SidePanelRooms` in `apps/meteor/client/views/navigation/sidepanel/tabs/SidePanelRooms.tsx`, and `SidePanelRouter` in `apps/meteor/client/views/navigation/sidepanel/SidePanelRouter.tsx`.

In summary, any changes to the `Streamer` module would necessitate careful consideration and testing across Rocket.Chat's real-time communication infrastructure, notification system, file management, API layer, app integration framework, and a substantial portion of its client-facing user interface.

## Tool Calls (3 calls, 10,659 tokens)

**Step 1:** `plan({"intent":"impact","question":"What is the blast radius of changing the Streamer module in Rocket.Chat?"})` → 218 tokens
**Step 2:** `search({"query":"Streamer"})` → 420 tokens
**Step 3:** `graph({"query":"Streamer","depth":5,"file":"streamer.module.ts","move":"up"})` → 1396 tokens

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
