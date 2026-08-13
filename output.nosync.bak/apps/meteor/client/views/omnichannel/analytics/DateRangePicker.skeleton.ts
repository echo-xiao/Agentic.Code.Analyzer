## File: apps/meteor/client/views/omnichannel/analytics/DateRangePicker.tsx

```typescript
import { Box, InputBox, Field, FieldLabel, FieldRow } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericMenu } from '@rocket.chat/ui-client';
import { subDays, subMonths, startOfMonth, endOfMonth, format } from 'date-fns';
import type { ComponentProps, ChangeEvent } from 'react';
import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export type DateRangePickerProps = Omit<ComponentProps<typeof Box>, 'onChange'> & {
	onChange(range: { start: string; end: string }): void;
};

const formatToDateInput = (date: Date) => format(date, 'yyyy-MM-dd');

const getTodayDate = () => formatToDateInput(new Date());

const getMonthRange = (monthsToSubtractFromToday: number) => {
    /* Implementation Hidden */
};

const getWeekRange = (daysToSubtractFromStart: number, daysToSubtractFromEnd: number) => {
    /* Implementation Hidden */
};

const DateRangePicker = ({ onChange = () => undefined, ...props }: DateRangePickerProps) => {
    /* Implementation Hidden */
};

export default DateRangePicker;

```