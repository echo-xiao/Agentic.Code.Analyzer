## File: apps/meteor/client/views/audit/components/SecurityLogsTable.tsx

```typescript
import type { IAuditServerAppActor, IAuditServerSystemActor, IAuditServerUserActor } from '@rocket.chat/core-typings';
import { Box, Button, ButtonGroup, Field, FieldLabel, Margins, Pagination } from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import {
	GenericTable,
	GenericTableBody,
	GenericTableCell,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableLoadingRow,
	GenericTableRow,
	usePagination,
} from '@rocket.chat/ui-client';
import { useEndpoint, useSetModal } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SecurityLogDisplayModal from './SecurityLogDisplayModal';
import { SettingSelect } from './SettingSelect';
import DateRangePicker from './forms/DateRangePicker';
import GenericNoResults from '../../../components/GenericNoResults';
import type { DateRange } from '../utils/dateRange';
import { getTypeTranslation } from '../utils/getAppTypeTranslation';

const SecurityLogsTable = () => {
    /* Implementation Hidden */
};

export default SecurityLogsTable;

```