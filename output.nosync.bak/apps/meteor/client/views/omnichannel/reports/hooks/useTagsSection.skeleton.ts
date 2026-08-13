## File: apps/meteor/client/views/omnichannel/reports/hooks/useTagsSection.ts

```typescript
import { Palette } from '@rocket.chat/fuselage';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useDefaultDownload } from './useDefaultDownload';
import { getPeriodRange } from '../../../../components/dashboards/periods';
import { usePeriodSelectorStorage } from '../../../../components/dashboards/usePeriodSelectorStorage';
import { PERIOD_OPTIONS } from '../components/constants';
import { formatPeriodDescription } from '../utils/formatPeriodDescription';

const colors = {
	warning: Palette.statusColor['status-font-on-warning'].toString(),
	danger: Palette.statusColor['status-font-on-danger'].toString(),
	success: Palette.statusColor['status-font-on-success'].toString(),
	info: Palette.statusColor['status-font-on-info'].toString(),
};

const formatChartData = (data: { label: string; value: number }[] | undefined = []) =>
	data.map((item) => ({
		...item,
		color: colors.info,
	}));

export const useTagsSection = () => {
    /* Implementation Hidden */
};

```