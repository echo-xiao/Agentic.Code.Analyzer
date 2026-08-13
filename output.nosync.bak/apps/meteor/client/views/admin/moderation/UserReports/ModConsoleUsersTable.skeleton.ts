## File: apps/meteor/client/views/admin/moderation/UserReports/ModConsoleUsersTable.tsx

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Pagination, States, StatesAction, StatesActions, StatesIcon, StatesTitle } from '@rocket.chat/fuselage';
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

import ModConsoleUserTableRow from './ModConsoleUserTableRow';
import GenericNoResults from '../../../../components/GenericNoResults';
import ModerationFilter from '../helpers/ModerationFilter';

const ModConsoleUsersTable = () => {
    /* Implementation Hidden */
};

export default ModConsoleUsersTable;

```