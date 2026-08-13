## File: apps/meteor/client/views/audit/components/AuditLogTable.tsx

```typescript
import { Field, FieldLabel, FieldRow } from '@rocket.chat/fuselage';
import { GenericTable, GenericTableHeaderCell, GenericTableBody, GenericTableLoadingRow, GenericTableHeader } from '@rocket.chat/ui-client';
import { useTranslation, useMethod } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import AuditLogEntry from './AuditLogEntry';
import GenericNoResults from '../../../components/GenericNoResults';
import { createEndOfToday, createStartOfToday } from '../utils/dateRange';
import type { DateRange } from '../utils/dateRange';
import DateRangePicker from './forms/DateRangePicker';

const AuditLogTable = () => {
    /* Implementation Hidden */
};

export default AuditLogTable;

```