## File: apps/meteor/server/routes/avatar/room.ts

```typescript
import type { IncomingMessage, ServerResponse } from 'node:http';

import type { IIncomingMessage, IRoom, IUpload } from '@rocket.chat/core-typings';
import { Avatars, Rooms } from '@rocket.chat/models';
import type { NextFunction } from 'connect';
import { Cookies } from 'meteor/ostrio:cookies';

import { serveSvgAvatarInRequestedFormat, wasFallbackModified, setCacheAndDispositionHeaders, serveAvatarFile } from './utils';
import { roomCoordinator } from '../../lib/rooms/roomCoordinator';

const cookie = new Cookies();
const getRoomAndAvatarFile = async (roomId: IRoom['_id']): Promise<{ room: IRoom; file: IUpload | null } | void> => {
    /* Implementation Hidden */
};

export const roomAvatar = async function (request: IncomingMessage, res: ServerResponse, next: NextFunction) {
    /* Implementation Hidden */
};

```