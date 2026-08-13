## File: apps/meteor/client/views/admin/moderation/ModerationConsoleTable.tsx

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Pagination } from '@rocket.chat/fuselage';
import { useDebouncedValue, useMediaQuery, useStableCallback } from '@rocket.chat/fuselage-hooks';
import {
	GenericTable,
	GenericTableLoadingTable,
	GenericTableHeaderCell,
	GenericTableBody,
	GenericTableHeader,
	usePagination,
	useSort,
} from '@rocket.chat/ui-client';
import { useEndpoint, useRouter } from '@rocket.chat/ui-contexts';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ModerationConsoleTableRow from './ModerationConsoleTableRow';
import ModerationFilter from './helpers/ModerationFilter';
import GenericNoResults from '../../../components/GenericNoResults';

// TODO: Missing error state
const ModerationConsoleTable = () => {
    /* Implementation Hidden */
};

export default ModerationConsoleTable;

```