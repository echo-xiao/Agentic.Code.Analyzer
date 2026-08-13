## File: apps/meteor/client/hooks/useRoomName.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { isDirectMessageRoom } from '@rocket.chat/core-typings';
import { useUserDisplayName } from '@rocket.chat/ui-client';
import { useUserSubscription } from '@rocket.chat/ui-contexts';

/**
 *
 * Hook to get the name of the room
 *
 * @param room - Room object
 * @returns Room name
 * @public
 *
 */
export const useRoomName = (room: IRoom) => {
    /* Implementation Hidden */
};

```