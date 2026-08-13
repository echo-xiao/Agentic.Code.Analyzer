## File: apps/meteor/client/views/marketplace/hooks/useLogsDistinctValues.ts

```typescript
import type { OperationResult } from '@rocket.chat/rest-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const useLogsDistinctValues = (appId: string): UseQueryResult<OperationResult<'GET', '/apps/:id/logs/distinctValues'>> => {
    /* Implementation Hidden */
};

```