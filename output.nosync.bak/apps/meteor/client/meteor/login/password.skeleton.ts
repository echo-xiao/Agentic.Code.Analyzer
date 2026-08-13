## File: apps/meteor/client/meteor/login/password.ts

```typescript
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import { overrideLoginMethod, type LoginCallback } from '../../lib/2fa/overrideLoginMethod';

declare module 'meteor/meteor' {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Meteor {
		function loginWithPassword(
			userDescriptor: { username: string } | { email: string } | { id: string } | string,
			password: string,
			callback?: LoginCallback,
		): void;
	}
}

export const loginWithPasswordAndTOTP = (
	userDescriptor: { username: string } | { email: string } | { id: string } | string,
	password: string,
	code: string,
	callback?: LoginCallback,
): Promise<void> => {
    /* Implementation Hidden */
};

const { loginWithPassword } = Meteor;

Meteor.loginWithPassword = (
	userDescriptor: { username: string } | { email: string } | { id: string } | string,
	password: string,
	callback?: LoginCallback,
) => {
	overrideLoginMethod(loginWithPassword, [userDescriptor, password], callback, loginWithPasswordAndTOTP);
};

```