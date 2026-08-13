## File: apps/meteor/server/lib/users/saveUser/validateUserEditing.ts

```typescript
/* eslint-disable complexity */
import { MeteorError } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';

import type { UpdateUserData } from './saveUser';
import { settings } from '../../../../app/settings/server';
import { hasPermissionAsync } from '../../authorization/hasPermission';

const isEditingUserRoles = (previousRoles: IUser['roles'], newRoles?: IUser['roles']) =>
	newRoles !== undefined &&
	(newRoles.some((item) => !previousRoles.includes(item)) || previousRoles.some((item) => !newRoles.includes(item)));
const isEditingField = (previousValue?: string, newValue?: string) => typeof newValue !== 'undefined' && newValue !== previousValue;

export const canEditExtension = async (newExtension?: string) => {
    /* Implementation Hidden */
};

/**
 * Validate permissions to edit user fields
 *
 * @param {string} userId
 * @param {{ _id: string, roles?: string[], username?: string, name?: string, statusText?: string, email?: string, password?: string}} userData
 */
export async function validateUserEditing(userId: IUser['_id'], userData: UpdateUserData): Promise<void> {
    /* Implementation Hidden */
}

```