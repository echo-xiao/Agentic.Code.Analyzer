## File: apps/meteor/tests/data/uploads.helper.ts

```typescript
import type { Credentials } from '@rocket.chat/api-client';
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { expect } from 'chai';
import { after, before, it } from 'mocha';
import type { Response } from 'supertest';

import { api, request, credentials } from './api-data';
import { imgURL, soundURL } from './interactions';
import { updateSetting } from './permissions.helper';
import { addUserToRoom, createRoom, deleteRoom } from './rooms.helper';
import { password } from './user';
import { createUser, deleteUser, login } from './users.helper';

export async function testFileUploads(
	filesEndpoint: 'channels.files' | 'groups.files' | 'im.files',
	roomType: 'c' | 'd' | 'p',
	invalidRoomError = 'error-room-not-found',
) {
    /* Implementation Hidden */
}

```