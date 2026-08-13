## File: apps/meteor/tests/data/livechat/department.ts

```typescript
import { faker } from '@faker-js/faker';
import type { Credentials } from '@rocket.chat/api-client';
import type { ILivechatDepartment, IUser, LivechatDepartmentDTO } from '@rocket.chat/core-typings';
import { Random } from '@rocket.chat/random';
import { expect } from 'chai';

import { api, credentials, request } from '../api-data';
import { makeAgentAvailable } from './rooms';
import { createAgentAndReLogin, createAnAwayAgent, createAnOfflineAgent } from './users';
import type { WithRequiredProperty } from './utils';

const NewDepartmentData = ((): Partial<ILivechatDepartment> => ({
	enabled: true,
	name: `new department ${Random.id()}`,
	description: 'created from api',
	showOnRegistration: true,
	email: faker.internet.email(),
	showOnOfflineForm: true,
}))();

export const createDepartment = async (
	departmentData?: Partial<ILivechatDepartment>,
	agents?: { agentId: string; count?: string; order?: string }[],
): Promise<ILivechatDepartment> => {
    /* Implementation Hidden */
};

const updateDepartment = async (departmentId: string, departmentData: Partial<LivechatDepartmentDTO>): Promise<ILivechatDepartment> => {
    /* Implementation Hidden */
};

export type OnlineAgent = {
	user: WithRequiredProperty<IUser, 'username'>;
	credentials: Credentials;
};

export const createDepartmentWithAnOnlineAgent = async (): Promise<{ department: ILivechatDepartment; agent: OnlineAgent }> => {
    /* Implementation Hidden */
};

export const createDepartmentWith2OnlineAgents = async (): Promise<{
	department: ILivechatDepartment;
	agent1: OnlineAgent;
	agent2: OnlineAgent;
}> => {
    /* Implementation Hidden */
};

export const createDepartmentWithAgent = async (agent: OnlineAgent): Promise<{ department: ILivechatDepartment; agent: OnlineAgent }> => {
    /* Implementation Hidden */
};

export const addOrRemoveAgentFromDepartment = async (
	departmentId: string,
	agent: { agentId: string; username: string; count?: number; order?: number },
	add: boolean,
) => {
    /* Implementation Hidden */
};

export const createDepartmentWithAnOfflineAgent = async ({
	allowReceiveForwardOffline = false,
	fallbackForwardDepartment,
	departmentsAllowedToForward,
}: {
	allowReceiveForwardOffline?: boolean;
	fallbackForwardDepartment?: string;
	departmentsAllowedToForward?: string[];
}): Promise<{
	department: ILivechatDepartment;
	agent: {
		credentials: Credentials;
		user: WithRequiredProperty<IUser, 'username'>;
	};
}> => {
    /* Implementation Hidden */
};

export const createDepartmentWithAnAwayAgent = async ({
	allowReceiveForwardOffline = false,
	fallbackForwardDepartment,
	departmentsAllowedToForward,
}: {
	allowReceiveForwardOffline?: boolean;
	fallbackForwardDepartment?: string;
	departmentsAllowedToForward?: string[];
}): Promise<{
	department: ILivechatDepartment;
	agent: {
		credentials: Credentials;
		user: WithRequiredProperty<IUser, 'username'>;
	};
}> => {
    /* Implementation Hidden */
};

export const archiveDepartment = async (departmentId: string): Promise<void> => {
    /* Implementation Hidden */
};

export const disableDepartment = async (department: Omit<ILivechatDepartment, '_updatedAt'>): Promise<void> => {
    /* Implementation Hidden */
};

export const deleteDepartment = async (departmentId: string): Promise<void> => {
    /* Implementation Hidden */
};

export const getDepartmentById = async (departmentId: string): Promise<ILivechatDepartment> => {
    /* Implementation Hidden */
};

```