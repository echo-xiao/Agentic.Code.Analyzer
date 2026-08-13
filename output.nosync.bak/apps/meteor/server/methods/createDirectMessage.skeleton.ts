## File: apps/meteor/server/methods/createDirectMessage.ts

```typescript
import type { ICreateRoomParams } from '@rocket.chat/core-services';
import type { ICreatedRoom, IUser } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Rooms, Users } from '@rocket.chat/models';
import { check, Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { RateLimiterClass as RateLimiter } from '../../app/lib/server/lib/RateLimiter';
import { settings } from '../../app/settings/server';
import { hasPermissionAsync } from '../lib/authorization/hasPermission';
import { callbacks } from '../lib/callbacks';
import { createRoom } from '../lib/rooms/createRoom';

export async function createDirectMessage(
	usernames: IUser['username'][],
	userId: IUser['_id'] | null,
	excludeSelf = false,
): Promise<Omit<ICreatedRoom, '_id' | 'inserted'>> {
    /* Implementation Hidden */
}

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		createDirectMessage(...usernames: Exclude<IUser['username'], undefined>[]): Omit<ICreatedRoom, '_id' | 'inserted'>;
	}
}

Meteor.methods<ServerMethods>({
	async createDirectMessage(...usernames) {
		return createDirectMessage(usernames, Meteor.userId());
	},
});

RateLimiter.limitMethod('createDirectMessage', 10, 60000, {
	async userId(userId: IUser['_id']) {
		return !(await hasPermissionAsync(userId, 'send-many-messages'));
	},
});

```