## File: apps/meteor/tests/e2e/federation/utils/channel.ts

```typescript
import { faker } from '@faker-js/faker';
import type { Page } from '@playwright/test';

import { doLogin } from './auth';
import type { API } from './test';
import type { FederationChannel } from '../page-objects/channel';

const doLoginAndGoToHome = async (
	page: Page,
	server: {
		url: string;
		username: string;
		password: string;
	},
): Promise<void> => {
    /* Implementation Hidden */
};

export const createChannelAndInviteRemoteUserToCreateLocalUser = async ({
	page,
	poFederationChannelServer,
	fullUsernameFromServer,
	server,
	closePageAfterCreation = true,
}: {
	page: Page;
	poFederationChannelServer: FederationChannel;
	fullUsernameFromServer: string;
	server: {
		url: string;
		username: string;
		password: string;
	};
	closePageAfterCreation?: boolean;
}): Promise<string> => {
    /* Implementation Hidden */
};

export const createGroupAndInviteRemoteUserToCreateLocalUser = async ({
	page,
	poFederationChannelServer,
	fullUsernameFromServer,
	server,
}: {
	page: Page;
	poFederationChannelServer: FederationChannel;
	fullUsernameFromServer: string;
	server: {
		url: string;
		username: string;
		password: string;
		matrixServerName: string;
	};
}): Promise<string> => {
    /* Implementation Hidden */
};

export const createGroupUsingAPI = async (api: API, name: string) => {
    /* Implementation Hidden */
};

export const createChannelUsingAPI = async (api: API, name: string) => {
    /* Implementation Hidden */
};

```