## File: apps/meteor/ee/app/livechat-enterprise/server/lib/Helper.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type {
	ILivechatDepartment,
	IOmnichannelRoom,
	IOmnichannelServiceLevelAgreements,
	InquiryWithAgentInfo,
} from '@rocket.chat/core-typings';
import type { Updater } from '@rocket.chat/models';
import {
	Rooms as RoomRaw,
	LivechatRooms,
	LivechatDepartment as LivechatDepartmentRaw,
	LivechatCustomField,
	LivechatInquiry,
	Users,
} from '@rocket.chat/models';
import moment from 'moment';
import type { Document } from 'mongodb';

import { OmnichannelQueueInactivityMonitor } from './QueueInactivityMonitor';
import { updateInquiryQueueSla } from './SlaHelper';
import { memoizeDebounce } from './debounceByParams';
import { logger } from './logger';
import { getOmniChatSortQuery } from '../../../../../app/livechat/lib/inquiries';
import { getInquirySortMechanismSetting } from '../../../../../app/livechat/server/lib/settings';
import { settings } from '../../../../../app/settings/server';
import { callbacks } from '../../../../../server/lib/callbacks';

type QueueInfo = {
	message: {
		text: any;
		user: {
			_id: string;
			username: string;
		};
	};
	statistics: Document;
	numberMostRecentChats: number;
};

export const isAgentWithinChatLimits = async ({
	agentId,
	departmentId,
	totalChats,
	departmentChats,
}: {
	agentId: string;
	departmentId?: string;
	totalChats: number;
	departmentChats: number;
}): Promise<boolean> => {
    /* Implementation Hidden */
};

const getWaitingQueueMessage = async (departmentId?: string) => {
    /* Implementation Hidden */
};

const getQueueInfo = async (department?: string) => {
    /* Implementation Hidden */
};

const getSpotEstimatedWaitTime = (spot: number, maxNumberSimultaneousChat: number, avgChatDuration: number) => {
    /* Implementation Hidden */
};

const normalizeQueueInfo = async ({
	position,
	queueInfo,
	department,
}: {
	position: number;
	department?: string;
	queueInfo?: QueueInfo;
}) => {
    /* Implementation Hidden */
};

export const dispatchInquiryPosition = async (inquiry: Omit<InquiryWithAgentInfo, 'v'>, queueInfo?: QueueInfo) => {
    /* Implementation Hidden */
};

const dispatchWaitingQueueStatus = async (department?: string) => {
    /* Implementation Hidden */
};

// When dealing with lots of queued items we need to make sure to notify their position
// but we don't need to notify _each_ change that takes place, just their final position
export const debouncedDispatchWaitingQueueStatus = memoizeDebounce(dispatchWaitingQueueStatus, 1200);

export const setPredictedVisitorAbandonmentTime = async (
	room: Pick<IOmnichannelRoom, '_id' | 'responseBy' | 'departmentId'>,
	roomUpdater?: Updater<IOmnichannelRoom>,
) => {
    /* Implementation Hidden */
};

export const updatePredictedVisitorAbandonment = async () => {
    /* Implementation Hidden */
};

export const updateQueueInactivityTimeout = async () => {
    /* Implementation Hidden */
};

export const updateSLAInquiries = async (
	executedBy: string,
	sla?: Pick<IOmnichannelServiceLevelAgreements, '_id' | 'dueTimeInMinutes'>,
) => {
    /* Implementation Hidden */
};

export const getLivechatCustomFields = async () => {
    /* Implementation Hidden */
};

export const getLivechatQueueInfo = async (room?: IOmnichannelRoom) => {
    /* Implementation Hidden */
};

```