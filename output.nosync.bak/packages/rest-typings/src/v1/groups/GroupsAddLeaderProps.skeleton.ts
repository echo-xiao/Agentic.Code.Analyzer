## File: packages/rest-typings/src/v1/groups/GroupsAddLeaderProps.ts

```typescript
import type { WithUserId } from './BaseProps';
import { withUserIdProps } from './BaseProps';

export type GroupsAddLeaderProps = WithUserId;
export const isGroupsAddLeaderProps = withUserIdProps;

```