## File: apps/meteor/client/views/room/hooks/useUserTeamsQuery.ts

```typescript
import type { ITeam, Serialized } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { teamsQueryKeys } from '../../../lib/queryKeys';

type UserTeamsQueryOptions<TData = ITeam[]> = Omit<
	UseQueryOptions<Serialized<ITeam[]>, Error, TData, ReturnType<typeof teamsQueryKeys.listUserTeams>>,
	'queryKey' | 'queryFn'
>;

export const useUserTeamsQuery = <TData = ITeam[]>(userId: string, options: UserTeamsQueryOptions<TData> = {}) => {
    /* Implementation Hidden */
};

```