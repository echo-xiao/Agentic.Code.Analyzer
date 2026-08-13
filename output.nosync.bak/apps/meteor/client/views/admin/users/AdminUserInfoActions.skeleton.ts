## File: apps/meteor/client/views/admin/users/AdminUserInfoActions.tsx

```typescript
import { ButtonGroup, IconButton } from '@rocket.chat/fuselage';
import { GenericMenu } from '@rocket.chat/ui-client';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { AdminUserAction, AdminUserInfoActionsProps } from './hooks/useAdminUserInfoActions';
import { useAdminUserInfoActions } from './hooks/useAdminUserInfoActions';
import { UserInfoAction } from '../../../components/UserInfo';

const AdminUserInfoActions = ({
	username,
	userId,
	isFederatedUser,
	isActive,
	isAdmin,
	tab,
	onChange,
	onReload,
}: AdminUserInfoActionsProps) => {
    /* Implementation Hidden */
};

export default AdminUserInfoActions;

```