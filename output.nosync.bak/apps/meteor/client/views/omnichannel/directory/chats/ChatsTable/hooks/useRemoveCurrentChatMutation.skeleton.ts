## File: apps/meteor/client/views/omnichannel/directory/chats/ChatsTable/hooks/useRemoveCurrentChatMutation.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const useRemoveCurrentChatMutation = (
	options?: Omit<UseMutationOptions<null, Error, IRoom['_id']>, 'mutationFn'>,
): UseMutationResult<null, Error, IRoom['_id']> => {
    /* Implementation Hidden */
};

```