## File: apps/meteor/client/views/room/contextualBar/Info/EditRoomInfo/useEditRoomPermissions.ts

```typescript
import type { IRoom, IRoomWithRetentionPolicy } from '@rocket.chat/core-typings';
import { usePermission, useAtLeastOnePermission, useRole } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';

import { RoomSettingsEnum } from '../../../../../../definition/IRoomTypeConfig';
import { useTeamInfoQuery } from '../../../../../hooks/useTeamInfoQuery';
import { roomCoordinator } from '../../../../../lib/rooms/roomCoordinator';

const getCanChangeType = (room: IRoom | IRoomWithRetentionPolicy, canCreateChannel: boolean, canCreateGroup: boolean, isAdmin: boolean) =>
	(!room.default || isAdmin) && ((room.t === 'p' && canCreateChannel) || (room.t === 'c' && canCreateGroup));

export const useEditRoomPermissions = (room: IRoom | IRoomWithRetentionPolicy) => {
    /* Implementation Hidden */
};

```