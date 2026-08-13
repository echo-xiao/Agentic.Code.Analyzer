## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppLogs/Filters/TimeFilterSelect.tsx

```typescript
import type { SelectOption } from '@rocket.chat/fuselage';
import { Select } from '@rocket.chat/fuselage';
import { useSetModal } from '@rocket.chat/ui-contexts';
import { endOfDay, endOfWeek, startOfDay, startOfWeek, subMinutes, format } from 'date-fns';
import { useState, type ComponentProps } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { DateTimeModalFormData } from './DateTimeModal';
import { DateTimeModal } from './DateTimeModal';
import { useAppLogsFilterFormContext } from '../useAppLogsFilterForm';

type DateRange = {
	start: Date;
	end: Date;
};

type DateRangeAction = 'all' | 'today' | 'last5Minutes' | 'last15Minutes' | 'last30Minutes' | 'last1Hour' | 'thisWeek' | 'custom';

export type TimeFilterSelectProps = { compactView?: boolean } & Omit<ComponentProps<typeof Select>, 'onChange' | 'options'>;

export const TimeFilterSelect = ({ compactView = false, ...props }: TimeFilterSelectProps) => {
    /* Implementation Hidden */
};

```