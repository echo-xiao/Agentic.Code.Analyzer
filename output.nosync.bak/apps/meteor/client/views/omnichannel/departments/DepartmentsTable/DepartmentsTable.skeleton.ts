## File: apps/meteor/client/views/omnichannel/departments/DepartmentsTable/DepartmentsTable.tsx

```typescript
import type { ILivechatDepartment } from '@rocket.chat/core-typings';
import { Pagination } from '@rocket.chat/fuselage';
import { useDebouncedValue, useStableCallback } from '@rocket.chat/fuselage-hooks';
import {
	GenericTable,
	GenericTableBody,
	GenericTableCell,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableLoadingTable,
	GenericTableRow,
	usePagination,
	useSort,
} from '@rocket.chat/ui-client';
import { useTranslation, useEndpoint, useRouter } from '@rocket.chat/ui-contexts';
import { useQuery, hashKey, keepPreviousData } from '@tanstack/react-query';
import { useState, useMemo } from 'react';

import DepartmentItemMenu from './DepartmentItemMenu';
import FilterByText from '../../../../components/FilterByText';
import GenericNoResults from '../../../../components/GenericNoResults/GenericNoResults';
import { links } from '../../../../lib/links';

const DEPARTMENTS_ENDPOINTS = {
	department: '/v1/livechat/department',
	archived: '/v1/livechat/departments/archived',
} as const;

const DepartmentsTable = ({ archived }: { archived: boolean }) => {
    /* Implementation Hidden */
};

export default DepartmentsTable;

```