## File: apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useAddUserAction.ts

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { isRoomFederated, isRoomNativeFederated } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import {
	useTranslation,
	useUser,
	useUserRoom,
	useUserSubscription,
	useToastMessageDispatch,
	useAtLeastOnePermission,
	useEndpoint,
} from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';

import * as Federation from '../../../../../lib/federation/Federation';
import { useAddMatrixUsers } from '../../../contextualBar/RoomMembers/AddUsers/AddMatrixUsers/useAddMatrixUsers';
import { getRoomDirectives } from '../../../lib/getRoomDirectives';
import type { UserInfoAction } from '../useUserInfoActions';

const inviteUserEndpoints = {
	c: '/v1/channels.invite',
	p: '/v1/groups.invite',
} as const;

export const useAddUserAction = (
	user: Pick<IUser, '_id' | 'username'>,
	rid: IRoom['_id'],
	reload?: () => void,
): UserInfoAction | undefined => {
    /* Implementation Hidden */
};

```