## File: packages/rest-typings/src/v1/groups/GroupsRemoveModeratorProps.ts

```typescript
import type { WithUserId } from './BaseProps';
import { withUserIdProps } from './BaseProps';

export type GroupsRemoveModeratorProps = WithUserId;
export const isGroupsRemoveModeratorProps = withUserIdProps;

```