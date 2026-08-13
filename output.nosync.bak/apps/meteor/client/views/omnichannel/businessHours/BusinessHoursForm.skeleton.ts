## File: apps/meteor/client/views/omnichannel/businessHours/BusinessHoursForm.tsx

```typescript
import type { SelectOption } from '@rocket.chat/fuselage';
import { InputBox, Field, MultiSelect, FieldGroup, Box, Select, FieldLabel, FieldRow, Callout } from '@rocket.chat/fuselage';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useId, useMemo } from 'react';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useTimezoneNameList } from '../../../hooks/useTimezoneNameList';
import { BusinessHoursMultiple } from '../additionalForms';
import { defaultWorkHours, DAYS_OF_WEEK } from './mapBusinessHoursForm';

type mappedDayTime = {
	day: string;
	start: {
		time: string;
	};
	finish: {
		time: string;
	};
	open: boolean;
};

export type BusinessHoursFormData = {
	name: string;
	timezoneName: string;
	daysOpen: string[];
	daysTime: mappedDayTime[];
	departmentsToApplyBusinessHour: string;
	active: boolean;
	departments: {
		value: string;
		label: string;
	}[];
};

// TODO: replace `Select` in favor `SelectFiltered`
// TODO: add time validation for start and finish not be equal on UI
// TODO: add time validation for start not be higher than finish on UI
export type BusinessHoursFormProps = { type?: 'default' | 'custom' };

const BusinessHoursForm = ({ type }: BusinessHoursFormProps) => {
    /* Implementation Hidden */
};

export default BusinessHoursForm;

```