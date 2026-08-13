## File: packages/models/src/models/CallHistory.ts

```typescript
import type { CallHistoryItem, IRegisterUser, IUser } from '@rocket.chat/core-typings';
import type { FindPaginated, ICallHistoryModel } from '@rocket.chat/model-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type { Db, Filter, FindCursor, FindOptions, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class CallHistoryRaw extends BaseRaw<CallHistoryItem> implements ICallHistoryModel {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	async findOneByIdAndUid(
		_id: CallHistoryItem['_id'],
		uid: CallHistoryItem['uid'],
		options?: FindOptions<CallHistoryItem>,
	): Promise<CallHistoryItem | null> {
        /* Implementation Hidden */
    }

	async findOneByCallIdAndUid(
		callId: CallHistoryItem['callId'],
		uid: CallHistoryItem['uid'],
		options?: FindOptions<CallHistoryItem>,
	): Promise<CallHistoryItem | null> {
        /* Implementation Hidden */
    }

	public async updateUserReferences(
		userId: IRegisterUser['_id'],
		username: IRegisterUser['username'],
		name?: IRegisterUser['name'],
	): Promise<void> {
        /* Implementation Hidden */
    }

	public findAllByUserIdAndSearchFilters(
		uid: IUser['_id'],
		filters: {
			type?: CallHistoryItem['type'];
			searchTerm?: string;
			direction?: CallHistoryItem['direction'];
			inStates?: CallHistoryItem['state'][];
		},
		options: FindOptions<CallHistoryItem>,
	): FindPaginated<FindCursor<CallHistoryItem>> {
        /* Implementation Hidden */
    }
}

```