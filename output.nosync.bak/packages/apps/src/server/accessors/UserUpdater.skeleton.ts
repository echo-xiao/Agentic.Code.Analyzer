## File: packages/apps/src/server/accessors/UserUpdater.ts

```typescript
import type { IUserUpdater } from '@rocket.chat/apps-engine/definition/accessors/IUserUpdater';
import type { UserStatusConnection } from '@rocket.chat/apps-engine/definition/users';
import type { IUser } from '@rocket.chat/apps-engine/definition/users/IUser';

import type { AppBridges } from '../bridges';

export class UserUpdater implements IUserUpdater {
	constructor(
		private readonly bridges: AppBridges,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public async updateStatusText(user: IUser, statusText: IUser['statusText']) {
        /* Implementation Hidden */
    }

	public async updateStatus(user: IUser, statusText: IUser['statusText'], status: UserStatusConnection) {
        /* Implementation Hidden */
    }

	public async updateBio(user: IUser, bio: IUser['bio']) {
        /* Implementation Hidden */
    }

	public async updateCustomFields(user: IUser, customFields: IUser['customFields']) {
        /* Implementation Hidden */
    }

	public async deactivate(userId: IUser['id'], confirmRelinquish: boolean) {
        /* Implementation Hidden */
    }

	public async setActiveState(
		userId: IUser['id'],
		state: Pick<IUser, 'statusDefault' | 'statusSource' | 'statusText' | 'statusExpiresAt' | 'statusId'>,
	) {
        /* Implementation Hidden */
    }

	public async endActiveState(userId: IUser['id'], statusId?: string) {
        /* Implementation Hidden */
    }
}

```