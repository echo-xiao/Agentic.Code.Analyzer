# How is a message rendered from raw text to React components in Rocket.Chat?

## Plan

intent: call-chain

## Gemini Answer

The process of rendering a message from raw text to React components in Rocket.Chat follows a two-step approach: parsing and rendering.

**Flow:**

1.  **Entry (Raw Text)**: The process begins with the raw message text.
2.  **Parsing**: The raw text is first processed by the `parse` function, located in `packages/message-parser/src/index.ts`. This function takes the raw message content, which can include Markdown and other special syntax, and converts it into a structured array of tokens.
3.  **Component Integration**: The `MarkdownBlock` component, found at `packages/livechat/src/components/MarkdownBlock/index.tsx`, acts as an intermediary. It receives the raw text and calls the `parse` function to obtain the structured tokens.
4.  **Rendering**: The resulting tokens are then passed as a prop to the `Markup` component, defined in `packages/gazzodown/src/Markup.tsx`. This `Markup` component is responsible for taking these structured tokens and rendering them into the appropriate React UI components. It delegates to various block and inline components such as:
    *   `ParagraphBlock` (`packages/gazzodown/src/blocks/ParagraphBlock.tsx`)
    *   `SpoilerBlock` (defined in `packages/message-parser/src/definitions.ts` and rendered by `Markup`)
    *   `HeadingBlock` (`packages/gazzodown/src/blocks/HeadingBlock.tsx`)
    *   `InlineElements` (`packages/gazzodown/src/elements/InlineElements.tsx`) which further renders specific elements like:
        *   `PlainSpan` (`packages/gazzodown/src/elements/PlainSpan.tsx`)
        *   `ItalicSpan` (`packages/gazzodown/src/elements/ItalicSpan.tsx`)
        *   `BoldSpan` (`packages/gazzodown/src/elements/BoldSpan.tsx`)
        *   `StrikeSpan` (`packages/gazzodown/src/elements/StrikeSpan.tsx`)
        *   `KatexErrorBoundary` (`packages/gazzodown/src/elements/KatexErrorBoundary.tsx`)
        *   `EmojiElement` (`packages/gazzodown/src/elements/EmojiElement.tsx`)

In essence, the raw text is parsed into a token tree, and then the `Markup` component traverses this tree, rendering each token into its corresponding React component.

## Tool Calls (8 calls, 28,145 tokens)

**Step 1:** `plan({"question":"How is a message rendered from raw text to React components in Rocket.Chat?","intent":"call-chain"})` → 81 tokens
**Step 2:** `wiki({"question":"How does Rocket.Chat render messages?"})` → 544 tokens
**Step 3:** `search({"query":"Markup","layer":"packages"})` → 557 tokens
**Step 4:** `graph({"move":"down","file":"Markup.tsx","query":"Markup","depth":3})` → 706 tokens
**Step 5:** `search({"file":"message-parser","layer":"packages","query":"parse"})` → 460 tokens
**Step 6:** `details({"filename":"index.ts","symbolName":"parse"})` → 62 tokens
**Step 7:** `search({"layer":"packages","query":"MarkdownBlock"})` → 72 tokens
**Step 8:** `details({"symbolName":"MarkdownBlock","filename":"index.tsx"})` → 99 tokens

## Files Seen In Tool Results (37)

- `apps/meteor/tests/end-to-end/api/chat.ts`
- `packages/message-parser/src/definitions.ts`
- `packages/gazzodown/src/Markup.tsx`
- `ee/packages/pdf-worker/src/templates/ChatTranscript/markup/index.tsx`
- `packages/gazzodown/src/PreviewMarkup.tsx`
- `packages/gazzodown/src/MarkupInteractionContext.ts`
- `packages/gazzodown/src/Markup.stories.tsx`
- `ee/packages/pdf-worker/src/templates/ChatTranscript/markup/elements/StrikeSpan.tsx`
- `ee/packages/pdf-worker/src/templates/ChatTranscript/markup/elements/LinkSpan.tsx`
- `ee/packages/pdf-worker/src/templates/ChatTranscript/markup/elements/ItalicSpan.tsx`
- `ee/packages/pdf-worker/src/templates/ChatTranscript/markup/elements/InlineElements.tsx`
- `ee/packages/pdf-worker/src/templates/ChatTranscript/markup/elements/EmojiSpan.tsx`
- `ee/packages/pdf-worker/src/templates/ChatTranscript/markup/elements/CodeSpan.tsx`
- `ee/packages/pdf-worker/src/templates/ChatTranscript/markup/elements/BoldSpan.tsx`
- `ee/packages/pdf-worker/src/templates/ChatTranscript/markup/blocks/UnorderedListBlock.tsx`
- `ee/packages/pdf-worker/src/templates/ChatTranscript/markup/blocks/ParagraphBlock.tsx`
- `ee/packages/pdf-worker/src/templates/ChatTranscript/markup/blocks/OrderedListBlock.tsx`
- `ee/packages/pdf-worker/src/templates/ChatTranscript/markup/blocks/HeadingBlock.tsx`
- `ee/packages/pdf-worker/src/templates/ChatTranscript/markup/blocks/CodeBlock.tsx`
- `packages/message-parser/src/index.ts`
- `packages/livechat/src/helpers/parse.ts`
- `apps/meteor/packages/meteor-cookies/cookies.js`
- `packages/ui-voip/src/utils/parseStringToIceServers/parseStringToIceServers.ts`
- `packages/ui-voip/src/utils/parseStringToIceServers/index.ts`
- `packages/ui-kit/src/surfaces/modal/UiKitParserModal.ts`
- `packages/ui-kit/src/surfaces/message/UiKitParserMessage.ts`
- `packages/ui-kit/src/surfaces/contextualBar/UiKitParserContextualBar.ts`
- `packages/ui-kit/src/surfaces/banner/UiKitParserBanner.ts`
- `packages/ui-kit/src/surfaces/attachment/UiKitParserAttachment.ts`
- `packages/server-fetch/src/parsers.ts`
- `packages/message-parser/webpack.config.ts`
- `packages/message-parser/jest.config.ts`
- `packages/message-parser/tests/helpers.ts`
- `packages/message-parser/src/utils.ts`
- `packages/message-parser/src/guards.ts`
- `packages/message-parser/loaders/pegtransform.js`
- `packages/livechat/src/components/MarkdownBlock/index.tsx`
