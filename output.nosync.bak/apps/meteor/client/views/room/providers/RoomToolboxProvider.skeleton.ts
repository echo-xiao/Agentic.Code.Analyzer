## File: apps/meteor/client/views/room/providers/RoomToolboxProvider.tsx

```typescript
import { useStableCallback, useStableArray } from '@rocket.chat/fuselage-hooks';
import {
	useUserId,
	useSetting,
	useRouter,
	useRouteParameter,
	useLayoutHiddenActions,
	RoomToolboxContext,
	type RoomToolboxContextValue,
} from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

import { useRoom } from '../contexts/RoomContext';
import { getRoomGroup } from '../lib/getRoomGroup';
import { useAppsRoomActions } from './hooks/useAppsRoomActions';
import { useCoreRoomActions } from './hooks/useCoreRoomActions';
import { useCoreRoomRoutes } from './hooks/useCoreRoomRoutes';

type RoomToolboxProviderProps = { children: ReactNode };

const RoomToolboxProvider = ({ children }: RoomToolboxProviderProps) => {
    /* Implementation Hidden */
};

export default RoomToolboxProvider;

```