## File: apps/meteor/client/views/room/providers/hooks/useCannedResponsesQuery.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import { useEndpoint, usePermission, useSetting, useStream, useUserId } from '@rocket.chat/ui-contexts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { cannedResponsesQueryKeys } from '../../../../lib/queryKeys';

type CannedResponse = { _id: string; shortcut: string; text: string };

const useCannedResponsesQuery = (room: IRoom) => {
    /* Implementation Hidden */
};

export default useCannedResponsesQuery;

```