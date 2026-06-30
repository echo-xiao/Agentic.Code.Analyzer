# How is a message rendered from raw text to React components in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat employs a two-stage process to render messages from raw text into interactive React components:

1.  **Parsing and Transformation:** Raw message text (`message.msg`) is processed by a custom markdown parser, transforming it into an HTML string and extracting other structured data (like mentions, links, and potentially preliminary emoji handling).
2.  **React Rendering:** The main `Message` React component takes this prepared data (the HTML string and other structured properties) and renders it, utilizing `dangerouslySetInnerHTML` for the core message body and dedicated React components for attachments, reactions, and other complex elements.

Let's break down each stage in detail:

---

### Stage 1: Parsing and Transformation (Raw Text to HTML/Structured Data)

The core logic for parsing raw text resides within the `packages/rocketchat-markdown` package.

1.  **Input:** The raw text content of a message, typically found in the `message.msg` property of the message object.

2.  **The `RocketChatMarkdown` Parser:**
    *   Rocket.Chat uses a custom markdown parser, instantiated as `RocketChatMarkdown`. This parser is a singleton that gets initialized with various rules.
    *   **File:** `packages/rocketchat-markdown/lib/markdown.ts` (or `.js`) defines the `RocketChatMarkdown` class and its core parsing methods.
    *   **Rules:** The parser applies a series of rules in a specific order:
        *   **Standard Markdown:** Bold (`**text**`), italics (`*text*`), strikethrough (`~text~`), code blocks (```code```), inline code (`code`), blockquotes (`> quote`).
        *   **Mentions:**
            *   `@username` and `@all`, `@here` are identified.
            *   They are transformed into HTML `<span>` tags with specific classes (e.g., `mention--user`, `mention--all`) and `data-uid` / `data-username` attributes. This is crucial for later interactivity.
            *   **Example:** `@john.doe` might become `<span class="mention mention--user" data-uid="xyz" data-username="john.doe">@john.doe</span>`
        *   **Channels:**
            *   `#channel-name` is identified and linked.
            *   **Example:** `#general` might become `<span class="mention-link" data-channel="general" data-id="abc">#general</span>`
        *   **Links:**
            *   Raw URLs (e.g., `http://example.com`) are automatically converted into clickable `<a>` tags.
        *   **Emojis:**
            *   Text-based emoji codes (e.g., `:smile:`) are transformed into `<img>` tags pointing to the appropriate emoji assets. This often involves libraries like `emojione` (or a custom solution in newer versions).
        *   **Other Custom Syntax:** Rocket.Chat might have custom syntax for things like file references or other integrations.

3.  **Server-Side Pre-parsing (Optional/Historical):**
    Historically, Rocket.Chat could pre-parse messages on the server, storing the resulting HTML string in `message.html` in the database. This offloads parsing from the client and ensures consistent rendering across clients. While this might still be in use for some paths, client-side parsing is also prevalent, especially for messages being typed or edited. If `message.html` already exists, the client-side parser might be skipped for performance.

4.  **Output:** The primary output of this stage for the main message body is an **HTML string**. Additionally, the message object will contain other structured data that isn't part of the `message.msg` markdown, such as:
    *   `message.attachments`: An array of attachment objects.
    *   `message.urls`: An array of URL objects (for rich link previews/embeds).
    *   `message.reactions`: An array of reaction objects.
    *   `message.file`: An object for a directly attached file.

---

### Stage 2: React Rendering (HTML/Structured Data to Components)

The client-side UI, primarily within the `client/components/message/Message` directory, takes the parsed HTML and structured data and renders it using React.

1.  **Core Component:** `client/components/message/Message/index.tsx` (or a similar path depending on the exact UI structure in the version). This component is responsible for rendering a single message in the message list.

2.  **Rendering the Main Message Body:**
    *   The `Message` component (or a child component like `MessageBody` typically located at `client/components/message/content/MessageBody/index.tsx`) receives the `message` object.
    *   It takes the pre-parsed HTML string (either from `message.html` or generated on the fly by `RocketChatMarkdown.parse(message.msg)` if `message.html` is missing) and renders it using React's `dangerouslySetInnerHTML` prop.
    *   **Example:**
        ```jsx
        <div
          className='rcx-message-body'
          dangerouslySetInnerHTML={{ __html: message.html || RocketChatMarkdown.parse(message.msg) }}
        />
        ```
    *   **Why `dangerouslySetInnerHTML`?** While generally discouraged for untrusted input, it's used here for performance reasons. Re-parsing complex markdown into an AST and then converting that AST to a React component tree would be significantly slower for every message, especially in large channels. The HTML is considered "safe" because it's generated by Rocket.Chat's own controlled parser.
    *   **Interactivity:** For elements like mentions and links that are rendered via `dangerouslySetInnerHTML`, their interactivity (e.g., clicking a mention to open user info, clicking a channel to switch rooms) is handled via **event delegation**. A global `onClick` handler on the message container (or the entire message list) listens for clicks. When a click occurs, it inspects the `event.target` and its ancestors for specific `data-` attributes (like `data-uid`, `data-username`, `data-channel`, `href`) to determine the action to take.

3.  **Rendering Other Message Properties (Dedicated React Components):**
    The `Message` component also iterates over other structured data on the `message` object and renders them using specific React components:

    *   **Attachments:** If `message.attachments` exists, each attachment object is passed to an `Attachment` component (e.g., `client/components/message/Attachment/index.tsx`). This component handles rendering different types of attachments (images, videos, file uploads, rich text attachments).
    *   **URL Previews/Embeds:** If `message.urls` exists, each URL object is passed to a `UrlPreview` component (e.g., `client/components/message/UrlPreview/index.tsx`) to display rich link previews (title, description, image).
    *   **Reactions:** If `message.reactions` exists, these are typically rendered by a `Reactions` component (e.g., `client/components/message/Reactions/index.tsx`), which in turn renders individual `Reaction` components.
    *   **Thread Information:** If the message is part of a thread (`message.tcount`, `message.replies`), specific components like `ThreadMessagePreview` might be rendered to show the reply count and avatars of repliers.
    *   **Other Metadata:**
        *   The user's avatar (`<Avatar />`).
        *   The username (`<Username />`).
        *   The timestamp (`<MessageTimestamp />`).
        *   Edited/deleted status, etc.
        These are all separate, smaller React components or directly rendered JSX elements within the main `Message` component or its children.

---

In summary, Rocket.Chat efficiently renders messages by first parsing raw text into a mix of HTML and structured data using a custom markdown engine, and then leveraging React's component-based architecture to render this data. `dangerouslySetInnerHTML` is used for the core, often complex, message body HTML, while dedicated React components handle richer, more interactive elements like attachments, reactions, and previews.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,987 |
| Model | gemini-2.5-flash |
| Tools | NONE |
