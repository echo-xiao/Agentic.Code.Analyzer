## File: packages/rest-typings/src/v1/groups/GroupsDeleteProps.ts

```typescript
import { ajv } from '../Ajv';
import type { GroupsBaseProps } from './BaseProps';
import { withGroupBaseProperties } from './BaseProps';

export type GroupsDeleteProps = GroupsBaseProps;

const GroupsDeletePropsSchema = withGroupBaseProperties();

export const isGroupsDeleteProps = ajv.compile<GroupsDeleteProps>(GroupsDeletePropsSchema);

```