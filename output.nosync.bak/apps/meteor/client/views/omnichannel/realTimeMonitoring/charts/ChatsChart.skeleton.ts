## File: apps/meteor/client/views/omnichannel/realTimeMonitoring/charts/ChatsChart.tsx

```typescript
import type { ILivechatDepartment } from '@rocket.chat/core-typings';
import type { Box } from '@rocket.chat/fuselage';
import { useEndpoint, type TranslationKey } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type * as chartjs from 'chart.js';
import type { TFunction } from 'i18next';
import type { ComponentPropsWithoutRef, MutableRefObject } from 'react';
import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Chart from './Chart';
import { useChartContext } from './useChartContext';
import { useUpdateChartData } from './useUpdateChartData';
import { drawDoughnutChart } from '../../../../../app/livechat/client/lib/chartHandler';
import { omnichannelQueryKeys } from '../../../../lib/queryKeys';

const labels = ['Open', 'Queued', 'On_Hold_Chats', 'Closed'];

const initialData = {
	open: 0,
	queued: 0,
	onhold: 0,
	closed: 0,
};

const init = (canvas: HTMLCanvasElement, context: chartjs.Chart<'doughnut'> | undefined, t: TFunction) =>
	drawDoughnutChart(
		canvas,
		t('Chats'),
		context,
		labels.map((l) => t(l as TranslationKey)),
		Object.values(initialData),
	);

type ChatsChartProps = {
	departmentId: ILivechatDepartment['_id'];
	dateRange: { start: string; end: string };
} & ComponentPropsWithoutRef<typeof Box>;

const ChatsChart = ({ departmentId, dateRange, ...props }: ChatsChartProps) => {
    /* Implementation Hidden */
};

export default ChatsChart;

```