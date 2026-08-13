## File: apps/meteor/client/views/omnichannel/directory/contacts/ContactTable.tsx

```typescript
import { Pagination, States, StatesAction, StatesActions, StatesIcon, StatesTitle, Box, Button } from '@rocket.chat/fuselage';
import { useDebouncedValue, useStableCallback } from '@rocket.chat/fuselage-hooks';
import {
	GenericTable,
	GenericTableHeader,
	GenericTableBody,
	GenericTableHeaderCell,
	GenericTableLoadingTable,
	usePagination,
	useSort,
} from '@rocket.chat/ui-client';
import { hashKey } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ContactTableRow from './ContactTableRow';
import { useCurrentContacts } from './hooks/useCurrentContacts';
import FilterByText from '../../../../components/FilterByText';
import GenericNoResults from '../../../../components/GenericNoResults';
import { links } from '../../../../lib/links';
import { useOmnichannelDirectoryRouter } from '../hooks/useOmnichannelDirectoryRouter';

function ContactTable() {
    /* Implementation Hidden */
}

export default ContactTable;

```