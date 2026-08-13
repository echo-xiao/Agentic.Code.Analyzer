## File: apps/meteor/app/e2e/server/methods/requestSubscriptionKeys.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Subscriptions, Rooms } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { methodDeprecationLogger } from '../../../lib/server/lib/deprecationWarningLogger';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		'e2e.requestSubscriptionKeys'(): boolean;
	}
}

export const requestSubscriptionKeysMethod = async (userId: string): Promise<void> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async 'e2e.requestSubscriptionKeys'() {
		methodDeprecationLogger.method('e2e.requestSubscriptionKeys', '9.0.0', '/v1/e2e.requestSubscriptionKeys');

		const userId = Meteor.userId();
		if (!userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'requestSubscriptionKeys',
			});
		}

		await requestSubscriptionKeysMethod(userId);

		return true;
	},
});

```