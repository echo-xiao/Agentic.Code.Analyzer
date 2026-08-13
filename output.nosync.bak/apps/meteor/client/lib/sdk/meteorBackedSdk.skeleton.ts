## File: apps/meteor/client/lib/sdk/meteorBackedSdk.ts

```typescript
import type { DDPSDK } from '@rocket.chat/ddp-client';
import { Emitter } from '@rocket.chat/emitter';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { parseDDP } from './ddpProtocol';
import { setStorageBackend } from './storage';

/**
 * Meteor-backed pass-through DDPSDK used when the SDK transport is OFF.
 *
 * Returned by `getDdpSdk()` when `isSdkTransportEnabled()` is false. Satisfies
 * the subset of the `DDPSDK` interface that the codebase actually consumes —
 * delegating each call to `Meteor.connection`/`Meteor.callAsync`/`Meteor.userId`
 * etc. — so consumers don't need their own `if (isSdkTransportEnabled())`
 * branches. All operations are no-ops or fall back to Meteor; no second
 * WebSocket is opened, no auth lifecycle is run, no Presence session is
 * duplicated server-side.
 */
const noopUnsubscribe = (): void => undefined;

const safeMeteorStatus = (): { status: string; connected: boolean; retryCount?: number; retryTime?: number } | undefined => {
    /* Implementation Hidden */
};

const onMeteorStatusChange = (cb: () => void): (() => void) => {
    /* Implementation Hidden */
};

const meteorStatusToSdkStatus = (): string => {
    /* Implementation Hidden */
};

const createMeteorBackedClient = () => {
    /* Implementation Hidden */
};

const createMeteorBackedConnection = () => {
    /* Implementation Hidden */
};

const createMeteorBackedAccount = () => {
    /* Implementation Hidden */
};

export const createMeteorBackedStorage = () => {
    /* Implementation Hidden */
};

export const FORGET_SESSION_SETTING_ID = 'Accounts_ForgetUserSessionOnWindowClose';

declare global {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface Window {
		[FORGET_SESSION_SETTING_ID]?: boolean;
	}
}

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface DDPSDK {
		storage: {
			changeStorageBackend: () => void;
		};
	}
}

export const createMeteorBackedSdk = (): DDPSDK => {
    /* Implementation Hidden */
};

```