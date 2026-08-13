## File: apps/meteor/app/autotranslate/server/libreTranslate.ts

```typescript
import type { IMessage, MessageAttachment, IProviderMetadata, ITranslationResult, ISupportedLanguage } from '@rocket.chat/core-typings';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';

import { TranslationProviderRegistry, AutoTranslate } from './autotranslate';
import { libreLogger } from './logger';
import { i18n } from '../../../server/lib/i18n';
import { settings } from '../../settings/server';

interface ILibreTranslateLanguage {
	code: string;
	name: string;
	targets?: string[];
}

const REQUEST_TIMEOUT = 10000;

const toLanguageTag = (code: string): string => {
    /* Implementation Hidden */
};

/**
 * LibreTranslate translation service provider class representation.
 * @class
 * @augments AutoTranslate
 */
class LibreTranslateAutoTranslate extends AutoTranslate {
	apiKey: string;

	apiEndPointUrl: string;

	constructor() {
        /* Implementation Hidden */
    }

	_getProviderMetadata(): IProviderMetadata {
        /* Implementation Hidden */
    }

	_getSettings(): IProviderMetadata['settings'] {
        /* Implementation Hidden */
    }

	async getSupportedLanguages(target: string): Promise<ISupportedLanguage[]> {
        /* Implementation Hidden */
    }

	private resolveTargetLanguage(language: string, supportedLanguages: ISupportedLanguage[]): string {
        /* Implementation Hidden */
    }

	// `q` is sent as an array of lines; LibreTranslate returns `translatedText` as an array (one entry per line).
	private async _query(lines: string[], targetLanguage: string): Promise<string | null> {
        /* Implementation Hidden */
    }

	async _translateMessage(message: IMessage, targetLanguages: string[]): Promise<ITranslationResult> {
        /* Implementation Hidden */
    }

	async _translateAttachmentDescriptions(attachment: MessageAttachment, targetLanguages: string[]): Promise<ITranslationResult> {
        /* Implementation Hidden */
    }
}

TranslationProviderRegistry.registerProvider(new LibreTranslateAutoTranslate());

```