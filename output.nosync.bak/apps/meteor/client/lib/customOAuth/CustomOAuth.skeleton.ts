## File: apps/meteor/client/lib/customOAuth/CustomOAuth.ts

```typescript
import type { OAuthConfiguration, OauthConfig } from '@rocket.chat/core-typings';
import { Random } from '@rocket.chat/random';
import { capitalize } from '@rocket.chat/string-helpers';
import { isAbsoluteURL } from '@rocket.chat/tools';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { OAuth } from 'meteor/oauth';

import type { IOAuthProvider } from '../../definitions/IOAuthProvider';
import { createOAuthTotpLoginMethod } from '../../meteor/login/oauth';
import { overrideLoginMethod, type LoginCallback } from '../2fa/overrideLoginMethod';
import { loginServices } from '../loginServices';
import { CustomOAuthError } from './CustomOAuthError';

const configuredOAuthServices = new Map<string, CustomOAuth>();

export class CustomOAuth<TServiceName extends string = string> implements IOAuthProvider {
	public serverURL: string;

	public authorizePath: string;

	public scope: string;

	public responseType: string;

	constructor(
		public readonly name: TServiceName,
		options: Readonly<OauthConfig>,
	) {
        /* Implementation Hidden */
    }

	configure(options: Readonly<OauthConfig>) {
        /* Implementation Hidden */
    }

	configureLogin() {
        /* Implementation Hidden */
    }

	async requestCredential(
		options: Meteor.LoginWithExternalServiceOptions = {},
		credentialRequestCompleteCallback: (credentialTokenOrError?: string | Error) => void,
	) {
        /* Implementation Hidden */
    }

	static configureOAuthService<TServiceName extends string = string>(
		serviceName: TServiceName,
		options: Readonly<OauthConfig>,
	): CustomOAuth<TServiceName> {
        /* Implementation Hidden */
    }

	static configureCustomOAuthService<TServiceName extends string = string>(
		serviceName: TServiceName,
		options: Readonly<OauthConfig>,
	): CustomOAuth<TServiceName> | undefined {
        /* Implementation Hidden */
    }
}

```