## File: apps/meteor/client/views/admin/users/AdminUserInfoWithData.tsx

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Callout } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { ContextualbarContent } from '@rocket.chat/ui-client';
import { useSetting, useRolesDescription, useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import AdminUserInfoActions from './AdminUserInfoActions';
import type { AdminUsersTab } from './AdminUsersPage';
import { getUserEmailAddress } from '../../../../lib/getUserEmailAddress';
import { FormSkeleton } from '../../../components/Skeleton';
import { UserCardRole } from '../../../components/UserCard';
import { UserInfo } from '../../../components/UserInfo';
import { UserStatus } from '../../../components/UserStatus';
import { UserStatusText } from '../../../components/UserStatusText';
import { getUserEmailVerified } from '../../../lib/utils/getUserEmailVerified';

export type AdminUserInfoWithDataProps = {
	uid: IUser['_id'];
	onReload: () => void;
	tab: AdminUsersTab;
};

const AdminUserInfoWithData = ({ uid, onReload, tab }: AdminUserInfoWithDataProps) => {
    /* Implementation Hidden */
};

export default AdminUserInfoWithData;

```