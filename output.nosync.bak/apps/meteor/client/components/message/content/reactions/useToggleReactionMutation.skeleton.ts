## File: apps/meteor/client/components/message/content/reactions/useToggleReactionMutation.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { useEndpoint, useUserId } from '@rocket.chat/ui-contexts';
import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

type UseToggleReactionMutationVariables = {
	mid: IMessage['_id'];
	reaction: string;
};

export const useToggleReactionMutation = (
	options?: Omit<UseMutationOptions<void, Error, UseToggleReactionMutationVariables>, 'mutationFn'>,
): UseMutationResult<void, Error, UseToggleReactionMutationVariables> => {
    /* Implementation Hidden */
};

```