## File: apps/meteor/client/views/room/hooks/useGoToRoom.ts

```typescript
import type { IRoom, ISubscription } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useEndpoint, useRouter, useToastMessageDispatch } from '@rocket.chat/ui-contexts';

import { roomCoordinator } from '../../../lib/rooms/roomCoordinator';
import { Subscriptions } from '../../../stores';

type GoToRoomByIdOptions = {
	replace?: boolean;
	routeParamsOverrides?: Record<string, string>;
};

export const useGoToRoom = (): ((roomId: IRoom['_id'], options?: GoToRoomByIdOptions) => Promise<void>) => {
    /* Implementation Hidden */
};

```