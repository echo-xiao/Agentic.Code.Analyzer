## File: apps/meteor/client/views/audit/components/AuditLogEntry.tsx

```typescript
import type { IAuditLog } from '@rocket.chat/core-typings';
import { Box } from '@rocket.chat/fuselage';
import { useMediaQuery } from '@rocket.chat/fuselage-hooks';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { GenericTableRow, GenericTableCell } from '@rocket.chat/ui-client';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import AuditFiltersDisplay from './AuditFiltersDisplay';
import { useFormatDateAndTime } from '../../../hooks/useFormatDateAndTime';

export type AuditLogEntryProps = { value: IAuditLog };

const AuditLogEntry = ({ value: { u, results, ts, _id, fields } }: AuditLogEntryProps) => {
    /* Implementation Hidden */
};

export default memo(AuditLogEntry);

```