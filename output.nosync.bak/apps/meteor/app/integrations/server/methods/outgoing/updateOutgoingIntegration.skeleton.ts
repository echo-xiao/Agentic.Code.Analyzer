## File: apps/meteor/app/integrations/server/methods/outgoing/updateOutgoingIntegration.ts

```typescript
import type { IIntegration, INewOutgoingIntegration, IUpdateOutgoingIntegration } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Integrations, Users } from '@rocket.chat/models';
import { wrapExceptions } from '@rocket.chat/tools';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../../../../server/lib/authorization/hasPermission';
import { methodDeprecationLogger } from '../../../../lib/server/lib/deprecationWarningLogger';
import { notifyOnIntegrationChanged } from '../../../../lib/server/lib/notifyListener';
import { validateOutgoingIntegration } from '../../lib/validateOutgoingIntegration';
import { isScriptEngineFrozen, validateScriptEngine } from '../../lib/validateScriptEngine';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		updateOutgoingIntegration(
			integrationId: string,
			integration: INewOutgoingIntegration | IUpdateOutgoingIntegration,
		): IIntegration | null;
	}
}

export const updateOutgoingIntegration = async (
	userId: string,
	integrationId: string,
	_integration: INewOutgoingIntegration | IUpdateOutgoingIntegration,
): Promise<IIntegration | null> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async updateOutgoingIntegration(integrationId, _integration) {
		methodDeprecationLogger.method('updateOutgoingIntegration', '9.0.0', '/v1/integrations.update');
		if (!this.userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'updateOutgoingIntegration',
			});
		}

		return updateOutgoingIntegration(this.userId, integrationId, _integration);
	},
});

```