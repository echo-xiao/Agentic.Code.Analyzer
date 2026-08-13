## File: packages/rest-typings/src/v1/integrations/IntegrationsGetProps.ts

```typescript
import { ajvQuery } from '../Ajv';

export type IntegrationsGetProps = { integrationId: string; createdBy?: string };

const integrationsGetSchema = {
	type: 'object',
	properties: {
		integrationId: {
			type: 'string',
			nullable: false,
		},
		createdBy: {
			type: 'string',
			nullable: true,
		},
	},
	required: ['integrationId'],
};

export const isIntegrationsGetProps = ajvQuery.compile<IntegrationsGetProps>(integrationsGetSchema);

```