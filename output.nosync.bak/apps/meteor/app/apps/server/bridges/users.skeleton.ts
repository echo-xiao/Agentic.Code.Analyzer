## File: apps/meteor/app/apps/server/bridges/users.ts

```typescript
import type { IAppServerOrchestrator } from '@rocket.chat/apps';
import { UserBridge } from '@rocket.chat/apps/dist/server/bridges/UserBridge';
import type { IUserCreationOptions, IUser, UserType } from '@rocket.chat/apps-engine/definition/users';
import { Presence } from '@rocket.chat/core-services';
import type { PresenceSource, UserStatus } from '@rocket.chat/core-typings';
import { Subscriptions, Users } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';

import { checkUsernameAvailability } from '../../../../server/lib/users/checkUsernameAvailability';
import { deleteUser } from '../../../../server/lib/users/deleteUser';
import { getUserCreatedByApp } from '../../../../server/lib/users/getUserCreatedByApp';
import { setStatusText } from '../../../../server/lib/users/setStatusText';
import { setUserActiveStatus } from '../../../../server/lib/users/setUserActiveStatus';
import { setUserAvatar } from '../../../../server/lib/users/setUserAvatar';
import { notifyOnUserChange, notifyOnUserChangeById } from '../../../lib/server/lib/notifyListener';

export class AppUserBridge extends UserBridge {
	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	protected async getById(userId: string, appId: string): Promise<IUser> {
        /* Implementation Hidden */
    }

	protected async getByUsername(username: string, appId: string): Promise<IUser> {
        /* Implementation Hidden */
    }

	protected async getAppUser(appId?: string): Promise<IUser | undefined> {
        /* Implementation Hidden */
    }

	protected async getBySipExtension(extension: string, _appId: string): Promise<IUser | undefined> {
        /* Implementation Hidden */
    }

	/**
	 * Deletes all bot or app users created by the App.
	 * @param appId the App's ID.
	 * @param type the type of the user to be deleted.
	 * @returns true if any user was deleted, false otherwise.
	 */
	protected async deleteUsersCreatedByApp(appId: string, type: UserType.APP | UserType.BOT): Promise<boolean> {
        /* Implementation Hidden */
    }

	protected async create(userDescriptor: Partial<IUser>, appId: string, options?: IUserCreationOptions): Promise<string> {
        /* Implementation Hidden */
    }

	protected async remove(user: IUser & { id: string }, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	protected async update(user: IUser & { id: string }, fields: Partial<IUser>, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	protected async deactivate(userId: IUser['id'], confirmRelinquish: boolean, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	protected async setActiveState(
		userId: IUser['id'],
		state: Pick<IUser, 'statusDefault' | 'statusSource' | 'statusText' | 'statusExpiresAt' | 'statusId'>,
		appId: string,
	): Promise<void> {
        /* Implementation Hidden */
    }

	protected async endActiveState(userId: IUser['id'], appId: string, statusId?: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected async getActiveUserCount(): Promise<number> {
        /* Implementation Hidden */
    }

	protected async getUserUnreadMessageCount(uid: string): Promise<number> {
        /* Implementation Hidden */
    }

	protected async getUserRoomIds(userId: string, appId: string): Promise<string[]> {
        /* Implementation Hidden */
    }
}

```