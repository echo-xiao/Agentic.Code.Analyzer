## File: apps/meteor/server/lib/rooms/relinquishRoomOwnerships.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { Messages, Rooms, Subscriptions, ReadReceipts, ReadReceiptsArchive, Team } from '@rocket.chat/models';

import type { SubscribedRoomsForUserWithDetails } from './getRoomsWithSingleOwner';
import { FileUpload } from '../../../app/file-upload/server';
import { notifyOnSubscriptionChanged } from '../../../app/lib/server/lib/notifyListener';
import { eraseRoomLooseValidation, eraseTeamOnRelinquishRoomOwnerships } from '../../api/lib/eraseTeam';
import { addUserRolesAsync } from '../roles/addUserRoles';

const bulkTeamCleanup = async (rids: IRoom['_id'][]) => {
    /* Implementation Hidden */
};

const bulkRoomCleanUp = async (rids: string[]) => {
    /* Implementation Hidden */
};

export const relinquishRoomOwnerships = async function (
	userId: string,
	subscribedRooms: SubscribedRoomsForUserWithDetails[],
	removeDirectMessages = true,
) {
    /* Implementation Hidden */
};

```