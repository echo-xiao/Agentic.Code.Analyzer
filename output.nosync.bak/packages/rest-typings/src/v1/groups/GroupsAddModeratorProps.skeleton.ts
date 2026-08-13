## File: packages/rest-typings/src/v1/groups/GroupsAddModeratorProps.ts

```typescript
import type { WithUserId } from './BaseProps';
import { withUserIdProps } from './BaseProps';

export type GroupsAddModeratorProps = WithUserId;
export const isGroupsAddModeratorProps = withUserIdProps;

```