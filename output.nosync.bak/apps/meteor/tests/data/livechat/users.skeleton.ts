## File: apps/meteor/tests/data/livechat/users.ts

```typescript
import { faker } from '@faker-js/faker';
import type { Credentials } from '@rocket.chat/api-client';
import { UserStatus, type ILivechatAgent, type IUser } from '@rocket.chat/core-typings';
import { Random } from '@rocket.chat/random';

import { api, credentials, request } from '../api-data';
import { password } from '../user';
import { createUser, login, setUserAway, setUserStatus } from '../users.helper';
import { createAgent, makeAgentAvailable, makeAgentUnavailable } from './rooms';

export const createBotAgent = async (): Promise<{
	credentials: Credentials;
	user: IUser;
}> => {
    /* Implementation Hidden */
};

export const getRandomVisitorToken = (): string => faker.string.alphanumeric(17);

export const getAgent = async (userId: string): Promise<ILivechatAgent> => {
    /* Implementation Hidden */
};

export const removeAgent = async (userId: string): Promise<void> => {
    /* Implementation Hidden */
};

export const createAgentAndReLogin = async (): Promise<{
	credentials: Credentials;
	user: IUser & { username: string };
}> => {
    /* Implementation Hidden */
};

export const createAnOnlineAgent = async (): Promise<{
	credentials: Credentials;
	user: IUser & { username: string };
}> => {
    /* Implementation Hidden */
};

export const createAnOfflineAgent = async (): Promise<{
	credentials: Credentials;
	user: IUser & { username: string };
}> => {
    /* Implementation Hidden */
};

export const createAnAwayAgent = async (): Promise<{
	credentials: Credentials;
	user: IUser & { username: string };
}> => {
    /* Implementation Hidden */
};

export const updateLivechatSettingsForUser = async (
	agentId: string,
	livechatSettings: Record<string, any>,
	agentDepartments: string[] = [],
): Promise<void> => {
    /* Implementation Hidden */
};

```