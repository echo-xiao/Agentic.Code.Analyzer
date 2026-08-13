## File: apps/meteor/server/lib/findUsersOfRoom.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import type { FindPaginated } from '@rocket.chat/model-typings';
import { Users } from '@rocket.chat/models';
import type { FindCursor, FindOptions, Filter } from 'mongodb';

import { settings } from '../../app/settings/server';

type FindUsersParam = {
	rid: string;
	status?: Filter<IUser>['status'];
	skip?: number;
	limit?: number;
	filter?: string;
	sort?: Record<string, any>;
};

export function findUsersOfRoom({ rid, status, skip = 0, limit = 0, filter = '', sort }: FindUsersParam): FindPaginated<FindCursor<IUser>> {
    /* Implementation Hidden */
}

```