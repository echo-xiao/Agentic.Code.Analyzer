## File: apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useIgnoreUserAction.ts

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import {
	useTranslation,
	useUserSubscription,
	useUserRoom,
	useUserId,
	useToastMessageDispatch,
	useEndpoint,
} from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';

import { getRoomDirectives } from '../../../lib/getRoomDirectives';
import type { UserInfoAction, UserInfoActionType } from '../useUserInfoActions';

export const useIgnoreUserAction = (user: Pick<IUser, '_id' | 'username'>, rid: IRoom['_id']): UserInfoAction | undefined => {
    /* Implementation Hidden */
};

```