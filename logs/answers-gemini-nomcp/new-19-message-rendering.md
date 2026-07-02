# How is a message rendered from raw text to React components in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat's message rendering pipeline is a multi-stage process involving both server-side pre-processing and client-side rendering to transform raw text into interactive React components.

Here's a breakdown of how it works:

### 1. Server-Side Pre-processing and Parsing

When a message is sent, the Rocket.Chat server performs initial parsing and enrichment before storing it in the database and broadcasting it to clients. This step is crucial for efficiency, consistency, and enabling features like link previews and mentions.

*   **Entry Point:** The `sendMessage` function (located in `app/lib/server/functions/sendMessage.js`) is the primary entry point for processing new messages.
*   **Core Parsing:** The server uses its internal markdown parser to analyze the message text. This parser is defined in `app/markdown/lib/markdown.js` and instantiated server-side.
    *   **Mentions:** It identifies `@username` and `#channel` mentions, resolving them to user and room IDs.
    *   **Links:** It extracts URLs and, if enabled, fetches metadata for link previews (e.g., title, description, image).
    *   **Emojis:** It identifies `:emoji:` shortcodes.
    *   **Markdown:** It parses standard markdown syntax (bold, italic, code blocks, etc.).
*   **Output:** The server stores the original `msg` field (raw text) but also generates additional fields on the message object, most notably the `md` field.
    *   **`md` field:** This is a structured representation (an Abstract Syntax Tree or AST-like structure) of the parsed markdown. It's an array of objects, where each object describes a part of the message (e.g., a paragraph, a plain text segment, a mention, a link, an emoji). This pre-parsed structure is then sent to the client.
    *   **`urls` field:** An array containing details about extracted URLs, including any fetched metadata for link previews.
    *   **`mentions` field:** An array of user objects that were mentioned.
    *   **`channels` field:** An array of room objects that were mentioned.

**Key Server-Side Files:**
*   `app/lib/server/functions/parseMessage.js`: Contains the core logic for parsing the message text on the server.
*   `app/markdown/lib/markdown.js`: The shared markdown parser library used by both client and server.
*   `app/markdown/lib/parser.js`: The underlying parsing engine.

### 2. Client-Side Rendering

When a message arrives at the client (via DDP/WebSocket), the React application takes the pre-processed message object and renders it.

*   **Main Message Component:** The primary component responsible for rendering a message is `client/components/message/body/MessageBody.tsx`. This component receives the full message object as a prop.
*   **Content Rendering:** `MessageBody` delegates the rendering of the actual message text and its parsed markdown to `client/components/message/body/MessageContent.tsx` and subsequently `client/components/message/body/MessageText.tsx`.
*   **The `md` Field is Key:** `MessageText` is the component that primarily consumes the `message.md` field. It iterates through this array of structured markdown fragments and recursively renders them into appropriate React components or HTML elements.

**How `message.md` is rendered:**

The `message.md` field is an array of objects, each with a `type` and a `value`. The `MessageText` component (or helper functions within it) uses a mapping or a `switch` statement to render different types:

*   **`PARAGRAPH`**: Renders a `<p>` tag. Its `value` is another array of `md` objects, which are recursively rendered.
*   **`PLAIN_TEXT`**: Renders a simple `<span>` containing the text `value`.
*   **`MENTION_TEXT`**: Renders a `<UserMention>` or `<ChannelMention>` component (e.g., `client/components/UserMention/UserMention.tsx`, `client/components/ChannelMention/ChannelMention.tsx`), passing the username/channel name. These components handle styling and potential click actions.
*   **`LINK`**: Renders an `<a>` tag. Its `value` object contains `src` (the URL) and `value` (the link text), which are used to construct the anchor.
*   **`EMOJI`**: Renders an `<Emoji>` component (e.g., `client/components/Emoji/Emoji.tsx`), which displays the appropriate emoji image or unicode character.
*   **`CODE` / `CODE_BLOCK`**: Renders `<code>` or `<pre><code>` tags, often with syntax highlighting applied.
*   **`BOLD` / `ITALIC` / `STRIKE`**: Renders `<strong>`, `<em>`, `<s>` tags, recursively rendering their `value` (which is an array of `md` objects).
*   **`QUOTE`**: Renders a `<blockquote>` tag.
*   **`LIST_ITEM` / `UNORDERED_LIST` / `ORDERED_LIST`**: Renders `<li>`, `<ul>`, `<ol>` tags respectively.

**Other Client-Side Components:**

Beyond the main message text, `MessageBody` also orchestrates the rendering of other message features:

*   **Link Previews:** If `message.urls` exists and contains metadata, `MessageBody` renders `LinkPreview` components (e.g., `client/components/message/body/LinkPreview.tsx`) to display rich previews below the message text.
*   **Attachments:** If `message.attachments` exists (for file uploads, images, videos), `MessageBody` renders `MessageAttachments` (e.g., `client/components/message/body/MessageAttachments.tsx`) which then uses specific components for different attachment types (e.g., `ImageAttachment`, `VideoAttachment`, `FileAttachment`).
*   **Reactions:** `client/components/message/body/MessageReactions.tsx` renders the emoji reactions associated with the message.
*   **Thread Replies:** If the message is part of a thread, `client/components/message/body/MessageThread.tsx` might be used to show thread details.

**Client-Side Markdown Parser (for completeness):**
While the `md` field is usually pre-filled by the server, Rocket.Chat also has a client-side instance of the markdown parser (`app/markdown/client/index.js`). This is primarily used for real-time message previews as a user types, or if a message somehow arrives without the `md` field (though less common for persisted messages).

### Summary of the Pipeline:

1.  **Raw Text Input:** User types `Hello @user, check out this link: https://example.com`
2.  **Server-Side Parsing (`parseMessage.js`):**
    *   Identifies `@user` as a mention.
    *   Extracts `https://example.com` as a URL, fetches metadata.
    *   Generates `message.md` (e.g., `[{ type: 'PARAGRAPH', value: [{ type: 'PLAIN_TEXT', value: 'Hello ' }, { type: 'MENTION_TEXT', value: '@user' }, { type: 'PLAIN_TEXT', value: ', check out this link: ' }, { type: 'LINK', value: { src: 'https://example.com', value: 'https://example.com' } }] }]`).
    *   Generates `message.urls` with link preview data.
3.  **Client-Side Rendering (`MessageBody.tsx` -> `MessageContent.tsx` -> `MessageText.tsx`):**
    *   `MessageBody` receives the message object.
    *   `MessageText` iterates `message.md`:
        *   Renders "Hello " as plain text.
        *   Renders `@user` using `<UserMention username="user" />`.
        *   Renders ", check out this link: " as plain text.
        *   Renders `https://example.com` using `<a href="https://example.com">https://example.com</a>`.
    *   `MessageBody` also checks `message.urls` and renders a `<LinkPreview url={...} />` component below the text.

This layered approach ensures that messages are efficiently processed on the server and then flexibly rendered into rich, interactive UI elements on the client.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,984 |
| Model | gemini-2.5-flash |
| Tools | NONE |
