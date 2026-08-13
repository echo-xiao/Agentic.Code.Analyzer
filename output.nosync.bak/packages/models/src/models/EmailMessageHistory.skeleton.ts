## File: packages/models/src/models/EmailMessageHistory.ts

```typescript
import type { IEmailMessageHistory, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IEmailMessageHistoryModel, InsertionModel } from '@rocket.chat/model-typings';
import type { Collection, Db, InsertOneResult, WithId, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class EmailMessageHistoryRaw extends BaseRaw<IEmailMessageHistory> implements IEmailMessageHistoryModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IEmailMessageHistory>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	async create({ _id, email }: InsertionModel<IEmailMessageHistory>): Promise<InsertOneResult<WithId<IEmailMessageHistory>>> {
        /* Implementation Hidden */
    }
}

```