## File: apps/meteor/client/views/room/contextualBar/Info/hooks/useCanEditRoom.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { isRoomFederated } from '@rocket.chat/core-typings';
import { usePermission, useUser } from '@rocket.chat/ui-contexts';

import * as Federation from '../../../../../lib/federation/Federation';
import { useRoomSubscription } from '../../../contexts/RoomContext';

export const useCanEditRoom = (room: IRoom) => {
    /* Implementation Hidden */
};

```