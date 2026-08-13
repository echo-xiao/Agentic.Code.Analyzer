## File: apps/meteor/client/views/admin/permissions/UsersInRole/UsersInRoleTable/UsersInRoleTable.tsx

```typescript
import type { IUserInRole, Serialized } from '@rocket.chat/core-typings';
import { Pagination } from '@rocket.chat/fuselage';
import {
	GenericTable,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableBody,
	GenericTableLoadingTable,
} from '@rocket.chat/ui-client';
import type { usePagination } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import UsersInRoleTableRow from './UsersInRoleTableRow';
import GenericError from '../../../../../components/GenericError';
import GenericNoResults from '../../../../../components/GenericNoResults';

export type UsersInRoleTableProps = {
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	total: number;
	users: Serialized<IUserInRole>[];
	onRemove: (username: IUserInRole['username']) => void;
	paginationData: ReturnType<typeof usePagination>;
	refetch: () => void;
};

const UsersInRoleTable = ({ isLoading, isSuccess, isError, total, users, onRemove, refetch, paginationData }: UsersInRoleTableProps) => {
    /* Implementation Hidden */
};

export default UsersInRoleTable;

```