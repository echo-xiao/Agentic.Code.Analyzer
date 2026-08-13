## File: apps/meteor/client/views/root/MainLayout/EmbeddedPreload.tsx

```typescript
import { getObjectKeys } from '@rocket.chat/tools';
import { useEndpoint, useMethod, useRouter, useUserId } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useEffect, useMemo } from 'react';

import { roomFields } from '../../../../lib/publishFields';
import { RoomsCachedStore, SubscriptionsCachedStore } from '../../../cachedStores';
import { roomsQueryKeys } from '../../../lib/queryKeys';
import { roomCoordinator } from '../../../lib/rooms/roomCoordinator';
import { mapSubscriptionFromApi } from '../../../lib/utils/mapSubscriptionFromApi';
import { Rooms } from '../../../stores';
import PageLoading from '../PageLoading';
import { useMainReady } from '../hooks/useMainReady';

const EmbeddedPreload = ({ children }: { children: ReactNode }) => {
    /* Implementation Hidden */
};

export default EmbeddedPreload;

```