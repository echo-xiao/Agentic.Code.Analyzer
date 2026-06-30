# How does the auto-translate feature work for messages in Rocket.Chat?

## Gemini Answer

The auto-translate feature in Rocket.Chat works by intercepting messages after they are saved, processing them through a chosen translation provider, and then storing the translated versions.

Here's the call chain and detailed explanation:

**Call Chain:**
`apps/meteor/client/startup/streamMessage/autotranslate.ts` (afterSaveMessage callback) → `AutoTranslate.translateMessage` (apps/meteor/app/autotranslate/server/autotranslate.ts) → `GoogleAutoTranslate._translateMessage` (apps/meteor/app/autotranslate/server/googleTranslate.ts)

**Detailed Steps:**

1.  **Client-side Initialization and Callback Registration:**
    *   The process begins in `apps/meteor/client/startup/streamMessage/autotranslate.ts`. This file registers an `afterSaveMessage` callback with a medium priority. This means that whenever a message is saved, this callback is triggered.

2.  **Translation Trigger and Provider Management:**
    *   When auto-translate is enabled for a specific room, the `afterSaveMessage` callback invokes the `translateMessage` method of the appropriate `AutoTranslate` provider.
    *   The `TranslationProviderRegistry` manages different translation services such as `GoogleAutoTranslate`, `MSTranslate`, and `DeepLTranslate`.

3.  **Base AutoTranslate Class (`apps/meteor/app/autotranslate/server/autotranslate.ts`):**
    *   The `AutoTranslate` class serves as the base for all translation providers. It defines the core logic for message preparation and post-processing.
    *   **Tokenization:** Before sending the message for translation, the `AutoTranslate` class uses methods like `tokenizeEmojis`, `tokenizeURLs`, `tokenizeCode`, and `tokenizeMentions` to replace special message elements with tokens. This prevents the translation service from altering or breaking these elements.
    *   **`translateMessage` Method:** This public method orchestrates the translation process. It takes the message, room, and target language as input. It calls the abstract `_translateMessage` method, which is implemented by concrete providers.
    *   **`deTokenize` Method:** After translation, this method is used to restore the original special elements from their tokens in the translated text.
    *   **Abstract Methods:** The `AutoTranslate` class defines abstract methods like `_getProviderMetadata()`, `getSupportedLanguages()`, `_translateMessage()`, and `_translateAttachmentDescriptions()`. These methods must be implemented by each specific translation provider.

4.  **Provider-Specific Translation (e.g., `GoogleAutoTranslate` in `apps/meteor/app/autotranslate/server/googleTranslate.ts`):**
    *   Concrete translation providers, such as `GoogleAutoTranslate`, extend the `AutoTranslate` base class and implement the abstract `_translateMessage` method.
    *   **External API Call:** Within `GoogleAutoTranslate._translateMessage`, an HTTP `fetch` request is made to the Google Translate API endpoint (`this.apiEndPointUrl`). The request includes the tokenized message content (`message.msg`), the API key (`this.apiKey`), and the target language.
    *   **Response Handling:** The response from the Google Translate API is parsed. The translated text is extracted from the API's response body.

5.  **Storing Translations and Notification:**
    *   The extracted translated text is then passed through the `deTokenize` method to restore any special elements.
    *   The final translated text is stored in the `message.translations` field of the message object.
    *   Finally, `notifyTranslatedMessage` is called to inform the client about the newly translated message, allowing the UI to update and display the translation.

## Tool Calls (6 calls, 49,953 tokens)

**Step 1:** `search({"query":"auto-translate"})` → 378 tokens
**Step 2:** `graph({"query":"autotranslate","file":"apps/meteor/client/startup/streamMessage/autotranslate.ts","directi)` → 3826 tokens
**Step 3:** `search({"query":"AutoTranslate","layer":"packages"})` → 520 tokens
**Step 4:** `implement({"filename":"apps/meteor/app/autotranslate/server/autotranslate.ts","symbolName":"AutoTranslate"})` → 432 tokens
**Step 5:** `search({"query":"GoogleAutoTranslate"})` → 208 tokens
**Step 6:** `implement({"filename":"apps/meteor/app/autotranslate/server/googleTranslate.ts","symbolName":"GoogleAutoTransl)` → 474 tokens

## Files Seen In Tool Results (22)

- `apps/meteor/tests/end-to-end/api/autotranslate.ts`
- `apps/meteor/app/autotranslate/server/permissions.ts`
- `apps/meteor/app/autotranslate/server/functions/getSupportedLanguages.ts`
- `apps/meteor/app/autotranslate/server/functions/saveSettings.ts`
- `apps/meteor/app/autotranslate/client/lib/autotranslate.ts`
- `apps/meteor/client/components/message/toolbar/useTranslateAction.ts`
- `apps/meteor/client/components/message/toolbar/useViewOriginalTranslationAction.ts`
- `apps/meteor/client/hooks/roomActions/useAutotranslateRoomAction.ts`
- `apps/meteor/client/startup/streamMessage/autotranslate.ts`
- `apps/meteor/client/views/room/contextualBar/AutoTranslate/AutoTranslate.tsx`
- `apps/meteor/app/autotranslate/server/autotranslate.ts`
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
