## File: apps/meteor/server/lib/cloud/getWorkspaceAccessTokenWithScope.ts

```typescript
import { serverFetch as fetch } from '@rocket.chat/server-fetch';

import { getRedirectUri } from './getRedirectUri';
import { CloudWorkspaceAccessTokenError } from './getWorkspaceAccessToken';
import { removeWorkspaceRegistrationInfo } from './removeWorkspaceRegistrationInfo';
import { retrieveRegistrationStatus } from './retrieveRegistrationStatus';
import { workspaceScopes } from '../../../app/cloud/server/oauthScopes';
import { settings } from '../../../app/settings/server';
import { SystemLogger } from '../logger/system';

type WorkspaceAccessTokenWithScope = {
	token: string;
	expiresAt: Date;
	scope: string;
};

type GetWorkspaceAccessTokenWithScopeParams = {
	scope?: string;
	throwOnError?: boolean;
};

export async function getWorkspaceAccessTokenWithScope({
	scope = '',
	throwOnError = false,
}: GetWorkspaceAccessTokenWithScopeParams): Promise<WorkspaceAccessTokenWithScope> {
    /* Implementation Hidden */
}

```