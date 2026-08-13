## File: apps/meteor/client/views/audit/components/forms/DateRangePicker.tsx

```typescript
import { Box, InputBox, Margins } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericMenu } from '@rocket.chat/ui-client';
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subDays, subWeeks, subMonths, parseISO } from 'date-fns';
import type { ComponentProps, SetStateAction, ChangeEvent } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { DateRange } from '../../utils/dateRange';

const formatToDateInput = (date: Date | undefined) => {
    /* Implementation Hidden */
};

const parseFromStartDateInput = (date: string) => {
    /* Implementation Hidden */
};

const parseFromEndDateInput = (date: string) => {
    /* Implementation Hidden */
};

type DateRangeAction =
	| SetStateAction<DateRange>
	| 'today'
	| 'yesterday'
	| 'this-week'
	| 'last-week'
	| 'this-month'
	| 'last-month'
	| { newStart: string }
	| { newEnd: string };

const dateRangeReducer = (state: DateRange, action: DateRangeAction): DateRange => {
    /* Implementation Hidden */
};

export type DateRangePickerProps = Omit<ComponentProps<typeof Box>, 'value' | 'onChange'> & {
	value?: DateRange;
	onChange?: (dateRange: DateRange) => void;
};

const minDate = (a: Date, b: Date) => (a.getTime() < b.getTime() ? a : b);

const DateRangePicker = ({ value, onChange, ...props }: DateRangePickerProps) => {
    /* Implementation Hidden */
};

export default DateRangePicker;

```