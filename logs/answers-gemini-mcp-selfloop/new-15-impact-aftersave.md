# What would be impacted if the afterSaveMessage callback system were changed?

## Plan

intent: impact

## Gemini Answer

The `afterSaveMessage` callback system, primarily defined in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`, is a critical component in Rocket.Chat's message processing pipeline. Modifying this system would have a broad impact across various features and integrations.

Here's a breakdown of the impacted areas:

**Entry Point:**
*   `afterSaveMessage` in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`

**Directly Impacted Components (1-hop dependents):**

*   **Message Operations:**
    *   `updateMessage` in `apps/meteor/app/lib/server/functions/updateMessage.ts`: Any updates to existing messages will trigger this callback.
    *   `sendMessage` in `apps/meteor/app/lib/server/functions/sendMessage.ts`: The core function for sending new messages, which relies on `afterSaveMessage`.
*   **Event-Driven Features & Integrations:**
    *   `EmailInbox_Outgoing` in `apps/meteor/server/features/EmailInbox/EmailInbox_Outgoing.ts`: Handles outgoing emails related to message events.
    *   `RocketAdapter` in `apps/meteor/app/slackbridge/server/RocketAdapter.ts`: Slack bridge integration for message events.
    *   `triggers` in `apps/meteor/app/integrations/server/triggers.ts`: Custom integrations that respond to message save events.
    *   `propagateDiscussionMetadata` in `apps/meteor/app/discussion/server/hooks/propagateDiscussionMetadata.ts`: Manages metadata for discussions.
    *   `attachCallbacks` in `apps/meteor/ee/server/lib/engagementDashboard/startup.ts`: Enterprise Engagement Dashboard features.
    *   `index` in `apps/meteor/ee/server/hooks/federation/index.ts`: Federation features for message synchronization.
    *   `afterSaveMessage` in `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`: Enterprise Read Receipts, marking messages as read by the sender.
    *   `aftersavemessage` in `apps/meteor/app/threads/server/hooks/aftersavemessage.ts`: Thread-related operations after a message is saved.
    *   `afterSaveMessage` in `apps/meteor/app/search/server/events/index.ts`: Search indexing and related events.
    *   `afterSaveOmnichannelMessage` in `apps/meteor/app/livechat/server/hooks/afterSaveOmnichannelMessage.ts`: Omnichannel (Livechat) specific message handling.
    *   `mentionUserNotInChannel` in `apps/meteor/app/lib/server/startup/mentionUserNotInChannel.ts`: Logic for handling user mentions.
    *   `sendNotificationsOnMessage` in `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts`: Core notification system for messages.
    *   `notifyUsersOnMessage` in `apps/meteor/app/lib/server/lib/notifyUsersOnMessage.ts`: Another part of the notification system.
    *   `setupLocalHandlers` in `apps/meteor/app/irc/server/irc-bridge/index.js`: IRC bridge integration.
    *   `registerCallbacks` in `apps/meteor/app/autotranslate/server/autotranslate.ts`: Auto-translation features.
*   **Asynchronous Processing:**
    *   `afterSaveMessageAsync` in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`: Indicates that some post-save operations are handled asynchronously.

**Indirectly Impacted Components (2-5 hop dependents):**

*   **Message Lifecycle Management:** Functions responsible for creating, updating, and deleting messages, including those related to discussions, video conferences, and media calls.
    *   `createDiscussion` in `apps/meteor/app/discussion/server/methods/createDiscussion.ts`
    *   `updateMessageRemovingFiles` in `apps/meteor/server/services/upload/service.ts`
    *   `updateMessage` in `apps/meteor/server/services/messages/service.ts`
    *   `createMessage` in `apps/meteor/server/services/video-conference/service.ts`
    *   `sendMessageWithValidation` in `apps/meteor/server/services/messages/service.ts`
    *   `sendHistoryMessage` in `apps/meteor/server/services/media-call/service.ts`
*   **Integrations:** Further dependencies within the Slack Bridge (`apps/meteor/app/slackbridge/server/SlackAdapter.ts`, `apps/meteor/app/slackbridge/server/RocketAdapter.ts`) for processing various message types and file shares.
*   **User Interface (UI) Components:** A significant number of UI components are indirectly impacted, particularly those involved in displaying messages, message actions, and the message composer. This suggests potential visual or interactive regressions if the callback system's behavior changes.
    *   `VideoConfMessageUserStack` in `packages/ui-video-conf/src/VideoConfMessage/VideoConfMessageUserStack.tsx`
    *   `WizardTabs` in `packages/ui-client/src/components/Wizard/WizardTabs.tsx`
    *   Livechat UI components in `packages/livechat/src/components/uiKit/message/index.tsx`
    *   `PreviewMarkup` in `packages/gazzodown/src/PreviewMarkup.tsx`
    *   `ComposerMessage` in `apps/meteor/client/views/room/composer/ComposerMessage.tsx`
*   **Client-side Operations:** Components related to modal management, auto-updates, banners, and file uploads on the client.
    *   `ModalStore` in `packages/ui-client/src/providers/ModalProvider/ModalStore.ts`
    *   `Autoupdate` in `ee/apps/ddp-streamer/src/lib/Autoupdate.ts`
    *   `banners` in `apps/meteor/client/lib/banners.ts`
    *   `uploads` in `apps/meteor/client/lib/chats/uploads.ts`
*   **Server-side Infrastructure:** Core DDP (Distributed Data Protocol) client and streamer components, file storage systems (UFS, GridFS), data export, and email processing.
    *   `TimeoutControl` in `packages/ddp-client/src/TimeoutControl.ts`
    *   `Publication` in `ee/apps/ddp-streamer/src/Publication.ts`
    *   `ufs-server` in `apps/meteor/server/ufs/ufs-server.ts`
    *   `makeZipFile` in `apps/meteor/server/lib/dataExport/makeZipFile.ts`
    *   `IMAPInterceptor` in `apps/meteor/server/email/IMAPInterceptor.ts`
*   **New Instances/Registrations:** Components that register new settings, slash commands, or room factories.
    *   `Settings` in `apps/meteor/app/search/server/model/Settings.ts`
    *   `AppSlashCommandManager` in `packages/apps-engine/src/server/managers/AppSlashCommandManager.ts`

**Conclusion:**

A change to the `afterSaveMessage` callback system would have a cascading effect, impacting core message functionality, various integrations (Slack, IRC, email), enterprise features (read receipts, engagement dashboard, federation), discussion and threading, search, notifications, omnichannel, auto-translation, and a wide array of UI components. Extensive testing would be required across both server-side and client-side aspects to ensure stability and prevent regressions.

## Tool Calls (3 calls, 25,768 tokens)

**Step 1:** `plan({"intent":"impact","question":"What would be impacted if the afterSaveMessage callback system were changed?"})` → 3856 tokens
**Step 2:** `search({"query":"afterSaveMessage"})` → 152 tokens
**Step 3:** `graph({"move":"up","file":"afterSaveMessage.ts","query":"afterSaveMessage","depth":5})` → 4794 tokens

## Files Seen In Tool Results (168)

- `apps/meteor/app/message-pin/server/pinMessage.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterReadMessages.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterDeleteRoom.ts`
- `apps/meteor/ee/server/api/chat.ts`
- `packages/message-types/src/MessageTypes.ts`
- `packages/message-types/src/registrations/videoconf.ts`
- `packages/message-types/src/registrations/omnichannel.ts`
- `packages/message-types/src/registrations/livechat.ts`
- `packages/message-types/src/registrations/e2ee.ts`
- `apps/meteor/server/services/messages/hooks/BeforeSaveSpotify.ts`
- `apps/meteor/server/lib/callbacks.ts`
- `apps/meteor/server/services/messages/service.ts`
- `apps/meteor/server/lib/readMessages.ts`
- `apps/meteor/app/ui/client/lib/CurrentEditingMessage.ts`
- `apps/meteor/server/startup/callbacks.ts`
- `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`
- `apps/meteor/app/notification-queue/server/NotificationQueue.ts`
- `apps/meteor/client/lib/onClientBeforeSendMessage.ts`
- `apps/meteor/client/views/root/hooks/useLoadMissedMessages.ts`
- `apps/meteor/client/startup/callbacks.ts`
- `apps/meteor/client/components/message/hooks/usePinMessageMutation.ts`
- `apps/meteor/client/hooks/usePruneWarningMessage.ts`
- `apps/meteor/app/lib/server/functions/updateMessage.ts`
- `apps/meteor/app/lib/client/methods/sendMessage.ts`
- `apps/meteor/app/livechat/server/hooks/saveLastMessageToInquiry.ts`
- `packages/ui-client/src/lib/callbacks/Callbacks.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/hooks/onBusinessHourStart.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/hooks/resumeOnHold.ts`
- `apps/meteor/ee/app/canned-responses/server/methods/saveCannedResponse.ts`
- `apps/meteor/client/lib/onClientMessageReceived.ts`
- `apps/meteor/app/lib/server/functions/isTheLastMessage.ts`
- `apps/meteor/server/methods/loadMissedMessages.ts`
- `apps/meteor/app/search/server/events/index.ts`
- `apps/meteor/app/threads/server/hooks/aftersavemessage.ts`
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
