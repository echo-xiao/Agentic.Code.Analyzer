## File: packages/rest-typings/src/v1/import/GetImportProgressParamsGET.ts

```typescript
import { ajvQuery } from '../Ajv';

export type GetImportProgressParamsGET = Record<string, unknown>;

const GetImportProgressParamsGETSchema = {
	type: 'object',
	properties: {},
	additionalProperties: false,
	required: [],
};

export const isGetImportProgressParamsGET = ajvQuery.compile<GetImportProgressParamsGET>(GetImportProgressParamsGETSchema);

```