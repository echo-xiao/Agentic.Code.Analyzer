## File: apps/meteor/server/lib/cloud/connectWorkspace.ts

```typescript
import { serverFetch as fetch } from '@rocket.chat/server-fetch';

import { getRedirectUri } from './getRedirectUri';
import { saveRegistrationData } from './saveRegistrationData';
import { settings } from '../../../app/settings/server';
import { CloudWorkspaceConnectionError } from '../../../lib/errors/CloudWorkspaceConnectionError';
import { SystemLogger } from '../logger/system';

const fetchRegistrationDataPayload = async ({
	token,
	body,
}: {
	token: string;
	body: {
		email: string;
		client_name: string;
		redirect_uris: string[];
	};
}) => {
    /* Implementation Hidden */
};

export async function connectWorkspace(token: string) {
    /* Implementation Hidden */
}

```