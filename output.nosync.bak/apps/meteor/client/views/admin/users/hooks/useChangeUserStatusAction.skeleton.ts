## File: apps/meteor/client/views/admin/users/hooks/useChangeUserStatusAction.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { useToastMessageDispatch, useTranslation, useEndpoint, usePermission } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';

import type { AdminUserAction } from './useAdminUserInfoActions';
import { useConfirmOwnerChanges } from './useConfirmOwnerChanges';

export const useChangeUserStatusAction = (userId: IUser['_id'], isActive: boolean, onChange: () => void): AdminUserAction | undefined => {
    /* Implementation Hidden */
};

```