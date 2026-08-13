## File: packages/models/src/models/Nps.ts

```typescript
import type { INps, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import { NPSStatus } from '@rocket.chat/core-typings';
import type { INpsModel } from '@rocket.chat/model-typings';
import type { Collection, Db, Document, IndexDescription, UpdateResult } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class NpsRaw extends BaseRaw<INps> implements INpsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<INps>>) {
        /* Implementation Hidden */
    }

	override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	// get expired surveys still in progress
	async getOpenExpiredAndStartSending(): Promise<INps | null> {
        /* Implementation Hidden */
    }

	// get expired surveys already sending results
	async getOpenExpiredAlreadySending(): Promise<INps | null> {
        /* Implementation Hidden */
    }

	updateStatusById(_id: INps['_id'], status: INps['status']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	save({
		_id,
		startAt,
		expireAt,
		createdBy,
		status,
	}: Pick<INps, '_id' | 'startAt' | 'expireAt' | 'createdBy' | 'status'>): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	closeAllByStatus(status: NPSStatus): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }
}

```