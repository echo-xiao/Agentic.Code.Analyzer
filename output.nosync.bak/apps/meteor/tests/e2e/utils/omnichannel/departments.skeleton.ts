## File: apps/meteor/tests/e2e/utils/omnichannel/departments.ts

```typescript
import { faker } from '@faker-js/faker';
import type { ILivechatDepartment } from '@rocket.chat/core-typings';

import type { BaseTest } from '../test';

type CreateDepartmentParams = {
	name?: string;
	enabled?: boolean;
	description?: string;
	showOnRegistration?: boolean;
	showOnOfflineForm?: boolean;
	requestTagBeforeClosingChat?: boolean;
	email?: string;
	chatClosingTags?: string[];
	offlineMessageChannelName?: string;
	abandonedRoomsCloseCustomMessage?: string;
	waitingQueueMessage?: string;
	departmentsAllowedToForward?: string[];
	fallbackForwardDepartment?: string;
	maxNumberSimultaneousChat?: number;
	allowReceiveForwardOffline?: boolean;
};

export const createDepartment = async (
	api: BaseTest['api'],
	{
		name = '',
		enabled = true,
		description = '',
		showOnRegistration = false,
		showOnOfflineForm = false,
		requestTagBeforeClosingChat = false,
		email = '',
		chatClosingTags = [],
		offlineMessageChannelName = '',
		abandonedRoomsCloseCustomMessage = '',
		waitingQueueMessage = '',
		departmentsAllowedToForward = [],
		fallbackForwardDepartment = '',
		maxNumberSimultaneousChat,
		allowReceiveForwardOffline,
	}: CreateDepartmentParams = {},
) => {
    /* Implementation Hidden */
};

export const addAgentToDepartment = async (
	api: BaseTest['api'],
	{ department, agentId, username }: { department: ILivechatDepartment; agentId: string; username?: string },
) =>
	api.post(`/livechat/department/${department._id}/agents`, {
		remove: [],
		upsert: [
			{
				agentId,
				username: username || agentId,
				count: 0,
				order: 0,
			},
		],
	});

export const deleteDepartment = async (api: BaseTest['api'], { id }: { id: string }) => api.delete(`/livechat/department/${id}`);

```