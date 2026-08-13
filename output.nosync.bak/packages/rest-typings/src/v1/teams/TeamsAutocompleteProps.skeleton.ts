## File: packages/rest-typings/src/v1/teams/TeamsAutocompleteProps.ts

```typescript
import { ajvQuery } from '../Ajv';

export type TeamsAutocompleteProps = { name: string };

const teamsAutocompletePropsSchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
	},
	required: ['name'],
	additionalProperties: false,
};

export const isTeamsAutocompleteProps = ajvQuery.compile<TeamsAutocompleteProps>(teamsAutocompletePropsSchema);

```