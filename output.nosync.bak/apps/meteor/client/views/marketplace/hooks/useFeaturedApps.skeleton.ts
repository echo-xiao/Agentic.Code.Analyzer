## File: apps/meteor/client/views/marketplace/hooks/useFeaturedApps.ts

```typescript
import type { OperationResult } from '@rocket.chat/rest-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const useFeaturedApps = (): UseQueryResult<OperationResult<'GET', '/apps/featured-apps'>> => {
    /* Implementation Hidden */
};

```