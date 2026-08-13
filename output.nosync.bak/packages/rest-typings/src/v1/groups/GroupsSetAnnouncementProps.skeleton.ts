## File: packages/rest-typings/src/v1/groups/GroupsSetAnnouncementProps.ts

```typescript
import { ajv } from '../Ajv';
import type { GroupsBaseProps } from './BaseProps';
import { withGroupBaseProperties } from './BaseProps';

export type GroupsSetAnnouncementProps = GroupsBaseProps & { announcement: string };
const groupsSetAnnouncementPropsSchema = withGroupBaseProperties(
	{
		announcement: {
			type: 'string',
		},
	},
	['announcement'],
);
export const isGroupsSetAnnouncementProps = ajv.compile<GroupsSetAnnouncementProps>(groupsSetAnnouncementPropsSchema);

```