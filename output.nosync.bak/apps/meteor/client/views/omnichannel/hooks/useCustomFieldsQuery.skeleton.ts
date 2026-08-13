## File: apps/meteor/client/views/omnichannel/hooks/useCustomFieldsQuery.ts

```typescript
import type { OperationResult } from '@rocket.chat/rest-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { omnichannelQueryKeys } from '../../../lib/queryKeys';

export const useCustomFieldsQuery = (): UseQueryResult<OperationResult<'GET', '/v1/livechat/custom-fields'>> => {
    /* Implementation Hidden */
};

```