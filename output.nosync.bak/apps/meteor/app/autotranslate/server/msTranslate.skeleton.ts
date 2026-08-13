## File: apps/meteor/app/autotranslate/server/msTranslate.ts

```typescript
/**
 * @author Vigneshwaran Odayappan <vickyokrm@gmail.com>
 */

import type { IMessage, IProviderMetadata, ISupportedLanguage, ITranslationResult, MessageAttachment } from '@rocket.chat/core-typings';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import _ from 'underscore';

import { TranslationProviderRegistry, AutoTranslate } from './autotranslate';
import { msLogger } from './logger';
import { i18n } from '../../../server/lib/i18n';
import { settings } from '../../settings/server';

/**
 * Microsoft translation service provider class representation.
 * Encapsulates the service provider settings and information.
 * Provides languages supported by the service provider.
 * Resolves API call to service provider to resolve the translation request.
 * @class
 * @augments AutoTranslate
 */
class MsAutoTranslate extends AutoTranslate {
	apiKey: string;

	apiEndPointUrl: string;

	apiDetectText: string;

	apiGetLanguages: string;

	breakSentence: string;

	/**
	 * setup api reference to Microsoft translate to be used as message translation provider.
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
	 * Microsoft does not provide an endpoint yet to retrieve the supported languages.
	 * So each supported languages are explicitly maintained.
	 * @private implements super abstract method.
	 * @param {string} target
	 * @returns {object} code : value pair
	 */
	async getSupportedLanguages(target: string): Promise<ISupportedLanguage[]> {
        /* Implementation Hidden */
    }

	/**
	 * Re-use method for REST API consumption of MS translate.
	 * @private
	 * @param {object} message
	 * @param {object} targetLanguages
	 * @throws Communication Errors
	 * @returns {object} translations: Translated messages for each language
	 */
	async _translate(
		data: {
			Text: string;
		}[],
		targetLanguages: string[],
	): Promise<ITranslationResult> {
        /* Implementation Hidden */
    }

	/**
	 * Returns translated message for each target language.
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

// Register Microsoft translation provider to the registry.
TranslationProviderRegistry.registerProvider(new MsAutoTranslate());

```