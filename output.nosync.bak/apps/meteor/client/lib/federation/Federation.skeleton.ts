## File: apps/meteor/client/lib/federation/Federation.ts

```typescript
import type { IRoom, ISubscription, IUser, ValueOf } from '@rocket.chat/core-typings';
import { isRoomFederated, isDirectMessageRoom, isPublicRoom } from '@rocket.chat/core-typings';

import { RoomMemberActions, RoomSettingsEnum } from '../../../definition/IRoomTypeConfig';
import type { RoomRoles } from '../../hooks/useRoomRolesQuery';
import { queryClient } from '../queryClient';
import { roomsQueryKeys } from '../queryKeys';

const allowedUserActionsInFederatedRooms: ValueOf<typeof RoomMemberActions>[] = [
	RoomMemberActions.REMOVE_USER,
	RoomMemberActions.BAN,
	RoomMemberActions.SET_AS_OWNER,
	RoomMemberActions.SET_AS_MODERATOR,
];

const allowedRoomSettingsChangesInFederatedRooms: ValueOf<typeof RoomSettingsEnum>[] = [RoomSettingsEnum.NAME, RoomSettingsEnum.TOPIC];

export const actionAllowed = (
	room: Partial<IRoom>,
	action: ValueOf<typeof RoomMemberActions>,
	displayingUserId: IUser['_id'],
	userSubscription?: ISubscription,
): boolean => {
    /* Implementation Hidden */
};

export const isEditableByTheUser = (user?: IUser, room?: IRoom, subscription?: ISubscription): boolean => {
    /* Implementation Hidden */
};

export const canCreateInviteLinks = (user?: IUser, room?: IRoom, subscription?: ISubscription): boolean => {
    /* Implementation Hidden */
};

export const isRoomSettingAllowed = (room: Partial<IRoom>, setting: ValueOf<typeof RoomSettingsEnum>): boolean => {
    /* Implementation Hidden */
};

```