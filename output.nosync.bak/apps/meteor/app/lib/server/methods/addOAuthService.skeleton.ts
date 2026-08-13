## File: apps/meteor/app/lib/server/methods/addOAuthService.ts

```typescript
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { addOAuthService } from '../../../../server/lib/oauth/addOAuthService';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		addOAuthService(name: string): void;
	}
}

export const addOAuthServiceMethod = async (userId: string, name: string): Promise<void> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async addOAuthService(name) {
		check(name, String);

		const userId = Meteor.userId();

		if (!userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'addOAuthService' });
		}

		return addOAuthServiceMethod(userId, name);
	},
});

```