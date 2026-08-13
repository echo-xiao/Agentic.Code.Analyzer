## File: apps/meteor/ee/server/apps/marketplace/appRequestNotifyUsers.ts

```typescript
import type { AppRequest, IUser } from '@rocket.chat/core-typings';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';

import { getWorkspaceAccessToken } from '../../../../app/cloud/server';
import { i18n } from '../../../../server/lib/i18n';
import { sendDirectMessageToUsers } from '../../../../server/lib/sendDirectMessageToUsers';

const ROCKET_CAT_USERID = 'rocket.cat';
const DEFAULT_LIMIT = 100;

const notifyBatchOfUsersError = (error: Error) => {
    /* Implementation Hidden */
};

const notifyBatchOfUsers = async (appName: string, learnMoreUrl: string, appRequests: AppRequest[]): Promise<string[]> => {
    /* Implementation Hidden */
};

export const appRequestNotififyForUsers = async (
	marketplaceBaseUrl: string,
	workspaceUrl: string,
	appId: string,
	appName: string,
): Promise<(string | Error)[]> => {
    /* Implementation Hidden */
};

```