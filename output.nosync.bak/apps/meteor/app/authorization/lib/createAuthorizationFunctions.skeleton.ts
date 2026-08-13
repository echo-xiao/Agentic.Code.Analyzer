## File: apps/meteor/app/authorization/lib/createAuthorizationFunctions.ts

```typescript
import type { IPermission, IRole, IUser } from '@rocket.chat/core-typings';

import { AuthorizationUtils } from './AuthorizationUtils';

export type AuthorizationDeps = {
	/** The currently logged-in user id, or undefined. */
	getCurrentUserId: () => IUser['_id'] | undefined;
	/** The role ids assigned to a given user (Users scope). */
	getUserRoles: (userId: IUser['_id']) => IRole['_id'][] | undefined;
	/** Lookup a permission by id. */
	getPermission: (permissionId: IPermission['_id']) => IPermission | undefined;
	/** The scope of a role; defaults to 'Users' when the role is unknown. */
	getRoleScope: (roleId: IRole['_id']) => IRole['scope'] | undefined;
	/** Whether a subscription scoped to `rid` grants `roleId`. */
	hasSubscriptionRole: (rid: string, roleId: IRole['_id']) => boolean;
	/** Whether the permissions cache is hydrated; otherwise checks short-circuit to false. */
	isReady: () => boolean;
};

export type AuthorizationFunctions = {
	hasRole: (userId: IUser['_id'], roleId: IRole['_id'], scope?: string) => boolean;
	hasAllPermission: (permissions: IPermission['_id'] | IPermission['_id'][], scope?: string, scopedRoles?: IRole['_id'][]) => boolean;
	hasAtLeastOnePermission: (permissions: IPermission['_id'] | IPermission['_id'][], scope?: string) => boolean;
	/** Alias of hasAllPermission, kept for parity with the previous API. */
	hasPermission: (permissions: IPermission['_id'] | IPermission['_id'][], scope?: string, scopedRoles?: IRole['_id'][]) => boolean;
	userHasAllPermission: (
		permissions: IPermission['_id'] | IPermission['_id'][],
		scope: string | undefined,
		userId: IUser['_id'],
	) => boolean;
};

/**
 * Pure factory for the client-side authorization helpers. All store access is
 * threaded through the {@link AuthorizationDeps} accessors, so the returned
 * functions are testable in isolation and reusable across any state backend.
 */
export const createAuthorizationFunctions = (deps: AuthorizationDeps): AuthorizationFunctions => {
    /* Implementation Hidden */
};

```