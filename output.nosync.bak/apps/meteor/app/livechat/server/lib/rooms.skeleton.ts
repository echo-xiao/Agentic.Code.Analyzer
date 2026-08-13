## File: apps/meteor/app/livechat/server/lib/rooms.ts

```typescript
import { AppEvents, Apps } from '@rocket.chat/apps';
import { Omnichannel } from '@rocket.chat/core-services';
import type {
	ILivechatVisitor,
	IMessage,
	IOmnichannelRoomInfo,
	SelectedAgent,
	IOmnichannelRoomExtraData,
	IOmnichannelRoom,
	TransferData,
} from '@rocket.chat/core-typings';
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import {
	LivechatRooms,
	LivechatContacts,
	Messages,
	LivechatCustomField,
	LivechatInquiry,
	Rooms,
	Subscriptions,
	Users,
	ReadReceipts,
	ReadReceiptsArchive,
} from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { normalizeTransferredByData } from './Helper';
import { QueueManager } from './QueueManager';
import { RoutingManager } from './RoutingManager';
import { Visitors } from './Visitors';
import { getRequiredDepartment } from './departmentsLib';
import { checkDefaultAgentOnNewRoom } from './hooks';
import { livechatLogger } from './logger';
import { saveTransferHistory } from './transfer';
import { trim } from '../../../../lib/utils/stringUtils';
import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { callbacks } from '../../../../server/lib/callbacks';
import {
	notifyOnLivechatInquiryChangedByRoom,
	notifyOnSubscriptionChangedByRoomId,
	notifyOnRoomChangedById,
	notifyOnLivechatInquiryChanged,
	notifyOnSubscriptionChanged,
	notifyOnRoomChanged,
} from '../../../lib/server/lib/notifyListener';
import { settings } from '../../../settings/server';
import { i18n } from '../../../utils/lib/i18n';

export async function getRoom(
	guest: ILivechatVisitor,
	message: Pick<IMessage, 'rid' | 'msg' | 'token'>,
	roomInfo: IOmnichannelRoomInfo,
	agent?: SelectedAgent,
	extraData?: IOmnichannelRoomExtraData,
) {
    /* Implementation Hidden */
}

export async function createRoom({
	visitor,
	message,
	rid,
	roomInfo,
	agent,
	extraData,
}: {
	visitor: ILivechatVisitor;
	message?: string;
	rid?: string;
	roomInfo: IOmnichannelRoomInfo;
	agent?: SelectedAgent;
	extraData?: IOmnichannelRoomExtraData;
}) {
    /* Implementation Hidden */
}

export async function saveRoomInfo(
	roomData: {
		_id: string;
		topic?: string;
		tags?: string[];
		livechatData?: { [k: string]: string };
		// For priority and SLA, if the value is blank (ie ""), then system will remove the priority or SLA from the room
		priorityId?: string;
		slaId?: string;
	},
	guestData?: {
		_id: string;
		name?: string;
		email?: string;
		phone?: string;
		livechatData?: { [k: string]: string };
	},
	userId?: string,
) {
    /* Implementation Hidden */
}

export async function returnRoomAsInquiry(room: IOmnichannelRoom, departmentId?: string, overrideTransferData: Partial<TransferData> = {}) {
    /* Implementation Hidden */
}

export async function removeOmnichannelRoom(rid: string) {
    /* Implementation Hidden */
}

```