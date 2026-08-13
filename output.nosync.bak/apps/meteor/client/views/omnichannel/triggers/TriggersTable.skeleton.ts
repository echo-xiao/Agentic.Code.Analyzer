## File: apps/meteor/client/views/omnichannel/triggers/TriggersTable.tsx

```typescript
import { Pagination } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import {
	GenericTable,
	GenericTableHeader,
	GenericTableBody,
	GenericTableHeaderCell,
	GenericTableLoadingRow,
	usePagination,
} from '@rocket.chat/ui-client';
import { useTranslation, useEndpoint, useRouter } from '@rocket.chat/ui-contexts';
import { useQuery, hashKey } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import TriggersRow from './TriggersRow';
import GenericError from '../../../components/GenericError';
import GenericNoResults from '../../../components/GenericNoResults';
import { links } from '../../../lib/links';

const TriggersTable = () => {
    /* Implementation Hidden */
};

export default TriggersTable;

```