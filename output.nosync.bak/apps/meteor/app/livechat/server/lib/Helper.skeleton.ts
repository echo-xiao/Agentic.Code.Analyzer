## File: apps/meteor/app/livechat/server/lib/Helper.ts

```typescript
import { Apps, AppEvents } from '@rocket.chat/apps';
import { LivechatTransferEventType } from '@rocket.chat/apps-engine/definition/livechat';
import { api, Message, Omnichannel } from '@rocket.chat/core-services';
import type {
	ILivechatVisitor,
	IOmnichannelRoom,
	SelectedAgent,
	ISubscription,
	ILivechatInquiryRecord,
	IUser,
	TransferData,
	ILivechatDepartmentAgents,
	TransferByData,
	ILivechatAgent,
	ILivechatDepartment,
	IOmnichannelRoomInfo,
	IOmnichannelInquiryExtraData,
	IOmnichannelRoomExtraData,
	ILivechatContact,
} from '@rocket.chat/core-typings';
import { LivechatInquiryStatus, OmnichannelSourceType, DEFAULT_SLA_CONFIG, UserStatus } from '@rocket.chat/core-typings';
import { LivechatPriorityWeight } from '@rocket.chat/core-typings/src/ILivechatPriority';
import { Logger } from '@rocket.chat/logger';
import type { InsertionModel } from '@rocket.chat/model-typings';
import {
	LivechatDepartmentAgents,
	LivechatInquiry,
	LivechatRooms,
	LivechatDepartment,
	Subscriptions,
	Users,
	LivechatContacts,
} from '@rocket.chat/models';
import { removeEmpty, validateEmail as validatorFunc } from '@rocket.chat/tools';
import { Match, check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import type { ClientSession } from 'mongodb';
import { ObjectId } from 'mongodb';

import { queueInquiry, saveQueueInquiry } from './QueueManager';
import { RoutingManager } from './RoutingManager';
import { isVerifiedChannelInSource } from './contacts/isVerifiedChannelInSource';
import { migrateVisitorIfMissingContact } from './contacts/migrateVisitorIfMissingContact';
import { afterRoomQueued, beforeNewRoom } from './hooks';
import { checkOnlineAgents, getOnlineAgents } from './service-status';
import { saveTransferHistory } from './transfer';
import { hasRoleAsync } from '../../../../server/lib/authorization/hasRole';
import { callbacks } from '../../../../server/lib/callbacks';
import { i18n } from '../../../../server/lib/i18n';
import { sendNotification } from '../../../lib/server';
import {
	notifyOnLivechatDepartmentAgentChanged,
	notifyOnLivechatDepartmentAgentChangedByAgentsAndDepartmentId,
	notifyOnSubscriptionChangedById,
	notifyOnSubscriptionChangedByRoomId,
	notifyOnSubscriptionChanged,
	notifyOnRoomChangedById,
	notifyOnLivechatInquiryChangedByRoom,
} from '../../../lib/server/lib/notifyListener';
import { settings } from '../../../settings/server';

const logger = new Logger('LivechatHelper');
export const allowAgentSkipQueue = (agent: SelectedAgent) => {
    /* Implementation Hidden */
};
export const prepareLivechatRoom = async (
	rid: string,
	guest: ILivechatVisitor,
	roomInfo: IOmnichannelRoomInfo = { source: { type: OmnichannelSourceType.OTHER } },
	extraData?: IOmnichannelRoomExtraData,
): Promise<InsertionModel<IOmnichannelRoom>> => {
    /* Implementation Hidden */
};

export const createLivechatRoom = async (room: InsertionModel<IOmnichannelRoom>, session: ClientSession) => {
    /* Implementation Hidden */
};

export const createLivechatInquiry = async ({
	rid,
	name,
	guest,
	message,
	initialStatus,
	extraData,
	session,
}: {
	rid: string;
	name?: string;
	guest?: Pick<ILivechatVisitor, '_id' | 'username' | 'status' | 'department' | 'name' | 'token' | 'activity'>;
	message?: string;
	initialStatus?: LivechatInquiryStatus;
	extraData?: IOmnichannelInquiryExtraData;
	session?: ClientSession;
}) => {
    /* Implementation Hidden */
};

export const createLivechatSubscription = async (
	rid: string,
	name: string,
	guest: Pick<ILivechatVisitor, '_id' | 'username' | 'status' | 'name' | 'token' | 'phone'>,
	agent: SelectedAgent,
	department?: string,
) => {
    /* Implementation Hidden */
};

export const removeAgentFromSubscription = async (rid: string, { _id, username }: Pick<IUser, '_id' | 'username'>) => {
    /* Implementation Hidden */
};

export const parseAgentCustomFields = (customFields?: Record<string, any>) => {
    /* Implementation Hidden */
};

export const normalizeAgent = async (agentId?: string) => {
    /* Implementation Hidden */
};

export const dispatchAgentDelegated = async (rid: string, agentId?: string) => {
    /* Implementation Hidden */
};

/**
 * @deprecated
 */

export const dispatchInquiryQueued = async (inquiry: ILivechatInquiryRecord, agent?: SelectedAgent | null) => {
    /* Implementation Hidden */
};

export const forwardRoomToAgent = async (room: IOmnichannelRoom, transferData: TransferData) => {
    /* Implementation Hidden */
};

export const updateChatDepartment = async ({
	rid,
	newDepartmentId,
	oldDepartmentId,
}: {
	rid: string;
	newDepartmentId: string;
	oldDepartmentId?: string;
}) => {
    /* Implementation Hidden */
};

export const forwardRoomToDepartment = async (room: IOmnichannelRoom, guest: ILivechatVisitor, transferData: TransferData) => {
    /* Implementation Hidden */
};

type MakePropertyOptional<T, K extends keyof T> = Omit<T, K> & { [P in K]?: T[P] };

export const normalizeTransferredByData = (
	transferredBy: MakePropertyOptional<TransferByData, 'userType'>,
	room: IOmnichannelRoom,
): TransferByData => {
    /* Implementation Hidden */
};

const parseFromIntOrStr = (value: string | number) => {
    /* Implementation Hidden */
};

export const updateDepartmentAgents = async (
	departmentId: string,
	agents: {
		upsert?: (Pick<ILivechatDepartmentAgents, 'agentId'> & { count?: number; order?: number })[];
		remove?: Pick<ILivechatDepartmentAgents, 'agentId'>[];
	},
	departmentEnabled: boolean,
) => {
    /* Implementation Hidden */
};

export const validateEmail = (email: string) => {
    /* Implementation Hidden */
};

```