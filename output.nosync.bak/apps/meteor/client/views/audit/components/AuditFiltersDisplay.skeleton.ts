## File: apps/meteor/client/views/audit/components/AuditFiltersDisplay.tsx

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { Box } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import { useFormatDate } from '../../../hooks/useFormatDate';

export type AuditFiltersDisplayProps = {
	users?: IUser['username'][];
	room?: IRoom['name'];
	startDate?: Date;
	endDate?: Date;
	filters?: string;
};

const AuditFiltersDisplay = ({ users, room, startDate, endDate, filters }: AuditFiltersDisplayProps) => {
    /* Implementation Hidden */
};

export default AuditFiltersDisplay;

```