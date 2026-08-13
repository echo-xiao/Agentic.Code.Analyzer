## File: apps/meteor/client/hooks/webdav/useWebDAVAccountIntegrationsQuery.ts

```typescript
import type { IWebdavAccountIntegration } from '@rocket.chat/core-typings';
import { useUserId, useEndpoint, useStream } from '@rocket.chat/ui-contexts';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

type UseWebDAVAccountIntegrationsQueryOptions = Omit<
	UseQueryOptions<IWebdavAccountIntegration[], unknown, IWebdavAccountIntegration[], readonly ['webdav', 'account-integrations']>,
	'queryKey' | 'queryFn'
>;

export const useWebDAVAccountIntegrationsQuery = ({ enabled = true, ...options }: UseWebDAVAccountIntegrationsQueryOptions = {}) => {
    /* Implementation Hidden */
};

```