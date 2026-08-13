## File: apps/meteor/client/views/admin/customSounds/CustomSoundsTable/CustomSoundsTable.tsx

```typescript
import { Pagination, States, StatesIcon, StatesActions, StatesAction, StatesTitle } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import {
	GenericTable,
	GenericTableBody,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableLoadingTable,
	usePagination,
	useSort,
} from '@rocket.chat/ui-client';
import { useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { MutableRefObject } from 'react';
import { useState, useMemo, useEffect } from 'react';

import CustomSoundRow from './CustomSoundRow';
import FilterByText from '../../../../components/FilterByText';
import GenericNoResults from '../../../../components/GenericNoResults';

export type CustomSoundsTableProps = {
	onClick: (soundId: string) => () => void;
	reload: MutableRefObject<() => void>;
};

const CustomSoundsTable = ({ reload, onClick }: CustomSoundsTableProps) => {
    /* Implementation Hidden */
};

export default CustomSoundsTable;

```