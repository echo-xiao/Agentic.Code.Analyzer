## File: apps/meteor/client/views/admin/integrations/IntegrationsTable.tsx

```typescript
import { Pagination, States, StatesActions, StatesAction, StatesIcon, StatesTitle } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import {
	GenericTable,
	GenericTableBody,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableLoadingTable,
	usePagination,
	useSort,
} from '@rocket.chat/ui-client';
import { useEndpoint, useRoute, useTranslation, useLayout } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useCallback, useState } from 'react';

import IntegrationRow from './IntegrationRow';
import FilterByText from '../../../components/FilterByText';
import GenericNoResults from '../../../components/GenericNoResults';

export type IntegrationsTableProps = { type?: string };

const IntegrationsTable = ({ type }: IntegrationsTableProps) => {
    /* Implementation Hidden */
};

export default IntegrationsTable;

```