## File: apps/meteor/client/views/room/Header/Omnichannel/QuickActions/hooks/useReturnChatToQueueMutation.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { roomsQueryKeys, subscriptionsQueryKeys } from '../../../../../../lib/queryKeys';

export const useReturnChatToQueueMutation = (
	options?: Omit<UseMutationOptions<void, Error, IRoom['_id']>, 'mutationFn'>,
): UseMutationResult<void, Error, IRoom['_id']> => {
    /* Implementation Hidden */
};

```