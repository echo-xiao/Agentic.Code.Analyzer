## File: apps/meteor/client/views/admin/users/hooks/useAdminUserInfoActions.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import type { IconProps } from '@rocket.chat/fuselage';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { usePermission, useRoute } from '@rocket.chat/ui-contexts';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { AdminUsersTab } from '../AdminUsersPage';
import { useChangeAdminStatusAction } from './useChangeAdminStatusAction';
import { useChangeUserStatusAction } from './useChangeUserStatusAction';
import { useDeleteUserAction } from './useDeleteUserAction';
import { useResetE2EEKeyAction } from './useResetE2EEKeyAction';
import { useResetTOTPAction } from './useResetTOTPAction';

export type AdminUserAction = {
	type?: string;
	content: string;
	icon?: IconProps['name'];
	title?: string;
	variant?: 'danger';
	onClick: () => void;
	disabled?: boolean;
};

type AdminUserMenuAction = {
	id: string;
	title: string;
	items: GenericMenuItemProps[];
}[];

export type AdminUserInfoActionsProps = {
	username: IUser['username'];
	userId: IUser['_id'];
	isFederatedUser: IUser['federated'];
	isActive: boolean;
	isAdmin: boolean;
	tab: AdminUsersTab;
	onChange: () => void;
	onReload: () => void;
};

const useAdminUserInfoActionsSpread = (actions: Record<string, AdminUserAction>, size = 2) => {
    /* Implementation Hidden */
};

export const useAdminUserInfoActions = ({
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

```