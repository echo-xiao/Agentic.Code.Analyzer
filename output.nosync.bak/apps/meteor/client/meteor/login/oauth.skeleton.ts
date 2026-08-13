## File: apps/meteor/client/meteor/login/oauth.ts

```typescript
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { OAuth } from 'meteor/oauth';

import { LoginCancelledError } from './LoginCancelledError';
import type { IOAuthProvider } from '../../definitions/IOAuthProvider';
import type { LoginCallback } from '../../lib/2fa/overrideLoginMethod';
import { getDdpSdk } from '../../lib/sdk/ddpSdk';

const isLoginCancelledError = (error: unknown): error is Meteor.Error =>
	error instanceof Meteor.Error && error.error === LoginCancelledError.numericError;

export const convertError = <T>(error: T): LoginCancelledError | T => {
    /* Implementation Hidden */
};

let lastCredentialToken: string | null = null;
let lastCredentialSecret: string | null | undefined = null;

const meteorOAuthRetrieveCredentialSecret = OAuth._retrieveCredentialSecret;
OAuth._retrieveCredentialSecret = (credentialToken: string): string | null => {
	let secret = meteorOAuthRetrieveCredentialSecret.call(OAuth, credentialToken);
	if (!secret) {
		const localStorageKey = `${OAuth._storageTokenPrefix}${credentialToken}`;
		secret = localStorage.getItem(localStorageKey);
		localStorage.removeItem(localStorageKey);
	}

	return secret;
};

const tryLoginAfterPopupClosed = (
	credentialToken: string,
	callback?: (error?: globalThis.Error | Meteor.Error | Meteor.TypedError) => void,
	totpCode?: string,
	credentialSecret?: string | null,
) => {
    /* Implementation Hidden */
};

const credentialRequestCompleteHandler =
	(callback?: (error?: globalThis.Error | Meteor.Error | Meteor.TypedError) => void, totpCode?: string) =>
	(credentialTokenOrError?: string | globalThis.Error | Meteor.Error | Meteor.TypedError) => {
		if (!credentialTokenOrError) {
			callback?.(new Meteor.Error('No credential token passed'));
			return;
		}

		if (credentialTokenOrError instanceof Error) {
			callback?.(credentialTokenOrError);
			return;
		}

		tryLoginAfterPopupClosed(credentialTokenOrError, callback, totpCode);
	};

export const createOAuthTotpLoginMethod =
	(provider: IOAuthProvider) => (options: Meteor.LoginWithExternalServiceOptions | undefined, code: string, callback?: LoginCallback) => {
		if (lastCredentialToken && lastCredentialSecret) {
			tryLoginAfterPopupClosed(lastCredentialToken, callback, code, lastCredentialSecret);
		} else {
			const credentialRequestCompleteCallback = credentialRequestCompleteHandler(callback, code);
			provider.requestCredential(options, credentialRequestCompleteCallback);
		}

		lastCredentialToken = null;
		lastCredentialSecret = null;
	};

Accounts.oauth.credentialRequestCompleteHandler = credentialRequestCompleteHandler;

getDdpSdk().account.onPageLoadLogin(async (loginAttempt: any) => {
	if (loginAttempt?.error?.error !== 'totp-required') {
		return;
	}

	const { methodArguments } = loginAttempt;
	if (!methodArguments?.length) {
		return;
	}

	const oAuthArgs = methodArguments.find((arg: any) => arg.oauth);
	const { credentialToken, credentialSecret } = oAuthArgs.oauth;
	const cb = loginAttempt.userCallback;

	const { process2faReturn } = await import('../../lib/2fa/process2faReturn');

	await process2faReturn({
		error: loginAttempt.error,
		originalCallback: cb,
		onCode: (code) => {
			tryLoginAfterPopupClosed(credentialToken, cb, code, credentialSecret);
		},
		emailOrUsername: undefined,
		result: undefined,
	});
});

```