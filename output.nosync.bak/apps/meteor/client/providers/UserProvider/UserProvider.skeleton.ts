## File: apps/meteor/client/providers/UserProvider/UserProvider.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { Emitter } from '@rocket.chat/emitter';
import { useLocalStorage } from '@rocket.chat/fuselage-hooks';
import { createPredicateFromFilter } from '@rocket.chat/mongo-adapter';
import type { FindOptions, SubscriptionWithRoom } from '@rocket.chat/ui-contexts';
import { UserContext, useRouteParameter, useSearchParameter } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { Meteor } from 'meteor/meteor';
import type { Filter, ObjectId } from 'mongodb';
import type { ContextType, ReactNode } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import type { StoreApi, UseBoundStore } from 'zustand';

import { useClearRemovedRoomsHistory } from './hooks/useClearRemovedRoomsHistory';
import { useDeleteUser } from './hooks/useDeleteUser';
import { useEmailVerificationWarning } from './hooks/useEmailVerificationWarning';
import { useReloadAfterLogin } from './hooks/useReloadAfterLogin';
import { useUpdateAvatar } from './hooks/useUpdateAvatar';
import { sdk } from '../../../app/utils/client/lib/SDKClient';
import { useIdleConnection } from '../../hooks/useIdleConnection';
import type { IDocumentMapStore } from '../../lib/cachedStores/DocumentMapStore';
import { applyQueryOptions } from '../../lib/cachedStores/applyQueryOptions';
import { getDdpSdk } from '../../lib/sdk/ddpSdk';
import { settings } from '../../lib/settings';
import { userIdStore } from '../../lib/user';
import { Users, Rooms, Subscriptions } from '../../stores';
import { useSamlInviteToken } from '../../views/invite/hooks/useSamlInviteToken';

export type UserProviderProps = {
	children: ReactNode;
};

const ee = new Emitter();
getDdpSdk().account.onLogout(() => ee.emit('logout'));

ee.on('logout', async () => {
	const userId = userIdStore.getState();
	if (!userId) return;
	const user = Users.state.get(userId);
	if (!user) return;

	await sdk.call('logoutCleanUp', user);
});

const queryRoom = (
	query: Filter<Pick<IRoom, '_id'>>,
): [subscribe: (onStoreChange: () => void) => () => void, getSnapshot: () => IRoom | undefined] => {
    /* Implementation Hidden */
};

const UserProvider = ({ children }: UserProviderProps) => {
    /* Implementation Hidden */
};

export default UserProvider;

```