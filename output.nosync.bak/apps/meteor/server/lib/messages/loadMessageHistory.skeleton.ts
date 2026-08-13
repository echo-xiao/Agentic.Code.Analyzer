## File: apps/meteor/server/lib/messages/loadMessageHistory.ts

```typescript
import type { IMessage, IRoom, MessageTypesValues } from '@rocket.chat/core-typings';
import { Messages, Rooms } from '@rocket.chat/models';
import type { FindOptions } from 'mongodb';

import { getHiddenSystemMessages } from '../../../app/lib/server/lib/getHiddenSystemMessages';
import { settings } from '../../../app/settings/server/cached';
import { normalizeMessagesForUser } from '../../../app/utils/server/lib/normalizeMessagesForUser';

export async function loadMessageHistory({
	userId,
	rid,
	end,
	limit = 20,
	ls,
	showThreadMessages = true,
	offset = 0,
	room: providedRoom,
}: {
	// userId is undefined if user is reading anonymously
	userId?: string;
	rid: string;
	end: Date | undefined;
	limit?: number;
	ls?: string | Date;
	showThreadMessages?: boolean;
	offset?: number;
	room?: IRoom;
}) {
    /* Implementation Hidden */
}

```