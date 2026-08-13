## File: apps/meteor/server/lib/findUsersOfRoomOrderedByRole.ts

```typescript
import { type IUser, ROOM_ROLE_PRIORITY_MAP, type ISubscription } from '@rocket.chat/core-typings';
import { Subscriptions, Users } from '@rocket.chat/models';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type { Document, FilterOperators } from 'mongodb';

import { settings } from '../../app/settings/server';

type FindUsersParam = {
	rid: string;
	status?: FilterOperators<string>;
	skip?: number;
	limit?: number;
	filter?: string;
	sort?: Record<string, any>;
	exceptions?: string[];
	extraQuery?: Document[];
};

type UserWithRoleAndSubscriptionData = IUser & {
	subscription: Pick<ISubscription, '_id' | 'status' | 'ts' | 'roles'>;
};

export async function findUsersOfRoomOrderedByRole({
	rid,
	status,
	skip = 0,
	limit = 0,
	filter = '',
	sort = {},
	exceptions = [],
	extraQuery = [],
}: FindUsersParam): Promise<{ members: UserWithRoleAndSubscriptionData[]; total: number }> {
    /* Implementation Hidden */
}

```