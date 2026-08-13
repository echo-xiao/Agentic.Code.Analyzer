## File: packages/rest-typings/src/v1/import/DownloadPendingFilesParamsPOST.ts

```typescript
import { ajv } from '../Ajv';

export type DownloadPendingFilesParamsPOST = Record<string, unknown>;

const DownloadPendingFilesParamsPOSTSchema = {
	type: 'object',
	properties: {},
	additionalProperties: false,
	required: [],
};

export const isDownloadPendingFilesParamsPOST = ajv.compile<DownloadPendingFilesParamsPOST>(DownloadPendingFilesParamsPOSTSchema);

```