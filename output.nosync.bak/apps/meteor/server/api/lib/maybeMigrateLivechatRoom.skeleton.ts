## File: apps/meteor/server/api/lib/maybeMigrateLivechatRoom.ts

```typescript
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import type { IOmnichannelRoom, IRoom } from '@rocket.chat/core-typings';
import { LivechatRooms } from '@rocket.chat/models';
import type { FindOptions } from 'mongodb';

import { projectionAllowsAttribute } from './projectionAllowsAttribute';
import { migrateVisitorIfMissingContact } from '../../../app/livechat/server/lib/contacts/migrateVisitorIfMissingContact';

/**
 * If the room is a livechat room and it doesn't yet have a contact, trigger the migration for its visitor and source
 * The migration will create/use a contact and assign it to every room that matches this visitorId and source.
 **/
export async function maybeMigrateLivechatRoom(
	room: IOmnichannelRoom | null,
	options: FindOptions<IRoom> = {},
): Promise<IOmnichannelRoom | null> {
    /* Implementation Hidden */
}

```