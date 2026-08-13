## File: apps/meteor/app/livechat/server/lib/closeRoom.ts

```typescript
import { Apps, AppEvents } from '@rocket.chat/apps';
import { Message } from '@rocket.chat/core-services';
import type { ILivechatDepartment, ILivechatInquiryRecord, IOmnichannelRoom, IOmnichannelRoomClosingInfo } from '@rocket.chat/core-typings';
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import { LivechatDepartment, LivechatInquiry, LivechatRooms, Subscriptions, Users } from '@rocket.chat/models';
import { applyDepartmentRestrictions } from '@rocket.chat/omni-core';
import type { ClientSession } from 'mongodb';

import type { CloseRoomParams, CloseRoomParamsByUser, CloseRoomParamsByVisitor } from './localTypes';
import { livechatLogger as logger } from './logger';
import { parseTranscriptRequest } from './parseTranscriptRequest';
import { client, shouldRetryTransaction } from '../../../../server/database/utils';
import { callbacks } from '../../../../server/lib/callbacks';
import {
	notifyOnLivechatInquiryChanged,
	notifyOnRoomChanged,
	notifyOnRoomChangedById,
	notifyOnSubscriptionChanged,
} from '../../../lib/server/lib/notifyListener';
import { settings } from '../../../settings/server';

type ChatCloser = { _id: string; username: string | undefined };

const isRoomClosedByUserParams = (params: CloseRoomParams): params is CloseRoomParamsByUser =>
	(params as CloseRoomParamsByUser).user !== undefined;
const isRoomClosedByVisitorParams = (params: CloseRoomParams): params is CloseRoomParamsByVisitor =>
	(params as CloseRoomParamsByVisitor).visitor !== undefined;

export async function closeRoom(params: CloseRoomParams, attempts = 2): Promise<void> {
    /* Implementation Hidden */
}

async function afterRoomClosed(
	newRoom: IOmnichannelRoom,
	chatCloser: ChatCloser,
	inquiry: ILivechatInquiryRecord | null,
	params: CloseRoomParams,
): Promise<void> {
    /* Implementation Hidden */
}

async function doCloseRoom(
	params: CloseRoomParams,
	session: ClientSession,
): Promise<{ room: IOmnichannelRoom; closedBy: ChatCloser; removedInquiry: ILivechatInquiryRecord | null }> {
    /* Implementation Hidden */
}

async function resolveChatTags(
	room: IOmnichannelRoom,
	options: CloseRoomParams['options'] = {},
): Promise<{ updatedOptions: CloseRoomParams['options'] }> {
    /* Implementation Hidden */
}

export async function closeOpenChats(userId: string, comment?: string) {
    /* Implementation Hidden */
}

```