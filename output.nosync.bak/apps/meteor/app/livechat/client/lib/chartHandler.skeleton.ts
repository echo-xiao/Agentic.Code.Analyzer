## File: apps/meteor/app/livechat/client/lib/chartHandler.ts

```typescript
import type * as chartjs from 'chart.js';

import { t } from '../../../utils/lib/i18n';

type LineChartConfigOptions = Partial<{
	legends: boolean;
	anim: boolean;
	displayColors: boolean;
	smallTicks: boolean;
	tooltipCallbacks: any;
}>;

const lineChartConfiguration = ({
	legends = false,
	anim = false,
	tooltipCallbacks = {},
}: LineChartConfigOptions): Partial<chartjs.ChartConfiguration<'line', number, string>['options']> => {
    /* Implementation Hidden */
};

const doughnutChartConfiguration = (
	title: string,
	tooltipCallbacks = {},
): Partial<chartjs.ChartConfiguration<'doughnut', number, string>['options']> => ({
	layout: {
		padding: {
			top: 0,
			bottom: 0,
		},
	},
	plugins: {
		legend: {
			display: true,
			position: 'right',
			labels: {
				boxWidth: 20,
			},
		},
		title: {
			display: true,
			text: title,
		},
		tooltip: {
			enabled: true,
			mode: 'point',
			displayColors: true, // hide color box
			...tooltipCallbacks,
		},
	},
	// animation: {
	// 	duration: 0 // general animation time
	// },
	hover: {
		intersect: true, // duration of animations when hovering an item
	},
	responsive: true,
	maintainAspectRatio: false,
});

type ChartDataSet = {
	label: string;
	data: number[];
	backgroundColor: string;
	borderColor: string;
	borderWidth: number;
	fill: boolean;
};

export const drawLineChart = async (
	chart: HTMLCanvasElement,
	chartContext: chartjs.Chart<'line'> | undefined,
	chartLabels: string[],
	dataLabels: string[],
	dataSets: number[][],
	options: LineChartConfigOptions = {},
) => {
    /* Implementation Hidden */
};

export const drawDoughnutChart = async (
	chart: chartjs.ChartItem,
	title: string,
	chartContext: chartjs.Chart<'doughnut'> | undefined,
	dataLabels: string[],
	dataPoints: number[],
) => {
    /* Implementation Hidden */
};

export const updateChart = async <TChartType extends chartjs.ChartType>(
	chart: chartjs.Chart<TChartType>,
	label: string,
	data: chartjs.DefaultDataPoint<TChartType>,
): Promise<void> => {
    /* Implementation Hidden */
};

export const resetChart = <TChartType extends chartjs.ChartType>(chart: chartjs.Chart<TChartType>): void => {
    /* Implementation Hidden */
};

```