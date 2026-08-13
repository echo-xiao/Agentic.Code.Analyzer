## File: apps/meteor/client/views/omnichannel/cannedResponses/modals/CannedResponsesTable.tsx

```typescript
import { Box, Pagination } from '@rocket.chat/fuselage';
import { useDebouncedValue, useStableCallback } from '@rocket.chat/fuselage-hooks';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import {
	GenericTable,
	GenericTableBody,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableLoadingRow,
	GenericTableRow,
	GenericTableCell,
	usePagination,
	useSort,
} from '@rocket.chat/ui-client';
import { useTranslation, usePermission, useToastMessageDispatch, useEndpoint, useRouter } from '@rocket.chat/ui-contexts';
import { hashKey, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import CannedResponseFilter from './CannedResponseFilter';
import GenericNoResults from '../../../../components/GenericNoResults';
import { useFormatDateAndTime } from '../../../../hooks/useFormatDateAndTime';
import { links } from '../../../../lib/links';
import RemoveCannedResponseButton from '../RemoveCannedResponseButton';

type Scope = 'global' | 'department' | 'user';

const CannedResponsesTable = () => {
    /* Implementation Hidden */
};

export default CannedResponsesTable;

```