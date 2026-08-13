## File: apps/meteor/app/oauth2-server-config/server/admin/methods/deleteOAuthApp.ts

```typescript
import type { IOAuthApps } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { OAuthAccessTokens, OAuthApps, OAuthAuthCodes } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../../../../server/lib/authorization/hasPermission';
import { methodDeprecationLogger } from '../../../../lib/server/lib/deprecationWarningLogger';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		deleteOAuthApp(applicationId: IOAuthApps['_id']): boolean;
	}
}

export const deleteOAuthApp = async (userId: string, applicationId: IOAuthApps['_id']): Promise<boolean> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async deleteOAuthApp(applicationId) {
		methodDeprecationLogger.method('deleteOAuthApp', '9.0.0', '/v1/oauth-apps.delete');
		if (!this.userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'deleteOAuthApp' });
		}

		return deleteOAuthApp(this.userId, applicationId);
	},
});

```