## File: apps/meteor/client/lib/sdk/ddpSdk.ts

```typescript
import { DDPSDK } from '@rocket.chat/ddp-client';
import EJSON from 'ejson';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import { createMeteorBackedSdk, createMeteorBackedStorage } from './meteorBackedSdk';
import { isSdkTransportEnabled } from './sdkTransportEnabled';
import { getRootUrl } from '../meteorRuntimeConfig';
import { STORAGE_KEYS, getStoredItem, removeStoredItem } from './storage';
import { userIdStore } from '../user';

const sdkTransportEnabled = isSdkTransportEnabled();

const stripTrailingSlash = (value: string): string => (value.endsWith('/') ? value.slice(0, -1) : value);

const computeDdpUrl = (): string => {
    /* Implementation Hidden */
};

let instance: DDPSDK | undefined;
let connectPromise: Promise<unknown> | undefined;

const applyEjsonEncoding = (sdk: DDPSDK): void => {
    /* Implementation Hidden */
};

const startConnect = (sdk: DDPSDK): Promise<unknown> => {
    /* Implementation Hidden */
};

const waitForConnected = (sdk: DDPSDK): Promise<void> => {
    /* Implementation Hidden */
};

export const getDdpSdk = (): DDPSDK => {
    /* Implementation Hidden */
};

const readStoredLoginToken = (): string | null => getStoredItem(STORAGE_KEYS.LOGIN_TOKEN);

let inflightLogin: Promise<void> | undefined;

export const ensureConnectedAndAuthenticated = async (): Promise<void> => {
    /* Implementation Hidden */
};

/**
 * Drop the local session credentials without dispatching Meteor's `logout`
 * method. Nulling the connection userId propagates through the
 * Accounts.connection.userId() Tracker.autorun (see overrides/userAndUsers.ts)
 * into the userIdStore, so `useUserId()` becomes undefined and the router falls
 * through to LoginPage. We avoid `Meteor.logout()` on purpose: it dispatches a
 * `logout` method that races parallel re-auth flows (fresh registration,
 * Meteor's own resume) and has kicked otherwise-healthy sessions/tests out.
 */
export const clearStoredCredentials = (): void => {
    /* Implementation Hidden */
};

export const isAuthError = (error: unknown): boolean => {
    /* Implementation Hidden */
};

/**
 * When Meteor.applyAsync('login', ...) is routed through ddpOverREST it lands on
 * DDPSDK as `client.callAsync('login', ...)`. The result authenticates the
 * underlying DDP socket — server-side the session is now logged in — but
 * `sdk.account` is bypassed entirely (only `sdk.account.loginWithToken` populates
 * `account.uid` / `account.user`). Without this sync, our userIdStore subscriber
 * sees uid set, calls ensureConnectedAndAuthenticated, finds `account.uid` empty,
 * and fires a SECOND login on the same socket. The server happily honours both,
 * issuing two different login tokens; whichever arrives second wins on the
 * server but on the client we end up with `account.user.token !== Meteor.loginToken`,
 * which surfaces later as auth-mismatched subscription errors and React crashes
 * mid-flow.
 *
 * Call this from ddpOverREST after a successful 'login' method result so DDPSDK's
 * `account` reflects the same credentials Meteor stored, and ensureConnectedAndAuthenticated
 * short-circuits its own loginWithToken path.
 */
export const adoptAccountFromMeteorLoginResult = (result: unknown): void => {
    /* Implementation Hidden */
};

const teardownAuthenticatedConnection = (): void => {
    /* Implementation Hidden */
};

declare global {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface Window {
		__rocketChatSdk?: DDPSDK;
	}
}

if (typeof window !== 'undefined' && isSdkTransportEnabled()) {
	console.info(
		'%c[Rocket.Chat] SDK-over-DDP transport enabled (experimental)',
		'color:#fff;background:#f5455c;padding:2px 6px;border-radius:3px;font-weight:bold',
	);
	const sdk = getDdpSdk();
	window.__rocketChatSdk = sdk;

	// DDPSDK auto-fires loginWithToken on every `connected` event using the
	// in-memory account.user.token (DDPSDK.create line 115-122). When the
	// server force-logs the user out (resetUserE2EKey →
	// Users.unsetLoginTokens → meteor.service force_logout listener closes
	// the user's WebSocket sessions), the SDK reconnects and immediately
	// retries the now-dead token. DDPSDK calls this with `void` so the
	// rejection is swallowed; account.user stays populated, Meteor.userId()
	// stays set, and the navbar continues to render Home with stale creds.
	//
	// Wrap account.loginWithToken so we can observe rejections from the
	// auto-retry. To avoid breaking the SAML/password login flows where a
	// fresh login is concurrently in flight, only act when:
	//  - the error is auth-shaped (`isAuthError`) AND
	//  - the token in localStorage still matches the one we tried with
	//    (nothing rotated it mid-flight) AND
	//  - the SDK account didn't get refreshed by a successful adopt while
	//    we were awaiting (sdk.account.uid still maps to this token's user)
	// Wrap account.loginWithToken so the SDK's auto-relogin rejection (called
	// with `void` in DDPSDK.create) doesn't surface as an unhandled rejection
	// (window.onunhandledrejection → pageError). The actual recovery from a
	// failed auto-relogin is now driven by Meteor's `DDP.onReconnect`
	// callback (registered by `callLoginMethod`), which fires after
	// stubMeteorStream re-emits `reset` on each SDK 'connected' event. That
	// callback retries login with the latest stored token and calls
	// `makeClientLoggedOut` on failure — no need to duplicate that logic.
	const account = sdk.account as unknown as { loginWithToken: (token: string) => Promise<unknown> };
	const originalLogin = account.loginWithToken.bind(sdk.account);
	account.loginWithToken = async (token: string) => {
		try {
			return await originalLogin(token);
		} catch (error) {
			if (isAuthError(error)) {
				// Meteor's onReconnect path will retry through stubMeteorStream
				// with the current localStorage token; nothing for us to do here
				// beyond not letting the rejection escape.
				return undefined;
			}
			throw error;
		}
	};

	// Boot-time auth is now driven by Meteor's login resume routed through
	// stubMeteorStream, which calls adoptAccountFromMeteorLoginResult on
	// success. Calling ensureConnectedAndAuthenticated here as well would
	// fire a *second* loginWithToken on the SDK socket before the Meteor
	// resume completes — server-side that ends up as TWO Accounts.onLogin
	// fires → TWO Presence.newConnection inserts in usersSessions, with
	// duplicate entries that confuse processConnectionStatus (one stays
	// online while the other goes away, aggregating to online — auto-away
	// never propagates).

	userIdStore.subscribe((uid) => {
		if (uid) {
			// Subsequent userId transitions (logout → login) still need to
			// re-establish auth on the SDK socket; adopt only kicks in for
			// login frames going through the stub, not for the post-logout
			// re-auth that doesn't necessarily go through Meteor.
			void ensureConnectedAndAuthenticated();
		} else {
			teardownAuthenticatedConnection();
		}
	});

	// Bridge Meteor's URL-routing-based account events into the SDK so
	// sdk.account.onEmailVerificationLink / onPageLoadLogin fire in flag-ON
	// mode too. The SDK has no native source for these — they come from
	// Meteor's hash-route parser (verification link) and Meteor's first-login
	// resolution (page load login). Register one bridge per event; AccountImpl's
	// emitter fans out to whatever consumers attached via onEmailVerificationLink
	// / onPageLoadLogin.
	Accounts.onEmailVerificationLink((token: string) => {
		sdk.account.emit('emailVerificationLink', token);
	});
	Accounts.onPageLoadLogin((loginAttempt: unknown) => {
		sdk.account.emit('pageLoadLogin', loginAttempt);
	});
}

```