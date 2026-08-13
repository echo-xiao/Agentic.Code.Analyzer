## File: apps/meteor/app/livechat/server/lib/contacts/getContacts.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { isNotUndefined } from '@rocket.chat/core-typings';
import { LivechatContacts, Users } from '@rocket.chat/models';
import type { PaginatedResult, ILivechatContactWithManagerData } from '@rocket.chat/rest-typings';
import type { FindCursor, Sort } from 'mongodb';

export type GetContactsParams = {
	searchText?: string;
	count: number;
	offset: number;
	sort: Sort;
	unknown?: boolean;
};

export async function getContacts(params: GetContactsParams): Promise<PaginatedResult<{ contacts: ILivechatContactWithManagerData[] }>> {
    /* Implementation Hidden */
}

```