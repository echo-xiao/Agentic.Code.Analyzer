## File: packages/rest-typings/src/v1/groups/GroupsListProps.ts

```typescript
import type { PaginatedRequest } from '../../helpers/PaginatedRequest';
import { ajv } from '../Ajv';

export type GroupsListProps = PaginatedRequest<null>;
const groupsListPropsSchema = {};
export const isGroupsListProps = ajv.compile<GroupsListProps>(groupsListPropsSchema);

```