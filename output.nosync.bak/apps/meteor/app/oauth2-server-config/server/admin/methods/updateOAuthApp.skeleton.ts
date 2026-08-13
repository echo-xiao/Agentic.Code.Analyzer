## File: apps/meteor/app/oauth2-server-config/server/admin/methods/updateOAuthApp.ts

```typescript
import type { IOAuthApps } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { OAuthApps, Users } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../../../../server/lib/authorization/hasPermission';
import { methodDeprecationLogger } from '../../../../lib/server/lib/deprecationWarningLogger';
import { parseUriList } from '../functions/parseUriList';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		updateOAuthApp(
			applicationId: IOAuthApps['_id'],
			application: Pick<IOAuthApps, 'name' | 'redirectUri' | 'active'>,
		): Promise<IOAuthApps | null>;
	}
}

export const updateOAuthApp = async (
	userId: string,
	applicationId: IOAuthApps['_id'],
	application: Pick<IOAuthApps, 'name' | 'redirectUri' | 'active'>,
): Promise<IOAuthApps | null> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async updateOAuthApp(applicationId, application) {
		methodDeprecationLogger.method('updateOAuthApp', '9.0.0', '/v1/oauth-apps.update');
		if (!this.userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'updateOAuthApp' });
		}

		return updateOAuthApp(this.userId, applicationId, application);
	},
});

```