## File: apps/meteor/client/hooks/useWorkspaceInfo.ts

```typescript
import type { IStats, IWorkspaceInfo, Serialized } from '@rocket.chat/core-typings';
import type { IInstance } from '@rocket.chat/rest-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { keepPreviousData, useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';

const useServerInfoQueryOptions = () => {
    /* Implementation Hidden */
};

export const useServerInfo = () => useQuery(useServerInfoQueryOptions());

export const useWorkspaceInfo = ({ refreshStatistics }: { refreshStatistics?: boolean } = {}) => {
    /* Implementation Hidden */
};

export const useRefreshStatistics = () => {
    /* Implementation Hidden */
};

```