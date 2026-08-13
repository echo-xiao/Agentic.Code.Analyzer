## File: apps/meteor/client/hooks/useJoinRoom.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useEndpoint, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { roomsQueryKeys } from '../lib/queryKeys';

type UseJoinRoomMutationFunctionProps = {
	rid: IRoom['_id'];
	reference: string;
	type: IRoom['t'];
};

export const useJoinRoom = () => {
    /* Implementation Hidden */
};

```