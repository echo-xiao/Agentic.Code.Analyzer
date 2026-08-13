## File: apps/meteor/client/views/omnichannel/directory/hooks/useDepartmentInfo.ts

```typescript
import type { OperationResult } from '@rocket.chat/rest-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const useDepartmentInfo = (departmentId: string): UseQueryResult<OperationResult<'GET', '/v1/livechat/department/:_id'>> => {
    /* Implementation Hidden */
};

```