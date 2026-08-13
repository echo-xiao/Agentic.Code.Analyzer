## File: apps/meteor/client/views/omnichannel/queueList/QueueListTable.tsx

```typescript
import { UserStatus } from '@rocket.chat/core-typings';
import { Box, Pagination } from '@rocket.chat/fuselage';
import { useMediaQuery } from '@rocket.chat/fuselage-hooks';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import {
	GenericTable,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableBody,
	GenericTableRow,
	GenericTableCell,
	GenericTableLoadingRow,
	usePagination,
	useSort,
} from '@rocket.chat/ui-client';
import { useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { QueueListFilter } from './QueueListFilter';
import GenericNoResults from '../../../components/GenericNoResults';

const QueueListTable = () => {
    /* Implementation Hidden */
};

export default QueueListTable;

```