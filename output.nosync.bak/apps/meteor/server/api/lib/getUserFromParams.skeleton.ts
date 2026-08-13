## File: apps/meteor/server/api/lib/getUserFromParams.ts

```typescript
// Convenience method, almost need to turn it into a middleware of sorts
import type { IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import { isTruthy } from '@rocket.chat/tools';
import { Meteor } from 'meteor/meteor';

export async function getUserFromParams<T extends boolean = false>(
	params: {
		userId?: string;
		username?: string;
		user?: string;
	},
	full?: T,
): Promise<
	T extends true
		? IUser
		: Pick<IUser, '_id' | 'username' | 'name' | 'status' | 'statusDefault' | 'statusText' | 'statusSource' | 'statusExpiresAt' | 'roles'>
> {
    /* Implementation Hidden */
}

export async function getUserListFromParams(params: {
	userId?: string;
	username?: string;
	user?: string;
	userIds?: string[];
	usernames?: string[];
}): Promise<Pick<IUser, '_id' | 'username'>[]> {
    /* Implementation Hidden */
}

/**
 * Resolves a list of usernames from the request params without requiring the users to
 * already exist locally. `username`/`usernames`/`user` are passed through verbatim, while
 * `userId`/`userIds` are resolved to their usernames via the database.
 *
 * Unlike `getUserListFromParams`, this does not drop usernames that have no local record yet
 * — which is what federation invites rely on: the federated user record is created lazily
 * inside `addUsersToRoomMethod`.
 */
export async function getUsernameListFromParams(params: {
	userId?: string;
	username?: string;
	user?: string;
	userIds?: string[];
	usernames?: string[];
}): Promise<string[]> {
    /* Implementation Hidden */
}

```