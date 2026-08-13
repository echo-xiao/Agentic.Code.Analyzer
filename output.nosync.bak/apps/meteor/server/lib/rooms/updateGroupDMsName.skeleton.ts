## File: apps/meteor/server/lib/rooms/updateGroupDMsName.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { isNotUndefined } from '@rocket.chat/core-typings';
import { Rooms, Subscriptions, Users } from '@rocket.chat/models';
import type { ClientSession } from 'mongodb';

import { notifyOnSubscriptionChangedByRoomId } from '../../../app/lib/server/lib/notifyListener';

const getFname = (members: IUser[]): string => members.map(({ name, username }) => name || username).join(', ');
const getName = (members: IUser[]): string => members.map(({ username }) => username).join(',');

async function getUsersWhoAreInTheSameGroupDMsAs(user: IUser) {
    /* Implementation Hidden */
}

function sortUsersAlphabetically(u1: IUser, u2: IUser): number {
    /* Implementation Hidden */
}

export const updateGroupDMsName = async (
	userThatChangedName: IUser,
	options?: {
		session?: ClientSession;
	},
): Promise<void> => {
    /* Implementation Hidden */
};

```