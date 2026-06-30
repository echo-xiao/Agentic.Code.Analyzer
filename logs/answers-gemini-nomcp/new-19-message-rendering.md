# How is a message rendered from raw text to React components in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat employs a sophisticated two-stage process for rendering messages, involving both server-side pre-processing and client-side React rendering. This approach optimizes performance and ensures consistent message display across clients.

Here's a breakdown of how a message goes from raw text to React components:

## 1. Server-Side Processing (Pre-rendering)

When a message is sent or edited, the Rocket.Chat server performs a series of transformations on the raw message text (`msg` field) *before* storing it in the database and sending it to clients. The primary goal here is to generate a pre-rendered HTML version of the message, stored in the `html` field of the message object.

**Key Steps and Files:**

1.  **Message Ingestion & Callbacks:**
    *   When a message is sent, it goes through `app/lib/server/functions/sendMessage.ts`.
    *   Crucially, a series of server-side callbacks are triggered (registered in `app/lib/server/lib/callbacks.ts`). These callbacks are responsible for various transformations.
    *   Relevant callbacks include:
        *   `message.beforeSave`: Initial processing, validation.
        *   `message.beforeSave<HTML>`: The main callback chain responsible for generating the `html` field.

2.  **Markdown Parsing:**
    *   Rocket.Chat uses a custom wrapper around a Markdown parser (historically `marked`, now often a more controlled pipeline leveraging `packages/markdown/`).
    *   This step converts Markdown syntax (e.g., `*bold*`, `_italic_`, `` `code` ``) into HTML tags (`<strong>`, `<em>`, `<code>`).
    *   **Files:** `packages/markdown/lib/markdown.ts`, `packages/markdown/lib/parser/index.ts`.

3.  **Emoji Conversion:**
    *   Text-based emojis (e.g., `:smiley:`) are converted into `<img>` tags pointing to emoji assets.
    *   **Files:** Logic often resides in `packages/string-helpers/lib/stringHelpers.ts` (e.g., `renderEmojis`) which is integrated into the Markdown parsing pipeline.

4.  **Mentions and Channels:**
    *   User mentions (`@username`) and channel mentions (`#channelname`) are identified.
    *   They are transformed into anchor tags (`<a>`) with specific `href` attributes that allow the client to navigate to direct messages or channels.
    *   **Files:** `packages/markdown/lib/parser/plugins/mentions.ts`, `packages/markdown/lib/parser/plugins/channels.ts`. These use regex and database lookups to resolve users/channels.

5.  **URL Detection and Link Previews (OEmbed):**
    *   URLs are detected and wrapped in `<a>` tags.
    *   If enabled, a separate process (often triggered by `message.afterSave` or via a background job) fetches metadata for links (OEmbed) and creates attachments that appear below the message (e.g., link title, description, image). These attachments are added to the `attachments` array of the message object, not directly into the `html` field.
    *   **Files:** `app/oembed/server/functions/get  OEmbedHtml.ts`, `app/lib/server/lib/callbacks.ts` (for the OEmbed callback).

6.  **Sanitization:**
    *   Crucially, the generated HTML is sanitized using a library like `DOMPurify` (or a custom sanitizer) to prevent Cross-Site Scripting (XSS) attacks. This ensures that malicious scripts cannot be injected into messages.
    *   **Files:** Integrated within the markdown rendering pipeline, often in `packages/markdown/lib/markdown.ts`.

7.  **`html` Field Storage:**
    *   The final, sanitized HTML string is stored in the `message.html` field in the database.
    *   This `html` field is then sent to all connected clients.

## 2. Client-Side Rendering (React Components)

Once the client receives the message object (via WebSocket/DDP), React takes over to render it efficiently.

**Key Steps and Files:**

1.  **Main Message Component:**
    *   The core component responsible for rendering a single message is typically found around: `client/components/message/Message.tsx`.
    *   This component receives the `message` object as a prop.

2.  **Rendering Message Body (`MessageBody` or `MessageContent`):**
    *   Inside `Message.tsx`, there's usually a child component dedicated to rendering the actual text content of the message. This might be `client/components/message/MessageBody/MessageBody.tsx` or `client/components/message/MessageContent.tsx`.
    *   This component primarily uses the `message.html` field.

3.  **The `MarkdownText` Component (Bridging HTML to React):**
    *   Rocket.Chat often uses a specialized component like `client/components/MarkdownText/MarkdownText.tsx` (or similar, sometimes found within `client/components/message`) to take the pre-rendered `html` string and render it.
    *   **Why not just `dangerouslySetInnerHTML`?** While `dangerouslySetInnerHTML` is used for the raw HTML, Rocket.Chat's `MarkdownText` component (or similar internal utility) does more:
        *   It can *further process* the HTML string, parsing it to identify specific elements (like mentions, code blocks, links) and replacing them with interactive React components. This allows for:
            *   **Click Handlers:** Attaching `onClick` events to `@mentions` to open direct messages, or `#channels` to navigate.
            *   **Code Highlighting:** Identifying `<code>` blocks and applying syntax highlighting using libraries like `highlight.js` (e.g., `client/components/message/code.ts` or related components).
            *   **Custom Emoji Rendering:** Ensuring emojis are rendered consistently and potentially allowing custom emoji packs.
            *   **Accessibility:** Ensuring correct `aria-*` attributes.
            *   **Extensibility:** Allowing apps/integrations to hook into specific message elements.
        *   This transformation from static HTML to interactive React elements is often done using a custom HTML parser (e.g., `html-react-parser` or a custom implementation) that maps specific DOM nodes to React components based on attributes (like `data-rc-user-id`, `data-rc-channel-id`).

4.  **Rendering Attachments and Embeds:**
    *   If the message has `attachments` (e.g., link previews, file uploads, app integrations), separate React components are responsible for rendering these.
    *   **Files:** `client/components/message/Attachments.tsx` or components within `client/components/message/blocks` for UI-Kit elements. These components iterate over the `message.attachments` array and render specific `Attachment` components based on their type.

### Summary Flow:

1.  **User types text** (`msg` field).
2.  **Server receives `msg`:**
    *   Parses Markdown, converts emojis, detects mentions/channels.
    *   Sanitizes resulting HTML.
    *   Stores `msg.html` in DB.
3.  **Client receives `message` object** (containing `msg` and `html`).
4.  **`Message.tsx` (React) component renders:**
    *   Passes `message.html` to `MarkdownText.tsx`.
5.  **`MarkdownText.tsx` (React) component:**
    *   Parses `message.html` (which is a string).
    *   Identifies interactive elements (mentions, code, links).
    *   Replaces identified HTML elements with corresponding interactive React components (e.g., a `<a data-rc-uid="xxx">@user</a>` becomes `<MentionUser userId="xxx">@user</MentionUser>`).
    *   Renders static HTML parts using `dangerouslySetInnerHTML` where no interactivity is needed, wrapped in a safe component boundary.
    *   Handles code highlighting, emoji rendering, etc.
6.  **`Attachments.tsx` (React) component:**
    *   Renders any `message.attachments` using dedicated attachment components.

This multi-layered approach ensures both security and performance, allowing Rocket.Chat to handle complex rich text messages efficiently while providing a dynamic and interactive user experience.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 4,033 |
| Model | gemini-2.5-flash |
| Tools | NONE |
