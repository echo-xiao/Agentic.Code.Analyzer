## File: apps/meteor/server/methods/sendForgotPasswordEmail.ts

```typescript
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Users } from '@rocket.chat/models';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { settings } from '../../app/settings/server';
import { SystemLogger } from '../lib/logger/system';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		sendForgotPasswordEmail(to: string): boolean | undefined;
	}
}

export const sendForgotPasswordEmail = async (to: string): Promise<boolean | undefined> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async sendForgotPasswordEmail(to) {
		check(to, String);

		return sendForgotPasswordEmail(to);
	},
});

```