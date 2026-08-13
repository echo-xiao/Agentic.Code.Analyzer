## File: apps/meteor/client/views/room/hooks/useOpenRoomMutation.ts

```typescript
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';

import { updateSubscription } from '../../../lib/mutationEffects/updateSubscription';

type OpenRoomParams = {
	roomId: string;
	userId: string;
};

export const useOpenRoomMutation = () => {
    /* Implementation Hidden */
};

```