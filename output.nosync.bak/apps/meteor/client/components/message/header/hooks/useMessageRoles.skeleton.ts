## File: apps/meteor/client/components/message/header/hooks/useMessageRoles.ts

```typescript
import type { IRole, IRoom, IUser } from '@rocket.chat/core-typings';
import { useCallback } from 'react';
import { useShallow } from 'zustand/shallow';

import type { RoomRoles } from '../../../../hooks/useRoomRolesQuery';
import { useRoomRolesQuery } from '../../../../hooks/useRoomRolesQuery';
import type { UserRoles } from '../../../../hooks/useUserRolesQuery';
import { useUserRolesQuery } from '../../../../hooks/useUserRolesQuery';
import { Roles } from '../../../../stores';

export const useMessageRoles = (userId: IUser['_id'] | undefined, roomId: IRoom['_id'], shouldLoadRoles: boolean): Array<string> => {
    /* Implementation Hidden */
};

```