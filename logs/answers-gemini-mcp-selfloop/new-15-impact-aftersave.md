# What would be impacted if the afterSaveMessage callback system were changed?

## Plan

intent: impact

## Gemini Answer

If the `afterSaveMessage` callback system were changed, it would impact a wide range of Rocket.Chat functionalities related to message processing, notifications, and integrations.

Here's a breakdown of the impacted areas and the relevant files:

**Flow:**
Entry Points → Core Callback Invocation → Impacted Modules (Direct Dependents)

**Entry Points (Functions that trigger the callback):**
*   `sendMessage` in `apps/meteor/app/lib/server/functions/sendMessage.ts`: This function is responsible for sending new messages and triggers the `afterSaveMessage` callback after a message is saved.
*   `updateMessage` in `apps/meteor/app/lib/server/functions/updateMessage.ts`: This function handles updating existing messages and also triggers the `afterSaveMessage` callback.

**Core Callback Invocation:**
*   `afterSaveMessage` in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`: This file contains the central logic for invoking the `afterSaveMessage` callback, which then dispatches to all registered listeners.
*   `afterSaveMessageAsync` in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`: This is an event listener that also processes messages after they are saved, likely for asynchronous operations.

**Impacted Modules (Direct Dependents - those that register to the `afterSaveMessage` event):**

Changing the `afterSaveMessage` callback system would directly affect the following modules and their functionalities:

*   **Email Inbox Outgoing**:
    *   `EmailInbox_Outgoing` in `apps/meteor/server/features/EmailInbox/EmailInbox_Outgoing.ts`: Handles outgoing email replies and attachments for Omnichannel rooms linked to an email inbox.
*   **Discussion Metadata Propagation**:
    *   `propagateDiscussionMetadata` in `apps/meteor/app/discussion/server/hooks/propagateDiscussionMetadata.ts`: Updates parent message discussion metadata when a message is posted in a discussion.
*   **Federation (Matrix Integration)**:
    *   `index` in `apps/meteor/ee/server/hooks/federation/index.ts`: Manages synchronization of messages in federated rooms with the Matrix network.
*   **Message Read Receipts**:
    *   `afterSaveMessage` in `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`: Marks messages as read by the sender immediately after saving.
*   **Thread Processing**:
    *   `aftersavemessage` in `apps/meteor/app/threads/server/hooks/aftersavemessage.ts`: Updates thread metadata, user subscriptions, and sends notifications for messages within threads.
*   **Search Indexing**:
    *   `afterSaveMessage` in `apps/meteor/app/search/server/events/index.ts`: Likely responsible for indexing messages to make them searchable.
*   **Omnichannel Message Processing**:
    *   `afterSaveOmnichannelMessage` in `apps/meteor/app/livechat/server/hooks/afterSaveOmnichannelMessage.ts`: Triggers further processing of messages within Omnichannel rooms, including features like marking rooms as "not responded," lead capture, and saving the last visitor message timestamp.
*   **Mention User Not In Channel**:
    *   `mentionUserNotInChannel` in `apps/meteor/app/lib/server/startup/mentionUserNotInChannel.ts`: Notifies users who were mentioned in a message but are not members of the channel.
*   **Message Notifications**:
    *   `sendNotificationsOnMessage` in `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts`: Responsible for sending various types of notifications when a message is saved.
    *   `notifyUsersOnMessage` in `apps/meteor/app/lib/server/lib/notifyUsersOnMessage.ts`: Another component involved in sending notifications to users.
*   **Slack Bridge**:
    *   `registerForEvents` in `apps/meteor/app/slackbridge/server/RocketAdapter.ts`: Integrates Rocket.Chat with Slack, likely handling message synchronization.
*   **Integrations**:
    *   `triggers` in `apps/meteor/app/integrations/server/triggers.ts`: Manages triggers for various integrations based on message events.
*   **Engagement Dashboard**:
    *   `attachCallbacks` in `apps/meteor/ee/server/lib/engagementDashboard/startup.ts`: Likely collects data for the engagement dashboard based on message activity.
*   **IRC Bridge**:
    *   `setupLocalHandlers` in `apps/meteor/app/irc/server/irc-bridge/index.js`: Integrates Rocket.Chat with IRC, handling message flow between the platforms.
*   **Autotranslate**:
    *   `registerCallbacks` in `apps/meteor/app/autotranslate/server/autotranslate.ts`: Handles automatic translation of messages.

## Tool Calls (3 calls, 13,136 tokens)

**Step 1:** `plan({"question":"What would be impacted if the afterSaveMessage callback system were changed?","intent":"impact"})` → 1596 tokens
**Step 2:** `search({"layer":"server","query":"afterSaveMessage"})` → 152 tokens
**Step 3:** `graph({"file":"afterSaveMessage.ts","query":"afterSaveMessage","depth":3,"move":"up"})` → 1964 tokens

## Files Seen In Tool Results (57)

- `apps/meteor/server/lib/callbacks.ts`
- `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`
- `packages/ui-client/src/lib/callbacks/clientCallbacks.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
- `apps/meteor/app/search/server/events/index.ts`
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
