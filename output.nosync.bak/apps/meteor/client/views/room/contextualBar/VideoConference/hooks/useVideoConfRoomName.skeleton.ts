## File: apps/meteor/client/views/room/contextualBar/VideoConference/hooks/useVideoConfRoomName.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { isDirectMessageRoom } from '@rocket.chat/core-typings';
import { useUserDisplayName } from '@rocket.chat/ui-client';
import { useUserSubscription } from '@rocket.chat/ui-contexts';

export const useVideoConfRoomName = (room: IRoom): string | undefined => {
    /* Implementation Hidden */
};

```