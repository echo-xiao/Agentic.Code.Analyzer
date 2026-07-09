# How is a message rendered from raw text to React components in Rocket.Chat?

## Plan

intent: call-chain

## Gemini Answer

Rocket.Chat renders messages from raw text to React components through a two-step process: parsing the raw text into an Abstract Syntax Tree (AST) and then rendering that AST into React components.

Here's the detailed flow:

**Entry Point:** `useNormalizedMessage` hook
*   **File:** `apps/meteor/client/components/message/hooks/useNormalizedMessage.ts`
*   This hook is responsible for taking an `IMessage` object and initiating the processing of its text content.

**Step 1: Parsing the Message Text to AST**
*   `useNormalizedMessage` calls `parseMessageTextToAstMarkdown`.
    *   **File:** `apps/meteor/client/components/message/lib/parseMessageTextToAstMarkdown.ts`
    *   This function takes the raw message text and parsing options.
    *   It then calls `textToMessageToken` to perform the actual parsing.
        *   `textToMessageToken` utilizes the `@rocket.chat/message-parser` package (specifically, its `parse` function, likely from `packages/message-parser/lib/index.ts`) to convert the raw text into an AST.
        *   The resulting AST is stored in the `md` property of the message object.

**Step 2: Rendering the AST to React Components**
*   The message object, now containing the AST in its `md` property, is passed to the `MessageContentBody` component.
    *   **File:** `apps/meteor/client/components/message/MessageContentBody.tsx`
    *   `MessageContentBody` is responsible for orchestrating the rendering of the message content.
    *   It renders the `GazzodownText` component.
        *   **File:** `apps/meteor/client/components/GazzodownText/GazzodownText.tsx`
        *   `GazzodownText` acts as an intermediary, taking the AST and passing it to the `Markup` component.
        *   The `Markup` component (from `@rocket.chat/gazzodown`, likely `packages/gazzodown/src/Markup.tsx` or similar, as indicated by the wiki) iterates through the AST tokens. For each token (e.g., paragraph, heading, list, mention, emoji), it renders the appropriate React component (e.g., `ParagraphBlock`, `HeadingBlock`, `BigEmojiBlock`, `PreviewUserMentionElement`).

**Chain of Events:**
`useNormalizedMessage` (apps/meteor/client/components/message/hooks/useNormalizedMessage.ts)
  → `parseMessageTextToAstMarkdown` (apps/meteor/client/components/message/lib/parseMessageTextToAstMarkdown.ts)
    → `textToMessageToken` (apps/meteor/client/components/message/lib/parseMessageTextToAstMarkdown.ts)
      → `parse` (packages/message-parser/lib/index.ts - inferred from wiki and graph)
        → AST generated and attached to message.md
  → `MessageContentBody` (apps/meteor/client/components/message/MessageContentBody.tsx)
    → `GazzodownText` (apps/meteor/client/components/GazzodownText/GazzodownText.tsx)
      → `Markup` (packages/gazzodown/src/Markup.tsx - inferred from wiki and graph)
        → Renders React components based on AST tokens.

## Tool Calls (6 calls, 33,623 tokens)

**Step 1:** `plan({"intent":"call-chain","question":"How is a message rendered from raw text to React components in Rocket.Chat?"})` → 1075 tokens
**Step 2:** `search({"query":"useNormalizedMessage","layer":"client"})` → 78 tokens
**Step 3:** `graph({"file":"useNormalizedMessage.ts","query":"useNormalizedMessage","move":"down","depth":5})` → 2687 tokens
**Step 4:** `details({"filename":"parseMessageTextToAstMarkdown.ts","symbolName":"parseMessageTextToAstMarkdown"})` → 429 tokens
**Step 5:** `search({"layer":"client","query":"MessageContentBody"})` → 75 tokens
**Step 6:** `graph({"depth":3,"move":"down","query":"MessageContentBody","file":"MessageContentBody.tsx"})` → 1426 tokens

## Files Seen In Tool Results (5)

- `apps/meteor/client/components/message/hooks/useNormalizedMessage.ts`
- `apps/meteor/client/components/message/MessageContentBody.tsx`
- `apps/meteor/client/components/message/variants/room/RoomMessageContent.tsx`
- `apps/meteor/client/components/MarkdownText.tsx`
- `apps/meteor/client/lib/parseMessageTextToAstMarkdown.ts`
