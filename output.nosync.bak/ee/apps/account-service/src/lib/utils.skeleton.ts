## File: ee/apps/account-service/src/lib/utils.ts

```typescript
import crypto from 'crypto';

import { convertFromDaysToMilliseconds } from '@rocket.chat/tools';
import bcrypt from 'bcrypt';

export interface IStampedToken {
	token: string;
	when: Date;
	[key: string]: any;
}

export interface IHashedStampedToken {
	when: Date;
	hashedToken: string;
}

type Password =
	| string
	| {
			digest: string;
	  };

export const getPassword = (password: Password): string => {
    /* Implementation Hidden */
};

// https://github.com/meteor/meteor/blob/c5b51b0fc2a8cef498b9390ebcb4925e02de83e8/packages/accounts-base/accounts_server.js#L934
export const _generateStampedLoginToken = (): IStampedToken => ({
	token: crypto.randomUUID(),
	when: new Date(),
});

// https://github.com/meteor/meteor/blob/c5b51b0fc2a8cef498b9390ebcb4925e02de83e8/packages/accounts-base/accounts_server.js#L780
export const _hashLoginToken = (loginToken: string): string => {
    /* Implementation Hidden */
};

// https://github.com/meteor/meteor/blob/c5b51b0fc2a8cef498b9390ebcb4925e02de83e8/packages/accounts-base/accounts_server.js#L787
export const _hashStampedToken = (stampedToken: IStampedToken): IHashedStampedToken => {
    /* Implementation Hidden */
};

export const validatePassword = (password: string, bcryptPassword: string): Promise<boolean> =>
	bcrypt.compare(getPassword(password), bcryptPassword);

export const _tokenExpiration = (when: string | Date, expirationInDays: number): Date =>
	new Date(new Date(when).getTime() + convertFromDaysToMilliseconds(expirationInDays));

```