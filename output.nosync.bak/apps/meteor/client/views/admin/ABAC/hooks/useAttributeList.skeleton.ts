## File: apps/meteor/client/views/admin/ABAC/hooks/useAttributeList.ts

```typescript
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

import { useIsABACAvailable } from './useIsABACAvailable';
import { ABACQueryKeys } from '../../../../lib/queryKeys';

const COUNT = 150;
const ATTRIBUTE_LIST_STALE_TIME = 15_000;

export const useAttributeList = () => {
    /* Implementation Hidden */
};

```