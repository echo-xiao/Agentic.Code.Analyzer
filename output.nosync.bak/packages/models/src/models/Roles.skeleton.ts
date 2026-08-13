## File: packages/models/src/models/Roles.ts

```typescript
import type { IRole, IRoom, IUser, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IRolesModel } from '@rocket.chat/model-typings';
import type { Collection, FindCursor, Db, Filter, FindOptions, Document, CountDocumentsOptions } from 'mongodb';

import { Subscriptions, Users } from '../index';
import { BaseRaw } from './BaseRaw';

export class RolesRaw extends BaseRaw<IRole> implements IRolesModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IRole>>) {
        /* Implementation Hidden */
    }

	findByUpdatedDate(updatedAfterDate: Date, options?: FindOptions<IRole>): FindCursor<IRole> {
        /* Implementation Hidden */
    }

	async isUserInRoles(userId: IUser['_id'], roles: IRole['_id'][], scope?: IRoom['_id']): Promise<boolean> {
        /* Implementation Hidden */
    }

	async findOneByIdOrName(_idOrName: IRole['_id'], options?: undefined): Promise<IRole | null>;

	async findOneByIdOrName(_idOrName: IRole['_id'], options: FindOptions<IRole>): Promise<IRole | null>;

	async findOneByIdOrName<P extends Document>(
		_idOrName: IRole['_id'],
		options: FindOptions<P extends IRole ? IRole : P>,
	): Promise<P | null>;

	findOneByIdOrName<P>(_idOrName: IRole['_id'], options?: any): Promise<IRole | P | null> {
        /* Implementation Hidden */
    }

	async findOneByName<P = IRole>(name: IRole['name'], options?: any): Promise<IRole | P | null> {
        /* Implementation Hidden */
    }

	findInIds<P>(ids: IRole['_id'][], options?: FindOptions<IRole>): P extends Pick<IRole, '_id'> ? FindCursor<P> : FindCursor<IRole> {
        /* Implementation Hidden */
    }

	findInIdsOrNames<P>(
		_idsOrNames: IRole['_id'][],
		options?: FindOptions<IRole>,
	): P extends Pick<IRole, '_id'> ? FindCursor<P> : FindCursor<IRole> {
        /* Implementation Hidden */
    }

	findAllExceptIds<P>(ids: IRole['_id'][], options?: FindOptions<IRole>): P extends Pick<IRole, '_id'> ? FindCursor<P> : FindCursor<IRole> {
        /* Implementation Hidden */
    }

	findByScope(scope: IRole['scope'], options?: FindOptions<IRole>): FindCursor<IRole> {
        /* Implementation Hidden */
    }

	countByScope(scope: IRole['scope'], options?: CountDocumentsOptions): Promise<number> {
        /* Implementation Hidden */
    }

	findCustomRoles(options?: FindOptions<IRole>): FindCursor<IRole> {
        /* Implementation Hidden */
    }

	countCustomRoles(options?: CountDocumentsOptions): Promise<number> {
        /* Implementation Hidden */
    }

	async updateById(
		_id: IRole['_id'],
		name: IRole['name'],
		scope: IRole['scope'],
		description: IRole['description'] = '',
		mandatory2fa: IRole['mandatory2fa'] = false,
	): Promise<IRole> {
        /* Implementation Hidden */
    }

	findUsersInRole(roleId: IRole['_id'], scope?: IRoom['_id']): Promise<FindCursor<IUser>>;

	findUsersInRole(roleId: IRole['_id'], scope: IRoom['_id'] | undefined, options: FindOptions<IUser>): Promise<FindCursor<IUser>>;

	findUsersInRole<P extends Document>(
		roleId: IRole['_id'],
		scope: IRoom['_id'] | undefined,
		options: FindOptions<P extends IUser ? IUser : P>,
	): Promise<FindCursor<P extends IUser ? IUser : P>>;

	/** @deprecated function getUsersInRole should be used instead */
	async findUsersInRole<P extends Document>(
		roleId: IRole['_id'],
		scope: IRoom['_id'] | undefined,
		options?: any,
	): Promise<FindCursor<IUser | P>> {
        /* Implementation Hidden */
    }

	async countUsersInRole(roleId: IRole['_id'], scope?: IRoom['_id']): Promise<number> {
        /* Implementation Hidden */
    }

	async createWithRandomId(
		name: IRole['name'],
		scope: IRole['scope'] = 'Users',
		description = '',
		protectedRole = true,
		mandatory2fa = false,
	): Promise<IRole> {
        /* Implementation Hidden */
    }

	async canAddUserToRole(uid: IUser['_id'], roleId: IRole['_id'], scope?: IRoom['_id']): Promise<boolean> {
        /* Implementation Hidden */
    }
}

```