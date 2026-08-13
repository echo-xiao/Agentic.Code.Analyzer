## File: apps/meteor/client/views/admin/ABAC/ABACLogsTab/LogsPage.tsx

```typescript
import type { AbacAttributeDefinitionChangeType, AbacActionPerformed } from '@rocket.chat/core-typings';
import { Box, InputBox, Margins, Pagination } from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import {
	GenericTable,
	GenericTableBody,
	GenericTableCell,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableRow,
	usePagination,
} from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import GenericNoResults from '../../../../components/GenericNoResults';
import { useFormatDateAndTime } from '../../../../hooks/useFormatDateAndTime';
import { ABACQueryKeys } from '../../../../lib/queryKeys';
import DateRangePicker from '../../moderation/helpers/DateRangePicker';

const LogsPage = () => {
    /* Implementation Hidden */
};

export default LogsPage;

```