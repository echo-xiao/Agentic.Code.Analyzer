## File: apps/meteor/server/lib/authorization/getUsersInRole.ts

```typescript
import type { IRole, IUser } from '@rocket.chat/core-typings';
import type { FindPaginated } from '@rocket.chat/model-typings';
import { Roles, Subscriptions, Users } from '@rocket.chat/models';
import { compact } from 'lodash';
import type { Document, FindCursor, FindOptions } from 'mongodb';

export function getUsersInRole(roleId: IRole['_id'], scope?: string): Promise<FindCursor<IUser>>;

export function getUsersInRole(roleId: IRole['_id'], scope: string | undefined, options: FindOptions<IUser>): Promise<FindCursor<IUser>>;

export function getUsersInRole<P extends Document = IUser>(
	roleId: IRole['_id'],
	scope: string | undefined,
	options: FindOptions<P extends IUser ? IUser : P>,
): Promise<FindCursor<P extends IUser ? IUser : P>>;

export function getUsersInRole<P = IUser>(
	roleId: IRole['_id'],
	scope: string | undefined,
	options?: any | undefined,
): Promise<FindCursor<IUser | P>> {
    /* Implementation Hidden */
}

export async function getUsersInRolePaginated(
	roleId: IRole['_id'],
	scope: string | undefined,
	options?: any | undefined,
): Promise<FindPaginated<FindCursor<IUser>>> {
    /* Implementation Hidden */
}

```