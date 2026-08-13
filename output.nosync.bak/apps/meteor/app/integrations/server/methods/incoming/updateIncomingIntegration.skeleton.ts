## File: apps/meteor/app/integrations/server/methods/incoming/updateIncomingIntegration.ts

```typescript
import type { IIntegration, INewIncomingIntegration, IUpdateIncomingIntegration } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Integrations, Subscriptions, Users, Rooms } from '@rocket.chat/models';
import { wrapExceptions } from '@rocket.chat/tools';
import { Meteor } from 'meteor/meteor';

import { hasAllPermissionAsync, hasPermissionAsync } from '../../../../../server/lib/authorization/hasPermission';
import { methodDeprecationLogger } from '../../../../lib/server/lib/deprecationWarningLogger';
import { notifyOnIntegrationChanged } from '../../../../lib/server/lib/notifyListener';
import { compileIntegrationScript } from '../../lib/compileIntegrationScript';
import { isScriptEngineFrozen, validateScriptEngine } from '../../lib/validateScriptEngine';

const validChannelChars = ['@', '#'];

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		updateIncomingIntegration(
			integrationId: string,
			integration: INewIncomingIntegration | IUpdateIncomingIntegration,
		): IIntegration | null;
	}
}

function validateChannels(channelString: string | undefined): string[] {
    /* Implementation Hidden */
}

export const updateIncomingIntegration = async (
	userId: string,
	integrationId: string,
	integration: INewIncomingIntegration | IUpdateIncomingIntegration,
): Promise<IIntegration | null> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async updateIncomingIntegration(integrationId, integration) {
		methodDeprecationLogger.method('updateIncomingIntegration', '9.0.0', '/v1/integrations.update');
		if (!this.userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'updateOutgoingIntegration',
			});
		}

		return updateIncomingIntegration(this.userId, integrationId, integration);
	},
});

```