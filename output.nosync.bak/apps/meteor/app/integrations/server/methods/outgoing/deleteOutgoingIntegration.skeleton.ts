## File: apps/meteor/app/integrations/server/methods/outgoing/deleteOutgoingIntegration.ts

```typescript
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Integrations, IntegrationHistory } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../../../../server/lib/authorization/hasPermission';
import { methodDeprecationLogger } from '../../../../lib/server/lib/deprecationWarningLogger';
import { notifyOnIntegrationChanged } from '../../../../lib/server/lib/notifyListener';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		deleteOutgoingIntegration(integrationId: string): Promise<boolean>;
	}
}

export const deleteOutgoingIntegration = async (integrationId: string, userId: string): Promise<void> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async deleteOutgoingIntegration(integrationId) {
		methodDeprecationLogger.method('deleteOutgoingIntegration', '9.0.0', '/v1/integrations.remove');
		const userId = Meteor.userId();
		if (!userId) {
			throw new Meteor.Error('not_authorized', 'Unauthorized', {
				method: 'deleteOutgoingIntegration',
			});
		}

		await deleteOutgoingIntegration(integrationId, userId);

		return true;
	},
});

```