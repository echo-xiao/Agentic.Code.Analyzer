## File: apps/meteor/client/views/omnichannel/reports/components/PieChart.tsx

```typescript
import { Pie } from '@nivo/pie';
import { Tooltip } from '@rocket.chat/fuselage';
import { useBreakpoints } from '@rocket.chat/fuselage-hooks';
import type { ComponentProps } from 'react';

import { REPORTS_CHARTS_THEME } from './constants';

const legendItemHeight = 20;
const legendItemWidth = 200;
const legendItemsSpacing = 8;
const legendSpacing = 24;
const legendInlineSize = legendItemWidth + legendSpacing;

export const PieChart = ({
	data,
	width,
	height,
	colors,
}: {
	data: { label: string; value: number; id: string; color?: string }[];
	width: number;
	height: number;
	colors?: ComponentProps<typeof Pie>['colors'];
}) => {
    /* Implementation Hidden */
};

```