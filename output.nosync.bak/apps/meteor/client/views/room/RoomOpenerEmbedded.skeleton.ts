## File: apps/meteor/client/views/room/RoomOpenerEmbedded.tsx

```typescript
import type { ISubscription, RoomType } from '@rocket.chat/core-typings';
import { Box, States, StatesIcon, StatesSubtitle, StatesTitle } from '@rocket.chat/fuselage';
import { Header } from '@rocket.chat/ui-client';
import { useStream, useUserId } from '@rocket.chat/ui-contexts';
import { lazy, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import NotSubscribedRoom from './NotSubscribedRoom';
import RoomSkeleton from './RoomSkeleton';
import { useOpenRoom } from './hooks/useOpenRoom';
import { SubscriptionsCachedStore } from '../../cachedStores';
import { getErrorMessage } from '../../lib/errorHandling';
import { NotAuthorizedError } from '../../lib/errors/NotAuthorizedError';
import { NotSubscribedToRoomError } from '../../lib/errors/NotSubscribedToRoomError';
import { OldUrlRoomError } from '../../lib/errors/OldUrlRoomError';
import { RoomNotFoundError } from '../../lib/errors/RoomNotFoundError';

const RoomProvider = lazy(() => import('./providers/RoomProvider'));
const RoomNotFound = lazy(() => import('./RoomNotFound'));
const Room = lazy(() => import('./Room'));
const RoomLayout = lazy(() => import('./layout/RoomLayout'));
const NotAuthorizedPage = lazy(() => import('../notAuthorized/NotAuthorizedPage'));

type RoomOpenerProps = {
	type: RoomType;
	reference: string;
};

const RoomOpenerEmbedded = ({ type, reference }: RoomOpenerProps) => {
    /* Implementation Hidden */
};

export default RoomOpenerEmbedded;

```