## File: packages/rest-typings/src/v1/groups/GroupsRenameProps.ts

```typescript
import { ajv } from '../Ajv';
import type { GroupsBaseProps } from './BaseProps';
import { withGroupBaseProperties } from './BaseProps';

export type GroupsRenameProps = GroupsBaseProps & { name: string };
const groupsRenamePropsSchema = withGroupBaseProperties(
	{
		name: {
			type: 'string',
		},
	},
	['name'],
);
export const isGroupsRenameProps = ajv.compile<GroupsRenameProps>(groupsRenamePropsSchema);

```