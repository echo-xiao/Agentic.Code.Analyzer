## File: packages/rest-typings/src/v1/groups/GroupsAddOwnerProps.ts

```typescript
import type { WithUserId } from './BaseProps';
import { withUserIdProps } from './BaseProps';

export type GroupsAddOwnerProps = WithUserId;
export const isGroupsAddOwnerProps = withUserIdProps;

```