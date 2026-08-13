## File: apps/meteor/app/autotranslate/server/autotranslate.ts

```typescript
import type {
	IMessage,
	IRoom,
	MessageAttachment,
	IProviderMetadata,
	ISupportedLanguage,
	ITranslationResult,
} from '@rocket.chat/core-typings';
import { Logger } from '@rocket.chat/logger';
import { Messages, Subscriptions } from '@rocket.chat/models';
import { escapeHTML } from '@rocket.chat/string-helpers';
import { isTruthy } from '@rocket.chat/tools';
import { Meteor } from 'meteor/meteor';
import _ from 'underscore';

import { callbacks } from '../../../server/lib/callbacks';
import { notifyOnMessageChange } from '../../lib/server/lib/notifyListener';
import { Markdown } from '../../markdown/server';
import { settings } from '../../settings/server';

const translationLogger = new Logger('AutoTranslate');

const Providers = Symbol('Providers');
const Provider = Symbol('Provider');

/**
 * This class allows translation providers to
 * register,load and also returns the active provider.
 */
export class TranslationProviderRegistry {
	static [Providers]: { [k: string]: AutoTranslate } = {};

	static enabled = false;

	static [Provider]: string | null = null;

	/**
	 * Registers the translation provider into the registry.
	 * @param {*} provider
	 */
	static registerProvider(provider: AutoTranslate): void {
        /* Implementation Hidden */
    }

	/**
	 * Return the active Translation provider
	 */
	static getActiveProvider(): AutoTranslate | null {
        /* Implementation Hidden */
    }

	static async getSupportedLanguages(target: string): Promise<ISupportedLanguage[] | undefined> {
        /* Implementation Hidden */
    }

	static async translateMessage(message: IMessage, room: IRoom, targetLanguage?: string): Promise<IMessage | null> {
        /* Implementation Hidden */
    }

	static getProviders(): AutoTranslate[] {
        /* Implementation Hidden */
    }

	static setCurrentProvider(provider: string): void {
        /* Implementation Hidden */
    }

	static setEnable(enabled: boolean): void {
        /* Implementation Hidden */
    }

	static registerCallbacks(): void {
        /* Implementation Hidden */
    }
}

/**
 * Generic auto translate base implementation.
 * This class provides generic parts of implementation for
 * tokenization, detokenization, call back register and unregister.
 * @abstract
 * @class
 */
export abstract class AutoTranslate {
	name: string;

	languages: string[];

	supportedLanguages: {
		[language: string]: ISupportedLanguage[];
	};

	/**
	 * Encapsulate the api key and provider settings.
	 * @constructor
	 */
	constructor() {
        /* Implementation Hidden */
    }

	/**
	 * Extracts non-translatable parts of a message
	 * @param {object} message
	 * @return {object} message
	 */
	tokenize(message: IMessage): IMessage {
        /* Implementation Hidden */
    }

	tokenizeEmojis(message: IMessage): IMessage {
        /* Implementation Hidden */
    }

	tokenizeURLs(message: IMessage): IMessage {
        /* Implementation Hidden */
    }

	tokenizeCode(message: IMessage): IMessage {
        /* Implementation Hidden */
    }

	tokenizeMentions(message: IMessage): IMessage {
        /* Implementation Hidden */
    }

	deTokenize(message: IMessage): string {
        /* Implementation Hidden */
    }

	/**
	 * Triggers the translation of the prepared (tokenized) message
	 * and persists the result
	 * @public
	 * @param {object} message
	 * @param {object} room
	 * @param {object} targetLanguage
	 * @returns {object} unmodified message object.
	 */
	async translateMessage(message: IMessage, { room, targetLanguage }: { room: IRoom; targetLanguage?: string }): Promise<IMessage | null> {
        /* Implementation Hidden */
    }

	private notifyTranslatedMessage(messageId: string): void {
        /* Implementation Hidden */
    }

	/**
	 * Returns metadata information about the service provider which is used by
	 * the generic implementation
	 * @abstract
	 * @protected
	 * @returns { name, displayName, settings }
		};
	 */
	abstract _getProviderMetadata(): IProviderMetadata;

	/**
	 * Provides the possible languages _from_ which a message can be translated into a target language
	 * @abstract
	 * @protected
	 * @param {string} target - the language into which shall be translated
	 * @returns [{ language, name }]
	 */
	abstract getSupportedLanguages(target: string): Promise<ISupportedLanguage[]>;

	/**
	 * Performs the actual translation of a message,
	 * usually by sending a REST API call to the service provider.
	 * @abstract
	 * @protected
	 * @param {object} message
	 * @param {object} targetLanguages
	 * @return {object}
	 */
	abstract _translateMessage(message: IMessage, targetLanguages: string[]): Promise<ITranslationResult>;

	/**
	 * Performs the actual translation of an attachment (precisely its description),
	 * usually by sending a REST API call to the service provider.
	 * @abstract
	 * @param {object} attachment
	 * @param {object} targetLanguages
	 * @returns {object} translated messages for each target language
	 */
	abstract _translateAttachmentDescriptions(attachment: MessageAttachment, targetLanguages: string[]): Promise<ITranslationResult>;
}

Meteor.startup(() => {
	/** Register the active service provider on the 'AfterSaveMessage' callback.
	 *  So the registered provider will be invoked when a message is saved.
	 *  All the other inactive service provider must be deactivated.
	 */
	settings.watch<string>('AutoTranslate_ServiceProvider', (providerName) => {
		TranslationProviderRegistry.setCurrentProvider(providerName);
	});

	// Get Auto Translate Active flag
	settings.watch<boolean>('AutoTranslate_Enabled', (value) => {
		TranslationProviderRegistry.setEnable(value);
	});
});

```