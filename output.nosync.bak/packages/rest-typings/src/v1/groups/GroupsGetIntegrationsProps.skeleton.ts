## File: packages/rest-typings/src/v1/groups/GroupsGetIntegrationsProps.ts

```typescript
import { ajv } from '../Ajv';
import type { GroupsBaseProps } from './BaseProps';
import { withGroupBaseProperties } from './BaseProps';

export type GroupsGetIntegrationsProps = GroupsBaseProps & { includeAllPrivateGroups?: 'true' | 'false' | 1 | 0 };
const groupsGetIntegrationPropsSchema = withGroupBaseProperties({
	includeAllPrivateGroups: {
		type: 'string',
		nullable: true,
	},
});
export const isGroupsGetIntegrationsProps = ajv.compile<GroupsGetIntegrationsProps>(groupsGetIntegrationPropsSchema);

```