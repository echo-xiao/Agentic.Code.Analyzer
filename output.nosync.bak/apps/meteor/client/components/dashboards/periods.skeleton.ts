## File: apps/meteor/client/components/dashboards/periods.ts

```typescript
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { startOfDay, startOfWeek, startOfMonth, startOfYear, endOfDay, subDays, subMonths } from 'date-fns';

const label = (translationKey: TranslationKey): readonly [translationKey: TranslationKey] => [translationKey];

function startOfDayUTC(d: Date): Date {
    /* Implementation Hidden */
}

function endOfDayUTC(d: Date): Date {
    /* Implementation Hidden */
}

function startOfWeekUTC(d: Date): Date {
    /* Implementation Hidden */
}

function startOfMonthUTC(d: Date): Date {
    /* Implementation Hidden */
}

function startOfYearUTC(d: Date): Date {
    /* Implementation Hidden */
}

type StartOf = 'day' | 'year' | 'month' | 'week';
type Subtract = { amount: number; unit: 'days' | 'months' };

export const getClosedPeriod =
	({
		startOf: startOfKey,
		subtract: subtractOpt,
	}: {
		startOf: StartOf;
		subtract?: Subtract;
	}): ((utc: boolean) => {
		start: Date;
		end: Date;
	}) =>
	(utc: boolean): { start: Date; end: Date } => {
		const now = new Date();

		let start: Date;
		if (subtractOpt) {
			const { amount, unit } = subtractOpt;
			start = unit === 'days' ? subDays(now, amount) : subMonths(now, amount);
		} else {
			start = new Date(now.getTime());
		}

		if (utc) {
			switch (startOfKey) {
				case 'day':
					start = startOfDayUTC(start);
					break;
				case 'week':
					start = startOfWeekUTC(start);
					break;
				case 'month':
					start = startOfMonthUTC(start);
					break;
				case 'year':
					start = startOfYearUTC(start);
					break;
			}
			return { start, end: endOfDayUTC(now) };
		}

		switch (startOfKey) {
			case 'day':
				start = startOfDay(start);
				break;
			case 'week':
				start = startOfWeek(start);
				break;
			case 'month':
				start = startOfMonth(start);
				break;
			case 'year':
				start = startOfYear(start);
				break;
		}

		return {
			start,
			end: endOfDay(now),
		};
	};

const periods = [
	{
		key: 'today',
		label: label('Today'),
		range: getClosedPeriod({ startOf: 'day' }),
	},
	{
		key: 'this week',
		label: label('This_week'),
		range: getClosedPeriod({ startOf: 'week' }),
	},
	{
		key: 'last 7 days',
		label: label('Last_7_days'),
		range: getClosedPeriod({ startOf: 'day', subtract: { amount: 7, unit: 'days' } }),
	},
	{
		key: 'last 15 days',
		label: label('Last_15_days'),
		range: getClosedPeriod({ startOf: 'day', subtract: { amount: 15, unit: 'days' } }),
	},
	{
		key: 'this month',
		label: label('This_month'),
		range: getClosedPeriod({ startOf: 'month' }),
	},
	{
		key: 'last 30 days',
		label: label('Last_30_days'),
		range: getClosedPeriod({ startOf: 'day', subtract: { amount: 30, unit: 'days' } }),
	},
	{
		key: 'last 90 days',
		label: label('Last_90_days'),
		range: getClosedPeriod({ startOf: 'day', subtract: { amount: 90, unit: 'days' } }),
	},
	{
		key: 'last 6 months',
		label: label('Last_6_months'),
		range: getClosedPeriod({ startOf: 'month', subtract: { amount: 6, unit: 'months' } }),
	},
	{
		key: 'this year',
		label: label('This_year'),
		range: getClosedPeriod({ startOf: 'year' }),
	},
] as const;

export type Period = (typeof periods)[number];

export const getPeriod = (key: (typeof periods)[number]['key']): Period => {
    /* Implementation Hidden */
};

export const getPeriodRange = (
	key: (typeof periods)[number]['key'],
	utc = true,
): {
	start: Date;
	end: Date;
} => {
    /* Implementation Hidden */
};

```