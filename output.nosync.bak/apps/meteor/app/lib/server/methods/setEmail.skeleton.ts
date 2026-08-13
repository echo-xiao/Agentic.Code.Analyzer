## File: apps/meteor/app/lib/server/methods/setEmail.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { setEmail } from '../../../../server/lib/users/setEmail';
import { settings } from '../../../settings/server';
import { RateLimiter } from '../lib';
import { methodDeprecationLogger } from '../lib/deprecationWarningLogger';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		setEmail(email: string): string;
	}
}

export const setEmailFunction = async (email: string, user: Meteor.User | IUser) => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async setEmail(email) {
		methodDeprecationLogger.method('setEmail', '9.0.0', '/v1/users.updateOwnBasicInfo');
		const user = await Meteor.userAsync();

		if (!user) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'setEmail' });
		}

		return setEmailFunction(email, user);
	},
});

RateLimiter.limitMethod('setEmail', 1, 1000, {
	userId(/* userId*/) {
		return true;
	},
});

```