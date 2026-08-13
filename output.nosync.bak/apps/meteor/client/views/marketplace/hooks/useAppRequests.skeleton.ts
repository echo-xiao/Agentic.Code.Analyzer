## File: apps/meteor/client/views/marketplace/hooks/useAppRequests.ts

```typescript
import type { AppRequestFilter } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

export const useAppRequests = (appId: string, limit?: number, offset?: number, sort?: string, filter?: AppRequestFilter) => {
    /* Implementation Hidden */
};

```