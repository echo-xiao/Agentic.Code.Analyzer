## File: apps/meteor/client/views/admin/rooms/RoomsTable.tsx

```typescript
import { Pagination, States, StatesIcon, StatesTitle, StatesActions, StatesAction } from '@rocket.chat/fuselage';
import { useMediaQuery, useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import type { OptionProp } from '@rocket.chat/ui-client';
import {
	GenericTable,
	GenericTableBody,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableLoadingTable,
	usePagination,
	useSort,
} from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { MutableRefObject } from 'react';
import { useRef, useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import RoomRow from './RoomRow';
import RoomsTableFilters from './RoomsTableFilters';
import GenericNoResults from '../../../components/GenericNoResults';

type RoomFilters = {
	searchText: string;
	types: OptionProp[];
};

const DEFAULT_TYPES = ['d', 'p', 'c', 'l', 'discussions', 'teams'];

const RoomsTable = ({ reload }: { reload: MutableRefObject<() => void> }) => {
    /* Implementation Hidden */
};

export default RoomsTable;

```