## File: apps/meteor/client/views/omnichannel/businessHours/BusinessHoursTable.tsx

```typescript
import { Pagination, States, StatesIcon, StatesActions, StatesAction, StatesTitle } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import {
	GenericTable,
	GenericTableBody,
	GenericTableHeaderCell,
	GenericTableHeader,
	GenericTableLoadingRow,
	usePagination,
} from '@rocket.chat/ui-client';
import { useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import BusinessHoursRow from './BusinessHoursRow';
import FilterByText from '../../../components/FilterByText';
import GenericNoResults from '../../../components/GenericNoResults';

const BusinessHoursTable = () => {
    /* Implementation Hidden */
};

export default BusinessHoursTable;

```