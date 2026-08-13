## File: apps/meteor/client/providers/AuthenticationProvider/AuthenticationProvider.tsx

```typescript
import type { LoginServiceConfiguration } from '@rocket.chat/core-typings';
import { capitalize } from '@rocket.chat/string-helpers';
import { AuthenticationContext, useSetting } from '@rocket.chat/ui-contexts';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import type { ContextType, ReactNode } from 'react';
import { useMemo, useSyncExternalStore } from 'react';

import { useLDAPAndCrowdCollisionWarning } from './hooks/useLDAPAndCrowdCollisionWarning';
import { capitalize as capitalizeService } from '../../../lib/utils/stringUtils';
import { loginServices } from '../../lib/loginServices';
import { getDdpSdk } from '../../lib/sdk/ddpSdk';
import { STORAGE_KEYS, getStoredItem, removeStoredItem } from '../../lib/sdk/storage';

export type LoginMethods = keyof typeof Meteor extends infer T ? (T extends `loginWith${string}` ? T : never) : never;

export type AuthenticationProviderProps = {
	children: ReactNode;
};

const callLoginMethod = (
	options: { loginToken?: string; token?: string; iframe?: boolean },
	userCallback: ((err?: any) => void) | undefined,
) => {
    /* Implementation Hidden */
};

// Bridge Accounts.loggingIn() — Meteor's Tracker-reactive flag — into a
// non-reactive subscribe/getSnapshot pair for useSyncExternalStore. We hook
// `_setLoggingIn` (Meteor's internal flip, also accessed in
// apps/meteor/client/meteor/overrides/killMeteorStream.ts) to fan out
// transitions without entering a Tracker computation.
const loggingInListeners = new Set<() => void>();
let loggingInBridgeInstalled = false;
const installLoggingInBridge = (): void => {
    /* Implementation Hidden */
};

const subscribeLoggingIn = (cb: () => void): (() => void) => {
    /* Implementation Hidden */
};

const getLoggingInSnapshot = (): boolean => Accounts.loggingIn();

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
    /* Implementation Hidden */
};

export default AuthenticationProvider;

```