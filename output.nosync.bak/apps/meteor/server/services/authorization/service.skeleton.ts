## File: apps/meteor/server/services/authorization/service.ts

```typescript
import type { IAuthorization, RoomAccessValidator } from '@rocket.chat/core-services';
import { License, ServiceClass } from '@rocket.chat/core-services';
import type { IUser, IRole, IRoom, ISubscription } from '@rocket.chat/core-typings';
import { Subscriptions, Rooms, Users, Roles, Permissions } from '@rocket.chat/models';
import mem from 'mem';

import { canAccessRoom } from './canAccessRoom';
import { canReadRoom } from './canReadRoom';
import { AuthorizationUtils } from '../../../app/authorization/lib/AuthorizationUtils';

import './canAccessRoomLivechat';

// Register as class
export class Authorization extends ServiceClass implements IAuthorization {
	protected name = 'authorization';

	private getRolesCached = mem(this.getRoles.bind(this), {
		maxAge: 1000,
		cacheKey: JSON.stringify,
	});

	private rolesHasPermissionCached = mem(this.rolesHasPermission.bind(this), {
		cacheKey: JSON.stringify,
		...((process.env.TEST_MODE === 'true' || process.env.TEST_MODE === 'api') && { maxAge: 1 }),
	});

	constructor() {
        /* Implementation Hidden */
    }

	override async started(): Promise<void> {
        /* Implementation Hidden */
    }

	async hasAllPermission(userId: string | IUser, permissions: string[], scope?: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	async hasPermission(userId: string | IUser, permissionId: string, scope?: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	async hasAtLeastOnePermission(userId: string | IUser, permissions: string[], scope?: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	async canAccessRoom(...args: Parameters<RoomAccessValidator>): Promise<boolean> {
        /* Implementation Hidden */
    }

	async canReadRoom(...args: Parameters<RoomAccessValidator>): Promise<boolean> {
        /* Implementation Hidden */
    }

	async canAccessRoomId(rid: IRoom['_id'], user: IUser['_id']): Promise<boolean> {
        /* Implementation Hidden */
    }

	async addRoleRestrictions(role: IRole['_id'], permissions: string[]): Promise<void> {
        /* Implementation Hidden */
    }

	async getUsersFromPublicRoles(): Promise<
		{
			_id: string;
			username: string;
			roles: string[];
		}[]
	> {
        /* Implementation Hidden */
    }

	private getPublicRoles = mem(
		async (): Promise<string[]> => {
			const roles = Roles.find<Pick<IRole, '_id'>>({ scope: 'Users', description: { $exists: true, $ne: '' } }, { projection: { _id: 1 } });

			return roles.map(({ _id }) => _id).toArray();
		},
		{ maxAge: 10000 },
	);

	private getUserFromRoles = mem(
		async (roleIds: string[]) => {
			const users = Users.findUsersInRoles<Pick<Required<IUser>, '_id' | 'username' | 'roles'>>(roleIds, null, {
				sort: {
					username: 1,
				},
				projection: {
					_id: 1,
					username: 1,
					roles: 1,
				},
			});

			return users
				.map((user) => ({
					...user,
					roles: user.roles.filter((roleId: string) => roleIds.includes(roleId)),
				}))
				.toArray();
		},
		{ maxAge: 10000 },
	);

	private async rolesHasPermission(permission: string, roles: IRole['_id'][]): Promise<boolean> {
        /* Implementation Hidden */
    }

	private async getRoles(user: string | IUser, scope?: IRoom['_id']): Promise<string[]> {
        /* Implementation Hidden */
    }

	private async atLeastOne(user: string | IUser, permissions: string[] = [], scope?: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	private async all(user: string | IUser, permissions: string[] = [], scope?: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	async hasAnyRole(userId: IUser['_id'], roleIds: IRole['_id'][], scope?: IRoom['_id']): Promise<boolean> {
        /* Implementation Hidden */
    }
}

```