# How is a message rendered from raw text to React components in Rocket.Chat?

## Plan

intent: architecture

## Gemini Answer

The process of rendering a message from raw text to React components in Rocket.Chat involves the following steps:

**Entry Point:**

*   **`normalizeThreadMessage`** (apps/meteor/client/lib/normalizeThreadMessage.tsx): This function is responsible for taking a raw message object and preparing it for rendering.

**Flow:**

1.  **Filtering Markdown:**
    *   Inside `normalizeThreadMessage`, the raw message text (`message.msg`) is first processed by `filterMarkdown`.
    *   **`filterMarkdown`** (apps/meteor/app/markdown/lib/markdown.js) is a utility that delegates to `Markdown.filterMarkdownFromMessage(message)`.
    *   **`Markdown`** (apps/meteor/app/markdown/lib/markdown.js) is an instance of `MarkdownClass`. This suggests that `MarkdownClass` contains the core logic for filtering and processing markdown.

2.  **Parsing Markdown:**
    *   After filtering, `normalizeThreadMessage` uses `parse(message.msg, { emoticons: true })` to convert the markdown string into a structured array of tokens. This `parse` function is likely part of the `gazzodown` package, which is Rocket.Chat's markdown parser.

3.  **Rendering to React Components:**
    *   The parsed tokens are then passed to the **`Markup`** component (packages/gazzodown/src/Markup.tsx).
    *   The `Markup` component, wrapped within a `<GazzodownText>` component, takes these tokens and recursively renders them into a hierarchy of React components.
    *   The `Markup` component utilizes various sub-components to render different types of markdown elements:
        *   **`ParagraphBlock`** (packages/gazzodown/src/blocks/ParagraphBlock.tsx): Renders paragraph-level content.
        *   **`InlineElements`** (packages/gazzodown/src/elements/InlineElements.tsx): Handles inline elements within a paragraph, such as:
            *   `PlainSpan` (packages/gazzodown/src/elements/PlainSpan.tsx) for plain text.
            *   `ItalicSpan` (packages/gazzodown/src/elements/ItalicSpan.tsx) for italicized text.
            *   `BoldSpan` (packages/gazzodown/src/elements/BoldSpan.tsx) for bold text.
            *   `StrikeSpan` (packages/gazzodown/src/elements/StrikeSpan.tsx) for strikethrough text.
            *   `EmojiElement` (packages/gazzodown/src/elements/EmojiElement.tsx) for emojis.
            *   `KatexErrorBoundary` (packages/gazzodown/src/katex/KatexErrorBoundary.tsx) for rendering mathematical expressions using KaTeX, with error handling.
        *   **`SpoilerBlock`** (packages/gazzodown/src/blocks/SpoilerBlock.tsx): Renders spoiler content.
        *   **`HeadingBlock`** (packages/gazzodown/src/blocks/HeadingBlock.tsx): Renders headings.

**Core Files:**

*   **apps/meteor/client/lib/normalizeThreadMessage.tsx**: The initial entry point for message normalization and rendering.
*   **apps/meteor/app/markdown/lib/markdown.js**: Contains the `filterMarkdown` utility and the `MarkdownClass` for markdown processing.
*   **packages/gazzodown/src/Markup.tsx**: The main React component responsible for rendering parsed markdown tokens into React elements.
*   **packages/gazzodown/src/blocks/ParagraphBlock.tsx**: Renders paragraph blocks.
*   **packages/gazzodown/src/elements/InlineElements.tsx**: Orchestrates the rendering of various inline markdown elements.
*   **packages/gazzodown/src/katex/KatexErrorBoundary.tsx**: Handles rendering of KaTeX expressions.

## Tool Calls (8 calls, 49,433 tokens)

**Step 1:** `plan({"question":"How is a message rendered from raw text to React components in Rocket.Chat?","intent":"architecture"})` → 3352 tokens
**Step 2:** `search({"query":"gazzodown"})` → 379 tokens
**Step 3:** `graph({"move":"down","file":"Markup.tsx","query":"Markup","depth":3})` → 706 tokens
**Step 4:** `details({"filename":"normalizeThreadMessage.tsx","symbolName":"normalizeThreadMessage"})` → 232 tokens
**Step 5:** `search({"layer":"packages","query":"parse markdown"})` → 26 tokens
**Step 6:** `search({"query":"filterMarkdown"})` → 68 tokens
**Step 7:** `details({"filename":"markdown.js","symbolName":"filterMarkdown"})` → 71 tokens
**Step 8:** `details({"filename":"markdown.js","symbolName":"Markdown"})` → 51 tokens

## Files Seen In Tool Results (45)

- `apps/meteor/client/views/room/providers/DateListProvider.tsx`
- `apps/meteor/client/views/room/MessageList/lib/isMessageNewDay.ts`
- `apps/meteor/client/views/room/index.ts`
- `apps/meteor/client/views/room/MessageList/providers/MessageListProvider.tsx`
- `apps/meteor/client/views/room/MessageList/MessageListErrorBoundary.tsx`
- `apps/meteor/app/apps/server/converters/messages.js`
- `packages/livechat/src/routes/TriggerMessage/component.tsx`
- `apps/meteor/app/apps/server/bridges/messages.ts`
- `apps/meteor/client/views/room/MessageList/MessageListItem.tsx`
- `apps/meteor/client/components/message/variants/RoomMessage.tsx`
- `packages/livechat/src/components/Composer/index.tsx`
- `ee/packages/pdf-worker/src/templates/ChatTranscript/components/MessageList.tsx`
- `apps/meteor/client/views/room/contextualBar/Threads/components/ThreadMessageItem.tsx`
- `packages/livechat/src/components/Messages/Message/index.js`
- `packages/apps-engine/src/server/accessors/MessageRead.ts`
- `ee/packages/pdf-worker/src/templates/ChatTranscript/components/Message.tsx`
- `packages/models/src/models/Messages.ts`
- `packages/gazzodown/src/elements/PreviewInlineElements.tsx`
- `apps/meteor/client/lib/normalizeThreadMessage.tsx`
- `apps/meteor/client/lib/userData.ts`
- `packages/models/src/models/MessageReads.ts`
- `packages/models/src/models/BaseRaw.ts`
- `apps/meteor/app/ui/client/lib/ChatMessages.ts`
- `packages/livechat/src/components/uiKit/message/PlainText/index.tsx`
- `ee/packages/pdf-worker/src/templates/ChatTranscript/markup/elements/StrikeSpan.tsx`
- `packages/gazzodown/src/blocks/QuoteBlock.tsx`
- `apps/meteor/app/ui-message/client/ActionManager.ts`
- `apps/meteor/client/views/room/contextualBar/Threads/components/ThreadMessageList.tsx`
- `ee/packages/federation-matrix/src/helpers/message.parsers.ts`
- `packages/gazzodown/jest.config.ts`
- `packages/gazzodown/src/index.ts`
- `packages/gazzodown/src/PreviewMarkup.tsx`
- `packages/gazzodown/src/MarkupInteractionContext.ts`
- `packages/gazzodown/src/Markup.stories.tsx`
- `packages/gazzodown/src/Markup.tsx`
- `packages/gazzodown/src/mentions/UserMentionElement.tsx`
- `packages/gazzodown/src/mentions/PreviewUserMentionElement.tsx`
- `packages/gazzodown/src/mentions/PreviewChannelMentionElement.tsx`
- `packages/gazzodown/src/mentions/ChannelMentionElement.tsx`
- `packages/gazzodown/src/katex/PreviewKatexElement.tsx`
- `packages/gazzodown/src/katex/PreviewKatexBlock.tsx`
- `packages/gazzodown/src/katex/KatexErrorBoundary.tsx`
- `packages/gazzodown/src/katex/KatexElement.tsx`
- `packages/gazzodown/src/katex/KatexBlock.tsx`
- `apps/meteor/app/markdown/lib/markdown.js`
