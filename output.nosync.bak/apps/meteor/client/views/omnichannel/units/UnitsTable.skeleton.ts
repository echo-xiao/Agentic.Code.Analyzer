## File: apps/meteor/client/views/omnichannel/units/UnitsTable.tsx

```typescript
import { Pagination } from '@rocket.chat/fuselage';
import { useDebouncedValue, useStableCallback } from '@rocket.chat/fuselage-hooks';
import {
	GenericTable,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableBody,
	GenericTableLoadingRow,
	usePagination,
	useSort,
} from '@rocket.chat/ui-client';
import { useEndpoint, useRouter } from '@rocket.chat/ui-contexts';
import { useQuery, hashKey } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import UnitTableRow from './UnitTableRow';
import FilterByText from '../../../components/FilterByText';
import GenericNoResults from '../../../components/GenericNoResults/GenericNoResults';
import { links } from '../../../lib/links';

const UnitsTable = () => {
    /* Implementation Hidden */
};

export default UnitsTable;

```