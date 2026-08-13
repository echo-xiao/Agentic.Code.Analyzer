## File: packages/apps/tests/test-data/bridges/userBridge.ts

```typescript
import type { IUser, UserType } from '@rocket.chat/apps-engine/definition/users';

import { UserBridge } from '../../../src/server/bridges';

export class TestsUserBridge extends UserBridge {
	public getById(id: string, appId: string): Promise<IUser> {
        /* Implementation Hidden */
    }

	public getByUsername(username: string, appId: string): Promise<IUser> {
        /* Implementation Hidden */
    }

	public create(user: Partial<IUser>): Promise<string> {
        /* Implementation Hidden */
    }

	public getActiveUserCount(): Promise<number> {
        /* Implementation Hidden */
    }

	public remove(user: IUser, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public getAppUser(appId?: string): Promise<IUser> {
        /* Implementation Hidden */
    }

	public async update(user: IUser, updates: Partial<IUser>, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async deleteUsersCreatedByApp(appId: string, type: UserType.BOT): Promise<boolean> {
        /* Implementation Hidden */
    }

	protected getUserUnreadMessageCount(uid: string, appId: string): Promise<number> {
        /* Implementation Hidden */
    }

	protected getUserRoomIds(userId: string, appId: string): Promise<string[]> {
        /* Implementation Hidden */
    }

	protected deactivate(userId: IUser['id'], confirmRelinquish: boolean, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	protected setActiveState(
		userId: IUser['id'],
		state: Pick<IUser, 'statusDefault' | 'statusSource' | 'statusText' | 'statusExpiresAt' | 'statusId'>,
		appId: string,
	): Promise<void> {
        /* Implementation Hidden */
    }

	protected endActiveState(userId: IUser['id'], appId: string, statusId?: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```