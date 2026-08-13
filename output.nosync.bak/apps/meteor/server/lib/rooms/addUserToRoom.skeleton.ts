## File: apps/meteor/server/lib/rooms/addUserToRoom.ts

```typescript
import { Apps, AppEvents } from '@rocket.chat/apps';
import { AppsEngineException } from '@rocket.chat/apps-engine/definition/exceptions';
import { Message, Team, Room } from '@rocket.chat/core-services';
import { isBannedSubscription, isRoomNativeFederated, type IUser } from '@rocket.chat/core-typings';
import { Subscriptions, Users, Rooms } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { RoomMemberActions } from '../../../definition/IRoomTypeConfig';
import { callbacks } from '../callbacks';
import { roomCoordinator } from './roomCoordinator';
import { beforeAddUserToRoom as beforeAddUserToRoomPatch } from '../../../app/lib/server/lib/beforeAddUserToRoom';
import { notifyOnRoomChangedById, notifyOnSubscriptionChanged } from '../../../app/lib/server/lib/notifyListener';
import { settings } from '../../../app/settings/server';
import { beforeAddUserToRoom } from '../callbacks/beforeAddUserToRoom';

/**
 * This function adds user to the given room.
 * Caution - It does not validates if the user has permission to join room
 */

export const addUserToRoom = async (
	rid: string,
	user: Pick<IUser, '_id' | 'username'>,
	inviter?: Pick<IUser, '_id' | 'username'>,
	{
		skipSystemMessage,
		skipAlertSound,
		createAsHidden = false,
	}: {
		skipSystemMessage?: boolean;
		skipAlertSound?: boolean;
		createAsHidden?: boolean;
	} = {},
): Promise<boolean | undefined> => {
    /* Implementation Hidden */
};

```