## File: apps/meteor/client/views/omnichannel/realTimeMonitoring/charts/ChatDurationChart.tsx

```typescript
import type { ILivechatDepartment } from '@rocket.chat/core-typings';
import type { Box } from '@rocket.chat/fuselage';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type * as chartjs from 'chart.js';
import type { TFunction } from 'i18next';
import type { ComponentPropsWithoutRef } from 'react';
import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Chart from './Chart';
import { getMomentChartLabelsAndData } from './getMomentChartLabelsAndData';
import { getMomentCurrentLabel } from './getMomentCurrentLabel';
import { useChartContext } from './useChartContext';
import { useUpdateChartData } from './useUpdateChartData';
import { drawLineChart } from '../../../../../app/livechat/client/lib/chartHandler';
import { secondsToHHMMSS } from '../../../../../lib/utils/secondsToHHMMSS';
import { omnichannelQueryKeys } from '../../../../lib/queryKeys';

const [labels, initialData] = getMomentChartLabelsAndData();
const tooltipCallbacks = {
	callbacks: {
		title([ctx]: [chartjs.TooltipItem<'line'>]) {
			const { dataset } = ctx;
			return dataset.label;
		},
		label(ctx: chartjs.TooltipItem<'line'>) {
			const { dataset, dataIndex } = ctx;
			const item = dataset.data[dataIndex];
			return `${dataset.label}: ${secondsToHHMMSS(typeof item === 'number' ? item : 0)}`;
		},
	},
};
const init = (canvas: HTMLCanvasElement, context: chartjs.Chart<'line'> | undefined, t: TFunction) =>
	drawLineChart(canvas, context, [t('Avg_chat_duration'), t('Longest_chat_duration')], labels, [initialData, initialData.slice()], {
		legends: true,
		anim: true,
		smallTicks: true,
		displayColors: false,
		tooltipCallbacks,
	});

type ChatDurationChartProps = {
	departmentId: ILivechatDepartment['_id'];
	dateRange: { start: string; end: string };
} & ComponentPropsWithoutRef<typeof Box>;

const ChatDurationChart = ({ departmentId, dateRange, ...props }: ChatDurationChartProps) => {
    /* Implementation Hidden */
};

export default ChatDurationChart;

```