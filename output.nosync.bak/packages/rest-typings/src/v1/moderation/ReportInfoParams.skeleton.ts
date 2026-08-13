## File: packages/rest-typings/src/v1/moderation/ReportInfoParams.ts

```typescript
import { ajvQuery } from '../Ajv';

export type ReportInfoParams = {
	reportId: string;
};

const ajvParams = {
	type: 'object',
	properties: {
		reportId: {
			type: 'string',
			nullable: false,
			minLength: 1,
		},
	},
	required: ['reportId'],
	additionalProperties: false,
};

export const isReportInfoParams = ajvQuery.compile<ReportInfoParams>(ajvParams);

```