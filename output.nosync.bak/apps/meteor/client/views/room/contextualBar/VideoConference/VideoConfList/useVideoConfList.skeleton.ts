## File: apps/meteor/client/views/room/contextualBar/VideoConference/VideoConfList/useVideoConfList.ts

```typescript
import type { IRoom, VideoConference } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useInfiniteQuery } from '@tanstack/react-query';

import { videoConferenceQueryKeys } from '../../../../../lib/queryKeys';

export const useVideoConfList = ({ roomId }: { roomId: IRoom['_id'] }) => {
    /* Implementation Hidden */
};

```