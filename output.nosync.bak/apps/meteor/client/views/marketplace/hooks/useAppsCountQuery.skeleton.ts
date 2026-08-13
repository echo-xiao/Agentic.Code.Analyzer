## File: apps/meteor/client/views/marketplace/hooks/useAppsCountQuery.ts

```typescript
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

export type MarketplaceRouteContext = 'private' | 'explore' | 'installed' | 'premium' | 'requested' | 'details';

export function isMarketplaceRouteContext(context: string): context is MarketplaceRouteContext {
    /* Implementation Hidden */
}

export const useAppsCountQuery = (context: MarketplaceRouteContext) => {
    /* Implementation Hidden */
};

export const useInvalidateAppsCountQueryCallback = () => {
    /* Implementation Hidden */
};

```