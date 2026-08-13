## File: apps/meteor/client/views/admin/users/hooks/useChangeAdminStatusAction.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { useToastMessageDispatch, usePermission, useEndpoint } from '@rocket.chat/ui-contexts';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import type { AdminUserAction } from './useAdminUserInfoActions';

export const useChangeAdminStatusAction = (
	username: IUser['username'] = '',
	isAdmin: boolean,
	onChange: () => void,
): AdminUserAction | undefined => {
    /* Implementation Hidden */
};

```