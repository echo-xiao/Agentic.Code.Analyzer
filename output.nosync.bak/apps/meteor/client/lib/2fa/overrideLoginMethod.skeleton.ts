## File: apps/meteor/client/lib/2fa/overrideLoginMethod.ts

```typescript
import { Accounts } from 'meteor/accounts-base';

import type { MeteorErrorLike } from './types';
import { isTotpInvalidError, isTotpMaxAttemptsError, isTotpRequiredError } from './utils';

export type LoginCallback = (error: MeteorErrorLike | undefined, result?: unknown) => void;

export const overrideLoginMethod = <TArgs extends any[]>(
	loginMethod: (...args: [...args: TArgs, cb: LoginCallback]) => void,
	loginArgs: TArgs,
	callback: LoginCallback | undefined,
	loginMethodTOTP: (...args: [...args: TArgs, code: string, cb: LoginCallback]) => void,
) => {
    /* Implementation Hidden */
};

export const handleLogin = <TLoginFunction extends (...args: any[]) => Promise<any>>(
	login: TLoginFunction,
	loginWithTOTP: (...args: [...args: Parameters<TLoginFunction>, code: string]) => ReturnType<TLoginFunction>,
) => {
    /* Implementation Hidden */
};

export const callLoginMethod = (options: Omit<Accounts.LoginMethodOptions, 'userCallback'>) =>
	new Promise<void>((resolve, reject) => {
		Accounts.callLoginMethod({
			...options,
			userCallback: (error) => {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			},
		});
	});

```