## File: apps/meteor/client/views/room/contextualBar/Threads/hooks/useToggleFollowingThreadMutation.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { roomsQueryKeys } from '../../../../../lib/queryKeys';

// TODO: its core should be moved to the ChatContext

type UseToggleFollowingThreadMutationVariables = {
	rid: IMessage['rid'];
	tmid: IMessage['_id'];
	follow: boolean;
};

export const useToggleFollowingThreadMutation = (
	options?: Omit<UseMutationOptions<void, Error, UseToggleFollowingThreadMutationVariables>, 'mutationFn'>,
): UseMutationResult<void, Error, UseToggleFollowingThreadMutationVariables> => {
    /* Implementation Hidden */
};

```