## File: apps/meteor/tests/data/roles.helper.ts

```typescript
import type { Credentials } from '@rocket.chat/api-client';
import type { IRole } from '@rocket.chat/core-typings';

import { api, credentials, request } from './api-data';

export const createCustomRole = async ({
	name,
	scope,
	description,
	credentials: customCredentials,
}: Pick<IRole, 'name' | 'scope' | 'description'> & { credentials?: Credentials }) => {
    /* Implementation Hidden */
};

export const deleteCustomRole = async ({ roleId, credentials: customCredentials }: { roleId: IRole['_id']; credentials?: Credentials }) => {
    /* Implementation Hidden */
};

export const assignRoleToUser = async ({
	username,
	roleId,
	credentials: customCredentials,
}: {
	username: string;
	roleId: string;
	credentials?: Credentials;
}) => {
    /* Implementation Hidden */
};

```