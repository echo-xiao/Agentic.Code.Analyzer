## File: packages/rest-typings/src/v1/groups/GroupsInviteProps.ts

```typescript
import type { WithUserId } from './BaseProps';
import { withUserIdProps } from './BaseProps';

export type GroupsInviteProps = WithUserId;
export const isGroupsInviteProps = withUserIdProps;

```