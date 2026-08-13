## File: apps/meteor/server/lib/rooms/setRoomAvatar.ts

```typescript
import { api, Message } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import { isRegisterUser } from '@rocket.chat/core-typings';
import { Avatars, Rooms } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { RocketChatFile } from '../../../app/file/server';
import { FileUpload } from '../../../app/file-upload/server';

export const setRoomAvatar = async function (rid: string, dataURI: string, user: IUser): Promise<void> {
    /* Implementation Hidden */
};

```