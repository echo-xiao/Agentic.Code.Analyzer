## File: apps/meteor/client/views/admin/emailInbox/EmailInboxTable.tsx

```typescript
import { Pagination, States, StatesAction, StatesActions, StatesIcon, StatesTitle } from '@rocket.chat/fuselage';
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
import { useRoute, useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';

import SendTestButton from './SendTestButton';
import GenericNoResults from '../../../components/GenericNoResults';

const EmailInboxTable = () => {
    /* Implementation Hidden */
};

export default EmailInboxTable;

```