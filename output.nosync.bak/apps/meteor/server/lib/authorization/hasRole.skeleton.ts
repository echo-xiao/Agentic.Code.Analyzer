## File: apps/meteor/server/lib/authorization/hasRole.ts

```typescript
import type { IRole, IUser, IRoom, ISubscription } from '@rocket.chat/core-typings';
import { Roles } from '@rocket.chat/models';

/**
 * @deprecated use `Authorization.hasAnyRole` instead
 */
export const hasAnyRoleAsync = async (
	userId: IUser['_id'],
	roleIds: IRole['_id'][],
	scope?: IRoom['_id'] | undefined,
): Promise<boolean> => {
    /* Implementation Hidden */
};

export const hasRoleAsync = async (userId: IUser['_id'], roleId: IRole['_id'], scope?: IRoom['_id'] | undefined): Promise<boolean> => {
    /* Implementation Hidden */
};

export const subscriptionHasRole = (sub: ISubscription, role: IRole['_id']): boolean | undefined => sub.roles?.includes(role);

```