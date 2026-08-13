## File: apps/meteor/server/lib/users/getUserCreatedByApp.ts

```typescript
import type { UserType } from '@rocket.chat/apps-engine/definition/users';
import type { IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import type { FindOptions } from 'mongodb';

export async function getUserCreatedByApp(
	appId: string,
	type: UserType.BOT | UserType.APP,
	options?: FindOptions<IUser>,
): Promise<Array<IUser>> {
    /* Implementation Hidden */
}

```