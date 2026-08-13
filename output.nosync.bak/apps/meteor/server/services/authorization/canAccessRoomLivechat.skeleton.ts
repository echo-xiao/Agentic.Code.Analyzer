## File: apps/meteor/server/services/authorization/canAccessRoomLivechat.ts

```typescript
import type { IAuthorizationLivechat, RoomAccessValidator } from '@rocket.chat/core-services';
import { proxify } from '@rocket.chat/core-services';
import type { IOmnichannelRoom } from '@rocket.chat/core-typings';
import { Rooms } from '@rocket.chat/models';

const AuthorizationLivechat = proxify<IAuthorizationLivechat>('authorization-livechat');

export const canAccessRoomLivechat: RoomAccessValidator = async (room, user, extraData): Promise<boolean> => {
    /* Implementation Hidden */
};

```