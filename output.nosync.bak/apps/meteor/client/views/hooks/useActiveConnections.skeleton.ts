## File: apps/meteor/client/views/hooks/useActiveConnections.ts

```typescript
import { useEndpoint } from '@rocket.chat/ui-contexts';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const useActiveConnections = (): UseQueryResult<{ max: number; current: number; percentage: number }> => {
    /* Implementation Hidden */
};

```