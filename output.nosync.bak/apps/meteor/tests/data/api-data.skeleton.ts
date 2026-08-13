## File: apps/meteor/tests/data/api-data.ts

```typescript
import type { Credentials } from '@rocket.chat/api-client';
import type { Path } from '@rocket.chat/rest-typings';
import type { CallbackHandler, Response } from 'supertest';
import supertest from 'supertest';

import { adminUsername, adminPassword } from './user';

export const apiUrl = process.env.TEST_API_URL || 'http://localhost:3000';

export const request = supertest(apiUrl);
const prefix = '/api/v1/';

export function wait(cb: () => void, time: number) {
    /* Implementation Hidden */
}

const privateChannelName = `private-channel-test-${Date.now()}` as const;

const username = 'user.test';
const email = `${username}@rocket.chat`;

export const apiUsername = `api${username}-${Date.now()}` as const;
export const apiEmail = `api${email}-${Date.now()}` as const;
export const apiPrivateChannelName = `api${privateChannelName}-${Date.now()}` as const;

const roleNameUsers = `role-name-test-users-${Date.now()}` as const;
const roleNameSubscriptions = `role-name-test-subscriptions-${Date.now()}` as const;
const roleScopeUsers = 'Users' as const;
const roleScopeSubscriptions = 'Subscriptions' as const;
const roleDescription = `role-description-test-${Date.now()}` as const;

export const apiRoleNameUsers = `api${roleNameUsers}` as const;
export const apiRoleNameSubscriptions = `api${roleNameSubscriptions}` as const;
export const apiRoleScopeUsers = `${roleScopeUsers}` as const;
export const apiRoleScopeSubscriptions = `${roleScopeSubscriptions}` as const;
export const apiRoleDescription = `api${roleDescription}` as const;
export const reservedWords = ['admin', 'administrator', 'system', 'user'] as const;

export const credentials: Credentials = {
	'X-Auth-Token': undefined,
	'X-User-Id': undefined,
} as unknown as Credentials; // FIXME

export type PathWithoutPrefix<TPath> = TPath extends `/v1/${infer U}` ? U : never;

export function api<TPath extends PathWithoutPrefix<Path>>(path: TPath) {
    /* Implementation Hidden */
}

export function methodCall<TMethodName extends string>(methodName: TMethodName) {
    /* Implementation Hidden */
}

export function methodCallAnon<TMethodName extends string>(methodName: TMethodName) {
    /* Implementation Hidden */
}

export function log(res: Response) {
    /* Implementation Hidden */
}

let instanceId: string | undefined;

export function getCredentials(done?: CallbackHandler) {
    /* Implementation Hidden */
}

export function getInstanceId() {
    /* Implementation Hidden */
}

```