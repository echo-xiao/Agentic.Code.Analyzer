## File: apps/meteor/client/views/room/hooks/useE2EEResetRoomKey.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { e2e } from '../../../lib/e2ee';

type UseE2EEResetRoomKeyVariables = {
	roomId: IRoom['_id'];
};

export const useE2EEResetRoomKey = (
	options?: Omit<UseMutationOptions<void, Error, UseE2EEResetRoomKeyVariables>, 'mutationFn'>,
): UseMutationResult<void, Error, UseE2EEResetRoomKeyVariables> => {
    /* Implementation Hidden */
};

```