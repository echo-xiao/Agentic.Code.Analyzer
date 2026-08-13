## File: apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useUserMediaCallAction.ts

```typescript
import { isRoomFederated } from '@rocket.chat/core-typings';
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { useUserAvatarPath, useUserId, useUserSubscription, useUserCard, useUserRoom } from '@rocket.chat/ui-contexts';
import { usePeekMediaSessionState, useWidgetExternalControls } from '@rocket.chat/ui-voip';
import { useTranslation } from 'react-i18next';

import type { UserInfoAction } from '../useUserInfoActions';

export const useUserMediaCallAction = (user: Pick<IUser, '_id' | 'username' | 'name'>, rid: IRoom['_id']): UserInfoAction | undefined => {
    /* Implementation Hidden */
};

```