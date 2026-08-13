## File: apps/meteor/app/autotranslate/server/googleTranslate.ts

```typescript
/**
 * @author Vigneshwaran Odayappan <vickyokrm@gmail.com>
 */

import type { IMessage, IProviderMetadata, ISupportedLanguage, ITranslationResult, MessageAttachment } from '@rocket.chat/core-typings';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import _ from 'underscore';

import { AutoTranslate, TranslationProviderRegistry } from './autotranslate';
import { i18n } from '../../../server/lib/i18n';
import { SystemLogger } from '../../../server/lib/logger/system';
import { settings } from '../../settings/server';

interface IGoogleTranslation {
	translatedText: string;
}

/**
 * Represents google translate class
 * @class
 * @augments AutoTranslate
 */

class GoogleAutoTranslate extends AutoTranslate {
	apiKey: string;

	apiEndPointUrl: string;

	/**
	 * setup api reference to Google translate to be used as message translation provider.
	 * @constructor
	 */
	constructor() {
        /* Implementation Hidden */
    }

	/**
	 * Returns metadata information about the service provider
	 * @private implements super abstract method.
	 * @returns {object}
	 */
	_getProviderMetadata(): IProviderMetadata {
        /* Implementation Hidden */
    }

	/**
	 * Returns necessary settings information about the translation service provider.
	 * @private implements super abstract method.
	 * @returns {object}
	 */
	_getSettings(): IProviderMetadata['settings'] {
        /* Implementation Hidden */
    }

	/**
	 * Returns supported languages for translation by the active service provider.
	 * Google Translate api provides the list of supported languages.
	 * @private implements super abstract method.
	 * @param {string} target : user language setting or 'en'
	 * @returns {object} code : value pair
	 */
	async getSupportedLanguages(target: string): Promise<ISupportedLanguage[]> {
        /* Implementation Hidden */
    }

	/**
	 * Send Request REST API call to the service provider.
	 * Returns translated message for each target language in target languages.
	 * @private
	 * @param {object} message
	 * @param {object} targetLanguages
	 * @returns {object} translations: Translated messages for each language
	 */
	async _translateMessage(message: IMessage, targetLanguages: string[]): Promise<ITranslationResult> {
        /* Implementation Hidden */
    }

	/**
	 * Returns translated message attachment description in target languages.
	 * @private
	 * @param {object} attachment
	 * @param {object} targetLanguages
	 * @returns {object} translated attachment descriptions for each target language
	 */
	async _translateAttachmentDescriptions(attachment: MessageAttachment, targetLanguages: string[]): Promise<ITranslationResult> {
        /* Implementation Hidden */
    }
}

// Register Google translation provider.
TranslationProviderRegistry.registerProvider(new GoogleAutoTranslate());

```