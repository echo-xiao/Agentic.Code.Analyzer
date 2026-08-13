## File: apps/meteor/client/views/admin/moderation/helpers/DateRangePicker.tsx

```typescript
import { Select, Box, type SelectOption } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { subDays, subMonths, startOfMonth, endOfMonth, format } from 'date-fns';
import type { Key } from 'react';
import { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export type DateRangePickerProps = {
	onChange(range: { start: string; end: string }): void;
	defaultSelectedKey?: 'today' | 'yesterday' | 'thisWeek' | 'previousWeek' | 'thisMonth' | 'alldates';
};

const formatToDateInput = (date: Date) => format(date, 'yyyy-MM-dd');

const getMonthRange = (monthsToSubtractFromToday: number) => {
    /* Implementation Hidden */
};

const getWeekRange = (daysToSubtractFromStart: number, daysToSubtractFromEnd: number) => {
    /* Implementation Hidden */
};

const DateRangePicker = ({ onChange, defaultSelectedKey = 'alldates' }: DateRangePickerProps) => {
    /* Implementation Hidden */
};

export default DateRangePicker;

```