## File: apps/meteor/app/lib/server/methods/createChannel.ts

```typescript
import type { ICreatedRoom, ITeam } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Users, Team } from '@rocket.chat/models';
import { Match, check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { createRoom } from '../../../../server/lib/rooms/createRoom';
import { methodDeprecationLogger } from '../lib/deprecationWarningLogger';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		createChannel(
			name: string,
			members: string[],
			readOnly?: boolean,
			customFields?: Record<string, any>,
			extraData?: Record<string, any>,
		): ICreatedRoom;
	}
}

export const createChannelMethod = async (
	userId: string,
	name: string,
	members: string[],
	readOnly = false,
	customFields?: Record<string, any>,
	extraData: Record<string, any> = {},
	excludeSelf = false,
) => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async createChannel(name, members, readOnly = false, customFields = {}, extraData = {}) {
		methodDeprecationLogger.method('createChannel', '9.0.0', '/v1/channels.create');
		const uid = Meteor.userId();

		if (!uid) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'createChannel' });
		}

		return createChannelMethod(uid, name, members, readOnly, customFields, extraData);
	},
});

```