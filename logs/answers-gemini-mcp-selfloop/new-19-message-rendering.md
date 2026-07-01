# How is a message rendered from raw text to React components in Rocket.Chat?

## Gemini Answer

The process of rendering a message from raw text to React components in Rocket.Chat primarily involves markdown parsing and then rendering the resulting tokens into markup.

Here's the call chain:

`apps/meteor/app/markdown/lib/markdown.js` → `createMarkdownMessageRenderer` → `packages/livechat/src/components/uiKit/message/Mrkdwn/index.tsx` → `Mrkdwn` → `packages/livechat/src/components/MarkdownBlock/index.tsx` → `MarkdownBlock` → `parse`

1.  **`createMarkdownMessageRenderer`** (in `apps/meteor/app/markdown/lib/markdown.js`): This function acts as the entry point for markdown rendering. It takes a message object and options, then decides whether to use a `markedParser` or `parsers.original` based on the `useMarkedParser` flag.
2.  **`Mrkdwn`** (in `packages/livechat/src/components/uiKit/message/Mrkdwn/index.tsx`): This React component receives the raw `text` of the message. It wraps the `MarkdownBlock` component and passes the `text` (after converting shortnames to Unicode) to it.
3.  **`MarkdownBlock`** (in `packages/livechat/src/components/MarkdownBlock/index.tsx`): This component is responsible for the actual parsing and rendering. It uses `Suspense` for lazy loading and calls the `parse` function with the message `text` and `emoticons` option. The `parse` function returns `tokens`, which are then passed to a `Markup` component for rendering into React components.

## Tool Calls (8 calls, 55,856 tokens)

**Step 1:** `search({"query":"render message","layer":"client"})` → 475 tokens
**Step 2:** `graph({"file":"apps/meteor/app/markdown/lib/markdown.js","direction":"down","query":"createMarkdownMessage)` → 993 tokens
**Step 3:** `implement({"filename":"apps/meteor/app/markdown/lib/markdown.js","symbolName":"createMarkdownMessageRenderer"})` → 131 tokens
**Step 4:** `graph({"file":"apps/meteor/app/markdown/lib/markdown.js","direction":"up","query":"createMarkdownMessageRe)` → 1238 tokens
**Step 5:** `implement({"filename":"packages/livechat/src/components/uiKit/message/index.tsx","symbolName":"mrkdwn"})` → 111 tokens
**Step 6:** `implement({"symbolName":"index","filename":"packages/livechat/src/components/uiKit/message/index.tsx"})` → 1516 tokens
**Step 7:** `implement({"filename":"packages/livechat/src/components/uiKit/message/Mrkdwn/index.tsx","symbolName":"Mrkdwn"})` → 108 tokens
**Step 8:** `implement({"filename":"packages/livechat/src/components/uiKit/message/Mrkdwn/index.tsx","symbolName":"Markdown)` → 103 tokens

## Files Seen In Tool Results (109)

- `apps/meteor/app/autotranslate/client/lib/autotranslate.ts`
- `apps/meteor/client/lib/utils/renderMessageEmoji.ts`
- `apps/meteor/client/components/message/toolbar/items/actions/ReplyInThreadMessageAction.tsx`
- `packages/livechat/src/helpers/canRenderMessage.ts`
- `apps/meteor/app/markdown/lib/markdown.js`
- `apps/meteor/ee/server/lib/message-read-receipt/ReadReceipt.ts`
- `packages/livechat/src/components/uiKit/message/index.tsx`
- `packages/models/src/models/Reports.ts`
- `packages/fuselage-ui-kit/src/surfaces/FuselageMessageSurfaceRenderer.tsx`
- `packages/models/src/models/Messages.ts`
- `packages/models/src/models/Users.ts`
- `apps/meteor/client/views/room/MessageList/lib/autoTranslate.ts`
- `apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/steps/RepliesStep.spec.tsx`
- `apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/steps/MessageStep.spec.tsx`
- `apps/meteor/app/markdown/server/index.ts`
- `packages/ui-video-conf/src/VideoConfMessage/VideoConfMessageUserStack.tsx`
- `packages/ui-video-conf/src/VideoConfMessage/VideoConfMessage.stories.tsx`
- `packages/ui-client/src/components/Wizard/WizardTabs.tsx`
- `packages/ui-client/src/components/Wizard/Wizard.stories.tsx`
- `packages/ui-client/src/components/Contextualbar/ContextualbarSkeletonBody.tsx`
- `packages/ui-client/src/components/Contextualbar/ContextualbarSkeleton.tsx`
- `apps/meteor/client/views/room/Room.tsx`
- `apps/meteor/client/views/omnichannel/contactInfo/EditContactInfoWithData.tsx`
- `apps/meteor/client/views/omnichannel/contactInfo/EditContactInfo.tsx`
- `apps/meteor/client/views/omnichannel/contactInfo/ContactInfo/ContactInfoWithData.tsx`
- `apps/meteor/client/views/mediaCallHistory/MediaCallHistoryContextualbar.tsx`
- `apps/meteor/server/settings/setup-wizard.ts`
- `apps/meteor/server/settings/index.ts`
- `apps/meteor/server/settings/retention-policy.ts`
- `apps/meteor/server/settings/rate.ts`
- `apps/meteor/server/settings/push.ts`
- `apps/meteor/server/settings/omnichannel.ts`
- `packages/gazzodown/src/emoji/EmojiRenderer.tsx`
- `packages/gazzodown/src/emoji/Emoji.tsx`
- `apps/meteor/client/views/composer/EmojiPicker/SearchingResult.tsx`
- `apps/meteor/client/views/composer/EmojiPicker/EmojiPicker.tsx`
- `apps/meteor/client/views/composer/EmojiPicker/EmojiCategoryRow.tsx`
- `apps/meteor/client/components/message/toolbar/items/actions/ReactionMessageAction.tsx`
- `apps/meteor/client/components/message/toolbar/items/VideoconfThreadsItems.tsx`
- `apps/meteor/client/components/message/toolbar/items/VideoconfItems.tsx`
- `apps/meteor/client/components/message/toolbar/items/ThreadsItems.tsx`
- `apps/meteor/client/components/message/toolbar/items/MobileItems.tsx`
- `apps/meteor/client/components/message/toolbar/items/FederatedItems.tsx`
- `apps/meteor/client/components/message/content/attachments/default/ActionAttachtment.tsx`
- `apps/meteor/client/components/message/content/attachments/DefaultAttachment.tsx`
- `packages/gazzodown/src/PreviewMarkup.tsx`
- `apps/meteor/client/components/message/variants/threadPreview/ThreadMessagePreviewBody.tsx`
- `apps/meteor/client/components/message/variants/ThreadMessagePreview.tsx`
- `apps/meteor/client/components/message/variants/threadPreview/ThreadMessagePreviewBody.stories.tsx`
- `packages/ui-kit/src/rendering/SurfaceRenderer.ts`
- `packages/fuselage-ui-kit/src/surfaces/FuselageSurfaceRenderer.tsx`
- `packages/release-action/src/index.ts`
- `packages/node-poplib/src/index.js`
- `packages/message-types/src/index.ts`
- `packages/logger/src/index.ts`
- `packages/livechat/src/store/index.tsx`
- `packages/livechat/src/components/uiKit/message/StaticSelectElement/index.tsx`
- `packages/livechat/src/components/uiKit/message/SectionBlock/index.tsx`
- `packages/livechat/src/components/uiKit/message/PlainText/index.tsx`
- `packages/livechat/src/components/uiKit/message/OverflowElement/index.tsx`
- `packages/livechat/src/components/uiKit/message/Mrkdwn/index.tsx`
- `packages/livechat/src/components/uiKit/message/ImageElement/index.tsx`
- `packages/livechat/src/components/uiKit/message/ImageBlock/index.tsx`
- `packages/livechat/src/components/uiKit/message/DividerBlock/index.tsx`
- `packages/livechat/src/components/uiKit/message/DatePickerElement/index.tsx`
- `packages/livechat/src/components/uiKit/message/ContextBlock/index.tsx`
- `packages/livechat/src/components/uiKit/message/ButtonElement/index.tsx`
- `packages/livechat/src/components/Messages/VideoAttachment/index.tsx`
- `packages/livechat/src/components/Messages/MessageTime/index.tsx`
- `packages/livechat/src/components/Messages/MessageSeparator/index.tsx`
- `packages/livechat/src/components/Messages/MessageBlocks/index.tsx`
- `packages/livechat/src/components/Messages/Message/index.js`
- `packages/livechat/src/components/Messages/AudioAttachment/index.tsx`
- `packages/livechat/src/components/Form/DateInput/index.tsx`
- `packages/jest-presets/src/server/index.ts`
- `packages/jest-presets/src/client/index.ts`
- `packages/eslint-config/index.js`
- `ee/packages/pdf-worker/src/templates/ChatTranscript/index.tsx`
- `apps/meteor/server/routes/avatar/index.ts`
- `apps/meteor/server/routes/avatar/middlewares/index.ts`
- `apps/meteor/server/publications/subscription/index.ts`
- `apps/meteor/server/publications/settings/index.ts`
- `apps/meteor/server/publications/room/index.ts`
- `apps/meteor/public/workers/index.js`
- `apps/meteor/packages/rocketchat-mongo-config/server/index.js`
- `apps/meteor/ee/server/hooks/federation/index.ts`
- `apps/meteor/ee/app/message-read-receipt/server/index.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/index.ts`
- `apps/meteor/ee/app/canned-responses/server/index.ts`
- `apps/meteor/client/views/room/Header/RoomToolbox/index.ts`
- `apps/meteor/client/views/room/Header/Omnichannel/QuickActions/index.ts`
- `apps/meteor/client/components/Sidebar/index.ts`
- `apps/meteor/app/version-check/server/index.ts`
- `apps/meteor/app/ui-master/server/index.ts`
- `apps/meteor/app/settings/server/index.ts`
- `apps/meteor/app/search/server/events/index.ts`
- `apps/meteor/app/livechat-enterprise/client/index.ts`
- `apps/meteor/app/livechat/server/business-hour/index.ts`
- `apps/meteor/app/irc/server/servers/RFC2813/index.js`
- `apps/meteor/app/importer-omnichannel-contacts/server/index.ts`
- `apps/meteor/app/google-oauth/server/index.js`
- `apps/meteor/app/e2e/server/index.ts`
- `apps/meteor/app/cors/server/index.ts`
- `apps/meteor/app/cloud/server/index.ts`
- `apps/meteor/app/bot-helpers/server/index.ts`
- `apps/meteor/app/authorization/server/streamer/permissions/index.ts`
- `apps/meteor/app/authentication/server/startup/index.js`
- `apps/meteor/app/2fa/server/code/index.ts`
- `packages/livechat/src/components/MarkdownBlock/index.tsx`
