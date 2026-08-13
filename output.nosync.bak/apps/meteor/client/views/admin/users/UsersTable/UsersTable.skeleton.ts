## File: apps/meteor/client/views/admin/users/UsersTable/UsersTable.tsx

```typescript
import type { IRole, IUser, Serialized } from '@rocket.chat/core-typings';
import { Pagination } from '@rocket.chat/fuselage';
import { useStableCallback, useBreakpoints } from '@rocket.chat/fuselage-hooks';
import type { DefaultUserInfo } from '@rocket.chat/rest-typings';
import {
	GenericTable,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableBody,
	GenericTableLoadingTable,
} from '@rocket.chat/ui-client';
import type { usePagination, useSort } from '@rocket.chat/ui-client';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useRouter } from '@rocket.chat/ui-contexts';
import type { Dispatch, SetStateAction, MouseEvent, KeyboardEvent } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import UsersTableFilters from './UsersTableFilters';
import UsersTableRow from './UsersTableRow';
import GenericNoResults from '../../../../components/GenericNoResults';
import type { AdminUsersTab, UsersFilters, UsersTableSortingOption } from '../AdminUsersPage';
import { useShowVoipExtension } from '../useShowVoipExtension';

export type UsersTableProps = {
	tab: AdminUsersTab;
	roleData: { roles: Serialized<IRole>[] } | undefined;
	users: Serialized<DefaultUserInfo>[];
	total: number;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	onReload: () => void;
	setUserFilters: Dispatch<SetStateAction<UsersFilters>>;
	paginationData: ReturnType<typeof usePagination>;
	sortData: ReturnType<typeof useSort<UsersTableSortingOption>>;
	isSeatsCapExceeded: boolean;
};

const UsersTable = ({
	users,
	total,
	isLoading,
	isError,
	isSuccess,
	setUserFilters,
	roleData,
	tab,
	onReload,
	paginationData,
	sortData,
	isSeatsCapExceeded,
}: UsersTableProps) => {
    /* Implementation Hidden */
};

export default UsersTable;

```