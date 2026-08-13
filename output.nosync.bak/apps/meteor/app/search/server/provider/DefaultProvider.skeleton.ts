## File: apps/meteor/app/search/server/provider/DefaultProvider.ts

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';

import { messageSearch } from '../../../../server/methods/messageSearch';
import type { IRawSearchResult } from '../model/ISearchResult';
import { SearchProvider } from '../model/SearchProvider';

/**
 * Implements the default provider (based on mongo db search)
 */
export class DefaultProvider extends SearchProvider<{ searchAll?: boolean; limit?: number }> {
	/**
	 * Enable settings: GlobalSearchEnabled, PageSize
	 */
	constructor() {
        /* Implementation Hidden */
    }

	get i18nLabel() {
		return 'Default_provider' as const;
	}

	get i18nDescription() {
		return 'You_can_search_using_RegExp_eg' as const;
	}

	/**
	 * Uses Meteor function 'messageSearch'
	 */
	async search(
		userId: string,
		text: string,
		context: { uid?: IUser['_id']; rid: IRoom['_id'] },
		payload: { searchAll?: boolean; limit?: number } = {},
		callback?: (error: Error | null, result: IRawSearchResult) => void,
	): Promise<void> {
        /* Implementation Hidden */
    }
}

```