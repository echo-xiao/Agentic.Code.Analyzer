# How is a message rendered to React components?

## Answer

Message rendering in Rocket.Chat follows a **data pipeline**, not a single call chain. A message string is parsed into an AST by the `message-parser` package, then the AST is rendered to React components by the `gazzodown` package. The pipeline is: raw text -> PEG grammar -> Root AST -> Markup component -> nested block/inline components.

### 1. Parsing: `message-parser`

**`packages/message-parser/src/index.ts`, line 18:**
```ts
export const parse = (input: string, options?: Options): Root => grammar.parse(input, options);
```

The `parse()` function takes a raw message string and optional configuration:
```ts
export type Options = {
    colors?: boolean;       // enable hex color previews
    emoticons?: boolean;    // enable emoticon -> emoji conversion
    katex?: {
        dollarSyntax?: boolean;       // $...$ math
        parenthesisSyntax?: boolean;  // \(...\) math
    };
    customDomains?: string[];  // additional URL domains
};
```

It delegates to a **PEG.js grammar** (`grammar.pegjs`) which produces a `Root` AST -- an array of block-level nodes.

The AST node types include:
- `PARAGRAPH` -- text paragraphs with inline elements
- `HEADING` -- h1-h4 headings
- `CODE` -- fenced code blocks with language
- `QUOTE` -- blockquotes
- `BIG_EMOJI` -- messages consisting only of emojis
- `UNORDERED_LIST` / `ORDERED_LIST` -- lists
- `TASKS` -- task/checkbox lists
- `KATEX` -- LaTeX math blocks
- `LINE_BREAK` -- explicit line breaks
- `SPOILER_BLOCK` -- spoiler content

### 2. Rendering: Gazzodown `Markup` Component

**`packages/gazzodown/src/Markup.tsx`, line 22:**
```ts
const Markup = ({ tokens }: MarkupProps): ReactElement => (
    <>
        {tokens.map((block, index) => {
            switch (block.type) {
                case 'BIG_EMOJI':
                    return <BigEmojiBlock key={index} emoji={block.value} />;
                case 'PARAGRAPH':
                    return <ParagraphBlock key={index}>{block.value}</ParagraphBlock>;
                case 'HEADING':
                    return <HeadingBlock key={index} level={block.level}>{block.value}</HeadingBlock>;
                case 'UNORDERED_LIST':
                    return <UnorderedListBlock key={index} items={block.value} />;
                case 'ORDERED_LIST':
                    return <OrderedListBlock key={index} items={block.value} />;
                case 'TASKS':
                    return <TaskList key={index} tasks={block.value} />;
                case 'QUOTE':
                    return <QuoteBlock key={index}>{block.value}</QuoteBlock>;
                case 'SPOILER_BLOCK':
                    return <SpoilerBlock key={index}>{block.value}</SpoilerBlock>;
                case 'CODE':
                    return <CodeBlock key={index} language={block.language} lines={block.value} />;
                case 'KATEX':
                    return <KatexBlock code={block.value} />;
                case 'LINE_BREAK':
                    return <br key={index} />;
                default:
                    return null;
            }
        })}
    </>
);
export default memo(Markup);
```

The `Markup` component takes `tokens: MessageParser.Root` as props and switch-renders each block-level node to the appropriate React component.

**Lazy-loaded components:**
- `CodeBlock` is lazy-loaded via `lazy(() => import('./code/CodeBlock'))` (line 15)
- `KatexBlock` is lazy-loaded via `lazy(() => import('./katex/KatexBlock'))` (line 16)

### 3. Inline Elements

Each block component (e.g., `ParagraphBlock`) renders inline elements within its `children`. Inline element types include:
- `BOLD`, `ITALIC`, `STRIKE` -- text formatting
- `LINK` -- hyperlinks
- `MENTION_USER`, `MENTION_CHANNEL` -- @mentions and #channel mentions
- `EMOJI` -- emoji rendering
- `CODE_INLINE` -- inline code
- `COLOR` -- hex color preview
- `TIMESTAMP` -- date/time rendering
- `SPOILER` -- inline spoiler

These are rendered by components in `packages/gazzodown/src/elements/` (e.g., `BoldSpan.tsx`, `StrikeSpan.tsx`, `SpoilerSpan.tsx`).

### 4. Emoji Rendering

Emoji components in `packages/gazzodown/src/emoji/`:
- `BigEmojiBlock` -- for messages that are only emojis
- `BigEmojiElement` -- individual large emoji
- `EmojiElement` -- inline emoji
- `EmojiRenderer` -- rendering logic shared by both

### 5. Integration Context

**Message rendering context** is provided via React context providers:

- `MarkupInteractionContext` -- provides handlers for mentions, emoji, channel links, highlighting
- Wrapping components (like `GazzodownText` in the client app) supply these context values

### 6. Message Content Components (Client App)

In the client application layer:

**`apps/meteor/client/components/message/variants/room/RoomMessageContent.tsx`:**
The main message content component for room messages. Uses `MessageContentBody` or similar components.

**`apps/meteor/client/components/message/variants/thread/ThreadMessageContent.tsx`:**
Thread message content variant.

The client components typically:
1. Take a message object with `md` (parsed AST) or `msg` (raw text)
2. If `md` exists, pass it directly to `<Markup tokens={message.md} />`
3. If only `msg` exists, parse it with `parse()` first
4. Wrap with context providers for mention resolution, emoji handling, etc.

### 7. Server-Side Parsing

Messages are typically parsed on the server before storage. The `md` field on `IMessage` contains the pre-parsed AST. This is done in:
- `Message.beforeSave()` in core-services
- `ListenersModule` for ephemeral messages (line 62 in listeners.module.ts)

### Key Files
| File | Role |
|------|------|
| `packages/message-parser/src/index.ts` | `parse()` function, PEG grammar integration |
| `packages/message-parser/src/grammar.pegjs` | PEG.js grammar defining markdown syntax |
| `packages/message-parser/src/definitions.ts` | AST node type definitions (Root, Block, Inline) |
| `packages/gazzodown/src/Markup.tsx` | Top-level React component rendering AST to components |
| `packages/gazzodown/src/blocks/ParagraphBlock.tsx` | Paragraph rendering with inline elements |
| `packages/gazzodown/src/blocks/HeadingBlock.tsx` | Heading rendering |
| `packages/gazzodown/src/blocks/QuoteBlock.tsx` | Blockquote rendering |
| `packages/gazzodown/src/code/CodeBlock.tsx` | Fenced code block with syntax highlighting |
| `packages/gazzodown/src/emoji/BigEmojiBlock.tsx` | Large emoji rendering |
| `packages/gazzodown/src/elements/` | Inline element components (Bold, Strike, Spoiler, etc.) |
| `apps/meteor/client/components/message/variants/room/RoomMessageContent.tsx` | Client-side message content container |

### Key Symbols
- `parse(input, options)` -- converts raw text to `Root` AST
- `Root` -- array of block-level AST nodes
- `Markup` -- memoized React component rendering AST tokens
- `ParagraphBlock` / `HeadingBlock` / `QuoteBlock` / `CodeBlock` -- block-level React components
- `BigEmojiBlock` -- special rendering for emoji-only messages
- `MarkupInteractionContext` -- React context for mention/emoji handlers
- `message.md` -- pre-parsed AST field on `IMessage`
