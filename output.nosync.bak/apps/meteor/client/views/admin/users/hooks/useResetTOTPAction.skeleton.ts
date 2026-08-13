## File: apps/meteor/client/views/admin/users/hooks/useResetTOTPAction.tsx

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { GenericModal } from '@rocket.chat/ui-client';
import { useSetModal, usePermission, useSetting, useEndpoint, useTranslation, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useCallback } from 'react';

import type { AdminUserAction } from './useAdminUserInfoActions';

export const useResetTOTPAction = (userId: IUser['_id']): AdminUserAction | undefined => {
    /* Implementation Hidden */
};

```