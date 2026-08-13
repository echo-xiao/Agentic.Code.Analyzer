## File: apps/meteor/app/integrations/server/methods/incoming/deleteIncomingIntegration.ts

```typescript
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Integrations } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../../../../server/lib/authorization/hasPermission';
import { methodDeprecationLogger } from '../../../../lib/server/lib/deprecationWarningLogger';
import { notifyOnIntegrationChanged } from '../../../../lib/server/lib/notifyListener';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		deleteIncomingIntegration(integrationId: string): Promise<boolean>;
	}
}

export const deleteIncomingIntegration = async (integrationId: string, userId: string): Promise<void> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async deleteIncomingIntegration(integrationId) {
		methodDeprecationLogger.method('deleteIncomingIntegration', '9.0.0', '/v1/integrations.remove');
		const userId = Meteor.userId();
		if (!userId) {
			throw new Meteor.Error('not_authorized', 'Unauthorized', {
				method: 'deleteIncomingIntegration',
			});
		}

		await deleteIncomingIntegration(integrationId, userId);

		return true;
	},
});

```