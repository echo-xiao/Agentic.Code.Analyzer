## File: apps/meteor/client/views/admin/rooms/useEditAdminRoomPermissions.ts

```typescript
import type { IRoom, RoomAdminFieldsType } from '@rocket.chat/core-typings';
import { useMemo } from 'react';

import { RoomSettingsEnum } from '../../../../definition/IRoomTypeConfig';
import { roomCoordinator } from '../../../lib/rooms/roomCoordinator';
import { useIsABACManagedRoom } from '../ABAC/hooks/useIsABACManagedRoom';

export const useEditAdminRoomPermissions = (room: Pick<IRoom, RoomAdminFieldsType>) => {
    /* Implementation Hidden */
};

```