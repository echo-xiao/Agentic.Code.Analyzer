## File: apps/meteor/client/lib/convertTimeUnit.ts

```typescript
export enum TIMEUNIT {
	days = 'days',
	hours = 'hours',
	minutes = 'minutes',
}

export const isValidTimespan = (timespan: number): boolean => {
    /* Implementation Hidden */
};

export const timeUnitToMs = (unit: TIMEUNIT, timespan: number) => {
    /* Implementation Hidden */
};

export const msToTimeUnit = (unit: TIMEUNIT, timespan: number) => {
    /* Implementation Hidden */
};

```