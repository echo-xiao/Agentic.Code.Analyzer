## File: apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useRedirectModerationConsole.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { usePermission, useRoute } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import type { UserInfoAction, UserInfoActionType } from '../useUserInfoActions';

export const useRedirectModerationConsole = (uid: IUser['_id']): UserInfoAction | undefined => {
    /* Implementation Hidden */
};

```