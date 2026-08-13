## File: apps/meteor/client/views/admin/ABAC/ABACAttributesTab/AttributesPage.tsx

```typescript
import { Box, Button, Icon, Margins, Pagination, TextInput } from '@rocket.chat/fuselage';
import { useDebouncedValue, useStableCallback } from '@rocket.chat/fuselage-hooks';
import {
	GenericTable,
	GenericTableBody,
	GenericTableCell,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableRow,
	usePagination,
} from '@rocket.chat/ui-client';
import { useEndpoint, useRouter, useSearchParameter } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AttributeMenu from './AttributeMenu';
import GenericNoResults from '../../../../components/GenericNoResults';
import { ABACQueryKeys } from '../../../../lib/queryKeys';
import { useIsABACAvailable } from '../hooks/useIsABACAvailable';

const AttributesPage = () => {
    /* Implementation Hidden */
};

export default AttributesPage;

```