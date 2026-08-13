## File: packages/rest-typings/src/v1/integrations/hooks/IntegrationHooksRemoveProps.ts

```typescript
import { ajv } from '../../Ajv';

export type IntegrationsHooksRemoveProps = {
	target_url: string;
};

const integrationsHooksRemoveSchema = {
	type: 'object',
	properties: {
		target_url: {
			type: 'string',
			nullable: false,
		},
	},
	required: ['target_url'],
	additionalProperties: false,
};

export const isIntegrationsHooksRemoveSchema = ajv.compile<IntegrationsHooksRemoveProps>(integrationsHooksRemoveSchema);

```