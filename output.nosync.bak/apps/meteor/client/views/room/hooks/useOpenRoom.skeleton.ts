## File: apps/meteor/client/views/room/hooks/useOpenRoom.ts

```typescript
import { isPublicRoom, type IRoom, type RoomType } from '@rocket.chat/core-typings';
import { getObjectKeys } from '@rocket.chat/tools';
import { useEndpoint, useMethod, usePermission, useRoute, useSetting, useUser } from '@rocket.chat/ui-contexts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

import { useOpenRoomMutation } from './useOpenRoomMutation';
import { LegacyRoomManager } from '../../../../app/ui-utils/client';
import { roomFields } from '../../../../lib/publishFields';
import { RoomManager } from '../../../lib/RoomManager';
import { NotAuthorizedError } from '../../../lib/errors/NotAuthorizedError';
import { NotSubscribedToRoomError } from '../../../lib/errors/NotSubscribedToRoomError';
import { OldUrlRoomError } from '../../../lib/errors/OldUrlRoomError';
import { RoomNotFoundError } from '../../../lib/errors/RoomNotFoundError';
import { roomsQueryKeys } from '../../../lib/queryKeys';
import { Rooms, Subscriptions } from '../../../stores';

export function useOpenRoom({ type, reference }: { type: RoomType; reference: string }) {
    /* Implementation Hidden */
}

```