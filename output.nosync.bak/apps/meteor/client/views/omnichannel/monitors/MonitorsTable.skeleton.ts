## File: apps/meteor/client/views/omnichannel/monitors/MonitorsTable.tsx

```typescript
import {
	IconButton,
	Pagination,
	Button,
	Field,
	FieldLabel,
	FieldRow,
	Box,
	States,
	StatesIcon,
	StatesTitle,
	StatesActions,
	StatesAction,
} from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import {
	UserAutoComplete,
	GenericModal,
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
import { useTranslation, useToastMessageDispatch, useEndpoint, useSetModal } from '@rocket.chat/ui-contexts';
import { useMutation, useQuery, hashKey, useQueryClient } from '@tanstack/react-query';
import { useId, useMemo, useState } from 'react';

import FilterByText from '../../../components/FilterByText';
import GenericNoResults from '../../../components/GenericNoResults';
import { links } from '../../../lib/links';

const MonitorsTable = () => {
    /* Implementation Hidden */
};

export default MonitorsTable;

```