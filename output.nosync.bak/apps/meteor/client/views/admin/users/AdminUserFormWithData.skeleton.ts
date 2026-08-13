## File: apps/meteor/client/views/admin/users/AdminUserFormWithData.tsx

```typescript
import type { IRole, IUser, Serialized } from '@rocket.chat/core-typings';
import { Box, Callout } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useTranslation } from 'react-i18next';

import AdminUserForm from './AdminUserForm';
import { FormSkeleton } from '../../../components/Skeleton';
import { useUserInfoQuery } from '../../../hooks/useUserInfoQuery';

export type AdminUserFormWithDataProps = {
	uid: IUser['_id'];
	onReload: () => void;
	context: string;
	roleData: { roles: Serialized<IRole>[] } | undefined;
	roleError: Error | null;
};

const AdminUserFormWithData = ({ uid, onReload, context, roleData, roleError }: AdminUserFormWithDataProps) => {
    /* Implementation Hidden */
};

export default AdminUserFormWithData;

```