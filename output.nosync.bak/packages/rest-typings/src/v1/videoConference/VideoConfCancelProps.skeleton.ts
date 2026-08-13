## File: packages/rest-typings/src/v1/videoConference/VideoConfCancelProps.ts

```typescript
import type { JSONSchemaType } from 'ajv';

import { ajv } from '../Ajv';

export type VideoConfCancelProps = {
	callId: string;
};

const videoConfCancelPropsSchema: JSONSchemaType<VideoConfCancelProps> = {
	type: 'object',
	properties: {
		callId: {
			type: 'string',
			nullable: false,
		},
	},
	required: ['callId'],
	additionalProperties: false,
};

export const isVideoConfCancelProps = ajv.compile(videoConfCancelPropsSchema);

```