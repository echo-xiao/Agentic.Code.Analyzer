## File: packages/apps/src/server/bridges/UserBridge.ts

```typescript
import type { IUser, IUserCreationOptions, UserType } from '@rocket.chat/apps-engine/definition/users';

import { BaseBridge } from './BaseBridge';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissionManager } from '../managers/AppPermissionManager';
import { AppPermissions } from '../permissions/AppPermissions';

export abstract class UserBridge extends BaseBridge {
	public async doGetById(id: string, appId: string): Promise<IUser> {
        /* Implementation Hidden */
    }

	public async doGetByUsername(username: string, appId: string): Promise<IUser> {
        /* Implementation Hidden */
    }

	public async doGetBySipExtension(extension: string, appId: string): Promise<IUser | undefined> {
        /* Implementation Hidden */
    }

	public async doGetAppUser(appId?: string): Promise<IUser | undefined> {
        /* Implementation Hidden */
    }

	public async doCreate(data: Partial<IUser>, appId: string, options?: IUserCreationOptions): Promise<string> {
        /* Implementation Hidden */
    }

	public async doRemove(user: IUser, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async doUpdate(user: IUser, updates: Partial<IUser>, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async doGetUserUnreadMessageCount(uid: string, appId: string): Promise<number> {
        /* Implementation Hidden */
    }

	public async doGetUserRoomIds(userId: string, appId: string): Promise<string[]> {
        /* Implementation Hidden */
    }

	public async doDeleteUsersCreatedByApp(appId: string, type: UserType.BOT | UserType.APP): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async doDeactivate(userId: IUser['id'], confirmRelinquish: boolean, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async doSetActiveState(
		userId: IUser['id'],
		state: Pick<IUser, 'statusDefault' | 'statusSource' | 'statusText' | 'statusExpiresAt' | 'statusId'>,
		appId: string,
	): Promise<void> {
        /* Implementation Hidden */
    }

	public async doEndActiveState(userId: IUser['id'], appId: string, statusId?: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected abstract getById(id: string, appId: string): Promise<IUser>;

	protected abstract getByUsername(username: string, appId: string): Promise<IUser>;

	protected abstract getBySipExtension(extension: string, appId: string): Promise<IUser | undefined>;

	protected abstract getAppUser(appId?: string): Promise<IUser | undefined>;

	protected abstract getActiveUserCount(): Promise<number>;

	protected abstract getUserUnreadMessageCount(uid: string, appId: string): Promise<number>;

	protected abstract getUserRoomIds(userId: string, appId: string): Promise<string[]>;

	/**
	 * Creates a user.
	 * @param data the essential data for creating a user
	 * @param appId the id of the app calling this
	 * @param options options for passing extra data
	 */
	protected abstract create(data: Partial<IUser>, appId: string, options?: IUserCreationOptions): Promise<string>;

	/**
	 * Remove a user.
	 *
	 * @param user the user object to be removed
	 * @param appId the id of the app executing the call
	 */
	protected abstract remove(user: IUser, appId: string): Promise<boolean>;

	/**
	 * Updates a user.
	 *
	 * Note: the actual methods used by apps to update
	 * user properties are much more granular, but at a
	 * bridge level we can adopt a more practical approach
	 * since it is only accessible internally by the framework
	 *
	 * @param user the user to be updated
	 * @param updates a map of properties to be updated
	 * @param appId the id of the app executing the call
	 */
	protected abstract update(user: IUser, updates: Partial<IUser>, appId: string): Promise<boolean>;

	/**
	 * Deletes all bot or app users created by the App.
	 * @param appId the App's ID.
	 * @param type the type of the user to be deleted.
	 * @returns true if any user was deleted, false otherwise.
	 */
	protected abstract deleteUsersCreatedByApp(appId: string, type: UserType.APP | UserType.BOT): Promise<boolean>;

	/**
	 * Deactivates a user.
	 * @param userId the user's ID.
	 * @param confirmRelinquish whether the user confirmed the relinquish of the account.
	 * @param appId the App's ID.
	 * @returns true if the user was deactivated, false otherwise.
	 * @throws {Error} if the user is not found.
	 * @throws {Error} if the user is the last admin.
	 * @throws {Error} if the user is the last owner, if confirmRelinquish is false.
	 */
	protected abstract deactivate(userId: IUser['id'], confirmRelinquish: boolean, appId: string): Promise<boolean>;

	protected abstract setActiveState(
		userId: IUser['id'],
		state: Pick<IUser, 'statusDefault' | 'statusSource' | 'statusText' | 'statusExpiresAt' | 'statusId'>,
		appId: string,
	): Promise<void>;

	protected abstract endActiveState(userId: IUser['id'], appId: string, statusId?: string): Promise<void>;

	private hasReadPermission(appId: string): boolean {
        /* Implementation Hidden */
    }

	private hasWritePermission(appId: string): boolean {
        /* Implementation Hidden */
    }
}

```