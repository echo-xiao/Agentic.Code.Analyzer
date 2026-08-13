## File: apps/meteor/client/components/deviceManagement/DeviceManagementTable/DeviceManagementTable.tsx

```typescript
import type { DeviceManagementSession, DeviceManagementPopulatedSession, Serialized } from '@rocket.chat/core-typings';
import { Box, Pagination, States, StatesAction, StatesActions, StatesIcon, StatesSubtitle, StatesTitle } from '@rocket.chat/fuselage';
import type { PaginatedResult } from '@rocket.chat/rest-typings';
import { GenericTable, GenericTableHeader, GenericTableBody, GenericTableLoadingTable } from '@rocket.chat/ui-client';
import type { UseQueryResult } from '@tanstack/react-query';
import type { ComponentProps, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import GenericNoResults from '../../GenericNoResults/GenericNoResults';

// FIXME: this tight coupling with the query result is not ideal; it indicates visual components should not be tightly
// coupled with data fetching logic.
type DeviceManagementTableProps<T> = UseQueryResult<PaginatedResult<{ sessions: Serialized<T>[] }>> & {
	headers: ReactNode[];
	renderRow: (data: Serialized<T>) => ReactNode;
	current?: ComponentProps<typeof Pagination>['current'];
	itemsPerPage?: ComponentProps<typeof Pagination>['itemsPerPage'];
	setCurrent?: ComponentProps<typeof Pagination>['onSetCurrent'];
	setItemsPerPage?: ComponentProps<typeof Pagination>['onSetItemsPerPage'];
	paginationProps?: Partial<ComponentProps<typeof Pagination>>;
};

// TODO: Missing error state
const DeviceManagementTable = <T extends DeviceManagementSession | DeviceManagementPopulatedSession>({
	isPending,
	isError,
	error,
	isSuccess,
	data,
	refetch,
	headers,
	renderRow,
	current,
	itemsPerPage,
	setCurrent,
	setItemsPerPage,
	paginationProps,
}: DeviceManagementTableProps<T>) => {
    /* Implementation Hidden */
};

export default DeviceManagementTable;

```