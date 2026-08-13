## File: apps/meteor/server/lib/users/deleteUser.ts

```typescript
import { Apps, AppEvents } from '@rocket.chat/apps';
import { api } from '@rocket.chat/core-services';
import { isUserFederated, type IUser } from '@rocket.chat/core-typings';
import {
	Integrations,
	LivechatVisitors,
	LivechatDepartmentAgents,
	Messages,
	Rooms,
	Subscriptions,
	Users,
	ReadReceipts,
	ReadReceiptsArchive,
	LivechatUnitMonitors,
	ModerationReports,
} from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { getUserSingleOwnedRooms } from './getUserSingleOwnedRooms';
import { FileUpload } from '../../../app/file-upload/server';
import {
	notifyOnRoomChangedById,
	notifyOnIntegrationChangedByUserId,
	notifyOnLivechatDepartmentAgentChanged,
	notifyOnUserChange,
} from '../../../app/lib/server/lib/notifyListener';
import { settings } from '../../../app/settings/server';
import { callbacks } from '../callbacks';
import { i18n } from '../i18n';
import { getSubscribedRoomsForUserWithDetails, shouldRemoveOrChangeOwner } from '../rooms/getRoomsWithSingleOwner';
import { relinquishRoomOwnerships } from '../rooms/relinquishRoomOwnerships';
import { updateGroupDMsName } from '../rooms/updateGroupDMsName';

export async function deleteUser(userId: string, confirmRelinquish = false, deletedBy?: IUser['_id']): Promise<{ deletedRooms: string[] }> {
    /* Implementation Hidden */
}

```