## File: apps/meteor/app/search/server/model/SearchProvider.ts

```typescript
import type { IMessageSearchSuggestion, IRoom, IUser } from '@rocket.chat/core-typings';
import type { TranslationKey } from '@rocket.chat/ui-contexts';

import type { IRawSearchResult } from './ISearchResult';
import { Settings } from './Settings';
import { SearchLogger } from '../logger/logger';

export abstract class SearchProvider<TPayload = any> {
	private _key: string;

	protected _settings: Settings;

	/**
	 * Create search provider, key must match /^[A-Za-z0-9]+$/
	 */
	constructor(key: string) {
        /* Implementation Hidden */
    }

	/* --- basic params ---*/
	get key() {
		return this._key;
	}

	abstract get i18nLabel(): TranslationKey;

	abstract get i18nDescription(): TranslationKey;

	get iconName() {
		return 'magnifier';
	}

	get settings() {
		return this._settings.list();
	}

	get settingsAsMap() {
		return this._settings.map();
	}

	/* --- templates ---*/
	get resultTemplate() {
		return 'DefaultSearchResultTemplate';
	}

	get suggestionItemTemplate() {
		return 'DefaultSuggestionItemTemplate';
	}

	/* --- search functions ---*/
	/**
	 * Search using the current search provider and check if results are valid for the user. The search result has
	 * the format {messages:{start:0,numFound:1,docs:[{...}]},users:{...},rooms:{...}}
	 * @param text the search text
	 * @param context the context (uid, rid)
	 * @param payload custom payload (e.g. for paging)
	 * @param callback is used to return result an can be called with (error,result)
	 */
	public abstract search(
		userId: string,
		text: string,
		context: { uid?: IUser['_id']; rid: IRoom['_id'] },
		payload?: TPayload,
		callback?: (error: Error | null, result: IRawSearchResult) => void,
	): Promise<void>;

	/**
	 * Returns an ordered list of suggestions. The result should have at least the form [{text:string}]
	 * @param _text the search text
	 * @param _context the context (uid, rid)
	 * @param _payload custom payload (e.g. for paging)
	 * @param callback is used to return result an can be called with (error,result)
	 */
	suggest(
		_text: string,
		_context: { uid?: IUser['_id']; rid: IRoom['_id'] },
		_payload: TPayload,
		callback?: (error: Error | null, result: IMessageSearchSuggestion[]) => void,
	) {
        /* Implementation Hidden */
    }

	get supportsSuggestions() {
		return false;
	}

	/* --- triggers ---*/
	on(_name: string, _value: unknown) {
        /* Implementation Hidden */
    }

	/* --- livecycle ---*/
	run(reason: any) {
        /* Implementation Hidden */
    }

	start(_reason: any, resolve: (value: unknown) => void, _reject: (reason?: any) => void) {
        /* Implementation Hidden */
    }

	stop(resolve: () => void) {
        /* Implementation Hidden */
    }
}

```