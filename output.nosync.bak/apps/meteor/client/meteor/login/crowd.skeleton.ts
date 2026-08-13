## File: apps/meteor/client/meteor/login/crowd.ts

```typescript
import { Meteor } from 'meteor/meteor';

import { callLoginMethod, handleLogin, type LoginCallback } from '../../lib/2fa/overrideLoginMethod';

declare module 'meteor/meteor' {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Meteor {
		function loginWithCrowd(
			userDescriptor: { username: string } | { email: string } | { id: string } | string,
			password: string,
			callback?: LoginCallback,
		): void;
	}
}

const loginWithCrowd = (userDescriptor: { username: string } | { email: string } | { id: string } | string, password: string) => {
    /* Implementation Hidden */
};

const loginWithCrowdAndTOTP = (
	userDescriptor: { username: string } | { email: string } | { id: string } | string,
	password: string,
	code: string,
) => {
    /* Implementation Hidden */
};

Meteor.loginWithCrowd = handleLogin(loginWithCrowd, loginWithCrowdAndTOTP);

```