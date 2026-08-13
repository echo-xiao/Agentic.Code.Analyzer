## File: apps/meteor/client/lib/errors/OldUrlRoomError.ts

```typescript
import type { IRoom, RoomType } from '@rocket.chat/core-typings';

import { RocketChatError } from './RocketChatError';

type OldUrlRoomErrorDetails =
	| { rid: IRoom['_id'] }
	| {
			type: RoomType;
			reference: string;
	  };

export class OldUrlRoomError extends RocketChatError<'old-url-format', OldUrlRoomErrorDetails> {
	constructor(message = 'Old Url Format', details: OldUrlRoomErrorDetails) {
        /* Implementation Hidden */
    }
}

```