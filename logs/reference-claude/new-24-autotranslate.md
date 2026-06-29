# How does auto-translate work?

## Answer

Auto-translation in Rocket.Chat uses a provider registry pattern. `TranslationProviderRegistry` manages available translation providers, and the abstract `AutoTranslate` class defines the interface. Concrete providers (Google, Microsoft, DeepL) implement the translation logic. Translation hooks into the `afterSaveMessage` callback pipeline.

### 1. TranslationProviderRegistry

**`apps/meteor/app/autotranslate/server/autotranslate.ts`, line 30:**
```ts
export class TranslationProviderRegistry {
    static [Providers]: { [k: string]: AutoTranslate } = {};
    static enabled = false;
    static [Provider]: string | null = null;
```

Uses Symbol-keyed properties (`Providers` and `Provider`) for private static storage.

Key static methods:

**`registerProvider(provider)` (line 41):**
Gets metadata via `provider._getProviderMetadata()` and stores by name in `[Providers]`.

**`getActiveProvider()` (line 55):**
Returns the currently active provider instance, or `null` if disabled.

**`setCurrentProvider(provider)` (line 88):**
Sets the active provider name and calls `registerCallbacks()` to update the `afterSaveMessage` hook.

**`setEnable(enabled)` (line 98):**
Enables/disables the entire auto-translation system.

**`translateMessage(message, room, targetLanguage?)` (line 71):**
Delegates to the active provider's `translateMessage()` method.

**`registerCallbacks()` (line 104):**
```ts
static registerCallbacks(): void {
    if (!TranslationProviderRegistry.enabled) {
        callbacks.remove('afterSaveMessage', 'autotranslate');
        return;
    }
    const provider = TranslationProviderRegistry.getActiveProvider();
    if (!provider) { return; }
    callbacks.add(
        'afterSaveMessage',
        (message, { room }) => provider.translateMessage(message, { room }),
        callbacks.priority.MEDIUM,
        'autotranslate',
    );
}
```

This is the critical integration point -- registers/removes an `afterSaveMessage` callback that translates every message in enabled rooms.

### 2. AutoTranslate (Abstract Base Class)

**Same file, line 131:**
```ts
export abstract class AutoTranslate {
    name: string;
    languages: string[];
    supportedLanguages: { [language: string]: ISupportedLanguage[] };
```

Provides common functionality:

**Tokenization (lines 155-163):**
```ts
tokenize(message: IMessage): IMessage {
    message.tokens = [];
    message = this.tokenizeEmojis(message);
    message = this.tokenizeCode(message);
    message = this.tokenizeURLs(message);
    message = this.tokenizeMentions(message);
    return message;
}
```

Before translation, non-translatable content is replaced with tokens:
- `tokenizeEmojis()` -- replaces `:emoji:` with `<i class=notranslate>{N}</i>` tokens
- `tokenizeURLs()` -- replaces URLs and markdown links
- `tokenizeCode()` -- replaces inline/block code
- `tokenizeMentions()` -- replaces @mentions

After translation, `deTokenize()` restores the original content.

**`translateMessage(message, { room, targetLanguage? })`:** Abstract method implemented by each provider. The base class provides helpers for:
- Checking if room has auto-translate enabled
- Getting target language from user subscription preferences
- Handling attachment translation
- Storing translations in `message.translations`

**`_getProviderMetadata()`:** Returns `{ name: string }` identifying the provider.

**`getSupportedLanguages(target)`:** Returns available language pairs.

### 3. Google Translate Provider

**`apps/meteor/app/autotranslate/server/googleTranslate.ts`, line 24:**
```ts
class GoogleAutoTranslate extends AutoTranslate {
    apiKey: string;
    apiEndPointUrl: string;

    constructor() {
        super();
        this.name = 'google-translate';
        this.apiEndPointUrl = 'https://translation.googleapis.com/language/translate/v2';
        settings.watch<string>('AutoTranslate_GoogleAPIKey', (value) => {
            this.apiKey = value;
        });
    }

    _getProviderMetadata(): IProviderMetadata {
        return { name: this.name, displayName: 'Google Translate', ... };
    }
```

Uses Google Cloud Translation API v2. Registered at module load time via:
```ts
TranslationProviderRegistry.registerProvider(new GoogleAutoTranslate());
```

### 4. Microsoft Translate Provider

**`apps/meteor/app/autotranslate/server/msTranslate.ts`, line 22:**
```ts
class MsAutoTranslate extends AutoTranslate {
    constructor() {
        super();
        this.name = 'microsoft-translate';
        this.apiEndPointUrl = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0';
        this.apiDetectText = 'https://api.cognitive.microsofttranslator.com/detect?api-version=3.0';
        this.apiGetLanguages = 'https://api.cognitive.microsofttranslator.com/languages?api-version=3.0';
        this.breakSentence = 'https://api.cognitive.microsofttranslator.com/breaksentence?api-version=3.0';
        settings.watch<string>('AutoTranslate_MicrosoftAPIKey', (value) => {
            this.apiKey = value;
        });
    }
```

Uses Microsoft Cognitive Services Translator API v3. Supports additional features like language detection and sentence breaking.

### 5. DeepL Translate Provider

**`apps/meteor/app/autotranslate/server/deeplTranslate.ts`, line 30:**
```ts
class DeeplAutoTranslate extends AutoTranslate {
```

Uses DeepL Translation API. Supports both Pro (`api.deepl.com`) and Free (`api-free.deepl.com`) endpoints.

### 6. Room-Level Configuration

Auto-translation is enabled per-room and per-user:
- Room setting: `autoTranslate` flag on the room document
- User preference: `autoTranslateLanguage` on the user's subscription to that room
- The subscription-level config is computed by `getSubscriptionAutotranslateDefaultConfig()` during room join

### 7. Translation Flow

1. User sends a message in a room with auto-translate enabled
2. Message is saved to DB via `sendMessage()`
3. `afterSaveMessage()` runs all callbacks
4. The `'autotranslate'` callback invokes `provider.translateMessage(message, { room })`
5. Provider tokenizes the message (preserving emojis, code, URLs, mentions)
6. Provider calls external API with the translatable text
7. Provider detokenizes the result
8. Translations are stored in `message.translations` field (keyed by language code)
9. Clients display the appropriate translation based on user preference

### Key Files
| File | Role |
|------|------|
| `apps/meteor/app/autotranslate/server/autotranslate.ts` | `TranslationProviderRegistry` and `AutoTranslate` abstract class |
| `apps/meteor/app/autotranslate/server/googleTranslate.ts` | Google Translate provider implementation |
| `apps/meteor/app/autotranslate/server/msTranslate.ts` | Microsoft Translate provider implementation |
| `apps/meteor/app/autotranslate/server/deeplTranslate.ts` | DeepL Translate provider implementation |
| `apps/meteor/app/autotranslate/server/index.ts` | Module initialization, registers providers |
| `apps/meteor/app/autotranslate/server/functions/translateMessage.ts` | Translation function helpers |
| `apps/meteor/app/autotranslate/server/functions/getSupportedLanguages.ts` | Language list retrieval |
| `apps/meteor/app/autotranslate/server/methods/getProviderUiMetadata.ts` | Provider UI metadata for admin |

### Key Symbols
- `TranslationProviderRegistry` -- static class managing provider lifecycle and callbacks
- `TranslationProviderRegistry.registerProvider(provider)` -- registers a provider
- `TranslationProviderRegistry.getActiveProvider()` -- returns current active provider
- `TranslationProviderRegistry.setCurrentProvider(name)` -- switches active provider
- `TranslationProviderRegistry.registerCallbacks()` -- manages afterSaveMessage hook
- `AutoTranslate` -- abstract base class with tokenization/detokenization
- `AutoTranslate.tokenize(message)` -- replaces non-translatable content with tokens
- `AutoTranslate.translateMessage(message, options)` -- provider-specific translation
- `GoogleAutoTranslate` -- Google Cloud Translation API v2 provider
- `MsAutoTranslate` -- Microsoft Cognitive Services Translator provider
- `DeeplAutoTranslate` -- DeepL Translation API provider
