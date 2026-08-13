## File: apps/meteor/client/views/omnichannel/customFields/CustomFieldsTable.tsx

```typescript
import { IconButton, Pagination } from '@rocket.chat/fuselage';
import { useDebouncedValue, useStableCallback } from '@rocket.chat/fuselage-hooks';
import {
	GenericTable,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableRow,
	GenericTableCell,
	GenericTableBody,
	GenericTableLoadingTable,
	usePagination,
	useSort,
} from '@rocket.chat/ui-client';
import { useTranslation, useRouter } from '@rocket.chat/ui-contexts';
import { hashKey } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { useRemoveCustomField } from './useRemoveCustomField';
import FilterByText from '../../../components/FilterByText';
import GenericNoResults from '../../../components/GenericNoResults';
import { links } from '../../../lib/links';
import { useCustomFieldsQuery } from '../hooks/useCustomFieldsQuery';

const CustomFieldsTable = () => {
    /* Implementation Hidden */
};

export default CustomFieldsTable;

```