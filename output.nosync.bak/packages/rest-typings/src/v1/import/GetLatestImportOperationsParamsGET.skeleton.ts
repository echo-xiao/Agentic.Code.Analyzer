## File: packages/rest-typings/src/v1/import/GetLatestImportOperationsParamsGET.ts

```typescript
import { ajvQuery } from '../Ajv';

export type GetLatestImportOperationsParamsGET = Record<string, unknown>;

const GetLatestImportOperationsParamsGETSchema = {
	type: 'object',
	properties: {},
	additionalProperties: false,
	required: [],
};

export const isGetLatestImportOperationsParamsGET = ajvQuery.compile<GetLatestImportOperationsParamsGET>(
	GetLatestImportOperationsParamsGETSchema,
);

```