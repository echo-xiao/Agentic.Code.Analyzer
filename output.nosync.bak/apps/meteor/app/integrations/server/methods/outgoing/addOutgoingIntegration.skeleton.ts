## File: apps/meteor/app/integrations/server/methods/outgoing/addOutgoingIntegration.ts

```typescript
import type { INewOutgoingIntegration, IOutgoingIntegration } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Integrations } from '@rocket.chat/models';
import { removeEmpty } from '@rocket.chat/tools';
import { Match, check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../../../../server/lib/authorization/hasPermission';
import { methodDeprecationLogger } from '../../../../lib/server/lib/deprecationWarningLogger';
import { notifyOnIntegrationChanged } from '../../../../lib/server/lib/notifyListener';
import { validateOutgoingIntegration } from '../../lib/validateOutgoingIntegration';
import { validateScriptEngine } from '../../lib/validateScriptEngine';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		addOutgoingIntegration(integration: INewOutgoingIntegration): Promise<IOutgoingIntegration>;
	}
}

export const addOutgoingIntegration = async (userId: string, integration: INewOutgoingIntegration): Promise<IOutgoingIntegration> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async addOutgoingIntegration(integration: INewOutgoingIntegration): Promise<IOutgoingIntegration> {
		methodDeprecationLogger.method('addOutgoingIntegration', '9.0.0', '/v1/integrations.create');
		const { userId } = this;
		if (!userId) {
			throw new Meteor.Error('Invalid User');
		}

		return addOutgoingIntegration(userId, integration);
	},
});

```