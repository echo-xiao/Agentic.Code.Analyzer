## File: apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useBlockUserAction.ts

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import {
	useTranslation,
	useEndpoint,
	useToastMessageDispatch,
	useUserId,
	useUserSubscription,
	useUserRoom,
} from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';

import { getRoomDirectives } from '../../../lib/getRoomDirectives';
import type { UserInfoAction } from '../useUserInfoActions';

export const useBlockUserAction = (user: Pick<IUser, '_id' | 'username'>, rid: IRoom['_id']): UserInfoAction | undefined => {
    /* Implementation Hidden */
};

```