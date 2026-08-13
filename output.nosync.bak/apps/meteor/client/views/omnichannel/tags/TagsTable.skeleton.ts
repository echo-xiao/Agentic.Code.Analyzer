## File: apps/meteor/client/views/omnichannel/tags/TagsTable.tsx

```typescript
import { IconButton, Pagination } from '@rocket.chat/fuselage';
import { useDebouncedValue, useStableCallback } from '@rocket.chat/fuselage-hooks';
import {
	GenericTable,
	GenericTableRow,
	GenericTableCell,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableBody,
	GenericTableLoadingRow,
	usePagination,
	useSort,
} from '@rocket.chat/ui-client';
import { useTranslation, useEndpoint, useRouter } from '@rocket.chat/ui-contexts';
import { useQuery, hashKey } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { useRemoveTag } from './useRemoveTag';
import FilterByText from '../../../components/FilterByText';
import GenericNoResults from '../../../components/GenericNoResults';
import { links } from '../../../lib/links';

const TagsTable = () => {
    /* Implementation Hidden */
};

export default TagsTable;

```