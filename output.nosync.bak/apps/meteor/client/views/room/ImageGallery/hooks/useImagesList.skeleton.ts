## File: apps/meteor/client/views/room/ImageGallery/hooks/useImagesList.ts

```typescript
import { Base64 } from '@rocket.chat/base64';
import type { IRoom } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useInfiniteQuery } from '@tanstack/react-query';

import { e2e } from '../../../../lib/e2ee/rocketchat.e2e';
import { roomsQueryKeys } from '../../../../lib/queryKeys';

export const useImagesList = ({ roomId, startingFromId }: { roomId: IRoom['_id']; startingFromId?: string }) => {
    /* Implementation Hidden */
};

```