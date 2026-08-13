## File: apps/meteor/app/lib/server/lib/validateCustomMessageFields.ts

```typescript
import { ajv } from '@rocket.chat/rest-typings';
import mem from 'mem';

const customFieldsValidate = mem(
	(customFieldsSetting: string) => {
		const schema = JSON.parse(customFieldsSetting);

		if (schema.type && schema.type !== 'object') {
			throw new Error('Invalid custom fields config');
		}

		return ajv.compile({
			...schema,
			type: 'object',
			additionalProperties: false,
		});
	},
	{ maxAge: 1000 * 60 },
);

export const validateCustomMessageFields = ({
	customFields,
	messageCustomFieldsEnabled,
	messageCustomFields,
}: {
	customFields: Record<string, any>;
	messageCustomFieldsEnabled: boolean;
	messageCustomFields: string;
}) => {
    /* Implementation Hidden */
};

```