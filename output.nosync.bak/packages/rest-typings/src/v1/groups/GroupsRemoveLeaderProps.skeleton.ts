## File: packages/rest-typings/src/v1/groups/GroupsRemoveLeaderProps.ts

```typescript
import type { WithUserId } from './BaseProps';
import { withUserIdProps } from './BaseProps';

export type GroupsRemoveLeaderProps = WithUserId;
export const isGroupsRemoveLeaderProps = withUserIdProps;

```