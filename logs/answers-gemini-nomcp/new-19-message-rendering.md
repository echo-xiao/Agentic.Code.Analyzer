# How is a message rendered from raw text to React components in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat's message rendering process is a sophisticated pipeline that transforms raw user input into interactive React components, handling markdown, emojis, mentions, and more. It involves both server-side processing (for storage and initial sanitization) and extensive client-side rendering.

Here's a breakdown of the journey:

### 1. Server-Side Processing (When a message is sent)

When a user sends a message, the raw text first hits the Rocket.Chat server.

*   **Entry Point:** The client sends the raw message text to the server, typically via a DDP method call that eventually invokes `RocketChat.sendMessage`.
*   **`sendMessage` Function:** Located in `app/lib/server/functions/sendMessage.ts`, this function orchestrates the message creation.
*   **`parseMessage` Function:** This is a crucial step, found in `app/lib/server/functions/parseMessage.ts`. It performs several key operations:
    *   **Sanitization:** It sanitizes the raw message text to prevent XSS attacks, ensuring no malicious scripts are embedded.
    *   **Basic HTML Conversion:** It performs some basic markdown-to-HTML conversion for storage. For instance, `*bold*` might become `<strong>bold</strong>`. This creates the `html` field on the message object.
    *   **Metadata Extraction:** It identifies and extracts metadata like:
        *   **Mentions:** `@username` are parsed, and the `mentions` array on the message object is populated with user IDs.
        *   **Channels:** `#channelname` are parsed, and the `channels` array is populated with channel IDs.
        *   **URLs:** Any URLs are extracted and stored in the `urls` array.
    *   **Emoji Conversion (Partial):** While full emoji rendering happens client-side, the server might do some initial processing or validation related to emoji codes.
*   **Database Storage:** The processed message object, containing the `msg` (raw text), `html` (sanitized basic HTML), `mentions`, `channels`, `urls`, and other fields, is then saved into the `rocketchat_message` MongoDB collection.

### 2. Client-Side Rendering (When a message is displayed)

When a user views a channel, the client fetches messages from the server. The rendering process then kicks in to transform the stored message data into interactive React components.

*   **Fetching Messages:** The client subscribes to the `rocketchat_message` collection, receiving message objects from the server.
*   **Core Message Component:** The primary component responsible for rendering a single message is `app/ui-message/client/components/Message/Message.tsx`. This component orchestrates the display of the message's header, body, attachments, reactions, etc.
*   **Message Body Component:** The actual text content rendering happens within `app/ui-message/client/components/Message/Body.tsx`. This component uses a custom hook to prepare the message content.
*   **`useMessageBody` Hook:** Located in `app/ui-message/client/components/Message/hooks/useMessageBody.ts`, this hook is responsible for taking the message object and generating the final HTML string that will be rendered. It calls the `renderMessageBody` function.
*   **`renderMessageBody` Function:** This is where the heavy lifting of transforming the message text into renderable HTML occurs. It typically involves these steps:

    1.  **Markdown Parsing:**
        *   Rocket.Chat uses its own custom markdown parser, primarily found in `app/markdown/lib/markdown.ts`.
        *   The `RocketChat.Markdown.parse(message.msg)` function (or sometimes `message.html` if it's already pre-processed) takes the raw message text and converts it into an HTML string.
        *   This parser is highly configurable, with rules defined in `app/markdown/lib/parser/original/rules.ts` and the rendering logic in `app/markdown/lib/parser/original/render.ts`. It handles:
            *   Bold (`**text**`, `*text*`)
            *   Italic (`_text_`, `/text/`)
            *   Strikethrough (`~text~`)
            *   Code blocks (```code```) and inline code (`code`)
            *   Blockquotes (`> quote`)
            *   Lists (`- item`, `1. item`)
            *   Links (`[text](url)`)
            *   And more.

    2.  **Emoji Conversion:**
        *   After markdown parsing, the resulting HTML string is further processed to replace emoji shortcodes (e.g., `:smile:`) with actual `<img>` tags pointing to emoji assets.
        *   This is handled by `app/emoji/client/lib/emoji.ts` and its `RocketChat.Emoji.render` function, which supports both standard and custom emojis.

    3.  **Mentions, Channels, and Links Highlighting:**
        *   The `html` string is then processed to wrap `@username`, `#channelname`, and URLs with appropriate `<a>` tags.
        *   This leverages the `mentions`, `channels`, and `urls` arrays stored on the message object, ensuring that only valid entities are highlighted and linked correctly.
        *   These `<a>` tags often include specific CSS classes (e.g., `mention-link`, `channel-link`) for styling and event listeners for click actions (e.g., opening a user profile, navigating to a channel).

    4.  **Final HTML String:** The output of `renderMessageBody` is a complete HTML string, ready for display.

*   **React Rendering:**
    *   The `MessageBody` component receives this final HTML string.
    *   For performance and simplicity, Rocket.Chat often uses `dangerouslySetInnerHTML` to inject this HTML string directly into a `div` element within the React component.
    *   Example: `<div dangerouslySetInnerHTML={{ __html: finalHtmlString }} />`
    *   While `dangerouslySetInnerHTML` is generally discouraged due to XSS risks, it's used here because the HTML has already undergone extensive server-side and client-side sanitization and is generated from trusted sources (the markdown parser and emoji/mention processors).
    *   Any interactive elements (like attachments, reactions, action buttons) are rendered as separate, distinct React components alongside the main message body.

### Summary of the Flow:

1.  **Raw Text** (User Input)
2.  **Server-Side `parseMessage`** (`app/lib/server/functions/parseMessage.ts`)
    *   Sanitization
    *   Basic HTML (`html` field)
    *   Metadata extraction (`mentions`, `channels`, `urls`)
3.  **Database Storage** (`rocketchat_message` collection)
4.  **Client-Side Fetch** (Message object retrieved)
5.  **`Message/Body.tsx`** (`app/ui-message/client/components/Message/Body.tsx`)
6.  **`useMessageBody` hook** (`app/ui-message/client/components/Message/hooks/useMessageBody.ts`)
7.  **`renderMessageBody` function**
    *   **`RocketChat.Markdown.parse()`** (`app/markdown/lib/markdown.ts`) -> HTML string
    *   **`RocketChat.Emoji.render()`** (`app/emoji/client/lib/emoji.ts`) -> HTML string with `<img>` for emojis
    *   **Mentions/Channels/Links processing** -> HTML string with `<a>` tags
8.  **Final HTML String**
9.  **React Component** (`<div dangerouslySetInnerHTML={{ __html: finalHtmlString }} />`) -> **Rendered React Components**

This multi-stage process ensures that messages are securely stored, efficiently parsed, and beautifully rendered with all the rich text features Rocket.Chat users expect.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,585 |
| Model | gemini-2.5-flash |
| Tools | NONE |
