## File: apps/meteor/app/autotranslate/server/deeplTranslate.ts

```typescript
/**
 * @author Vigneshwaran Odayappan <vickyokrm@gmail.com>
 */

import type { IMessage, MessageAttachment, IProviderMetadata, ITranslationResult, ISupportedLanguage } from '@rocket.chat/core-typings';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import _ from 'underscore';

import { TranslationProviderRegistry, AutoTranslate } from './autotranslate';
import { i18n } from '../../../server/lib/i18n';
import { SystemLogger } from '../../../server/lib/logger/system';
import { settings } from '../../settings/server';

const proApiEndpoint = 'https://api.deepl.com/v2/translate';
const freeApiEndpoint = 'https://api-free.deepl.com/v2/translate';

interface IDeepLTranslation {
	detected_source_language: string;
	text: string;
}

/**
 * DeepL translation service provider class representation.
 * Encapsulates the service provider settings and information.
 * Provides languages supported by the service provider.
 * Resolves API call to service provider to resolve the translation request.
 * @class
 * @augments AutoTranslate
 */
class DeeplAutoTranslate extends AutoTranslate {
	apiKey: string;

	apiEndPointUrl: string;

	private supportedLanguageEndpointUrl: string;

	/**
	 * setup api reference to deepl translate to be used as message translation provider.
	 * @constructor
	 */
	constructor() {
        /* Implementation Hidden */
    }

	/**
	 * Returns metadata information about the service provide
	 * @private implements super abstract method.
	 * @return {object}
	 */
	_getProviderMetadata(): IProviderMetadata {
        /* Implementation Hidden */
    }

	/**
	 * Returns necessary settings information about the translation service provider.
	 * @private implements super abstract method.
	 * @return {object}
	 */
	_getSettings(): IProviderMetadata['settings'] {
        /* Implementation Hidden */
    }

	/**
	 * Returns supported languages for translation by the active service provider.
	 * Deepl does not provide an endpoint yet to retrieve the supported languages.
	 * So each supported languages are explicitly maintained.
	 * @private implements super abstract method.
	 * @param {string} target
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
	 * @returns {object} translated messages for each target language
	 */
	async _translateAttachmentDescriptions(attachment: MessageAttachment, targetLanguages: string[]): Promise<ITranslationResult> {
        /* Implementation Hidden */
    }
}

// Register DeepL translation provider to the registry.
TranslationProviderRegistry.registerProvider(new DeeplAutoTranslate());

```