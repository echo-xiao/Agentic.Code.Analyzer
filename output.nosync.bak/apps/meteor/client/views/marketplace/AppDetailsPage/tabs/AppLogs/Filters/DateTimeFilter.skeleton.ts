## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppLogs/Filters/DateTimeFilter.tsx

```typescript
import { Box, InputBox, Margins } from '@rocket.chat/fuselage';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export type DateTimeFilterProps = {
	type: 'start' | 'end';
	id?: string;
	control: Control<{ startDate?: string; startTime?: string; endDate?: string; endTime?: string }>;
	error?: boolean;
};

const DateTimeFilter = ({ type, control, id, error }: DateTimeFilterProps) => {
    /* Implementation Hidden */
};

export default DateTimeFilter;

```