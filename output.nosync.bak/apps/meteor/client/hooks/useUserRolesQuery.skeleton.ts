## File: apps/meteor/client/hooks/useUserRolesQuery.ts

```typescript
import type { IRole, IUser } from '@rocket.chat/core-typings';
import { useStream, useUserId, useEndpoint } from '@rocket.chat/ui-contexts';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { rolesQueryKeys } from '../lib/queryKeys';

export type UserRoles = {
	uid: IUser['_id'];
	roles: IRole['_id'][];
};

type UseUserRolesQueryOptions<TData = UserRoles[]> = Omit<
	UseQueryOptions<UserRoles[], Error, TData, ReturnType<typeof rolesQueryKeys.userRoles>>,
	'queryKey' | 'queryFn'
>;

export const useUserRolesQuery = <TData = UserRoles[]>(options?: UseUserRolesQueryOptions<TData>) => {
    /* Implementation Hidden */
};

```