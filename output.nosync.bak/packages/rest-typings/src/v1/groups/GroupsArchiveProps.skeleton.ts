## File: packages/rest-typings/src/v1/groups/GroupsArchiveProps.ts

```typescript
import { ajv } from '../Ajv';
import type { GroupsBaseProps } from './BaseProps';
import { withGroupBaseProperties } from './BaseProps';

export type GroupsArchiveProps = GroupsBaseProps;

const GroupsArchivePropsSchema = withGroupBaseProperties();

export const isGroupsArchiveProps = ajv.compile<GroupsArchiveProps>(GroupsArchivePropsSchema);

```