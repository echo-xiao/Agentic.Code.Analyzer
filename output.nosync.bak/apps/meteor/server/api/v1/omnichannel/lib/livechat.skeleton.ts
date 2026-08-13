## File: apps/meteor/server/api/v1/omnichannel/lib/livechat.ts

```typescript
import type { ILivechatAgent, ILivechatDepartment, ILivechatTrigger, ILivechatVisitor, IOmnichannelRoom } from '@rocket.chat/core-typings';
import { License } from '@rocket.chat/license';
import { EmojiCustom, LivechatTrigger, LivechatVisitors, LivechatRooms, LivechatDepartment } from '@rocket.chat/models';
import { makeFunction } from '@rocket.chat/patch-injection';
import { Meteor } from 'meteor/meteor';

import { normalizeAgent } from '../../../../../app/livechat/server/lib/Helper';
import { getInitSettings } from '../../../../../app/livechat/server/lib/settings';
import { callbacks } from '../../../../lib/callbacks';

async function findTriggers(): Promise<Pick<ILivechatTrigger, '_id' | 'actions' | 'conditions' | 'runOnce'>[]> {
    /* Implementation Hidden */
}

export type CheckUnitsFromUser = {
	userId?: string;
	businessUnit?: string;
};

export const checkUnitsFromUser = makeFunction(async (_params: CheckUnitsFromUser): Promise<void> => undefined);

async function findDepartments(
	businessUnit?: string,
	userId?: string,
): Promise<Pick<ILivechatDepartment, '_id' | 'name' | 'showOnRegistration' | 'showOnOfflineForm' | 'departmentsAllowedToForward'>[]> {
    /* Implementation Hidden */
}

export function findGuest(token: string): Promise<ILivechatVisitor | null> {
    /* Implementation Hidden */
}

export function findGuestWithoutActivity(token: string): Promise<ILivechatVisitor | null> {
    /* Implementation Hidden */
}

export async function findRoom(token: string, rid?: string): Promise<IOmnichannelRoom | null> {
    /* Implementation Hidden */
}

export async function findOpenRoom(token: string, departmentId?: string, callerId?: string): Promise<IOmnichannelRoom | undefined> {
    /* Implementation Hidden */
}

export async function findAgent(agentId?: string): Promise<void | { hiddenInfo: boolean } | ILivechatAgent> {
    /* Implementation Hidden */
}

export function normalizeHttpHeaderData(headers: Headers = new Headers()): {
	httpHeaders: Record<string, string | string[] | undefined>;
} {
    /* Implementation Hidden */
}

export async function settings({ businessUnit = '', userId }: { businessUnit?: string; userId?: string } = {}): Promise<
	Record<string, string | number | any>
> {
    /* Implementation Hidden */
}

export const getExtraConfigInfo = makeFunction(
	async (options: {
		room?: IOmnichannelRoom;
	}): Promise<{
		queueInfo?: unknown;
		customFields?: {
			options?: string[] | undefined;
			_id: string;
			label: string;
			regexp: string | undefined;
			required: boolean;
			type: string | undefined;
			defaultValue: string | null;
		}[];
		room?: IOmnichannelRoom;
	}> => options,
);

export const onCheckRoomParams = makeFunction((params: any) => params);

```