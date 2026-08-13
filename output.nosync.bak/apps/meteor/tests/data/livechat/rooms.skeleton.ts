## File: apps/meteor/tests/data/livechat/rooms.ts

```typescript
import { faker } from '@faker-js/faker';
import type { Credentials } from '@rocket.chat/api-client';
import type {
	ILivechatInquiryRecord,
	ILivechatAgent,
	ILivechatDepartment,
	ILivechatVisitor,
	IMessage,
	IOmnichannelRoom,
} from '@rocket.chat/core-typings';
import type { Response } from 'supertest';

import { api, credentials, methodCall, request } from '../api-data';
import { imgURL } from '../interactions';
import { getSettingValueById, restorePermissionToRoles, updateSetting } from '../permissions.helper';
import { adminUsername } from '../user';
import { getRandomVisitorToken } from './users';
import type { DummyResponse } from './utils';
import { sleep } from './utils';

export const createLivechatRoom = async (visitorToken: string, extraRoomParams?: Record<string, string>): Promise<IOmnichannelRoom> => {
    /* Implementation Hidden */
};

export const createLivechatRoomWidget = async (
	visitorToken: string,
	extraRoomParams?: Record<string, string>,
): Promise<IOmnichannelRoom> => {
    /* Implementation Hidden */
};

export const createVisitorWithCustomData = async ({
	department,
	visitorName,
	customPhone,
	customFields,
	customToken,
	customEmail,
	ignoreEmail = false,
	ignorePhone = false,
}: {
	department?: string;
	customPhone?: string;
	visitorName?: string;
	customEmail?: string;
	customFields?: { key: string; value: string; overwrite: boolean }[];
	customToken?: string;
	ignoreEmail?: boolean;
	ignorePhone?: boolean;
}): Promise<ILivechatVisitor> => {
    /* Implementation Hidden */
};

export const createVisitor = (
	department?: string,
	visitorName?: string,
	customEmail?: string,
	customPhone?: string,
): Promise<ILivechatVisitor> =>
	new Promise((resolve, reject) => {
		const token = getRandomVisitorToken();
		const email = customEmail || `${token}@${token}.com`;
		const phone = customPhone || `${Math.floor(Math.random() * 10000000000)}`;
		void request.get(api(`livechat/visitor/${token}`)).end((err: Error, res: DummyResponse<ILivechatVisitor>) => {
			if (!err && res && res.body && res.body.visitor) {
				return resolve(res.body.visitor);
			}
			void request
				.post(api('livechat/visitor'))
				.set(credentials)
				.send({
					visitor: {
						name: visitorName || `Visitor ${Date.now()}`,
						email,
						token,
						phone,
						customFields: [{ key: 'address', value: 'Rocket.Chat street', overwrite: true }],
						...(department ? { department } : {}),
					},
				})
				.end((err: Error, res: DummyResponse<ILivechatVisitor>) => {
					if (err) {
						return reject(err);
					}
					resolve(res.body.visitor);
				});
		});
	});

export const deleteVisitor = async (token: string): Promise<void> => {
    /* Implementation Hidden */
};

export const takeInquiry = async (inquiryId: string, agentCredentials?: Credentials): Promise<void> => {
    /* Implementation Hidden */
};

export const fetchInquiry = (roomId: string): Promise<ILivechatInquiryRecord> => {
    /* Implementation Hidden */
};

export const createDepartment = (
	agents?: { agentId: string; count?: number }[],
	name?: string,
	enabled = true,
	opts: Record<string, any> = {},
	departmentUnit?: { _id?: string },
	userCredentials: Credentials = credentials,
): Promise<ILivechatDepartment> => {
    /* Implementation Hidden */
};

export const updateDepartment = ({
	departmentId,
	userCredentials,
	agents,
	name,
	enabled = true,
	opts = {},
	departmentUnit,
}: {
	departmentId: string;
	userCredentials: Credentials;
	agents?: { agentId: string }[];
	name?: string;
	enabled?: boolean;
	opts?: Record<string, any>;
	departmentUnit?: { _id?: string };
}): Promise<ILivechatDepartment> => {
    /* Implementation Hidden */
};

export const deleteAgent = async (agentId: string = credentials['X-User-Id']): Promise<void> => {
    /* Implementation Hidden */
};

export const createAgent = (overrideUsername?: string): Promise<ILivechatAgent> =>
	new Promise((resolve, reject) => {
		void request
			.post(api('livechat/users/agent'))
			.set(credentials)
			.send({
				username: overrideUsername || adminUsername,
			})
			.end((err: Error, res: DummyResponse<ILivechatAgent>) => {
				if (err) {
					return reject(err);
				}
				resolve(res.body.user);
			});
	});

export const createManager = (overrideUsername?: string): Promise<ILivechatAgent> =>
	new Promise((resolve, reject) => {
		void request
			.post(api('livechat/users/manager'))
			.set(credentials)
			.send({
				username: overrideUsername || adminUsername,
			})
			.end((err: Error, res: DummyResponse<ILivechatAgent>) => {
				if (err) {
					return reject(err);
				}
				resolve(res.body.user);
			});
	});

export const switchLivechatStatus = async (status: 'available' | 'not-available', overrideCredentials?: Credentials): Promise<void> => {
    /* Implementation Hidden */
};

export const makeAgentAvailable = async (overrideCredentials?: Credentials): Promise<Response> => {
    /* Implementation Hidden */
};

export const makeAgentUnavailable = async (overrideCredentials?: Credentials): Promise<void> => {
    /* Implementation Hidden */
};

export const getLivechatRoomInfo = (roomId: string): Promise<IOmnichannelRoom> => {
    /* Implementation Hidden */
};

/**
 * @summary Sends message as visitor
 */
export const sendMessage = (roomId: string, message: string, visitorToken: string): Promise<IMessage> => {
    /* Implementation Hidden */
};

export const uploadFile = (roomId: string, visitorToken: string): Promise<IMessage> => {
    /* Implementation Hidden */
};

// Sends a message using sendMessage method from agent
export const sendAgentMessage = (roomId: string, msg?: string, userCredentials: Credentials = credentials): Promise<IMessage> => {
    /* Implementation Hidden */
};

export const fetchMessages = (roomId: string, visitorToken: string): Promise<IMessage[]> => {
    /* Implementation Hidden */
};

export const closeOmnichannelRoom = async (roomId: string, tags?: string[]): Promise<void> => {
    /* Implementation Hidden */
};

export const bulkCreateLivechatRooms = async (
	amount: number,
	department?: string,
	resolveRoomExtraParams?: (index: number) => Record<string, string> | undefined,
): Promise<IOmnichannelRoom[]> => {
    /* Implementation Hidden */
};

export const startANewLivechatRoomAndTakeIt = async ({
	departmentId,
	agent,
}: {
	departmentId?: string;
	agent?: Credentials;
} = {}): Promise<{ room: IOmnichannelRoom; visitor: ILivechatVisitor }> => {
    /* Implementation Hidden */
};

export const placeRoomOnHold = async (roomId: string): Promise<void> => {
    /* Implementation Hidden */
};

export const moveBackToQueue = async (roomId: string, overrideCredentials?: Credentials): Promise<void> => {
    /* Implementation Hidden */
};

```