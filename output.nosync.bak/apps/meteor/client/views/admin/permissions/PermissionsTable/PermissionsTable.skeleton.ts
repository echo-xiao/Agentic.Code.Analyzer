## File: apps/meteor/client/views/admin/permissions/PermissionsTable/PermissionsTable.tsx

```typescript
import type { IPermission, IRole } from '@rocket.chat/core-typings';
import { css } from '@rocket.chat/css-in-js';
import { Pagination, Palette } from '@rocket.chat/fuselage';
import { GenericTable, GenericTableHeader, GenericTableHeaderCell, GenericTableBody } from '@rocket.chat/ui-client';
import type { usePagination } from '@rocket.chat/ui-client';
import { useMethod } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import PermissionRow from './PermissionRow';
import PermissionsTableFilter from './PermissionsTableFilter';
import RoleHeader from './RoleHeader';
import GenericNoResults from '../../../../components/GenericNoResults';

export type PermissionsTableProps = {
	roleList: IRole[];
	permissions: IPermission[];
	setFilter: (filter: string) => void;
	total: number;
	paginationData: ReturnType<typeof usePagination>;
};

const PermissionsTable = ({ roleList, permissions, setFilter, total, paginationData }: PermissionsTableProps) => {
    /* Implementation Hidden */
};

export default PermissionsTable;

```