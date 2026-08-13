## File: packages/models/src/models/EmailInbox.ts

```typescript
import type { IEmailInbox, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IEmailInboxModel } from '@rocket.chat/model-typings';
import type { Collection, Db, FindCursor, IndexDescription, InsertOneResult, UpdateFilter, WithId } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class EmailInboxRaw extends BaseRaw<IEmailInbox> implements IEmailInboxModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IEmailInbox>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	async setDisabledById(id: IEmailInbox['_id']): Promise<null | WithId<IEmailInbox>> {
        /* Implementation Hidden */
    }

	async create(emailInbox: IEmailInbox): Promise<InsertOneResult<IEmailInbox>> {
        /* Implementation Hidden */
    }

	async updateById(id: IEmailInbox['_id'], data: UpdateFilter<IEmailInbox>): Promise<null | WithId<Pick<IEmailInbox, '_id'>>> {
        /* Implementation Hidden */
    }

	findActive(): FindCursor<IEmailInbox> {
        /* Implementation Hidden */
    }

	async findByEmail(email: IEmailInbox['email']): Promise<IEmailInbox | null> {
        /* Implementation Hidden */
    }
}

```