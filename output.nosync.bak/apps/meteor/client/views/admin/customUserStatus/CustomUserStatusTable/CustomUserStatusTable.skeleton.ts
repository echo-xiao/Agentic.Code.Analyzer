## File: apps/meteor/client/views/admin/customUserStatus/CustomUserStatusTable/CustomUserStatusTable.tsx

```typescript
import { Pagination } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import {
	GenericTable,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableBody,
	GenericTableLoadingTable,
	usePagination,
	useSort,
} from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { MutableRefObject } from 'react';
import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import CustomUserStatusRow from './CustomUserStatusRow';
import FilterByText from '../../../../components/FilterByText';
import GenericNoResult from '../../../../components/GenericNoResults';

export type CustomUserStatusProps = {
	reload: MutableRefObject<() => void>;
	onClick: (id: string) => void;
};

// TODO: Missing error state
const CustomUserStatus = ({ reload, onClick }: CustomUserStatusProps) => {
    /* Implementation Hidden */
};

export default CustomUserStatus;

```