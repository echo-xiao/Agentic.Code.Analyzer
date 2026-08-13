## File: packages/rest-typings/src/v1/groups/GroupsKickProps.ts

```typescript
import type { WithUserId } from './BaseProps';
import { withUserIdProps } from './BaseProps';

export type GroupsKickProps = WithUserId;
export const isGroupsKickProps = withUserIdProps;

```