## File: apps/meteor/app/integrations/server/methods/incoming/addIncomingIntegration.ts

```typescript
import type { INewIncomingIntegration, IIncomingIntegration } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Integrations, Subscriptions, Users, Rooms } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';
import { removeEmpty } from '@rocket.chat/tools';
import { Match, check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync, hasAllPermissionAsync } from '../../../../../server/lib/authorization/hasPermission';
import { methodDeprecationLogger } from '../../../../lib/server/lib/deprecationWarningLogger';
import { notifyOnIntegrationChanged } from '../../../../lib/server/lib/notifyListener';
import { compileIntegrationScript } from '../../lib/compileIntegrationScript';
import { validateScriptEngine, isScriptEngineFrozen } from '../../lib/validateScriptEngine';

const validChannelChars = ['@', '#'];

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		addIncomingIntegration(integration: INewIncomingIntegration): Promise<IIncomingIntegration>;
	}
}

export const addIncomingIntegration = async (userId: string, integration: INewIncomingIntegration): Promise<IIncomingIntegration> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async addIncomingIntegration(integration: INewIncomingIntegration): Promise<IIncomingIntegration> {
		methodDeprecationLogger.method('addIncomingIntegration', '9.0.0', '/v1/integrations.create');
		const { userId } = this;

		if (!userId) {
			throw new Meteor.Error('invalid-user', 'Invalid User', {
				method: 'addIncomingIntegration',
			});
		}

		return addIncomingIntegration(userId, integration);
	},
});

```