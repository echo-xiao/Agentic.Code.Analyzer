## File: apps/meteor/app/e2e/server/methods/setUserPublicAndPrivateKeys.ts

```typescript
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Rooms, Users } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { methodDeprecationLogger } from '../../../lib/server/lib/deprecationWarningLogger';
import { notifyOnRoomChangedById } from '../../../lib/server/lib/notifyListener';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		'e2e.setUserPublicAndPrivateKeys'({ public_key, private_key }: { public_key: string; private_key: string; force?: boolean }): void;
	}
}

const isKeysResult = (result: any): result is { public_key: string; private_key: string } => {
    /* Implementation Hidden */
};

export const setUserPublicAndPrivateKeysMethod = async (
	userId: string,
	keyPair: { public_key: string; private_key: string; force?: boolean },
): Promise<void> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async 'e2e.setUserPublicAndPrivateKeys'(keyPair) {
		methodDeprecationLogger.method('e2e.setUserPublicAndPrivateKeys', '9.0.0', '/v1/e2e.setUserPublicAndPrivateKeys');
		const userId = Meteor.userId();

		if (!userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'e2e.setUserPublicAndPrivateKeys',
			});
		}

		if (!keyPair.public_key || !keyPair.private_key) {
			throw new Meteor.Error('error-invalid-keys', 'Invalid keys', {
				method: 'e2e.setUserPublicAndPrivateKeys',
			});
		}

		await setUserPublicAndPrivateKeysMethod(userId, keyPair);
	},
});

```