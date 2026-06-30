# How is a message rendered from raw text to React components in Rocket.Chat?

## Gemini Answer

The process of rendering a message from raw text to React components in Rocket.Chat's client-side involves several steps, primarily orchestrated by the `RoomMessageContent` and `GazzodownText` components.

**Call Chain:**

`RoomMessage` (apps/meteor/client/components/message/variants/RoomMessage.tsx)
  → `RoomMessageContent` (apps/meteor/client/components/message/variants/room/RoomMessageContent.tsx)
    → `MessageContentBody` (apps/meteor/client/components/message/MessageContentBody.tsx)
      → `GazzodownText` (apps/meteor/client/components/GazzodownText/GazzodownText.tsx)

**Rendering Process:**

1.  **`RoomMessage`**: This is a variant component for displaying messages within a room. It acts as an entry point, orchestrating the display of different message elements.

2.  **`RoomMessageContent`**: This component, found in `apps/meteor/client/components/message/variants/room/RoomMessageContent.tsx`, is responsible for rendering the main content of a room message. It uses various React hooks (e.g., `useChat`, `useMessageListReadReceipts`) to gather necessary context and data for rendering.

3.  **`MessageContentBody`**: Located in `apps/meteor/client/components/message/MessageContentBody.tsx`, this component likely serves as a wrapper or container for the actual text content of the message. It is here that the `GazzodownText` component is utilized.

4.  **`GazzodownText`**: This component, defined in `apps/meteor/client/components/GazzodownText/GazzodownText.tsx`, is crucial for converting raw message text into a format suitable for rendering as React components. It takes the `children` prop, which would be the raw message text, and applies several transformations and interactions:
    *   **Highlighting**: It processes `highlights` (e.g., search results) using `highlightRegex` to mark specific portions of the text.
    *   **Search Text Marking**: If `searchText` is provided, it uses `markRegex` to highlight occurrences of the search term within the message.
    *   **Emoji Conversion**: It checks user preferences for `convertAsciiEmoji` and `useEmoji` to determine if ASCII emoticons should be converted to graphical emojis.
    *   **Mentions (Users and Channels)**:
        *   It resolves user mentions using `resolveUserMention` and provides an `onUserMentionClick` handler to display user cards.
        *   It resolves channel mentions using `resolveChannelMention` and provides an `onChannelMentionClick` handler to navigate to the mentioned channel.
    *   **Markup Interaction Context**: It wraps its children with `MarkupInteractionContext.Provider`, passing down various props and functions (like `detectEmoji`, `highlightRegex`, `markRegex`, mention resolvers, and click handlers) to make them available to nested components for interactive rendering.

In essence, `GazzodownText` acts as an interpreter, taking the raw text and applying styling, interactions, and conversions based on user preferences and context, before rendering the final React components. The actual conversion of markup (like Markdown) into an Abstract Syntax Tree (AST) and then into block components is handled by the `packages/message-parser` and `packages/gazzodown` libraries, which are utilized by `GazzodownText` indirectly through its children and the `MarkupInteractionContext`.

## Tool Calls (8 calls, 48,588 tokens)

**Step 1:** `search({"layer":"client","query":"message rendering"})` → 245 tokens
**Step 2:** `search({"query":"Message body rendering","layer":"client"})` → 17 tokens
**Step 3:** `search({"query":"Message component","layer":"client"})` → 274 tokens
**Step 4:** `search({"query":"Message","layer":"client"})` → 993 tokens
**Step 5:** `graph({"direction":"down","query":"RoomMessage","layer":"client","file":"apps/meteor/client/components/mes)` → 517 tokens
**Step 6:** `search({"layer":"client","query":"MessageContent"})` → 336 tokens
**Step 7:** `graph({"query":"RoomMessageContent","file":"apps/meteor/client/components/message/variants/room/RoomMessag)` → 2132 tokens
**Step 8:** `implement({"filename":"apps/meteor/client/components/GazzodownText/GazzodownText.tsx","symbolName":"GazzodownT)` → 852 tokens
