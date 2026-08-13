## File: apps/meteor/client/views/directory/tabs/teams/TeamsTable/TeamsTable.tsx

```typescript
import type { IRoom, Serialized } from '@rocket.chat/core-typings';
import { Pagination, States, StatesIcon, StatesTitle, StatesActions, StatesAction } from '@rocket.chat/fuselage';
import { useMediaQuery } from '@rocket.chat/fuselage-hooks';
import {
	GenericTable,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableBody,
	GenericTableLoadingTable,
	usePagination,
	useSort,
} from '@rocket.chat/ui-client';
import { useRoute, useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { KeyboardEvent, MouseEvent } from 'react';
import { useMemo, useState } from 'react';

import TeamsTableRow from './TeamsTableRow';
import FilterByText from '../../../../../components/FilterByText';
import GenericNoResults from '../../../../../components/GenericNoResults';
import { useDirectoryQuery } from '../../../hooks/useDirectoryQuery';

const TeamsTable = () => {
    /* Implementation Hidden */
};

export default TeamsTable;

```