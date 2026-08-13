## File: apps/meteor/server/lib/rooms/getRoomByNameOrIdWithOptionToJoin.ts

```typescript
import { Room } from '@rocket.chat/core-services';
import type { IRoom, IUser, RoomType } from '@rocket.chat/core-typings';
import { Rooms, Subscriptions, Users } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { isObject } from '../../../lib/utils/isObject';
import { createDirectMessage } from '../../methods/createDirectMessage';

export const getRoomByNameOrIdWithOptionToJoin = async ({
	user,
	nameOrId = '',
	type,
	tryDirectByUserIdOnly = false,
	joinChannel = true,
	errorOnEmpty = true,
}: {
	user: Pick<IUser, '_id' | 'username' | 'federated' | 'federation'>;
	nameOrId: string;
	type?: RoomType;
	tryDirectByUserIdOnly?: boolean;
	joinChannel?: boolean;
	errorOnEmpty?: boolean;
}): Promise<IRoom | null> => {
    /* Implementation Hidden */
};

```