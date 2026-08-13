## File: packages/rest-typings/src/v1/groups/GroupsRemoveOwnerProps.ts

```typescript
import type { WithUserId } from './BaseProps';
import { withUserIdProps } from './BaseProps';

export type GroupsRemoveOwnerProps = WithUserId;
export const isGroupsRemoveOwnerProps = withUserIdProps;

```