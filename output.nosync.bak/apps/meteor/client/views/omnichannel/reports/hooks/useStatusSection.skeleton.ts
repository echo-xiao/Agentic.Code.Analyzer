## File: apps/meteor/client/views/omnichannel/reports/hooks/useStatusSection.ts

```typescript
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { TFunction } from 'i18next';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useDefaultDownload } from './useDefaultDownload';
import { getPeriodRange } from '../../../../components/dashboards/periods';
import { usePeriodSelectorStorage } from '../../../../components/dashboards/usePeriodSelectorStorage';
import { COLORS, PERIOD_OPTIONS } from '../components/constants';
import { formatPeriodDescription } from '../utils/formatPeriodDescription';
import { round } from '../utils/round';

const STATUSES: Record<string, { label: TranslationKey; color: string }> = {
	Open: { label: 'Omnichannel_Reports_Status_Open', color: COLORS.success },
	Queued: { label: 'Queued', color: COLORS.warning2 },
	On_Hold: { label: 'On_Hold', color: COLORS.warning },
	Closed: { label: 'Omnichannel_Reports_Status_Closed', color: COLORS.danger },
};

const formatChartData = (data: { label: string; value: number }[] | undefined = [], total = 0, t: TFunction) => {
    /* Implementation Hidden */
};

export const useStatusSection = () => {
    /* Implementation Hidden */
};

```