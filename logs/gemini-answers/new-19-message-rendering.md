# How is a message rendered from raw text to React components in Rocket.Chat?

## Gemini Answer

The rendering of a message from raw text to React components in Rocket.Chat follows a specific data transformation pipeline:

**Call Chain:** Raw Text → `parse()` → Root AST (tokens) → `<Markup />` → `<GazzodownText />` → `<MessageContentBody />`

1.  **Raw Text:** The process begins with the raw text content of a message (e.g., `message.msg`).

2.  **`parse()` function:**
    *   **File:** `packages/message-parser/src/index.ts`
    *   This function takes the raw text as input and uses a defined grammar to parse it. It converts the raw text into a structured Abstract Syntax Tree (AST), represented as an array of `tokens`. The actual parsing logic is handled by an internal `grammar.parse` call.

3.  **`<Markup />` component:**
    *   **File:** `packages/gazzodown/src/Markup.tsx`
    *   This React component receives the `tokens` (the AST) as its props. It iterates through each token in the AST and, based on the token's `type` (e.g., `PARAGRAPH`, `HEADING`, `BIG_EMOJI`, `CODE`, `UNORDERED_LIST`), renders a corresponding specialized React component (e.g., `ParagraphBlock`, `HeadingBlock`, `BigEmojiBlock`). This step transforms the AST into a hierarchy of basic React elements.

4.  **`<GazzodownText />` component:**
    *   **File:** `apps/meteor/client/components/GazzodownText.tsx`
    *   This component acts as a context provider (`MarkupInteractionContext.Provider`). It wraps the output of the `<Markup />` component (received as its `children`). It's responsible for setting up and providing various interaction-related functionalities and data, such as:
        *   Emoji detection (`detectEmoji`)
        *   Highlighting regular expressions (`highlightRegex`)
        *   Search text marking (`markRegex`)
        *   Resolution logic for user and channel mentions (`resolveUserMention`, `resolveChannelMention`)
        *   Click handlers for user and channel mentions (`onUserMentionClick`, `onChannelMentionClick`)
        *   User preferences for emoji conversion and real name display.

5.  **`<MessageContentBody />` component:**
    *   **File:** `apps/meteor/client/components/message/MessageContentBody.tsx`
    *   This is the top-level React component responsible for rendering the message's body. It receives the parsed AST (`md` prop) and renders it by wrapping the `<GazzodownText>` component. Inside `<GazzodownText>`, it explicitly renders `<Markup tokens={md} />`. It also provides the overall `MessageBody` wrapper with accessibility attributes.

## Tool Calls (8 calls, 49,451 tokens)

**Step 1:** `search({"query":"GazzodownText","layer":"client"})` → 92 tokens
**Step 2:** `implement({"symbolName":"GazzodownText","filename":"apps/meteor/client/components/GazzodownText.tsx"})` → 824 tokens
**Step 3:** `search({"layer":"client","query":"Markup"})` → 582 tokens
**Step 4:** `implement({"symbolName":"Markup","filename":"packages/gazzodown/src/Markup.tsx"})` → 331 tokens
**Step 5:** `search({"query":"parse","layer":"packages"})` → 484 tokens
**Step 6:** `implement({"symbolName":"parse","filename":"packages/message-parser/src/index.ts"})` → 40 tokens
**Step 7:** `search({"layer":"client","query":"MessageContentBody"})` → 97 tokens
**Step 8:** `implement({"symbolName":"MessageContentBody","filename":"apps/meteor/client/components/message/MessageContentB)` → 137 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 5/6 |
| Symbols hit | 4/4 |
| Tool calls | 8 |
| Total tokens | 49,451 |
