## File: apps/meteor/tests/e2e/utils/updateOwnUserInfo.ts

```typescript
import crypto from 'crypto';

import type { APIResponse } from '@playwright/test';
import type { UsersUpdateOwnBasicInfoParamsPOST } from '@rocket.chat/rest-typings';

import type { BaseTest } from './test';

export const updateOwnUserPassword = async (
	api: BaseTest['api'],
	{ newPassword, currentPassword }: { newPassword: string; currentPassword: string },
): Promise<APIResponse> => {
    /* Implementation Hidden */
};

const updateOwnUserInfo = (api: BaseTest['api'], data: UsersUpdateOwnBasicInfoParamsPOST['data']): Promise<APIResponse> =>
	api.post(`/users.updateOwnBasicInfo`, { data });

```