## File: apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useBanUserAction.ts

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { usePermission, useUserRoom, useUserSubscription } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { getRoomDirectives } from '../../../lib/getRoomDirectives';
import { useBanUser } from '../../useBanUser';
import type { UserInfoAction } from '../useUserInfoActions';

export const useBanUserAction = (user: Pick<IUser, '_id' | 'username'>, roomId: IRoom['_id']): UserInfoAction | undefined => {
    /* Implementation Hidden */
};

```