## File: packages/apps/src/server/accessors/ModifyDeleter.ts

```typescript
import type { IModifyDeleter } from '@rocket.chat/apps-engine/definition/accessors';
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import type { IUser, UserType } from '@rocket.chat/apps-engine/definition/users';

import type { AppBridges } from '../bridges';

export class ModifyDeleter implements IModifyDeleter {
	constructor(
		private readonly bridges: AppBridges,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public async deleteRoom(roomId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async deleteUsers(appId: Exclude<IUser['appId'], undefined>, userType: UserType.APP | UserType.BOT): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async deleteMessage(message: IMessage, user: IUser): Promise<void> {
        /* Implementation Hidden */
    }

	/**
	 * Removes `usernames` from the room's member list
	 *
	 * For performance reasons, it is only possible to remove 50 users in one
	 * call to this method. Removing users is an expensive operation due to the
	 * amount of entity relationships that need to be modified.
	 */
	public async removeUsersFromRoom(roomId: string, usernames: Array<string>) {
        /* Implementation Hidden */
    }
}

```