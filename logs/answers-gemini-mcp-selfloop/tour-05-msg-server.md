# How is a message sent on the server side in Rocket.Chat?

## Plan

intent: call-chain

## Gemini Answer

The server-side message sending in Rocket.Chat follows a detailed flow, starting with the `sendMessage` function in `apps/meteor/app/lib/server/functions/sendMessage.ts`. This function orchestrates the validation, preparation, persistence, and notification aspects of sending a message.

Here's the explicit chain of events:

**Entry Point:** `sendMessage` in `apps/meteor/app/lib/server/functions/sendMessage.ts`

**Flow:**

1.  **Message Validation:**
    *   `validateMessage(message, room, user)`: This function, found in `apps/meteor/app/lib/server/functions/sendMessage.ts`, is responsible for validating the message content against various rules, including XSS protection for hrefs, attachments, and custom fields.
2.  **Message Object Preparation:**
    *   `prepareMessageObject(message, room._id, user)`: Also located in `apps/meteor/app/lib/server/functions/sendMessage.ts`, this function prepares the message object by adding or modifying necessary fields before it's saved to the database.
3.  **Apps Engine Pre-Send Hooks:**
    *   `Apps.self?.triggerEvent(AppEvents.IPreMessageSentPrevent, message)`: Allows Rocket.Chat Apps to prevent the message from being sent.
    *   `Apps.self?.triggerEvent(AppEvents.IPreMessageSentModify, ...)`: Allows Rocket.Chat Apps to modify the message content before it's saved.
    *   `Apps.self?.triggerEvent(AppEvents.IPreMessageSentExtend, message)`: Allows Rocket.Chat Apps to extend the message object.
4.  **Before Save Processing:**
    *   `Message.beforeSave({ message, room, user, previewUrls, parseUrls: message.parseUrls })`: This hook performs additional processing on the message object just before it's persisted.
5.  **Database Persistence:**
    *   If the message has an `_id` and the `upsert` option is true, `Messages.updateOne` is called to update an existing message.
    *   Otherwise, `Messages.insertOne(message)` is called. This function, which ultimately uses `insertOne` from `packages/models/src/models/BaseRaw.ts`, inserts the new message into the `Messages` collection in the database.
6.  **Apps Engine Post-Send Hooks:**
    *   `Apps.self?.triggerEvent(messageEvent, message)`: Notifies Rocket.Chat Apps after the message has been successfully sent. The event triggered is either `AppEvents.IPostSystemMessageSent` for system messages or `AppEvents.IPostMessageSent` for regular messages.
7.  **After Save Actions:**
    *   `afterSaveMessage(message, room, user)`: This function performs any necessary actions after the message has been saved to the database.
8.  **Client Notification:**
    *   `notifyOnRoomChangedById(message.rid)`: This function notifies clients subscribed to the room that a change has occurred, triggering updates in the user interface.

**Key Files:**

*   `apps/meteor/app/lib/server/functions/sendMessage.ts`: Contains the core `sendMessage` function, `validateMessage`, and `prepareMessageObject`.
*   `packages/models/src/models/BaseRaw.ts`: Provides the underlying `insertOne` method used for database insertion.

## Tool Calls (8 calls, 59,286 tokens)

**Step 1:** `plan({"intent":"call-chain","question":"How is a message sent on the server side in Rocket.Chat?"})` → 299 tokens
**Step 2:** `search({"query":"executeSendMessage","layer":"server"})` → 73 tokens
**Step 3:** `graph({"move":"down","query":"executeSendMessage","file":"sendMessage.ts","depth":5})` → 4049 tokens
**Step 4:** `search({"layer":"server","query":"sendMessage(user, message, room)"})` → 30 tokens
**Step 5:** `search({"layer":"server","query":"Messages.insertOne"})` → 142 tokens
**Step 6:** `graph({"depth":5,"file":"sendMessage.ts","move":"up","query":"Messages.insertOne"})` → 14 tokens
**Step 7:** `graph({"depth":5,"move":"up","file":"sendMessage.ts","query":"insertOne"})` → 3623 tokens
**Step 8:** `details({"filename":"sendMessage.ts","symbolName":"sendMessage"})` → 617 tokens

## Files Seen In Tool Results (115)

- `apps/meteor/app/lib/server/methods/sendMessage.ts`
- `apps/meteor/app/lib/server/functions/insertMessage.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `apps/meteor/app/discussion/server/methods/createDiscussion.ts`
- `packages/models/src/models/BaseRaw.ts`
- `packages/models/src/models/VideoConference.ts`
- `packages/models/src/models/Users.ts`
- `packages/models/src/models/TeamMember.ts`
- `packages/models/src/models/Subscriptions.ts`
- `packages/models/src/models/ServerEvents.ts`
- `packages/models/src/models/Rooms.ts`
- `packages/models/src/models/Roles.ts`
- `packages/models/src/models/Reports.ts`
- `packages/models/src/models/PushToken.ts`
- `packages/models/src/models/OEmbedCache.ts`
- `packages/models/src/models/ModerationReports.ts`
- `packages/models/src/models/Messages.ts`
- `packages/models/src/models/UserDataFiles.ts`
- `apps/meteor/server/services/video-conference/service.ts`
- `packages/release-action/src/startPatchRelease.ts`
- `packages/release-action/src/bumpNextVersion.ts`
- `packages/ddp-client/src/DDPSDK.ts`
- `packages/ddp-client/src/livechat/LivechatClientImpl.ts`
- `packages/ddp-client/src/legacy/RocketchatSDKLegacy.ts`
- `packages/apps-engine/src/server/AppManager.ts`
- `packages/apps-engine/src/server/bridges/VideoConferenceBridge.ts`
- `packages/apps-engine/src/server/bridges/UserBridge.ts`
- `apps/meteor/app/slashcommands-create/server/server.ts`
- `apps/meteor/app/slashcommands-create/client/client.ts`
- `packages/release-action/src/index.ts`
- `packages/ddp-client/__examples__/simple.ts`
- `packages/apps-engine/src/server/accessors/Persistence.ts`
- `packages/apps-engine/src/server/accessors/OAuthAppsModify.ts`
- `packages/apps-engine/src/server/accessors/ModifyCreator.ts`
- `packages/agenda/src/Agenda.ts`
- `packages/agenda/src/Job.ts`
- `apps/meteor/client/views/omnichannel/analytics/DateRangePicker.tsx`
- `apps/meteor/client/views/marketplace/hooks/useInstallApp.tsx`
- `apps/meteor/client/views/marketplace/AppDetailsPage/AppDetailsPage.tsx`
- `apps/meteor/client/views/admin/permissions/PermissionsPage.tsx`
- `apps/meteor/client/views/omnichannel/securityPrivacy/SecurityPrivacyRoute.tsx`
- `apps/meteor/client/views/admin/settings/SettingsRoute.tsx`
- `apps/meteor/client/views/admin/featurePreview/AdminFeaturePreviewRoute.tsx`
- `apps/meteor/client/views/admin/ABAC/AdminABACRoute.tsx`
- `apps/meteor/client/views/teams/contextualBar/channels/TeamsChannels.tsx`
- `apps/meteor/client/views/omnichannel/directory/contacts/ContactTableRow.tsx`
- `apps/meteor/client/views/admin/import/PrepareImportPage.tsx`
- `apps/meteor/client/components/message/MessageContentBody.tsx`
- `packages/mock-providers/src/MockedAppRootBuilder.tsx`
- `packages/livechat/src/components/Popover/stories.tsx`
- `packages/ddp-client/src/MinimalDDPClient.ts`
- `packages/ddp-client/src/DDPDispatcher.ts`
- `apps/meteor/app/api/server/v1/stats.ts`
- `packages/ui-video-conf/src/VideoConfMessage/VideoConfMessageUserStack.tsx`
- `packages/ui-client/src/components/Wizard/WizardTabs.tsx`
- `packages/ui-client/src/components/Contextualbar/ContextualbarSkeletonBody.tsx`
- `packages/livechat/src/components/uiKit/message/index.tsx`
- `packages/gazzodown/src/PreviewMarkup.tsx`
- `packages/models/src/models/WorkspaceCredentials.ts`
- `packages/models/src/models/UsersSessions.ts`
- `packages/ui-client/src/providers/ModalProvider/ModalStore.ts`
- `ee/apps/ddp-streamer/src/lib/Autoupdate.ts`
- `apps/meteor/client/lib/banners.ts`
- `apps/meteor/client/lib/appLayout.tsx`
- `apps/meteor/client/lib/chats/uploads.ts`
- `apps/meteor/app/utils/client/lib/SDKClient.ts`
- `apps/meteor/app/settings/server/CachedSettings.ts`
- `apps/meteor/app/irc/server/irc-bridge/index.js`
- `packages/apps-engine/src/server/runtime/deno/AppsEngineDenoRuntime.ts`
- `packages/logger/src/index.ts`
- `apps/meteor/client/lib/RoomManager.ts`
- `apps/meteor/server/database/utils.ts`
- `apps/meteor/server/modules/notifications/notifications.module.ts`
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
- `apps/meteor/client/sidebar/RoomList/SidebarItemTemplateWithData.tsx`
- `packages/ui-client/src/components/GenericMenu/GenericMenu.tsx`
- `packages/ui-voip/src/components/Cards/CardList.tsx`
- `packages/models/src/models/LivechatRooms.ts`
- `apps/meteor/app/slashcommands-open/client/client.ts`
- `packages/ddp-client/src/TimeoutControl.ts`
- `apps/meteor/server/lib/ldap/Connection.ts`
- `apps/meteor/server/lib/dataExport/makeZipFile.ts`
- `apps/meteor/app/irc/server/servers/RFC2813/index.js`
- `apps/meteor/app/file-upload/server/config/GridFS.ts`
- `apps/meteor/app/file/server/file.server.ts`
- `apps/meteor/server/services/upload/service.ts`
- `apps/meteor/ee/server/apps/storage/AppGridFSSourceStorage.ts`
- `apps/meteor/app/file-upload/server/config/Webdav.ts`
- `apps/meteor/app/api/server/lib/MultipartUploadHandler.ts`
- `ee/apps/ddp-streamer/src/Client.ts`
- `packages/node-poplib/src/index.js`
- `ee/apps/ddp-streamer/src/DDPStreamer.ts`
- `apps/meteor/server/email/IMAPInterceptor.ts`
- `apps/meteor/client/lib/presence.ts`
- `apps/meteor/app/assets/server/assets.ts`
- `ee/packages/license/src/events/emitter.ts`
- `packages/media-signaling/src/lib/services/webrtc/Negotiation.ts`
- `apps/meteor/app/webdav/server/lib/webdavClientAdapter.ts`
- `ee/packages/license/src/license.ts`
- `apps/meteor/server/lib/readMessages.ts`
- `apps/meteor/app/threads/server/functions.ts`
- `apps/meteor/app/lib/server/functions/acceptRoomInvite.ts`
- `apps/meteor/client/lib/toast.ts`
- `apps/meteor/client/hooks/useUserCustomFields.ts`
- `packages/apps-engine/src/server/runtime/deno/ProcessMessenger.ts`
- `apps/meteor/app/api/server/default/info.ts`
