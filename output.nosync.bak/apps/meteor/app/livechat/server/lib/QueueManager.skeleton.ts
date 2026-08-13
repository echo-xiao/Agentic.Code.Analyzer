## File: apps/meteor/app/livechat/server/lib/QueueManager.ts

```typescript
import { Apps, AppEvents } from '@rocket.chat/apps';
import { AppsEngineException } from '@rocket.chat/apps-engine/definition/exceptions/AppsEngineException';
import { Message, Omnichannel } from '@rocket.chat/core-services';
import type {
	ILivechatDepartment,
	IOmnichannelRoomInfo,
	IOmnichannelRoomExtraData,
	AtLeast,
	ILivechatInquiryRecord,
	ILivechatVisitor,
	IOmnichannelRoom,
	SelectedAgent,
} from '@rocket.chat/core-typings';
import { LivechatInquiryStatus } from '@rocket.chat/core-typings';
import { Logger } from '@rocket.chat/logger';
import type { InsertionModel } from '@rocket.chat/model-typings';
import { LivechatContacts, LivechatDepartment, LivechatInquiry, LivechatRooms, Users } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';
import { Match, check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { createLivechatRoom, createLivechatInquiry, allowAgentSkipQueue, prepareLivechatRoom } from './Helper';
import { RoutingManager } from './RoutingManager';
import { isVerifiedChannelInSource } from './contacts/isVerifiedChannelInSource';
import { checkOnlineForDepartment } from './departmentsLib';
import { afterInquiryQueued, afterRoomQueued, beforeDelegateAgent, beforeRouteChat, onNewRoom } from './hooks';
import { checkOnlineAgents, getOnlineAgents } from './service-status';
import { getInquirySortMechanismSetting } from './settings';
import { dispatchInquiryPosition } from '../../../../ee/app/livechat-enterprise/server/lib/Helper';
import { client, shouldRetryTransaction } from '../../../../server/database/utils';
import { sendNotification } from '../../../lib/server';
import { notifyOnLivechatInquiryChangedById, notifyOnLivechatInquiryChanged } from '../../../lib/server/lib/notifyListener';
import { settings } from '../../../settings/server';
import { i18n } from '../../../utils/lib/i18n';
import { getOmniChatSortQuery } from '../../lib/inquiries';

const logger = new Logger('QueueManager');

export const saveQueueInquiry = async (inquiry: ILivechatInquiryRecord) => {
    /* Implementation Hidden */
};

/**
 *  @deprecated
 */
export const queueInquiry = async (inquiry: ILivechatInquiryRecord, defaultAgent?: SelectedAgent) => {
    /* Implementation Hidden */
};

const getDepartment = async (department: string): Promise<string | undefined> => {
    /* Implementation Hidden */
};

export class QueueManager {
	static async requeueInquiry(inquiry: ILivechatInquiryRecord, room: IOmnichannelRoom, defaultAgent?: SelectedAgent) {
        /* Implementation Hidden */
    }

	private static fnQueueInquiryStatus: (typeof QueueManager)['getInquiryStatus'] | undefined;

	public static patchInquiryStatus(fn: (typeof QueueManager)['getInquiryStatus']) {
        /* Implementation Hidden */
    }

	static async getInquiryStatus({ room, agent }: { room: IOmnichannelRoom; agent?: SelectedAgent }): Promise<LivechatInquiryStatus> {
        /* Implementation Hidden */
    }

	static async processNewInquiry(inquiry: ILivechatInquiryRecord, room: IOmnichannelRoom, defaultAgent?: SelectedAgent | null) {
        /* Implementation Hidden */
    }

	static async verifyInquiry(inquiry: ILivechatInquiryRecord, room: IOmnichannelRoom) {
        /* Implementation Hidden */
    }

	static async isRoomContactVerified(room: IOmnichannelRoom): Promise<boolean> {
        /* Implementation Hidden */
    }

	static async startConversation(
		rid: string,
		insertionRoom: InsertionModel<IOmnichannelRoom>,
		guest: ILivechatVisitor,
		roomInfo: IOmnichannelRoomInfo,
		defaultAgent?: SelectedAgent,
		message?: string,
		extraData?: IOmnichannelRoomExtraData,
		attempts = 3,
	): Promise<{ room: IOmnichannelRoom; inquiry: ILivechatInquiryRecord }> {
        /* Implementation Hidden */
    }

	static async requestRoom({
		guest,
		rid = Random.id(),
		message,
		roomInfo,
		agent,
		extraData: { customFields, ...extraData } = {},
	}: {
		guest: ILivechatVisitor;
		rid?: string;
		message?: string;
		roomInfo: IOmnichannelRoomInfo;
		agent?: SelectedAgent;
		extraData?: IOmnichannelRoomExtraData;
	}) {
        /* Implementation Hidden */
    }

	static async dispatchInquiryPosition(
		inquiry: ILivechatInquiryRecord,
		room: AtLeast<IOmnichannelRoom, 'servedBy' | 'departmentId'>,
	): Promise<void> {
        /* Implementation Hidden */
    }

	static async unarchiveRoom(archivedRoom: IOmnichannelRoom) {
        /* Implementation Hidden */
    }

	private static dispatchInquiryQueued = async (inquiry: ILivechatInquiryRecord, room: IOmnichannelRoom, agent?: SelectedAgent | null) => {
		if (RoutingManager.getConfig()?.autoAssignAgent) {
			return;
		}

		logger.debug({ msg: 'Notifying agents of queued inquiry', inquiryId: inquiry._id });

		const { department, rid, v } = inquiry;
		// Alert only the online agents of the queued request
		const onlineAgents = await getOnlineAgents(department, agent);

		if (!onlineAgents) {
			logger.debug('Cannot notify agents of queued inquiry. No online agents found');
			return;
		}

		const notificationUserName = v && (v.name || v.username);

		for await (const agent of onlineAgents) {
			const { _id, active, emails, language, status, statusConnection, username } = agent;
			await sendNotification({
				// fake a subscription in order to make use of the function defined above
				subscription: {
					rid,
					u: {
						_id,
					},
					receiver: [
						{
							active,
							emails,
							language,
							status,
							statusConnection,
							username,
						},
					],
					name: '',
				},
				sender: v,
				hasMentionToAll: true, // consider all agents to be in the room
				hasReplyToThread: false,
				disableAllMessageNotifications: false,
				hasMentionToHere: false,
				message: { _id: '', u: v, msg: '' },
				// we should use server's language for this type of messages instead of user's
				notificationMessage: i18n.t('User_started_a_new_conversation', { username: notificationUserName, lng: language }),
				room: { ...room, name: i18n.t('New_chat_in_queue', { lng: language }) },
				mentionIds: [],
			});
		}
	};
}

```