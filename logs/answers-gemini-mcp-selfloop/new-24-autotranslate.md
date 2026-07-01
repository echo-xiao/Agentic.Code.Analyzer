# How does the auto-translate feature work for messages in Rocket.Chat?

## Gemini Answer

The auto-translate feature in Rocket.Chat works by intercepting messages after they are saved and, if enabled for the room, sending them to an external translation service. The translated content is then stored alongside the original message.

Here's the detailed call chain and the key files involved:

**Call Chain:**

1.  **Entry Point (`apps/meteor/client/startup/streamMessage/autotranslate.ts`)**: This client-side script initializes the auto-translate functionality. It registers an `afterSaveMessage` callback, which is triggered whenever a message is saved.
2.  **Translation Trigger (`AutoTranslate.translateMessage` in `apps/meteor/app/autotranslate/server/autotranslate.ts`)**: If auto-translate is enabled for the specific room, the `afterSaveMessage` callback invokes the `translateMessage` method of the appropriate `AutoTranslate` provider. Before sending the message for translation, this method performs **tokenization** to replace elements like emojis, URLs, code snippets, and mentions with placeholders to prevent them from being altered by the translation service.
3.  **External Translation (`GoogleAutoTranslate._translateMessage` in `apps/meteor/app/autotranslate/server/googleTranslate.ts` - or similar for other providers)**: The `translateMessage` method then calls the abstract `_translateMessage` method, which is implemented by specific translation providers (e.g., `GoogleAutoTranslate`, `MsAutoTranslate`, `DeeplAutoTranslate`). This method is responsible for making an API call to the respective external translation service (e.g., Google Translate API), sending the tokenized message content, and receiving the translated text.
4.  **Post-Translation Processing (`AutoTranslate.deTokenize` in `apps/meteor/app/autotranslate/server/autotranslate.ts`)**: After the translation service returns the translated text, the `deTokenize` method is called. This method replaces the placeholders back with their original content (emojis, URLs, etc.) in the translated message.
5.  **Storage**: Finally, the translated message is stored in the `message.translations` field within the message object.

**Key Files:**

*   `apps/meteor/client/startup/streamMessage/autotranslate.ts`: The client-side startup file that registers the `afterSaveMessage` callback, initiating the translation process.
*   `apps/meteor/app/autotranslate/server/autotranslate.ts`: This file defines the abstract `AutoTranslate` base class, which includes the core logic for `translateMessage`, `tokenize`, and `deTokenize`. It also declares the abstract `_translateMessage` method that concrete providers must implement. This file also contains the `TranslationProviderRegistry` which manages the different translation providers.
*   `apps/meteor/app/autotranslate/server/googleTranslate.ts`: An example of a concrete translation provider. It implements the `GoogleAutoTranslate` class and its `_translateMessage` method, which handles the communication with the Google Translate API.
*   `apps/meteor/app/autotranslate/server/msTranslate.ts`: Another concrete implementation for the Microsoft Translate service.
*   `apps/meteor/app/autotranslate/server/deeplTranslate.ts`: Another concrete implementation for the DeepL Translate service.

## Tool Calls (7 calls, 57,247 tokens)

**Step 1:** `search({"query":"auto-translate"})` → 378 tokens
**Step 2:** `graph({"file":"apps/meteor/client/startup/streamMessage/autotranslate.ts","query":"autotranslate","directi)` → 3599 tokens
**Step 3:** `search({"query":"TranslationProviderRegistry"})` → 174 tokens
**Step 4:** `graph({"query":"TranslationProviderRegistry","file":"apps/meteor/app/autotranslate/server/autotranslate.ts)` → 149 tokens
**Step 5:** `search({"query":"AutoTranslate"})` → 797 tokens
**Step 6:** `implement({"symbolName":"AutoTranslate","filename":"apps/meteor/app/autotranslate/server/autotranslate.ts"})` → 432 tokens
**Step 7:** `implement({"filename":"apps/meteor/app/autotranslate/server/googleTranslate.ts","symbolName":"GoogleAutoTransl)` → 474 tokens

## Files Seen In Tool Results (29)

- `apps/meteor/tests/end-to-end/api/autotranslate.ts`
- `apps/meteor/app/autotranslate/server/permissions.ts`
- `apps/meteor/app/autotranslate/server/functions/getSupportedLanguages.ts`
- `apps/meteor/app/autotranslate/server/functions/saveSettings.ts`
- `apps/meteor/app/autotranslate/client/lib/autotranslate.ts`
- `apps/meteor/client/components/message/toolbar/useTranslateAction.ts`
- `apps/meteor/client/components/message/toolbar/useViewOriginalTranslationAction.ts`
- `apps/meteor/client/hooks/roomActions/useAutotranslateRoomAction.ts`
- `apps/meteor/client/startup/streamMessage/autotranslate.ts`
- `apps/meteor/app/autotranslate/server/autotranslate.ts`
- `apps/meteor/client/views/room/contextualBar/AutoTranslate/AutoTranslate.tsx`
- `apps/meteor/client/views/room/MessageList/hooks/useAutoTranslate.ts`
- `apps/meteor/client/views/room/contextualBar/AutoTranslate/AutoTranslate.stories.tsx`
- `apps/meteor/client/views/room/contextualBar/AutoTranslate/AutoTranslateWithData.tsx`
- `apps/meteor/app/autotranslate/server/msTranslate.ts`
- `apps/meteor/app/autotranslate/server/deeplTranslate.ts`
- `apps/meteor/app/autotranslate/server/googleTranslate.ts`
- `packages/models/src/models/Subscriptions.ts`
- `packages/rest-typings/src/v1/autoTranslate.ts`
- `packages/rest-typings/src/v1/autotranslate/AutotranslateSaveSettingsParamsPOST.ts`
- `packages/rest-typings/src/v1/autotranslate/AutotranslateGetSupportedLanguagesParamsGET.ts`
- `packages/core-typings/src/autoTranslate.ts`
- `apps/meteor/server/lib/getSubscriptionAutotranslateDefaultConfig.ts`
- `apps/meteor/client/views/room/contextualBar/AutoTranslate/index.ts`
- `apps/meteor/client/views/room/MessageList/lib/autoTranslate.ts`
- `apps/meteor/app/autotranslate/server/logger.ts`
- `apps/meteor/app/autotranslate/server/index.ts`
- `apps/meteor/app/autotranslate/server/methods/translateMessage.ts`
- `apps/meteor/app/autotranslate/server/methods/saveSettings.ts`
