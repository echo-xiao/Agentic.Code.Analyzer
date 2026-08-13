## File: packages/rest-typings/src/v1/calendar/CalendarEventListProps.ts

```typescript
import type { JSONSchemaType } from 'ajv';

import { ajvQuery } from '../Ajv';

export type CalendarEventListProps = { date: string };

const calendarEventListPropsSchema: JSONSchemaType<CalendarEventListProps> = {
	type: 'object',
	properties: {
		date: {
			type: 'string',
			nullable: false,
		},
	},
	required: ['date'],
	additionalProperties: false,
};

export const isCalendarEventListProps = ajvQuery.compile(calendarEventListPropsSchema);

```