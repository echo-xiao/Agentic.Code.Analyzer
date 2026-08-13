## File: apps/meteor/tests/e2e/federation/utils/test.ts

```typescript
/* eslint-disable react-hooks/rules-of-hooks */
import type { APIResponse } from '@playwright/test';
import { test as baseTest } from '@playwright/test';

import { API_PREFIX } from '../../config/constants';
import * as constants from '../config/constants';

export type AnyObj = { [key: string]: any };

export type API = {
	get(uri: string, prefix?: string): Promise<APIResponse>;
	post(uri: string, data: AnyObj, prefix?: string): Promise<APIResponse>;
	put(uri: string, data: AnyObj, prefix?: string): Promise<APIResponse>;
	delete(uri: string, prefix?: string): Promise<APIResponse>;
};

export type BaseTest = {
	apiServer1: API;
	apiServer2: API;
};

const api = async (request: any, use: any, user: string, password: string, baseUrl: string) => {
    /* Implementation Hidden */
};

export const test = baseTest.extend<BaseTest>({
	apiServer1: async ({ request }, use) =>
		api(request, use, constants.RC_SERVER_1.username, constants.RC_SERVER_1.password, constants.RC_SERVER_1.url),
	apiServer2: async ({ request }, use) =>
		api(request, use, constants.RC_SERVER_2.username, constants.RC_SERVER_2.password, constants.RC_SERVER_2.url),
});

export const { expect } = test;

export const setupTesting = async (api: API) => {
    /* Implementation Hidden */
};

export const tearDownTesting = async (api: API) => {
    /* Implementation Hidden */
};

```