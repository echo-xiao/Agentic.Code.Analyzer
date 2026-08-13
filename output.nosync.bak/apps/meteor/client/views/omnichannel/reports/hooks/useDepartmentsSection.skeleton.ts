## File: apps/meteor/client/views/omnichannel/reports/hooks/useDepartmentsSection.ts

```typescript
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useDefaultDownload } from './useDefaultDownload';
import { getPeriodRange } from '../../../../components/dashboards/periods';
import { usePeriodSelectorStorage } from '../../../../components/dashboards/usePeriodSelectorStorage';
import { COLORS, PERIOD_OPTIONS } from '../components/constants';
import { formatPeriodDescription } from '../utils/formatPeriodDescription';

const formatChartData = (data: { label: string; value: number }[] | undefined = []) =>
	data.map((item) => ({
		...item,
		color: COLORS.info,
	}));

export const useDepartmentsSection = () => {
    /* Implementation Hidden */
};

```