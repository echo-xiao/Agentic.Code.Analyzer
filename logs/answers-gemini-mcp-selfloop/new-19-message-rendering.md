# How is a message rendered from raw text to React components in Rocket.Chat?

## Gemini Answer

The process of rendering a message from raw text to React components in Rocket.Chat involves several steps, primarily handled by the UI Kit and Markdown processing.

The initial search for "render message" pointed to several potential entry points, with `createMarkdownMessageRenderer` in `apps/meteor/app/markdown/lib/markdown.js` and `renderMessageBlocks` in `packages/livechat/src/components/uiKit/message/index.tsx` being relevant.

Tracing `createMarkdownMessageRenderer` showed its involvement in markdown processing, utilizing various string utility functions and potentially interacting with `markedParser`. However, `markedParser` itself was not found as a direct symbol in the `markdown.js` file.

Further investigation into `renderMessageBlocks` revealed that it uses `uiKitMessage` from `packages/ui-kit/src/surfaces/message/uiKitMessage.ts`. This `uiKitMessage` function likely acts as a central point for rendering UI Kit message blocks.

The `FuselageMessageSurfaceRenderer` in `packages/fuselage-ui-kit/src/surfaces/FuselageMessageSurfaceRenderer.tsx` is a key component in this rendering process. It extends `FuselageSurfaceRenderer` and overrides methods like `plain_text` and `mrkdwn` to use `renderTextObject`. This indicates that `FuselageMessageSurfaceRenderer` is responsible for taking the parsed markdown or plain text and converting it into Fuselage (Rocket.Chat's design system) React components.

The `renderTextObject` function, located in `packages/ui-kit/src/rendering/renderTextObject.ts`, is a higher-order function that takes renderers and a context, then returns a function to render a `TextObject`. It uses `getTextObjectRenderer` to select the appropriate renderer based on the text object's type (e.g., `plain_text`, `mrkdwn`) and then calls that renderer to produce the final React component.

Therefore, the call chain for rendering a message from raw text to React components is:

**Entry → Markdown Processing → UI Kit Message Rendering → Fuselage Surface Rendering → Text Object Rendering → React Components**

1.  **`apps/meteor/app/markdown/lib/markdown.js`**: `createMarkdownMessageRenderer` is involved in processing the raw text, likely converting it into a structured format.
2.  **`packages/livechat/src/components/uiKit/message/index.tsx`**: `renderMessageBlocks` is a key function that initiates the rendering of message blocks.
3.  **`packages/ui-kit/src/surfaces/message/uiKitMessage.ts`**: `uiKitMessage` is used by `renderMessageBlocks` to handle the overall UI Kit message rendering.
4.  **`packages/fuselage-ui-kit/src/surfaces/FuselageMessageSurfaceRenderer.tsx`**: `FuselageMessageSurfaceRenderer` is responsible for rendering the message surface using Fuselage components. It specifically handles `plain_text` and `mrkdwn` content.
5.  **`packages/ui-kit/src/rendering/renderTextObject.ts`**: `renderTextObject` is used by `FuselageMessageSurfaceRenderer` to render individual text objects within the message, selecting the appropriate renderer based on the text object's type and ultimately producing the React components.

## Tool Calls (8 calls, 37,996 tokens)

**Step 1:** `search({"query":"render message","layer":"client"})` → 475 tokens
**Step 2:** `graph({"file":"apps/meteor/app/markdown/lib/markdown.js","direction":"down","query":"createMarkdownMessage)` → 993 tokens
**Step 3:** `implement({"filename":"apps/meteor/app/markdown/lib/markdown.js","symbolName":"markedParser"})` → 16 tokens
**Step 4:** `graph({"query":"renderMessageBlocks","file":"packages/livechat/src/components/uiKit/message/index.tsx","di)` → 68 tokens
**Step 5:** `graph({"direction":"down","file":"packages/livechat/src/lib/uiKitMessage.ts","query":"uiKitMessage"})` → 47 tokens
**Step 6:** `graph({"direction":"down","query":"FuselageMessageSurfaceRenderer","file":"packages/fuselage-ui-kit/src/su)` → 54 tokens
**Step 7:** `implement({"filename":"packages/fuselage-ui-kit/src/surfaces/FuselageMessageSurfaceRenderer.tsx","symbolName":)` → 188 tokens
**Step 8:** `implement({"filename":"packages/fuselage-ui-kit/src/surfaces/FuselageMessageSurfaceRenderer.tsx","symbolName":)` → 123 tokens

## Files Seen In Tool Results (16)

- `apps/meteor/app/autotranslate/client/lib/autotranslate.ts`
- `apps/meteor/client/lib/utils/renderMessageEmoji.ts`
- `apps/meteor/client/components/message/toolbar/items/actions/ReplyInThreadMessageAction.tsx`
- `packages/livechat/src/helpers/canRenderMessage.ts`
- `apps/meteor/app/markdown/lib/markdown.js`
- `apps/meteor/ee/server/lib/message-read-receipt/ReadReceipt.ts`
- `packages/livechat/src/components/uiKit/message/index.tsx`
- `packages/models/src/models/Reports.ts`
- `packages/fuselage-ui-kit/src/surfaces/FuselageMessageSurfaceRenderer.tsx`
- `packages/models/src/models/Messages.ts`
- `packages/models/src/models/Users.ts`
- `apps/meteor/client/views/room/MessageList/lib/autoTranslate.ts`
- `apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/steps/RepliesStep.spec.tsx`
- `apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/steps/MessageStep.spec.tsx`
- `packages/ui-kit/src/surfaces/message/uiKitMessage.ts`
- `packages/ui-kit/src/rendering/renderTextObject.ts`
