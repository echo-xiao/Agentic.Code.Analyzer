## File: apps/meteor/client/views/room/contextualBar/RoomFiles/hooks/useFilesList.ts

```typescript
import { Base64 } from '@rocket.chat/base64';
import type { IUpload } from '@rocket.chat/core-typings';
import { useUserRoom, useEndpoint } from '@rocket.chat/ui-contexts';
import { useInfiniteQuery } from '@tanstack/react-query';

import { e2e } from '../../../../../lib/e2ee/rocketchat.e2e';
import { roomsQueryKeys } from '../../../../../lib/queryKeys';
import { getConfig } from '../../../../../lib/utils/getConfig';

export const useFilesList = ({ rid, type, text }: { rid: Required<IUpload>['rid']; type: string; text: string }) => {
    /* Implementation Hidden */
};

```