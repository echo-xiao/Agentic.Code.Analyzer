## File: apps/meteor/client/views/omnichannel/reports/components/BarChart.tsx

```typescript
import type { BarCustomLayerProps, BarDatum } from '@nivo/bar';
import { ResponsiveBar } from '@nivo/bar';
import { Box, Palette, Tooltip } from '@rocket.chat/fuselage';
import type { ComponentProps, ReactNode, JSX } from 'react';
import { useMemo } from 'react';

import { REPORTS_CHARTS_THEME } from './constants';

type axisItem = {
	ticksPosition?: 'before' | 'after';
	tickValues?: number;
	tickSize?: number;
	tickPadding?: number;
	tickRotation?: number;
	format?: string | ((v: string | number) => string | number);
	renderTick?: (props: any) => JSX.Element;
	legend?: ReactNode;
	legendPosition?: 'start' | 'middle' | 'end';
	legendOffset?: number;
	ariaHidden?: boolean;
};

type BarChartProps = {
	data: {
		label: string;
		value: number;
		color: string;
	}[];
	maxWidth?: string | number;
	height: number;
	direction?: 'vertical' | 'horizontal';
	indexBy?: string;
	keys?: string[];
	reverse?: boolean;
	margins?: { top?: number; right?: number; bottom?: number; left?: number };
	axis: { axisTop?: axisItem; axisLeft?: axisItem; axisRight?: axisItem; axisBottom?: axisItem };
	enableGridX?: boolean;
	enableGridY?: boolean;
	colors?: ComponentProps<typeof ResponsiveBar>['colors'];
};

const sideLabelStyle = {
	fill: Palette.text['font-annotation'].toString(),
	fontFamily:
		'Inter, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Meiryo UI", Arial, sans-serif',
	fontSize: 12,
};

const horizontalSideLabel = ({ bars, labelSkipWidth }: BarCustomLayerProps<BarDatum>) => (
	<g>
		{bars?.map(({ width, height, y, data }) => {
			if (width >= labelSkipWidth) {
				return null;
			}

			return (
				<text
					key={data.indexValue}
					transform={`translate(${width + 8}, ${y + height / 2})`}
					textAnchor='start'
					dominantBaseline='central'
					style={sideLabelStyle}
				>
					{data.formattedValue}
				</text>
			);
		})}
	</g>
);

const verticalSideLabel = ({ bars, labelSkipHeight, innerHeight }: BarCustomLayerProps<BarDatum>) => (
	<g>
		{bars?.map(({ width, height, x, data }) => {
			if (height >= labelSkipHeight) {
				return null;
			}

			return (
				<text
					key={data.indexValue}
					transform={`translate(${x + width / 2}, ${innerHeight - height - 8})`}
					textAnchor='middle'
					dominantBaseline='central'
					style={sideLabelStyle}
				>
					{data.formattedValue}
				</text>
			);
		})}
	</g>
);

export const BarChart = ({
	data,
	maxWidth,
	height,
	direction = 'vertical',
	indexBy = 'label',
	keys,
	margins,
	reverse,
	enableGridX = false,
	enableGridY = false,
	axis: { axisTop, axisLeft, axisRight, axisBottom } = {},
	colors,
}: BarChartProps) => {
    /* Implementation Hidden */
};

```