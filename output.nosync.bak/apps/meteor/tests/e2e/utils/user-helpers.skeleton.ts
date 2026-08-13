## File: apps/meteor/tests/e2e/utils/user-helpers.ts

```typescript
import { faker } from '@faker-js/faker';
import type { APIResponse } from '@playwright/test';
import type { IUser } from '@rocket.chat/core-typings';

import type { BaseTest } from './test';
import { BASE_URL, DEFAULT_USER_CREDENTIALS } from '../config/constants';
import type { IUserState } from '../fixtures/userStates';

export interface ICreateUserOptions {
	username?: string;
	email?: string;
	name?: string;
	password?: string;
	roles?: string[];
	data?: Record<string, any>;
}

export interface ITestUser {
	response: APIResponse;
	data: IUser & { username: string };
	deleted: boolean;
	delete: () => Promise<APIResponse | undefined>;
	markAsDeleted: () => void;
}

/**
 * Creates a test user with optional customizations
 */
export async function createTestUser(api: BaseTest['api'], options: ICreateUserOptions = {}): Promise<ITestUser> {
    /* Implementation Hidden */
}

/**
 * Logs in a test user via the REST API and returns an IUserState
 * suitable for use with createAuxContext.
 *
 * Use this instead of the pre-baked Users.userN fixtures whenever the test
 * will deactivate (or otherwise invalidate the session of) the user, so that
 * shared fixture tokens are never corrupted.
 */
export async function loginTestUser(api: BaseTest['api'], user: ITestUser): Promise<IUserState> {
    /* Implementation Hidden */
}

/**
 * Creates multiple test users at once
 */
export async function createTestUsers(api: BaseTest['api'], count: number, options: ICreateUserOptions = {}): Promise<ITestUser[]> {
    /* Implementation Hidden */
}

```