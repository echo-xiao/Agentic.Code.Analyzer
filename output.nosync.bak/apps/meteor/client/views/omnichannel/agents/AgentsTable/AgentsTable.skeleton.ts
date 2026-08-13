## File: apps/meteor/client/views/omnichannel/agents/AgentsTable/AgentsTable.tsx

```typescript
import { Pagination } from '@rocket.chat/fuselage';
import { useDebouncedValue, useMediaQuery, useStableCallback } from '@rocket.chat/fuselage-hooks';
import {
	GenericTable,
	GenericTableBody,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableLoadingTable,
	usePagination,
	useSort,
} from '@rocket.chat/ui-client';
import { hashKey } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AddAgent from './AddAgent';
import AgentsTableRow from './AgentsTableRow';
import FilterByText from '../../../../components/FilterByText';
import GenericError from '../../../../components/GenericError';
import GenericNoResults from '../../../../components/GenericNoResults/GenericNoResults';
import { links } from '../../../../lib/links';
import { useAgentsQuery } from '../hooks/useAgentsQuery';
import { useQuery } from '../hooks/useQuery';

const AgentsTable = () => {
    /* Implementation Hidden */
};

export default AgentsTable;

```