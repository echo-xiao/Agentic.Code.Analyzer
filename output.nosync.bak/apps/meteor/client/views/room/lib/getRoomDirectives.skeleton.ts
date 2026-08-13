## File: apps/meteor/client/views/room/lib/getRoomDirectives.ts

```typescript
import type { IRoom, ISubscription, IUser } from '@rocket.chat/core-typings';

import { RoomMemberActions } from '../../../../definition/IRoomTypeConfig';
import { roomCoordinator } from '../../../lib/rooms/roomCoordinator';

type getRoomDirectiesType = {
	roomCanSetOwner: boolean;
	roomCanSetLeader: boolean;
	roomCanSetModerator: boolean;
	roomCanIgnore: boolean;
	roomCanBlock: boolean;
	roomCanMute: boolean;
	roomCanBan: boolean;
	roomCanRemove: boolean;
	roomCanInvite: boolean;
};

export const getRoomDirectives = ({
	room,
	showingUserId,
	userSubscription,
}: {
	room: IRoom;
	showingUserId: IUser['_id'];
	userSubscription?: ISubscription;
}): getRoomDirectiesType => {
    /* Implementation Hidden */
};

```