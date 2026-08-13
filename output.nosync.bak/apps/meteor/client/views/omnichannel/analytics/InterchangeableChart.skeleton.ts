## File: apps/meteor/client/views/omnichannel/analytics/InterchangeableChart.tsx

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useToastMessageDispatch, useEndpoint } from '@rocket.chat/ui-contexts';
import type * as chartjs from 'chart.js';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { drawLineChart } from '../../../../app/livechat/client/lib/chartHandler';
import { secondsToHHMMSS } from '../../../../lib/utils/secondsToHHMMSS';
import Chart from '../realTimeMonitoring/charts/Chart';

const getChartTooltips = (chartName: string) => {
    /* Implementation Hidden */
};

const InterchangeableChart = ({
	departmentId,
	dateRange,
	chartName,
	...props
}: {
	departmentId: string;
	dateRange: { start: string; end: string };
	chartName: string;
	flexShrink: number;
	h: string;
	w: string;
	alignSelf: string;
}) => {
    /* Implementation Hidden */
};

export default InterchangeableChart;

```