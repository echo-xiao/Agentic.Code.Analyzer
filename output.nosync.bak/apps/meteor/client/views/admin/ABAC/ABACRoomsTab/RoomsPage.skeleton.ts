## File: apps/meteor/client/views/admin/ABAC/ABACRoomsTab/RoomsPage.tsx

```typescript
import { Box, Button, Icon, Margins, Pagination, Select, TextInput } from '@rocket.chat/fuselage';
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
import { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import RoomMenu from './RoomMenu';
import GenericNoResults from '../../../../components/GenericNoResults';
import { RoomIcon } from '../../../../components/RoomIcon';
import { ABACQueryKeys } from '../../../../lib/queryKeys';
import { useIsABACAvailable } from '../hooks/useIsABACAvailable';
import { useIsExternalAttributeStore } from '../hooks/useIsExternalAttributeStore';

const RoomsPage = () => {
    /* Implementation Hidden */
};

export default RoomsPage;

```