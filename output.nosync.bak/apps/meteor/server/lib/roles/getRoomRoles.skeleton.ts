## File: apps/meteor/server/lib/roles/getRoomRoles.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { Roles, Subscriptions, Users } from '@rocket.chat/models';
import _ from 'underscore';

import { settings } from '../../../app/settings/server';

export type RoomRoles = {
	rid: IRoom['_id'];
	u: {
		_id: string;
		username: string;
		name?: string;
	};
	roles: string[];
};

export async function getRoomRoles(rid: IRoom['_id']): Promise<RoomRoles[]> {
    /* Implementation Hidden */
}

```