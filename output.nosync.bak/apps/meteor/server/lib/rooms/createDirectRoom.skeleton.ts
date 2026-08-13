## File: apps/meteor/server/lib/rooms/createDirectRoom.ts

```typescript
import { AppEvents, Apps } from '@rocket.chat/apps';
import { AppsEngineException } from '@rocket.chat/apps-engine/definition/exceptions';
import type { ISubscriptionExtraData } from '@rocket.chat/core-services';
import type { ICreatedRoom, IRoom, ISubscription, IUser } from '@rocket.chat/core-typings';
import { Rooms, Subscriptions, Users } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';
import { isTruthy } from '@rocket.chat/tools';
import { Meteor } from 'meteor/meteor';
import type { MatchKeysAndValues } from 'mongodb';

import { notifyOnRoomChangedById, notifyOnSubscriptionChangedByRoomIdAndUserId } from '../../../app/lib/server/lib/notifyListener';
import { settings } from '../../../app/settings/server';
import { getDefaultSubscriptionPref } from '../../../app/utils/lib/getDefaultSubscriptionPref';
import { getNameForDMs } from '../../services/room/getNameForDMs';
import { callbacks } from '../callbacks';

const generateSubscription = (
	fname: string,
	name: string,
	user: IUser,
	extra: MatchKeysAndValues<ISubscription>,
): MatchKeysAndValues<ISubscription> => ({
	_id: Random.id(),
	ts: new Date(),
	alert: false,
	unread: 0,
	userMentions: 0,
	groupMentions: 0,
	...(user.customFields && { customFields: user.customFields }),
	...getDefaultSubscriptionPref(user),
	...extra,
	t: 'd',
	fname,
	name,
	u: {
		_id: user._id,
		username: user.username,
	},
});

export async function createDirectRoom(
	members: IUser[] | string[],
	roomExtraData: Partial<IRoom> = {},
	options: {
		forceNew?: boolean;
		creator?: IUser['_id'];
		subscriptionExtra?: ISubscriptionExtraData;
	},
): Promise<ICreatedRoom> {
    /* Implementation Hidden */
}

```