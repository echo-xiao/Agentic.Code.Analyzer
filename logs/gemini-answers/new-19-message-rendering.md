# How is a message rendered from raw text to React components in Rocket.Chat?

## Gemini Answer

The process of rendering a message from raw text to React components in Rocket.Chat follows a pipeline involving several key steps and components:

**Call Chain:** `message.msg` (raw text) → `parseMessageTextToAstMarkdown` → `textToMessageToken` → `parse` → AST nodes → `<Markup>` component → React components (e.g., `ParagraphBlock`, `HeadingBlock`).

Here's a detailed breakdown of the rendering pipeline:

1.  **Initial Parsing and AST Generation (Client-side):**
    *   The raw message text (`message.msg`) first enters the rendering pipeline through the `parseMessageTextToAstMarkdown` function.
    *   **File:** `apps/meteor/client/lib/parseMessageTextToAstMarkdown.ts`
    *   This function then calls `textToMessageToken` to handle the actual parsing logic.
    *   **File:** `apps/meteor/client/lib/parseMessageTextToAstMarkdown.ts`
    *   `textToMessageToken` internally utilizes the `parse` function from the `@rocket.chat/message-parser` package. This function is responsible for converting the raw text into an Abstract Syntax Tree (AST), which is a structured representation of the message content.
    *   **File:** `packages/message-parser/src/index.ts`

2.  **Rendering AST to React Components:**
    *   The generated AST nodes are then passed as props to the `<Markup>` React component.
    *   **File:** `packages/gazzodown/src/Markup.tsx`
    *   The `<Markup>` component traverses the AST and renders each node into its corresponding React component (e.g., `ParagraphBlock`, `HeadingBlock`, `QuoteBlock`, `EmojiSpan`, `LinkSpan`, `BoldSpan`, etc.). These block components are responsible for the final visual representation of the message on the UI.

In summary, the raw text is first transformed into an Abstract Syntax Tree by the `parse` function in `packages/message-parser`, and then this AST is consumed by the `<Markup>` React component in `packages/gazzodown` to produce the final interactive and styled React components displayed to the user.

## Tool Calls (8 calls, 27,030 tokens)

**Step 1:** `search({"query":"render message","layer":"client"})` → 333 tokens
**Step 2:** `graph({"query":"renderMessageBlocks","direction":"down","layer":"client"})` → 44 tokens
**Step 3:** `search({"layer":"client","query":"parse message"})` → 299 tokens
**Step 4:** `implement({"symbolName":"parseMessageTextToAstMarkdown","filename":"apps/meteor/client/lib/parseMessageTextToA)` → 437 tokens
**Step 5:** `search({"query":"textToMessageToken","layer":"client"})` → 67 tokens
**Step 6:** `implement({"filename":"apps/meteor/client/lib/parseMessageTextToAstMarkdown.ts","symbolName":"textToMessageTok)` → 151 tokens
**Step 7:** `search({"filename":"packages/message-parser","layer":"packages","query":"parse"})` → 547 tokens
**Step 8:** `search({"layer":"packages","query":"Markup","filename":"packages/gazzodown"})` → 645 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 5/6 |
| Symbols hit | 2/4 |
| Tool calls | 8 |
| Total tokens | 27,030 |
| Pass | NO |
