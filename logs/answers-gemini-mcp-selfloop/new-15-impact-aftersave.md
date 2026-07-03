# What would be impacted if the afterSaveMessage callback system were changed?

## Plan

intent: impact

## Gemini Answer

The `afterSaveMessage` callback system, rooted in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`, is a critical component of Rocket.Chat's message processing. Changing this system would have a widespread impact across various functionalities, affecting both server-side logic and client-side rendering.

Here's a breakdown of the impacted areas:

**Directly Impacted (1-hop dependents):**

*   **Core Message Functions:**
    *   `updateMessage` in `apps/meteor/app/lib/server/functions/updateMessage.ts`
    *   `sendMessage` in `apps/meteor/app/lib/server/functions/sendMessage.ts`
    These functions directly invoke the `afterSaveMessage` callback, meaning any changes to the callback system would directly alter how messages are updated and sent.
*   **Event Listeners/Hooks (`→event`):** A large number of modules register as listeners for the `afterSaveMessage` event. These would cease to function correctly if the callback system is altered. Key areas include:
    *   **Email Inbox:** `EmailInbox_Outgoing` in `apps/meteor/server/features/EmailInbox/EmailInbox_Outgoing.ts`
    *   **Slack Bridge:** `registerForEvents` in `apps/meteor/app/slackbridge/server/RocketAdapter.ts`
    *   **Integrations:** `triggers` in `apps/meteor/app/integrations/server/triggers.ts`
    *   **Discussion Metadata:** `propagateDiscussionMetadata` in `apps/meteor/app/discussion/server/hooks/propagateDiscussionMetadata.ts`
    *   **Engagement Dashboard (EE):** `attachCallbacks` in `apps/meteor/ee/server/lib/engagementDashboard/startup.ts`
    *   **Federation (EE):** `index` in `apps/meteor/ee/server/hooks/federation/index.ts`
    *   **Message Read Receipts (EE):** `afterSaveMessage` in `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
    *   **Threads:** `aftersavemessage` in `apps/meteor/app/threads/server/hooks/aftersavemessage.ts`
    *   **Search:** `afterSaveMessage` in `apps/meteor/app/search/server/events/index.ts`
    *   **Livechat:** `afterSaveOmnichannelMessage` in `apps/meteor/app/livechat/server/hooks/afterSaveOmnichannelMessage.ts`
    *   **Notifications:** `mentionUserNotInChannel` in `apps/meteor/app/lib/server/startup/mentionUserNotInChannel.ts`, `sendNotificationsOnMessage` in `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts`, and `notifyUsersOnMessage` in `apps/meteor/app/lib/server/lib/notifyUsersOnMessage.ts`
    *   **IRC Bridge:** `setupLocalHandlers` in `apps/meteor/app/irc/server/irc-bridge/index.js`
    *   **AutoTranslate:** `registerCallbacks` in `apps/meteor/app/autotranslate/server/autotranslate.ts`
*   **Asynchronous Processing:**
    *   `afterSaveMessageAsync` in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts` is an event listener for the asynchronous counterpart, indicating that any asynchronous message processing would also be impacted.

**Indirectly Impacted (2-hop and beyond dependents):**

*   **Message Services:** Numerous message-related services would be affected, including those for uploads (`apps/meteor/server/services/upload/service.ts`), general message handling (`apps/meteor/server/services/messages/service.ts`), video conferencing (`apps/meteor/server/services/video-conference/service.ts`), and media calls (`apps/meteor/server/services/media-call/service.ts`).
*   **Slack Bridge:** Extensive functionality within the `SlackAdapter` (`apps/meteor/app/slackbridge/server/SlackAdapter.ts`) for processing and posting messages would be impacted.
*   **Discussion Creation:** The `createDiscussion` method in `apps/meteor/app/discussion/server/methods/createDiscussion.ts` relies on message saving.
*   **Apps Engine:** The `update` method in `apps/meteor/app/apps/server/bridges/messages.ts` indicates that the Apps Engine, which allows for third-party application extensions, would be affected.
*   **UI Components (JSX):** A vast array of client-side UI components across `packages/ui-video-conf/`, `packages/ui-client/`, `packages/livechat/`, `packages/gazzodown/`, `apps/meteor/client/`, and `packages/ui-voip/` are indirectly impacted. This includes components for displaying messages, reactions, video conference information, wizard flows, contextual bars, emoji pickers, and call history.
*   **Client-side Logic:** Client-side providers and utilities such as `ModalStore` (`packages/ui-client/src/providers/ModalProvider/ModalStore.ts`), `Autoupdate` (`ee/apps/ddp-streamer/src/lib/Autoupdate.ts`), `banners` (`apps/meteor/client/lib/banners.ts`), `appLayout` (`apps/meteor/client/lib/appLayout.tsx`), and `chats/uploads` (`apps/meteor/client/lib/chats/uploads.ts`) would experience issues related to message updates and display.
*   **Slash Commands:** Various slash commands, including `slashcommands-create` (`apps/meteor/app/slashcommands-create/server/server.ts`), `slashcommands-open` (`apps/meteor/app/slashcommands-open/client/client.ts`), `slashcommands-status` (`apps/meteor/app/slashcommands-status/server/status.ts`), and `slashcommands-topic` (`apps/meteor/app/slashcommands-topic/server/topic.ts`), which interact with messages, would be affected.
*   **Real-time Communication:** Components within `packages/ddp-client/` and `ee/apps/ddp-streamer/` that handle real-time data synchronization would be impacted.
*   **File Uploads:** Server-side file upload services and configurations, including `uploadFileFromStream` (`apps/meteor/server/services/upload/service.ts`), `ufs-server` (`apps/meteor/server/ufs/ufs-server.ts`), `ufs-gridfs` (`apps/meteor/server/ufs/ufs-gridfs.ts`), and various file storage adapters, would be affected.
*   **AutoTranslate Providers:** Specific auto-translation providers like `MsAutoTranslate`, `GoogleAutoTranslate`, and `DeeplAutoTranslate` (`apps/meteor/app/autotranslate/server/msTranslate.ts`, `apps/meteor/app/autotranslate/server/googleTranslate.ts`, `apps/meteor/app/autotranslate/server/deeplTranslate.ts`) would be impacted.
*   **Omnichannel Features:** Various omnichannel UI components and logic, such as `TriggersRow` (`apps/meteor/client/views/omnichannel/triggers/TriggersRow.tsx`), `RemoveSlaButton` (`apps/meteor/client/views/omnichannel/slaPolicies/RemoveSlaButton.tsx`), and `CannedResponseEditWithData` (`apps/meteor/client/views/omnichannel/cannedResponses/modals/CannedResponseEditWithData.tsx`), would be affected due to their reliance on message management.

In conclusion, modifying the `afterSaveMessage` callback system would necessitate extensive changes and testing across almost all facets of Rocket.Chat, from core message handling and real-time updates to various integrations, enterprise features, and the user interface.

## Tool Calls (3 calls, 14,496 tokens)

**Step 1:** `plan({"question":"What would be impacted if the afterSaveMessage callback system were changed?","intent":"impact"})` → 199 tokens
**Step 2:** `search({"query":"afterSaveMessage"})` → 152 tokens
**Step 3:** `graph({"file":"afterSaveMessage.ts","depth":5,"query":"afterSaveMessage","move":"up"})` → 4794 tokens

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
