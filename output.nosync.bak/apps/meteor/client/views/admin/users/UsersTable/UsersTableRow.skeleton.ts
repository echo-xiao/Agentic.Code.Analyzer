## File: apps/meteor/client/views/admin/users/UsersTable/UsersTableRow.tsx

```typescript
import { UserStatus as Status } from '@rocket.chat/core-typings';
import type { IUser, Serialized } from '@rocket.chat/core-typings';
import { Box, Button } from '@rocket.chat/fuselage';
import type { DefaultUserInfo } from '@rocket.chat/rest-typings';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { GenericMenu, GenericTableRow, GenericTableCell } from '@rocket.chat/ui-client';
import type { KeyboardEvent, MouseEvent } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { UserStatus } from '../../../../components/UserStatus';
import { Roles } from '../../../../stores';
import type { AdminUsersTab } from '../AdminUsersPage';
import { useChangeAdminStatusAction } from '../hooks/useChangeAdminStatusAction';
import { useChangeUserStatusAction } from '../hooks/useChangeUserStatusAction';
import { useDeleteUserAction } from '../hooks/useDeleteUserAction';
import { useResetE2EEKeyAction } from '../hooks/useResetE2EEKeyAction';
import { useResetTOTPAction } from '../hooks/useResetTOTPAction';
import { useSendWelcomeEmailMutation } from '../hooks/useSendWelcomeEmailMutation';

export type UsersTableRowProps = {
	user: Serialized<DefaultUserInfo>;
	tab: AdminUsersTab;
	isMobile: boolean;
	isLaptop: boolean;
	onReload: () => void;
	onClick: (id: IUser['_id'], e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;
	isSeatsCapExceeded: boolean;
	showVoipExtension: boolean;
};

const UsersTableRow = ({ user, tab, isMobile, isLaptop, isSeatsCapExceeded, showVoipExtension, onClick, onReload }: UsersTableRowProps) => {
    /* Implementation Hidden */
};

export default UsersTableRow;

```