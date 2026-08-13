## File: apps/meteor/client/hooks/useTeamInfoQuery.ts

```typescript
import type { ITeam, Serialized } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import type { UseQueryOptions } from '@tanstack/react-query';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { teamsQueryKeys } from '../lib/queryKeys';

type TeamInfoQueryOptions<TData = Partial<Serialized<ITeam>>> = Omit<
	UseQueryOptions<Partial<Serialized<ITeam>>, Error, TData, ReturnType<typeof teamsQueryKeys.teamInfo>>,
	'queryKey' | 'queryFn'
>;

export const useTeamInfoQuery = <TData = Partial<Serialized<ITeam>>>(teamId: string, options: TeamInfoQueryOptions<TData> = {}) => {
    /* Implementation Hidden */
};

```