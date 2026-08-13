## File: apps/meteor/client/views/omnichannel/hooks/useCannedResponseList.ts

```typescript
import type { ILivechatDepartment, IOmnichannelCannedResponse } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useInfiniteQuery } from '@tanstack/react-query';

import { cannedResponsesQueryKeys } from '../../../lib/queryKeys';

export const useCannedResponseList = ({ filter, type }: { filter: string; type: string }) => {
    /* Implementation Hidden */
};

```