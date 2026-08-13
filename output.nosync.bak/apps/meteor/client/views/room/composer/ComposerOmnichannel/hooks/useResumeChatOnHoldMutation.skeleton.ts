## File: apps/meteor/client/views/room/composer/ComposerOmnichannel/hooks/useResumeChatOnHoldMutation.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useEndpoint, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { roomsQueryKeys, subscriptionsQueryKeys } from '../../../../../lib/queryKeys';

export const useResumeChatOnHoldMutation = (
	options?: Omit<UseMutationOptions<void, Error, IRoom['_id']>, 'mutationFn'>,
): UseMutationResult<void, Error, IRoom['_id']> => {
    /* Implementation Hidden */
};

```