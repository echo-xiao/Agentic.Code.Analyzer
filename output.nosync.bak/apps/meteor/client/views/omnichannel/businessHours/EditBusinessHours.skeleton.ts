## File: apps/meteor/client/views/omnichannel/businessHours/EditBusinessHours.tsx

```typescript
import type { ILivechatBusinessHour, LivechatBusinessHourTypes, Serialized } from '@rocket.chat/core-typings';
import { Box, Button, ButtonGroup } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { canonicalizeTimezone } from '@rocket.chat/tools';
import { Page, PageFooter, PageHeader, PageScrollableContentWithShadow } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useTranslation, useRouter, useEndpoint } from '@rocket.chat/ui-contexts';
import { useId } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { BusinessHoursFormData } from './BusinessHoursForm';
import BusinessHoursForm from './BusinessHoursForm';
import { defaultWorkHours } from './mapBusinessHoursForm';
import { useIsSingleBusinessHours } from './useIsSingleBusinessHours';
import { useRemoveBusinessHour } from './useRemoveBusinessHour';

const getInitialData = (businessHourData: Serialized<ILivechatBusinessHour> | undefined) => ({
	name: businessHourData?.name || '',
	timezoneName: canonicalizeTimezone(businessHourData?.timezone?.name || 'America/Sao_Paulo'),
	daysOpen: (businessHourData?.workHours || defaultWorkHours()).filter(({ open }) => !!open).map(({ day }) => day),
	daysTime: (businessHourData?.workHours || defaultWorkHours())
		.filter(({ open }) => !!open)
		.map(({ day, start: { time: startTime }, finish: { time: finishTime }, open }) => ({
			day,
			start: { time: startTime },
			finish: { time: finishTime },
			open,
		})),
	departmentsToApplyBusinessHour: '',
	active: businessHourData?.active ?? true,
	departments: businessHourData?.departments?.map(({ _id, name }) => ({ value: _id, label: name })) || [],
});

export type EditBusinessHoursProps = {
	businessHourData?: Serialized<ILivechatBusinessHour>;
	type: LivechatBusinessHourTypes;
};

const EditBusinessHours = ({ businessHourData, type }: EditBusinessHoursProps) => {
    /* Implementation Hidden */
};

export default EditBusinessHours;

```