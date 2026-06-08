# How is a message rendered from raw text to React components in Rocket.Chat?

## Gemini Answer

The process of rendering a message from raw text to React components in Rocket.Chat involves a pipeline that transforms the message through several stages.

The rendering process begins with `createMarkdownMessageRenderer` located at `apps/meteor/app/markdown/lib/markdown.js`. This function acts as an entry point, determining which parser to use for the message.

The core parsing of the raw message text into an Abstract Syntax Tree (AST) occurs in the `parse` function found in `packages/message-parser/src/index.ts`. This function takes the raw message string and options, then uses a grammar to convert it into an AST representation.

Finally, the AST nodes are consumed by the `<Markup>` component in `packages/gazzodown/src/Markup.tsx`. This component is responsible for translating the AST into actual React components, such as `ParagraphBlock`, `HeadingBlock`, `QuoteBlock`, and other block components.

Call chain:
`createMarkdownMessageRenderer` (apps/meteor/app/markdown/lib/markdown.js) → `parse` (packages/message-parser/src/index.ts) → `<Markup>` component (packages/gazzodown/src/Markup.tsx) → React Components

## Tool Calls (8 calls, 38,260 tokens)

**Step 1:** `search({"layer":"client","query":"message render"})` → 223 tokens
**Step 2:** `graph({"direction":"down","query":"createMarkdownMessageRenderer"})` → 863 tokens
**Step 3:** `search({"query":"markedParser"})` → 14 tokens
**Step 4:** `implement({"filename":"apps/meteor/app/markdown/lib/markdown.js","symbolName":"createMarkdownMessageRenderer"})` → 131 tokens
**Step 5:** `search({"query":"parsers","layer":"app"})` → 426 tokens
**Step 6:** `search({"query":"parse","layer":"packages"})` → 547 tokens
**Step 7:** `implement({"filename":"packages/message-parser/src/index.ts","symbolName":"parse"})` → 64 tokens
**Step 8:** `search({"layer":"packages","query":"Markup"})` → 645 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 5/6 |
| Symbols hit | 2/4 |
| Tool calls | 8 |
| Total tokens | 38,260 |
| Pass | NO |
