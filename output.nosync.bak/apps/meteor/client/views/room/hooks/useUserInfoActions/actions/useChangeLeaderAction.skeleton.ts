## File: apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useChangeLeaderAction.ts

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import {
	useTranslation,
	usePermission,
	useUserRoom,
	useUserSubscription,
	useEndpoint,
	useToastMessageDispatch,
} from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getRoomDirectives } from '../../../lib/getRoomDirectives';
import { useUserHasRoomRole } from '../../useUserHasRoomRole';
import type { UserInfoAction, UserInfoActionType } from '../useUserInfoActions';

const getEndpoint = (roomType: string, isLeader: boolean) => {
    /* Implementation Hidden */
};

export const useChangeLeaderAction = (user: Pick<IUser, '_id' | 'username'>, rid: IRoom['_id']): UserInfoAction | undefined => {
    /* Implementation Hidden */
};

```