## File: apps/meteor/client/views/marketplace/hooks/useLogs.ts

```typescript
import type { OperationResult } from '@rocket.chat/rest-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { marketplaceQueryKeys } from '../../../lib/queryKeys';

export const useLogs = ({
	appId,
	current,
	itemsPerPage,
	logLevel,
	method,
	startDate,
	endDate,
	instanceId,
}: {
	appId: string;
	current: number;
	itemsPerPage: number;
	logLevel?: '0' | '1' | '2';
	method?: string;
	startDate?: string;
	endDate?: string;
	instanceId?: string;
}): UseQueryResult<OperationResult<'GET', '/apps/:id/logs'>> => {
    /* Implementation Hidden */
};

```