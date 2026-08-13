## File: packages/rest-typings/src/v1/groups/GroupsConvertToTeamProps.ts

```typescript
import { ajv } from '../Ajv';
import type { GroupsBaseProps } from './BaseProps';
import { withGroupBaseProperties } from './BaseProps';

export type GroupsConvertToTeamProps = GroupsBaseProps;

const GroupsConvertToTeamPropsSchema = withGroupBaseProperties();

export const isGroupsConvertToTeamProps = ajv.compile<GroupsConvertToTeamProps>(GroupsConvertToTeamPropsSchema);

```