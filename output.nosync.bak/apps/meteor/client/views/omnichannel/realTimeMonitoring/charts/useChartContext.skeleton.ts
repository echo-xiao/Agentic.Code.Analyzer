## File: apps/meteor/client/views/omnichannel/realTimeMonitoring/charts/useChartContext.ts

```typescript
import type { Chart, ChartType } from 'chart.js';
import type { TFunction } from 'i18next';
import type { MutableRefObject } from 'react';
import { useEffect, useState } from 'react';

type UseChartContextProps<TChart> = {
	canvas: MutableRefObject<HTMLCanvasElement | null>;
	init: (canvas: HTMLCanvasElement, context: TChart | undefined, t: TFunction) => Promise<TChart>;
	t: TFunction;
};

export const useChartContext = <TChartType extends ChartType>({ canvas, init, t }: UseChartContextProps<Chart<TChartType>>) => {
    /* Implementation Hidden */
};

```