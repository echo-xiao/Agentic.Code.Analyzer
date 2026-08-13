## File: apps/meteor/server/lib/rooms/createRoom.ts

```typescript
import { AppEvents, Apps } from '@rocket.chat/apps';
import { AppsEngineException } from '@rocket.chat/apps-engine/definition/exceptions';
import { FederationMatrix, Message, Room, Team } from '@rocket.chat/core-services';
import type { ICreateRoomParams, ISubscriptionExtraData } from '@rocket.chat/core-services';
import { type ICreatedRoom, type IUser, type IRoom, type RoomType, isUserNativeFederated } from '@rocket.chat/core-typings';
import { Rooms, Subscriptions, Users } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { createDirectRoom } from './createDirectRoom';
import { notifyOnRoomChanged, notifyOnSubscriptionChangedById } from '../../../app/lib/server/lib/notifyListener';
import { getDefaultSubscriptionPref } from '../../../app/utils/lib/getDefaultSubscriptionPref';
import { getValidRoomName } from '../../../app/utils/server/lib/getValidRoomName';
import { calculateRoomRolePriorityFromRoles } from '../../../lib/roles/calculateRoomRolePriorityFromRoles';
import { callbacks } from '../callbacks';
import { beforeAddUserToRoom } from '../callbacks/beforeAddUserToRoom';
import { beforeCreateRoomCallback, prepareCreateRoomCallback } from '../callbacks/beforeCreateRoomCallback';
import { getSubscriptionAutotranslateDefaultConfig } from '../getSubscriptionAutotranslateDefaultConfig';
import { syncRoomRolePriorityForUserAndRoom } from '../roles/syncRoomRolePriority';

const isValidName = (name: unknown): name is string => {
    /* Implementation Hidden */
};

const onlyUsernames = (members: unknown): members is string[] =>
	Array.isArray(members) && members.every((member) => typeof member === 'string');

async function createUsersSubscriptions({
	room,
	shouldBeHandledByFederation,
	members,
	now,
	owner,
	options,
}: {
	room: IRoom;
	shouldBeHandledByFederation: boolean;
	members: string[];
	now: Date;
	owner: IUser;
	options?: ICreateRoomParams['options'];
}) {
    /* Implementation Hidden */
}

export const createRoom = async <T extends RoomType>(
	type: T,
	name: T extends 'd' ? undefined : string,
	owner: T extends 'd' ? IUser | undefined : IUser,
	members: T extends 'd' ? IUser[] : string[] = [],
	excludeSelf?: boolean,
	readOnly?: boolean,
	roomExtraData?: Partial<IRoom>,
	options?: ICreateRoomParams['options'],
): Promise<
	ICreatedRoom & {
		rid: string;
	}
> => {
    /* Implementation Hidden */
};

```