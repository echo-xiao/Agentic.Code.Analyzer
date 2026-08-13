## File: apps/meteor/client/views/omnichannel/managers/ManagersTable.tsx

```typescript
import { Box, Pagination } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { UserAvatar } from '@rocket.chat/ui-avatar';
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
import { useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { hashKey, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import AddManager from './AddManager';
import RemoveManagerButton from './RemoveManagerButton';
import FilterByText from '../../../components/FilterByText';
import GenericError from '../../../components/GenericError';
import GenericNoResults from '../../../components/GenericNoResults/GenericNoResults';
import { links } from '../../../lib/links';
import { omnichannelQueryKeys } from '../../../lib/queryKeys';

const ManagersTable = () => {
    /* Implementation Hidden */
};

export default ManagersTable;

```