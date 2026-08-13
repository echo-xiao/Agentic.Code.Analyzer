## File: packages/rest-typings/src/v1/import/DownloadPendingAvatarsParamsPOST.ts

```typescript
import { ajv } from '../Ajv';

export type DownloadPendingAvatarsParamsPOST = Record<string, unknown>;

const DownloadPendingAvatarsParamsPOSTSchema = {
	type: 'object',
	properties: {},
	additionalProperties: false,
	required: [],
};

export const isDownloadPendingAvatarsParamsPOST = ajv.compile<DownloadPendingAvatarsParamsPOST>(DownloadPendingAvatarsParamsPOSTSchema);

```