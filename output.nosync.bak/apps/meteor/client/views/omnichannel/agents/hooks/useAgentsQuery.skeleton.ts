## File: apps/meteor/client/views/omnichannel/agents/hooks/useAgentsQuery.ts

```typescript
import type { PaginatedRequest } from '@rocket.chat/rest-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

import { omnichannelQueryKeys } from '../../../../lib/queryKeys';

export const useAgentsQuery = (query: PaginatedRequest = {}) => {
    /* Implementation Hidden */
};

```