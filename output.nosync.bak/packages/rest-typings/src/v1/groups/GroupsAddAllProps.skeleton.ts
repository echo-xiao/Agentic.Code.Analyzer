## File: packages/rest-typings/src/v1/groups/GroupsAddAllProps.ts

```typescript
import { ajv } from '../Ajv';
import type { GroupsBaseProps } from './BaseProps';
import { withGroupBaseProperties } from './BaseProps';

export type GroupsAddAllProps = GroupsBaseProps & {
	activeUsersOnly?: 'true' | 'false' | 1 | 0;
};
const groupsAddAllPropsSchema = withGroupBaseProperties({
	activeUsersOnly: {
		type: 'boolean',
		nullable: true,
	},
});
export const isGroupsAddAllProps = ajv.compile<GroupsAddAllProps>(groupsAddAllPropsSchema);

```