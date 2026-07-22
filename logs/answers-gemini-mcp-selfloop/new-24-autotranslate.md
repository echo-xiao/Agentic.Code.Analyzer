# How does the auto-translate feature work for messages in Rocket.Chat?

## Plan

intent: architecture

## Gemini Answer

The auto-translate feature in Rocket.Chat works by integrating with external translation service providers (like Microsoft, DeepL, or Google) through a modular server-side architecture, with client-side components managing the display and user settings.

Here's a breakdown of the flow and key components:

**1. Configuration (Server-side)**
*   **`apps/meteor/app/autotranslate/server/autotranslate.ts`**: This file defines the abstract `AutoTranslate` base class, which outlines the core translation logic and the interface that all translation providers must implement.
*   **Provider Implementations**: Specific translation services extend the `AutoTranslate` class. For example:
    *   **`apps/meteor/app/autotranslate/server/msTranslate.ts`**: Implements the Microsoft Translator service. It manages the Microsoft API key and endpoint URLs, and handles the actual translation requests to the Microsoft Translator API.
    *   Similar files exist for DeepL (`apps/meteor/app/autotranslate/server/deeplTranslate.ts`) and Google Translate (`apps/meteor/app/autotranslate/server/googleTranslate.ts`).
*   **Settings**: Administrators configure auto-translate settings, including enabling the feature (`AutoTranslate_Enabled`) and selecting a translation provider along with their respective API keys. These settings are dynamically watched by the `AutoTranslate` implementations.

**2. Client-side Detection and Display (`apps/meteor/client/views/room/MessageList/hooks/useAutoTranslate.ts`)**
*   The `useAutoTranslate` React hook is responsible for determining if auto-translation should be active for a given room (subscription).
*   It checks the global `AutoTranslate_Enabled` setting and the room-specific `subscription.autoTranslateLanguage` and `subscription.autoTranslate` flags.
*   It retrieves the target translation language for the room using `AutoTranslate.getLanguage(subscription.rid)`.
*   The `showAutoTranslate` function within this hook determines if an individual message should be displayed with auto-translation. This check ensures that:
    *   Auto-translate is enabled for the room.
    *   The message is not from the current user.
    *   The message does not have an inverse translation flag.
    *   The message (or its attachments) contains content in a language that can be translated to the target language.

**3. Server-side Translation Process**
*   When a message needs to be translated (e.g., an incoming message in a room where auto-translate is enabled for the recipient), a server-side function (often triggered by a client request or a message hook) initiates the translation.
*   **Tokenization**: The `AutoTranslate.tokenize` method is called to protect specific message elements (like emojis, URLs, code blocks, and user mentions) from being translated by the external API. This ensures that these elements remain in their original form.
*   **Provider Translation**: The `AutoTranslate.translateMessage` method then calls the `_translateMessage` method of the *currently configured* translation provider (e.g., `MsAutoTranslate._translateMessage`). This method makes the actual API call to the external translation service.
*   **De-tokenization**: After receiving the translated text from the external service, the `AutoTranslate.deTokenize` method restores the original protected elements into the translated message.
*   **Notification**: The server then notifies the client about the translated message, which is then displayed in the chat interface.

**Flow Chain:**

1.  **Configuration**: Admin sets `AutoTranslate_Enabled` and chooses a provider (e.g., Microsoft) and its API key.
2.  **Client-side Check**: `apps/meteor/client/views/room/MessageList/hooks/useAutoTranslate.ts` determines if auto-translate is active for a room and for a specific message.
3.  **Server-side Trigger**: A message requiring translation triggers a call to `AutoTranslate.translateMessage`.
4.  **Tokenization**: `AutoTranslate.tokenize` (in `apps/meteor/app/autotranslate/server/autotranslate.ts`) protects message elements.
5.  **External API Call**: The chosen provider's `_translateMessage` method (e.g., `MsAutoTranslate._translateMessage` in `apps/meteor/app/autotranslate/server/msTranslate.ts`) calls the external translation service.
6.  **De-tokenization**: `AutoTranslate.deTokenize` restores protected elements to the translated message.
7.  **Display**: The translated message is sent back to the client and displayed.

This architecture allows Rocket.Chat to offer flexible auto-translation by abstracting the translation logic and allowing different providers to be plugged in.

## Tool Calls (6 calls, 26,529 tokens)

**Step 1:** `plan({"question":"How does the auto-translate feature work for messages in Rocket.Chat?","intent":"architecture"})` → 3963 tokens
**Step 2:** `search({"query":"AutoTranslate","layer":"server"})` → 454 tokens
**Step 3:** `graph({"file":"autotranslate.ts","move":"expand","depth":2,"query":"AutoTranslate"})` → 322 tokens
**Step 4:** `details({"filename":"autotranslate.ts","symbolName":"AutoTranslate"})` → 427 tokens
**Step 5:** `details({"filename":"msTranslate.ts","symbolName":"MsAutoTranslate"})` → 309 tokens
**Step 6:** `details({"filename":"useAutoTranslate.ts","symbolName":"useAutoTranslate"})` → 384 tokens

## Files Seen In Tool Results (51)

- `apps/meteor/client/views/omnichannel/components/AutoCompleteDepartment.tsx`
- `apps/meteor/app/autotranslate/server/msTranslate.ts`
- `apps/meteor/app/autotranslate/server/deeplTranslate.ts`
- `apps/meteor/server/features/EmailInbox/EmailInbox.ts`
- `packages/core-typings/src/IEmailInbox.ts`
- `packages/models/src/models/EmailInbox.ts`
- `apps/meteor/server/features/EmailInbox/logger.ts`
- `apps/meteor/client/views/omnichannel/triggers/EditTrigger.tsx`
- `apps/meteor/client/views/omnichannel/webhooks/WebhooksPage.tsx`
- `apps/meteor/app/apps/server/bridges/messages.ts`
- `apps/meteor/server/services/messages/service.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `packages/apps-engine/src/server/accessors/MessageRead.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/modify/ModifyUpdater.ts`
- `apps/meteor/app/apps/server/converters/messages.js`
- `ee/packages/federation-matrix/src/helpers/message.parsers.ts`
- `ee/packages/federation-matrix/src/events/message.ts`
- `apps/meteor/app/irc/server/irc-bridge/peerHandlers/sentMessage.js`
- `packages/ddp-client/src/legacy/RocketchatSDKLegacy.ts`
- `apps/meteor/app/lib/client/methods/sendMessage.ts`
- `packages/apps-engine/src/definition/messages/IMessage.ts`
- `apps/meteor/app/lib/server/functions/processWebhookMessage.ts`
- `apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/forms/MessageForm/MessageForm.tsx`
- `apps/meteor/server/features/EmailInbox/EmailInbox_Outgoing.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/extenders/MessageExtender.ts`
- `apps/meteor/app/ui-utils/client/lib/messageBox.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/modify/ModifyCreator.ts`
- `apps/meteor/app/apps/server/converters/settings.js`
- `packages/apps-engine/src/server/accessors/ModifyUpdater.ts`
- `apps/meteor/app/lib/server/lib/processDirectEmail.ts`
- `apps/meteor/app/livechat/server/lib/messages.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/notifier.ts`
- `apps/meteor/app/autotranslate/server/autotranslate.ts`
- `apps/meteor/server/lib/getSubscriptionAutotranslateDefaultConfig.ts`
- `apps/meteor/app/autotranslate/server/permissions.ts`
- `apps/meteor/app/autotranslate/server/logger.ts`
- `apps/meteor/app/autotranslate/server/index.ts`
- `apps/meteor/app/autotranslate/server/googleTranslate.ts`
- `apps/meteor/app/autotranslate/server/methods/translateMessage.ts`
- `apps/meteor/app/autotranslate/server/methods/saveSettings.ts`
- `apps/meteor/app/autotranslate/server/methods/getSupportedLanguages.ts`
- `apps/meteor/app/autotranslate/server/methods/getProviderUiMetadata.ts`
- `apps/meteor/app/autotranslate/server/functions/translateMessage.ts`
- `apps/meteor/app/autotranslate/server/functions/saveSettings.ts`
- `apps/meteor/app/autotranslate/server/functions/getSupportedLanguages.ts`
- `apps/meteor/app/api/server/v1/autotranslate.ts`
- `apps/meteor/client/views/room/MessageList/hooks/useAutoTranslate.ts`
- `apps/meteor/app/autotranslate/client/lib/autotranslate.ts`
- `apps/meteor/client/views/room/contextualBar/AutoTranslate/AutoTranslateWithData.tsx`
- `apps/meteor/client/views/room/contextualBar/AutoTranslate/AutoTranslate.tsx`
- `apps/meteor/client/views/room/MessageList/lib/autoTranslate.ts`
