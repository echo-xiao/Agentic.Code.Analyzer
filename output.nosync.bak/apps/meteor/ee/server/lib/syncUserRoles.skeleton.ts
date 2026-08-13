## File: apps/meteor/ee/server/lib/syncUserRoles.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { IUser, IRole, AtLeast } from '@rocket.chat/core-typings';
import { License } from '@rocket.chat/license';
import { Users } from '@rocket.chat/models';

import { settings } from '../../../app/settings/server';
import { addUserRolesAsync } from '../../../server/lib/roles/addUserRoles';
import { removeUserFromRolesAsync } from '../../../server/lib/roles/removeUserFromRoles';

type setUserRolesOptions = {
	// If specified, the function will not add nor remove any role that is not on this list.
	allowedRoles?: Array<IRole['_id']>;
	// If set to true, roles will only be added, not removed
	skipRemovingRoles?: boolean;
	// the scope value (eg: room id) to assign the roles to
	scope?: string;
};

function filterRoleList(
	roleList: Array<IRole['_id']>,
	rolesToFilterOut: Array<IRole['_id']>,
	rolesToFilterIn?: Array<IRole['_id']>,
): Array<IRole['_id']> {
    /* Implementation Hidden */
}

function broadcastRoleChange(
	type: 'changed' | 'added' | 'removed',
	roleList: Array<IRole['_id']>,
	user: AtLeast<IUser, '_id' | 'username'>,
): void {
    /* Implementation Hidden */
}

export async function syncUserRoles(
	uid: IUser['_id'],
	newRoleList: Array<IRole['_id']>,
	{ allowedRoles, skipRemovingRoles, scope }: setUserRolesOptions,
): Promise<void> {
    /* Implementation Hidden */
}

```