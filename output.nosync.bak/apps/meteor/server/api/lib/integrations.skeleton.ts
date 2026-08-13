## File: apps/meteor/server/api/lib/integrations.ts

```typescript
import type { IIntegration, IUser } from '@rocket.chat/core-typings';
import { Integrations } from '@rocket.chat/models';

import { hasPermissionAsync } from '../../lib/authorization/hasPermission';

const hasIntegrationsPermission = async (userId: string, integration: IIntegration): Promise<boolean> => {
    /* Implementation Hidden */
};

export const findOneIntegration = async ({
	userId,
	integrationId,
	createdBy,
}: {
	userId: string;
	integrationId: string;
	createdBy?: IUser['_id'];
}): Promise<IIntegration> => {
    /* Implementation Hidden */
};

```