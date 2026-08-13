## File: ee/packages/federation-matrix/src/api/_matrix/versions.ts

```typescript
import { Router } from '@rocket.chat/http-router';
import { ajv } from '@rocket.chat/rest-typings/dist/v1/Ajv';

const GetVersionsResponseSchema = {
	type: 'object',
	properties: {
		server: {
			type: 'object',
			properties: {
				name: {
					type: 'string',
					description: 'Server software name',
				},
				version: {
					type: 'string',
					description: 'Server software version',
				},
			},
			required: ['name', 'version'],
		},
	},
	required: ['server'],
};

const isGetVersionsResponseProps = ajv.compile(GetVersionsResponseSchema);

export const getFederationVersionsRoutes = (version: string) => {
    /* Implementation Hidden */
};

```