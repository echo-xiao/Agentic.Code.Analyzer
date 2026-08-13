## File: packages/rest-typings/src/v1/groups/GroupsUnarchiveProps.ts

```typescript
import { ajv } from '../Ajv';
import type { GroupsBaseProps } from './BaseProps';
import { withGroupBaseProperties } from './BaseProps';

export type GroupsUnarchiveProps = GroupsBaseProps;

const GroupsUnarchivePropsSchema = withGroupBaseProperties();

export const isGroupsUnarchiveProps = ajv.compile<GroupsUnarchiveProps>(GroupsUnarchivePropsSchema);

```