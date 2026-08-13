## File: packages/ddp-client/src/types/Account.ts

```typescript
import { Emitter } from '@rocket.chat/emitter';

import type { ClientStream } from './ClientStream';

type User = {
	id: string;
	username?: string;
	token?: string;
	tokenExpires?: Date;
} & Record<string, unknown>;

type AccountEvents = {
	uid: string | undefined;
	user: User;
	emailVerificationLink: string;
	pageLoadLogin: unknown;
};

export interface Account extends Emitter<AccountEvents> {
	uid?: string;
	user?: User;
	loginWithPassword(username: string, password: string): Promise<void>;
	loginWithToken(token: string): Promise<{
		id: string;
		token: string;
		tokenExpires: Date;
	}>;
	logout(): Promise<void>;
	onLogin(fn: () => void): () => void;
	onLogout(fn: () => void): () => void;
	onEmailVerificationLink(fn: (token: string) => void): () => void;
	onPageLoadLogin(fn: (loginAttempt: unknown) => void): () => void;
}

export class AccountImpl extends Emitter<AccountEvents> implements Account {
	private _uid?: string;

	user?: { id: string; username?: string; token?: string; tokenExpires?: Date };

	get uid(): string | undefined {
		return this._uid;
	}

	// Setter emits only on transition so onLogin/onLogout fire once per login/logout,
	// not on every credential refresh. Direct writes from outside the SDK
	// (adoptAccountFromMeteorLoginResult, teardownAuthenticatedConnection) flow through
	// here and become the canonical login signal regardless of transport mode.
	set uid(value: string | undefined) {
		if (value === this._uid) return;
		this._uid = value;
		this.emit('uid', value);
	}

	constructor(private readonly client: ClientStream) {
        /* Implementation Hidden */
    }

	private saveCredentials(id: string, token: string, tokenExpires: string) {
        /* Implementation Hidden */
    }

	async loginWithPassword(username: string, password: string): Promise<void> {
        /* Implementation Hidden */
    }

	async loginWithToken(token: string) {
        /* Implementation Hidden */
    }

	async logout(): Promise<void> {
        /* Implementation Hidden */
    }

	onLogin(fn: () => void): () => void {
        /* Implementation Hidden */
    }

	onLogout(fn: () => void): () => void {
        /* Implementation Hidden */
    }

	// emailVerificationLink and pageLoadLogin have no native source in the SDK — the actual
	// events come from Meteor's accounts-base (URL hash routing for verification, pending
	// login attempts for OAuth). The bridge in apps/meteor/client/lib/sdk/ddpSdk.ts forwards
	// Meteor's events into this emitter; flag-OFF mode delegates directly via meteorBackedSdk.
	onEmailVerificationLink(fn: (token: string) => void): () => void {
        /* Implementation Hidden */
    }

	onPageLoadLogin(fn: (loginAttempt: unknown) => void): () => void {
        /* Implementation Hidden */
    }
}

```