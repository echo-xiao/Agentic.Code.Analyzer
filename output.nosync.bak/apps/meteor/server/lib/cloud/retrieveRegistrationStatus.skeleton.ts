## File: apps/meteor/server/lib/cloud/retrieveRegistrationStatus.ts

```typescript
import { Users } from '@rocket.chat/models';

import { settings } from '../../../app/settings/server';

export async function retrieveRegistrationStatus(): Promise<{
	workspaceRegistered: boolean;
	workspaceId: string;
	uniqueId: string;
	token: string;
	email: string;
}> {
    /* Implementation Hidden */
}

```