## File: apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useVideoCallAction.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { isRoomFederated } from '@rocket.chat/core-typings';
import {
	useTranslation,
	useUserRoom,
	useUserId,
	useUserSubscriptionByName,
	useSetting,
	usePermission,
	useUserCard,
} from '@rocket.chat/ui-contexts';
import {
	useVideoConfDispatchOutgoing,
	useVideoConfIsCalling,
	useVideoConfIsRinging,
	useVideoConfLoadCapabilities,
} from '@rocket.chat/ui-video-conf';
import { useMemo } from 'react';

import { useVideoConfWarning } from '../../../contextualBar/VideoConference/hooks/useVideoConfWarning';
import type { UserInfoAction } from '../useUserInfoActions';

export const useVideoCallAction = (user: Pick<IUser, '_id' | 'username'>): UserInfoAction | undefined => {
    /* Implementation Hidden */
};

```