## File: apps/meteor/app/lib/server/methods/createPrivateGroup.ts

```typescript
import type { ICreatedRoom, IUser, ITeam } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Users, Team } from '@rocket.chat/models';
import { Match, check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { createRoom } from '../../../../server/lib/rooms/createRoom';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		createPrivateGroup(
			name: string,
			members: string[],
			readOnly?: boolean,
			customFields?: Record<string, unknown>,
			extraData?: Record<string, unknown>,
		): ICreatedRoom;
	}
}

export const createPrivateGroupMethod = async (
	user: IUser,
	name: string,
	members: string[],
	readOnly = false,
	customFields?: Record<string, any>,
	extraData: Record<string, any> = {},
	excludeSelf = false,
): Promise<
	ICreatedRoom & {
		rid: string;
	}
> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async createPrivateGroup(name, members, readOnly = false, customFields = {}, extraData = {}) {
		const uid = Meteor.userId();

		if (!uid) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'createPrivateGroup',
			});
		}

		const user = await Users.findOneById(uid, { projection: { services: 0 } });
		if (!user) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'createPrivateGroup',
			});
		}

		return createPrivateGroupMethod(user, name, members, readOnly, customFields, extraData);
	},
});

```