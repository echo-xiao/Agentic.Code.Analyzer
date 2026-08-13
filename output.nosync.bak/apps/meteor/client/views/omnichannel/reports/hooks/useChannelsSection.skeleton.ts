## File: apps/meteor/client/views/omnichannel/reports/hooks/useChannelsSection.ts

```typescript
import { capitalize } from '@rocket.chat/string-helpers';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { TFunction } from 'i18next';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useDefaultDownload } from './useDefaultDownload';
import { getPeriodRange } from '../../../../components/dashboards/periods';
import { usePeriodSelectorStorage } from '../../../../components/dashboards/usePeriodSelectorStorage';
import { PERIOD_OPTIONS } from '../components/constants';
import { formatPeriodDescription } from '../utils/formatPeriodDescription';
import { getTop } from '../utils/getTop';
import { round } from '../utils/round';

type DataItem = { label: string; value: number; id: string; rawLabel: string };

const TYPE_LABEL: Record<string, TranslationKey> = {
	'widget': 'Livechat',
	'email-inbox': 'Email',
	'twilio': 'SMS',
	'api': 'Custom_Integration',
};

const formatItem = (item: { label: string; value: number }, total: number, t: TFunction): DataItem => {
    /* Implementation Hidden */
};

const formatChartData = (data: { label: string; value: number }[] | undefined = [], total = 0, t: TFunction) => {
    /* Implementation Hidden */
};

export const useChannelsSection = () => {
    /* Implementation Hidden */
};

```