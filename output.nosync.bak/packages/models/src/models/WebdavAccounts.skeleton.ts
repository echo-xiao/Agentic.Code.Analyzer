## File: packages/models/src/models/WebdavAccounts.ts

```typescript
import type { IWebdavAccount, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IWebdavAccountsModel } from '@rocket.chat/model-typings';
import type { Collection, FindCursor, Db, DeleteResult, FindOptions, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class WebdavAccountsRaw extends BaseRaw<IWebdavAccount> implements IWebdavAccountsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IWebdavAccount>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findOneByIdAndUserId(_id: string, userId: string, options: FindOptions<IWebdavAccount>): Promise<IWebdavAccount | null> {
        /* Implementation Hidden */
    }

	findOneByUserIdServerUrlAndUsername(
		{
			userId,
			serverURL,
			username,
		}: {
			userId: string;
			serverURL: string;
			username: string;
		},
		options: FindOptions<IWebdavAccount>,
	): Promise<IWebdavAccount | null> {
        /* Implementation Hidden */
    }

	findWithUserId(userId: string, options: FindOptions<IWebdavAccount>): FindCursor<IWebdavAccount> {
        /* Implementation Hidden */
    }

	removeByUserAndId(_id: string, userId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }
}

```