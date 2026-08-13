## File: apps/meteor/app/utils/client/getRoomAvatarURL.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';

import { getAvatarURL } from './getAvatarURL';
import { settings } from '../../../client/lib/settings';

export const getRoomAvatarURL = ({ roomId, cache = '' }: { roomId: IRoom['_id']; cache: IRoom['avatarETag'] }) => {
    /* Implementation Hidden */
};

```