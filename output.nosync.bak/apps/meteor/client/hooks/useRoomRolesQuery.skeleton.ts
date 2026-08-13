## File: apps/meteor/client/hooks/useRoomRolesQuery.ts

```typescript
import type { IUser, IRole, IRoom } from '@rocket.chat/core-typings';
import { useEndpoint, useStream, useUserId } from '@rocket.chat/ui-contexts';
import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { useEffect } from 'react';

import { roomsQueryKeys } from '../lib/queryKeys';

export type RoomRoles = {
	rid: IRoom['_id'];
	u: Pick<IUser, '_id' | 'name' | 'username'>;
	roles: IRole['_id'][];
};

type UseRoomRolesQueryOptions<TData = RoomRoles[]> = Omit<
	UseQueryOptions<RoomRoles[], Error, TData, ReturnType<typeof roomsQueryKeys.roles>>,
	'queryKey' | 'queryFn'
>;

export const useRoomRolesQuery = <TData = RoomRoles[]>(rid: IRoom['_id'], options?: UseRoomRolesQueryOptions<TData>) => {
    /* Implementation Hidden */
};

```