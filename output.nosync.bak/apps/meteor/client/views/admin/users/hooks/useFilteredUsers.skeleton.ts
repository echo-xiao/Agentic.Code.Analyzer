## File: apps/meteor/client/views/admin/users/hooks/useFilteredUsers.ts

```typescript
import type { UsersListStatusParamsGET } from '@rocket.chat/rest-typings';
import type { usePagination, useSort } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { MutableRefObject } from 'react';
import { useMemo } from 'react';

import type { AdminUsersTab, UsersTableSortingOption } from '../AdminUsersPage';

type UseFilteredUsersOptions = {
	searchTerm: string;
	prevSearchTerm: MutableRefObject<string>;
	tab: AdminUsersTab;
	paginationData: ReturnType<typeof usePagination>;
	sortData: ReturnType<typeof useSort<UsersTableSortingOption>>;
	selectedRoles: string[];
};

const useFilteredUsers = ({ searchTerm, prevSearchTerm, sortData, paginationData, tab, selectedRoles }: UseFilteredUsersOptions) => {
    /* Implementation Hidden */
};
export default useFilteredUsers;

```