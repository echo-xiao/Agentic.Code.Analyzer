## File: apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useDirectMessageAction.ts

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { useGoToDirectMessage } from '@rocket.chat/ui-client';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { UserInfoAction } from '../useUserInfoActions';

export const useDirectMessageAction = (user: Pick<IUser, '_id' | 'username'>, rid: IRoom['_id']): UserInfoAction | undefined => {
    /* Implementation Hidden */
};

```