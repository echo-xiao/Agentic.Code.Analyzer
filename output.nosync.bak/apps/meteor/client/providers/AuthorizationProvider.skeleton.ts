## File: apps/meteor/client/providers/AuthorizationProvider.tsx

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { AuthorizationContext, useUserId } from '@rocket.chat/ui-contexts';
import type { ContextType, ReactNode } from 'react';
import { useMemo, useSyncExternalStore } from 'react';

import { createAuthorizationFunctions } from '../../app/authorization/lib/createAuthorizationFunctions';
import { PermissionsCachedStore } from '../cachedStores';
import { Permissions, Roles, Subscriptions, Users } from '../stores';

// Only the slice of IUser that the authorization helpers actually read.
// Snapshotting just `roles` (instead of the full user document) keeps the
// provider from re-rendering on presence/status updates, last-login flips,
// avatar etag changes, etc. — none of which affect any permission answer.
type AuthorizableUser = Pick<IUser, '_id' | 'roles'>;

export type AuthorizationProviderProps = {
	children?: ReactNode;
};

const noopSubscribe = (): (() => void) => () => undefined;

const subscribeToSubscriptions = (onStoreChange: () => void): (() => void) => Subscriptions.use.subscribe(onStoreChange);

const selectUserRoles = (userId: IUser['_id'] | undefined): AuthorizableUser['roles'] | undefined => {
    /* Implementation Hidden */
};

const AuthorizationProvider = ({ children }: AuthorizationProviderProps) => {
    /* Implementation Hidden */
};

export default AuthorizationProvider;

```