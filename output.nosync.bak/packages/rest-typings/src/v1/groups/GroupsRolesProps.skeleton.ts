## File: packages/rest-typings/src/v1/groups/GroupsRolesProps.ts

```typescript
import { ajv } from '../Ajv';
import type { GroupsBaseProps } from './BaseProps';
import { withGroupBaseProperties } from './BaseProps';

export type GroupsRolesProps = GroupsBaseProps;

const GroupsRolesPropsSchema = withGroupBaseProperties();

export const isGroupsRolesProps = ajv.compile<GroupsRolesProps>(GroupsRolesPropsSchema);

```