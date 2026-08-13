## File: apps/meteor/client/views/omnichannel/slaPolicies/SlaTable.tsx

```typescript
import { Pagination } from '@rocket.chat/fuselage';
import { useDebouncedValue, useStableCallback } from '@rocket.chat/fuselage-hooks';
import {
	GenericTable,
	GenericTableHeaderCell,
	GenericTableHeader,
	GenericTableLoadingRow,
	GenericTableBody,
	GenericTableRow,
	GenericTableCell,
	usePagination,
	useSort,
} from '@rocket.chat/ui-client';
import { useTranslation, useEndpoint, useRouter } from '@rocket.chat/ui-contexts';
import { useQuery, hashKey } from '@tanstack/react-query';
import type { MutableRefObject } from 'react';
import { useMemo, useState, useEffect } from 'react';

import RemoveSlaButton from './RemoveSlaButton';
import FilterByText from '../../../components/FilterByText';
import GenericNoResults from '../../../components/GenericNoResults/GenericNoResults';
import { links } from '../../../lib/links';

const SlaTable = ({ reload }: { reload: MutableRefObject<() => void> }) => {
    /* Implementation Hidden */
};

export default SlaTable;

```