## File: apps/meteor/server/api/lib/emailInbox.ts

```typescript
import type { IEmailInbox } from '@rocket.chat/core-typings';
import { EmailInbox, Users } from '@rocket.chat/models';
import type { DeleteResult, Filter, InsertOneResult, Sort } from 'mongodb';

import { notifyOnEmailInboxChanged } from '../../../app/lib/server/lib/notifyListener';

export const findEmailInboxes = async ({
	query = {},
	pagination: { offset, count, sort },
}: {
	query?: Filter<IEmailInbox>;
	pagination: {
		offset: number;
		count: number;
		sort?: Sort;
	};
}): Promise<{
	emailInboxes: IEmailInbox[];
	total: number;
	count: number;
	offset: number;
}> => {
    /* Implementation Hidden */
};

export const insertOneEmailInbox = async (
	userId: string,
	emailInboxParams: Pick<IEmailInbox, 'active' | 'name' | 'email' | 'description' | 'senderInfo' | 'department' | 'smtp' | 'imap'>,
): Promise<InsertOneResult<IEmailInbox>> => {
    /* Implementation Hidden */
};

export const updateEmailInbox = async (
	emailInboxParams: Pick<IEmailInbox, '_id' | 'active' | 'name' | 'email' | 'description' | 'senderInfo' | 'department' | 'smtp' | 'imap'>,
): Promise<Pick<IEmailInbox, '_id'> | null> => {
    /* Implementation Hidden */
};

export const removeEmailInbox = async (emailInboxId: IEmailInbox['_id']): Promise<DeleteResult> => {
    /* Implementation Hidden */
};

```