## File: apps/meteor/client/views/omnichannel/realTimeMonitoring/charts/useUpdateChartData.ts

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type * as chartjs from 'chart.js';
import type { TFunction } from 'i18next';
import type { MutableRefObject } from 'react';

import { updateChart } from '../../../../../app/livechat/client/lib/chartHandler';

type UseUpdateChartDataOptions<TChart> = {
	context: TChart | undefined;
	canvas: MutableRefObject<HTMLCanvasElement | null>;
	init: (canvas: HTMLCanvasElement, context: TChart | undefined, t: TFunction) => Promise<TChart>;
	t: TFunction;
};

export function useUpdateChartData<TChartType extends chartjs.ChartType>({
	canvas: canvasRef,
	context,
	init,
	t,
}: UseUpdateChartDataOptions<chartjs.Chart<TChartType>>) {
    /* Implementation Hidden */
}

```