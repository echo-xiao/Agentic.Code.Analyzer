## File: apps/meteor/app/livechat/server/hooks/sendToCRM.ts

```typescript
import type { IOmnichannelRoom, IOmnichannelSystemMessage, IMessage } from '@rocket.chat/core-typings';
import { isEditedMessage, isOmnichannelRoom } from '@rocket.chat/core-typings';
import { LivechatRooms, Messages } from '@rocket.chat/models';
import type { Response } from '@rocket.chat/server-fetch';

import { callbacks } from '../../../../server/lib/callbacks';
import { settings } from '../../../settings/server';
import { normalizeMessageFileUpload } from '../../../utils/server/functions/normalizeMessageFileUpload';
import { getLivechatRoomGuestInfo } from '../lib/guests';
import { sendRequest } from '../lib/webhooks';

type AdditionalFields =
	| Record<string, unknown>
	| {
			departmentId: IOmnichannelRoom['departmentId'];
	  }
	| {
			departmentId: IOmnichannelRoom['departmentId'];
			servedBy: IOmnichannelRoom['servedBy'];
	  }
	| {
			departmentId: IOmnichannelRoom['departmentId'];
			servedBy: IOmnichannelRoom['servedBy'];
			oldDepartmentId: IOmnichannelRoom['departmentId'];
			oldServedBy: { _id: string; ts: Date; username?: string };
	  }
	| {
			departmentId: IOmnichannelRoom['departmentId'];
			servedBy: IOmnichannelRoom['servedBy'];
			closedAt: IOmnichannelRoom['closedAt'];
			closedBy: IOmnichannelRoom['closedBy'];
			closer: IOmnichannelRoom['closer'];
	  };

type OmnichannelRoomWithExtraFields = IOmnichannelRoom & {
	oldServedBy?: { _id: string; ts: Date; username?: string };
	oldDepartmentId?: IOmnichannelRoom['departmentId'];
};

type CRMActions =
	| 'LivechatSessionStart'
	| 'LivechatSessionQueued'
	| 'LivechatSession'
	| 'LivechatSessionTaken'
	| 'LivechatSessionForwarded'
	| 'LivechatEdit'
	| 'Message'
	| 'LeadCapture';

const msgNavType = 'livechat_navigation_history';
const msgClosingType = 'livechat-close';

export const isOmnichannelNavigationMessage = (message: IMessage): message is IOmnichannelSystemMessage => {
    /* Implementation Hidden */
};

export const isOmnichannelClosingMessage = (message: IMessage): message is IOmnichannelSystemMessage => {
    /* Implementation Hidden */
};

export const sendMessageType = (msgType: string): boolean => {
    /* Implementation Hidden */
};

export const getAdditionalFieldsByType = (type: CRMActions, room: OmnichannelRoomWithExtraFields): AdditionalFields => {
    /* Implementation Hidden */
};

export async function sendToCRM(
	type: CRMActions,
	room: OmnichannelRoomWithExtraFields,
	includeMessages: boolean | IOmnichannelSystemMessage[] = true,
): Promise<OmnichannelRoomWithExtraFields> {
    /* Implementation Hidden */
}

callbacks.add(
	'livechat.closeRoom',
	async (params) => {
		const { room } = params;
		if (!settings.get('Livechat_webhook_on_close')) {
			return params;
		}

		await sendToCRM('LivechatSession', room);

		return params;
	},
	callbacks.priority.MEDIUM,
	'livechat-send-crm-close-room',
);

callbacks.add(
	'livechat.afterForwardChatToAgent',
	async (params) => {
		const { rid, oldServedBy } = params;
		if (!settings.get('Livechat_webhook_on_forward')) {
			return params;
		}

		const originalRoom = await LivechatRooms.findOneById(rid);
		if (!originalRoom) {
			return params;
		}

		const room = Object.assign(originalRoom, { oldServedBy });
		await sendToCRM('LivechatSessionForwarded', room);
		return params;
	},
	callbacks.priority.MEDIUM,
	'livechat-send-crm-room-forwarded-to-agent',
);

callbacks.add(
	'livechat.afterForwardChatToDepartment',
	async (params) => {
		const { rid, oldDepartmentId } = params;
		if (!settings.get('Livechat_webhook_on_forward')) {
			return params;
		}

		const originalRoom = await LivechatRooms.findOneById(rid);
		if (!originalRoom) {
			return params;
		}

		const room = Object.assign(originalRoom, { oldDepartmentId });
		await sendToCRM('LivechatSessionForwarded', room);
		return params;
	},
	callbacks.priority.MEDIUM,
	'livechat-send-crm-room-forwarded-to-department',
);

callbacks.add(
	'livechat.saveInfo',
	async (room) => {
		// Do not send to CRM if the chat is still open
		if (!isOmnichannelRoom(room) || room.open) {
			return room;
		}

		return sendToCRM('LivechatEdit', room);
	},
	callbacks.priority.MEDIUM,
	'livechat-send-crm-save-info',
);

callbacks.add(
	'afterOmnichannelSaveMessage',
	async (message, { room }) => {
		// if the message has a token, it was sent from the visitor
		// if not, it was sent from the agent
		if (message.token && !settings.get('Livechat_webhook_on_visitor_message')) {
			return message;
		}
		if (!message.token && !settings.get('Livechat_webhook_on_agent_message')) {
			return message;
		}
		// if the message has a type means it is a special message (like the closing comment), so skips
		// unless the settings that handle with visitor navigation history are enabled
		if (message.t && !sendMessageType(message.t)) {
			return message;
		}

		await sendToCRM('Message', room, [message]);
		return message;
	},
	callbacks.priority.MEDIUM,
	'livechat-send-crm-message',
);

callbacks.add(
	'livechat.leadCapture',
	(room) => {
		if (!settings.get('Livechat_webhook_on_capture')) {
			return room;
		}
		return sendToCRM('LeadCapture', room, false);
	},
	callbacks.priority.MEDIUM,
	'livechat-send-crm-lead-capture',
);

```