## File: apps/meteor/client/views/admin/users/hooks/usePendingUsersCount.ts

```typescript
import type { Serialized } from '@rocket.chat/core-typings';
import type { DefaultUserInfo, UsersListStatusParamsGET } from '@rocket.chat/rest-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

const usePendingUsersCount = (users: Serialized<DefaultUserInfo[]> | undefined) => {
    /* Implementation Hidden */
};

export default usePendingUsersCount;

```