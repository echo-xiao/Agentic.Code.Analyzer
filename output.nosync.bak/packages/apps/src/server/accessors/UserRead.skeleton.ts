## File: packages/apps/src/server/accessors/UserRead.ts

```typescript
import type { IUserRead } from '@rocket.chat/apps-engine/definition/accessors';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

import type { UserBridge } from '../bridges/UserBridge';

export class UserRead implements IUserRead {
	constructor(
		private userBridge: UserBridge,
		private appId: string,
	) {
        /* Implementation Hidden */
    }

	public getById(id: string): Promise<IUser> {
        /* Implementation Hidden */
    }

	public getByUsername(username: string): Promise<IUser> {
        /* Implementation Hidden */
    }

	public getBySipExtension(extension: string): Promise<IUser | undefined> {
        /* Implementation Hidden */
    }

	public getAppUser(appId: string = this.appId): Promise<IUser | undefined> {
        /* Implementation Hidden */
    }

	public getUserUnreadMessageCount(uid: string): Promise<number> {
        /* Implementation Hidden */
    }

	public getUserRoomIds(userId: string): Promise<string[]> {
        /* Implementation Hidden */
    }
}

```