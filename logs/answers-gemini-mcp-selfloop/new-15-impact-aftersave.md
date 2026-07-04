# What would be impacted if the afterSaveMessage callback system were changed?

## Plan

intent: impact

## Gemini Answer

The `afterSaveMessage` callback system, defined in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`, is a critical component within Rocket.Chat, and any changes to it would have a widespread impact across various parts of the application.

Here's a breakdown of the impacted areas:

**Core Message Handling (Direct Callers):**
The most immediate impact would be on the functions responsible for saving and updating messages.
*   `updateMessage` in `apps/meteor/app/lib/server/functions/updateMessage.ts`
*   `sendMessage` in `apps/meteor/app/lib/server/functions/sendMessage.ts`

**Event-Driven Features and Integrations (Direct Callers):**
Numerous modules register for `afterSaveMessage` events to perform specific actions. These would be directly affected.
*   **Message Read Receipts:** `afterSaveMessage` in `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
*   **Threads:** `aftersavemessage` in `apps/meteor/app/threads/server/hooks/aftersavemessage.ts`
*   **Search Indexing:** `afterSaveMessage` in `apps/meteor/app/search/server/events/index.ts`
*   **Livechat/Omnichannel:** `afterSaveOmnichannelMessage` in `apps/meteor/app/livechat/server/hooks/afterSaveOmnichannelMessage.ts`
*   **Email Inbox:** `EmailInbox_Outgoing` in `apps/meteor/server/features/EmailInbox/EmailInbox_Outgoing.ts`
*   **Slack Bridge:** `registerForEvents` in `apps/meteor/app/slackbridge/server/RocketAdapter.ts`
*   **Integrations/Triggers:** `triggers` in `apps/meteor/app/integrations/server/triggers.ts`
*   **Discussion Metadata:** `propagateDiscussionMetadata` in `apps/meteor/app/discussion/server/hooks/propagateDiscussionMetadata.ts`
*   **Engagement Dashboard:** `attachCallbacks` in `apps/meteor/ee/server/lib/engagementDashboard/startup.ts`
*   **Federation:** `index` in `apps/meteor/ee/server/hooks/federation/index.ts`
*   **User Mentions:** `mentionUserNotInChannel` in `apps/meteor/app/lib/server/startup/mentionUserNotInChannel.ts`
*   **Notifications:** `sendNotificationsOnMessage` and `notifyUsersOnMessage` in `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts` and `apps/meteor/app/lib/server/lib/notifyUsersOnMessage.ts` respectively.
*   **IRC Bridge:** `setupLocalHandlers` in `apps/meteor/app/irc/server/irc-bridge/index.js`
*   **Auto-translation:** `registerCallbacks` in `apps/meteor/app/autotranslate/server/autotranslate.ts`
*   **Asynchronous Processing:** `afterSaveMessageAsync` in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`

**Broader System Impact (Indirect Dependents):**
Changes would ripple through various services, methods, and UI components that interact with the direct callers or rely on the outcomes of message saving.

*   **Message Services:** `updateMessage` and `sendMessageWithValidation` in `apps/meteor/server/services/messages/service.ts`, `createMessage` in `apps/meteor/server/services/video-conference/service.ts`, `sendHistoryMessage` in `apps/meteor/server/services/media-call/service.ts`.
*   **Uploads:** `updateMessageRemovingFiles` in `apps/meteor/server/services/upload/service.ts`, `uploadFileFromSlack` in `apps/meteor/app/slackbridge/server/SlackAdapter.ts`.
*   **Discussions:** `create` in `apps/meteor/app/discussion/server/methods/createDiscussion.ts`.
*   **API Endpoints:** Various API endpoints related to rooms and settings, e.g., `apps/meteor/app/api/server/v1/rooms.ts`.
*   **Client-Side UI:** A significant number of React/JSX components would be impacted, as they are responsible for rendering messages or reacting to message-related events. Examples include:
    *   `VideoConfMessageUserStack` in `packages/ui-video-conf/src/VideoConfMessage/VideoConfMessageUserStack.tsx`
    *   `ComposerMessage` in `apps/meteor/client/views/room/composer/ComposerMessage.tsx`
    *   Components related to `livechat` UI (`packages/livechat/src/components/uiKit/message/index.tsx`)
    *   Emoji and reaction related components (`packages/gazzodown/src/emoji/EmojiRenderer.tsx`, `apps/meteor/client/views/composer/EmojiPicker/SearchingResult.tsx`, `apps/meteor/client/components/message/toolbar/items/actions/ReactionMessageAction.tsx`)
    *   Call history and user info actions (`packages/ui-voip/src/views/CallHistoryContextualbar/CallHistoryContextualbar.tsx`, `apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useVideoCallAction.tsx`)
*   **Administrative and Enterprise Features:** Settings pages, marketplace app details, custom user statuses, and other admin-facing components.

**Flow of Impact:**

1.  **Entry Point:** `afterSaveMessage` in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`
2.  **Direct Callers/Event Subscribers:** Functions like `updateMessage` and `sendMessage`, along with numerous event handlers in modules such as `message-read-receipt`, `threads`, `search`, `livechat`, `slackbridge`, and `autotranslate`.
3.  **Indirect Dependents:** Services that call the direct callers (e.g., `messages/service.ts`), and a wide array of client-side UI components and other server-side features that rely on the successful processing and storage of messages.

In conclusion, modifying the `afterSaveMessage` callback system would necessitate a thorough review and testing across almost all facets of Rocket.Chat, from core message functionality and integrations to the user interface and various administrative features.

## Tool Calls (3 calls, 13,680 tokens)

**Step 1:** `plan({"question":"What would be impacted if the afterSaveMessage callback system were changed?","intent":"impact"})` → 80 tokens
**Step 2:** `search({"query":"afterSaveMessage"})` → 152 tokens
**Step 3:** `graph({"query":"afterSaveMessage","depth":5,"move":"up","file":"afterSaveMessage.ts"})` → 4794 tokens

## Files Seen In Tool Results (139)

- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
- `apps/meteor/app/search/server/events/index.ts`
- `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`
- `apps/meteor/app/threads/server/hooks/aftersavemessage.ts`
- `apps/meteor/app/lib/server/functions/updateMessage.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `apps/meteor/server/features/EmailInbox/EmailInbox_Outgoing.ts`
- `apps/meteor/app/slackbridge/server/RocketAdapter.ts`
- `apps/meteor/app/integrations/server/triggers.ts`
- `apps/meteor/app/discussion/server/hooks/propagateDiscussionMetadata.ts`
- `apps/meteor/ee/server/lib/engagementDashboard/startup.ts`
- `apps/meteor/ee/server/hooks/federation/index.ts`
- `apps/meteor/app/livechat/server/hooks/afterSaveOmnichannelMessage.ts`
- `apps/meteor/app/lib/server/startup/mentionUserNotInChannel.ts`
- `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts`
- `apps/meteor/app/lib/server/lib/notifyUsersOnMessage.ts`
- `apps/meteor/app/irc/server/irc-bridge/index.js`
- `apps/meteor/app/autotranslate/server/autotranslate.ts`
- `apps/meteor/app/discussion/server/methods/createDiscussion.ts`
- `apps/meteor/server/services/upload/service.ts`
- `apps/meteor/server/services/messages/service.ts`
- `apps/meteor/app/slackbridge/server/SlackAdapter.ts`
- `apps/meteor/app/lib/server/methods/updateMessage.ts`
- `apps/meteor/app/apps/server/bridges/messages.ts`
- `apps/meteor/server/services/video-conference/service.ts`
- `apps/meteor/server/services/media-call/service.ts`
- `packages/ui-video-conf/src/VideoConfMessage/VideoConfMessageUserStack.tsx`
- `packages/ui-client/src/components/Wizard/WizardTabs.tsx`
- `packages/ui-client/src/components/Contextualbar/ContextualbarSkeletonBody.tsx`
- `packages/livechat/src/components/uiKit/message/index.tsx`
- `packages/gazzodown/src/PreviewMarkup.tsx`
- `packages/ui-client/src/providers/ModalProvider/ModalStore.ts`
- `ee/apps/ddp-streamer/src/lib/Autoupdate.ts`
- `apps/meteor/client/lib/banners.ts`
- `apps/meteor/client/lib/appLayout.tsx`
- `apps/meteor/client/lib/chats/uploads.ts`
- `packages/node-poplib/src/index.js`
- `apps/meteor/app/slashcommands-create/server/server.ts`
- `apps/meteor/app/slashcommands-create/client/client.ts`
- `ee/packages/media-calls/src/sip/Session.ts`
- `apps/meteor/server/lib/ldap/Connection.ts`
- `apps/meteor/app/irc/server/servers/RFC2813/index.js`
- `packages/ui-video-conf/src/VideoConfMessage/VideoConfMessage.stories.tsx`
- `packages/ui-client/src/components/Wizard/Wizard.stories.tsx`
- `packages/ui-client/src/components/Contextualbar/ContextualbarSkeleton.tsx`
- `apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppSettings/AppSettings.tsx`
- `packages/gazzodown/src/emoji/EmojiRenderer.tsx`
- `apps/meteor/client/views/composer/EmojiPicker/SearchingResult.tsx`
- `apps/meteor/client/views/composer/EmojiPicker/EmojiCategoryRow.tsx`
- `apps/meteor/client/components/message/toolbar/items/actions/ReactionMessageAction.tsx`
- `packages/ui-voip/src/views/CallHistoryContextualbar/CallHistoryContextualbar.tsx`
- `apps/meteor/client/views/navigation/sidebar/RoomList/SidebarItemWithData.tsx`
- `apps/meteor/client/views/mediaCallHistory/MediaCallHistoryInternal.tsx`
- `apps/meteor/client/views/mediaCallHistory/MediaCallHistoryExternal.tsx`
- `apps/meteor/client/views/mediaCallHistory/CallHistoryRowExternalUser.tsx`
- `apps/meteor/app/api/server/v1/rooms.ts`
- `apps/meteor/app/apps/server/bridges/rooms.ts`
- `apps/meteor/app/slashcommands-open/client/client.ts`
- `packages/ddp-client/src/TimeoutControl.ts`
- `ee/apps/ddp-streamer/src/Publication.ts`
- `ee/apps/ddp-streamer/src/Client.ts`
- `apps/meteor/server/ufs/ufs-server.ts`
- `apps/meteor/server/ufs/ufs-gridfs.ts`
- `apps/meteor/server/lib/dataExport/makeZipFile.ts`
- `apps/meteor/server/email/IMAPInterceptor.ts`
- `apps/meteor/app/file-upload/server/config/GridFS.ts`
- `apps/meteor/app/file/server/file.server.ts`
- `apps/meteor/ee/server/configuration/saml.ts`
- `apps/meteor/client/views/room/composer/ComposerMessage.tsx`
- `apps/meteor/client/views/admin/settings/SettingsSection/SettingsSection.tsx`
- `apps/meteor/client/views/admin/featurePreview/AdminFeaturePreviewPage.tsx`
- `apps/meteor/client/views/admin/ABAC/ABACSettingTab/SettingsPage.tsx`
- `apps/meteor/client/providers/MeteorProvider.tsx`
- `packages/mock-providers/src/MockedAppRootBuilder.tsx`
- `packages/ui-voip/src/views/MediaCallHistoryTable/CallHistoryTableRow.tsx`
- `packages/ui-voip/src/hooks/VoipPopupDraggable/useDraggable.stories.tsx`
- `packages/ui-voip/src/components/Cards/StreamCard/StreamCardStopSharingButton.tsx`
- `packages/ui-voip/src/components/Cards/StreamCard/StreamCardPin.tsx`
- `packages/ui-composer/src/MessageComposer/MessageComposerFile/MessageComposerFileError.tsx`
- `packages/ui-client/src/components/SidebarToggler/SidebarTogglerButton.tsx`
- `packages/ui-client/src/components/AnnouncementBanner/AnnouncementBanner.tsx`
- `apps/meteor/app/search/server/model/Settings.ts`
- `packages/apps-engine/src/server/managers/AppSlashCommandManager.ts`
- `packages/apps-engine/deno-runtime/lib/roomFactory.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/api/rooms.ts`
- `apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useVideoCallAction.tsx`
- `apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useUserMediaCallAction.ts`
- `apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useReportUser.tsx`
- `apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useRemoveUserAction.tsx`
- `apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useRedirectModerationConsole.ts`
- `apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useMuteUserAction.tsx`
- `apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useIgnoreUserAction.ts`
- `apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useDirectMessageAction.ts`
- `apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useChangeOwnerAction.tsx`
- `apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useChangeModeratorAction.tsx`
- `apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useChangeLeaderAction.ts`
- `apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useBlockUserAction.ts`
- `apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useBanUserAction.tsx`
- `apps/meteor/client/lib/toast.ts`
- `packages/agenda/src/Job.ts`
- `apps/meteor/app/api/server/v1/settings.ts`
- `apps/meteor/app/livechat/server/lib/messages.ts`
- `apps/meteor/client/views/omnichannel/triggers/TriggersRow.tsx`
- `apps/meteor/client/views/omnichannel/tags/useRemoveTag.tsx`
- `apps/meteor/client/views/omnichannel/slaPolicies/RemoveSlaButton.tsx`
- `apps/meteor/client/views/omnichannel/managers/RemoveManagerButton.tsx`
- `apps/meteor/client/views/omnichannel/directory/chats/ChatsTable/RemoveChatButton.tsx`
- `apps/meteor/client/views/omnichannel/departments/DepartmentAgentsTable/RemoveAgentButton.tsx`
- `apps/meteor/client/views/omnichannel/cannedResponses/modals/CannedResponseEditWithData.tsx`
- `apps/meteor/client/views/admin/rooms/EditRoomWithData.tsx`
- `apps/meteor/client/views/admin/rooms/EditRoom.tsx`
- `apps/meteor/client/views/admin/permissions/EditRolePage.tsx`
- `apps/meteor/client/views/admin/emailInbox/EmailInboxForm.tsx`
- `apps/meteor/client/views/admin/customUserStatus/CustomUserStatusForm.tsx`
- `apps/meteor/client/views/admin/customSounds/EditSound.tsx`
- `apps/meteor/app/meteor-accounts-saml/server/loginHandler.ts`
- `packages/ddp-client/src/livechat/LivechatClientImpl.ts`
- `packages/ddp-client/src/legacy/RocketchatSDKLegacy.ts`
- `ee/packages/license/src/license.ts`
- `apps/meteor/app/utils/client/lib/SDKClient.ts`
- `packages/ui-voip/src/hooks/VoipPopupDraggable/DraggableCore.ts`
- `packages/ddp-client/src/MinimalDDPClient.ts`
- `packages/ddp-client/src/DDPDispatcher.ts`
- `apps/meteor/client/lib/presence.ts`
- `apps/meteor/app/slashcommands-status/server/status.ts`
- `apps/meteor/app/slashcommands-topic/server/topic.ts`
- `apps/meteor/ee/server/apps/storage/AppGridFSSourceStorage.ts`
- `apps/meteor/app/file-upload/server/config/Webdav.ts`
- `apps/meteor/app/file-upload/server/config/GoogleStorage.ts`
- `apps/meteor/app/file-upload/server/config/AmazonS3.ts`
- `apps/meteor/app/api/server/lib/MultipartUploadHandler.ts`
- `apps/meteor/client/lib/streamer/streamer.ts`
- `packages/apps-engine/src/server/runtime/deno/AppsEngineDenoRuntime.ts`
- `apps/meteor/server/services/startup.ts`
- `apps/meteor/app/autotranslate/server/msTranslate.ts`
- `apps/meteor/app/autotranslate/server/googleTranslate.ts`
- `apps/meteor/app/autotranslate/server/deeplTranslate.ts`
- `packages/apps-engine/src/server/runtime/deno/ProcessMessenger.ts`
- `ee/packages/pdf-worker/src/index.ts`
