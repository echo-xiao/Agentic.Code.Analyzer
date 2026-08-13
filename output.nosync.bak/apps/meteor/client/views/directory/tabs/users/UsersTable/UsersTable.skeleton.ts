## File: apps/meteor/client/views/directory/tabs/users/UsersTable/UsersTable.tsx

```typescript
import type { IDirectoryUserResult, IUser, Serialized } from '@rocket.chat/core-typings';
import { Pagination, States, StatesIcon, StatesTitle, StatesActions, StatesAction } from '@rocket.chat/fuselage';
import { useMediaQuery } from '@rocket.chat/fuselage-hooks';
import {
	GenericTable,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableBody,
	GenericTableLoadingTable,
	usePagination,
	useSort,
} from '@rocket.chat/ui-client';
import { usePermission, useRoute, useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { KeyboardEvent, MouseEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';

import UsersTableRow from './UsersTableRow';
import FilterByText from '../../../../../components/FilterByText';
import GenericNoResults from '../../../../../components/GenericNoResults';
import { useDirectoryQuery } from '../../../hooks/useDirectoryQuery';

export type UsersTableProps = {
	workspace?: 'external' | 'local';
};

const UsersTable = ({ workspace = 'local' }: UsersTableProps) => {
    /* Implementation Hidden */
};

export default UsersTable;

```