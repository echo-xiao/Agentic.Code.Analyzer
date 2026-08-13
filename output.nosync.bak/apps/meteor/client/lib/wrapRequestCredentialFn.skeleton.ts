## File: apps/meteor/client/lib/wrapRequestCredentialFn.ts

```typescript
import type { OAuthConfiguration } from '@rocket.chat/core-typings';
import { Accounts } from 'meteor/accounts-base';
import type { Meteor } from 'meteor/meteor';
import { OAuth } from 'meteor/oauth';

import { loginServices } from './loginServices';

type RequestCredentialOptions = Meteor.LoginWithExternalServiceOptions;
type RequestCredentialCallback = (credentialTokenOrError?: string | Error) => void;

type RequestCredentialConfig<T extends Partial<OAuthConfiguration>> = {
	config: T;
	loginStyle: string;
	options: RequestCredentialOptions;
	credentialRequestCompleteCallback?: RequestCredentialCallback;
};

export function wrapRequestCredentialFn<T extends Partial<OAuthConfiguration>>(
	serviceName: string,
	fn: (params: RequestCredentialConfig<T>) => void,
) {
    /* Implementation Hidden */
}

```