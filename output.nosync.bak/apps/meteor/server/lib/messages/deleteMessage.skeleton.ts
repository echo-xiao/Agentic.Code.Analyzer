## File: apps/meteor/server/lib/messages/deleteMessage.ts

```typescript
import { AppEvents, Apps } from '@rocket.chat/apps';
import { api, Message } from '@rocket.chat/core-services';
import { isThreadMessage, type AtLeast, type IMessage, type IRoom, type IThreadMessage, type IUser } from '@rocket.chat/core-typings';
import { Messages, Rooms, Uploads, Users, ReadReceipts, ReadReceiptsArchive, Subscriptions } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { FileUpload } from '../../../app/file-upload/server';
import {
	notifyOnRoomChangedById,
	notifyOnMessageChange,
	notifyOnSubscriptionChangedByRoomIdAndUserIds,
} from '../../../app/lib/server/lib/notifyListener';
import { settings } from '../../../app/settings/server';
import { canDeleteMessageAsync } from '../authorization/canDeleteMessage';
import { callbacks } from '../callbacks';

export const deleteMessageValidatingPermission = async (message: AtLeast<IMessage, '_id'>, userId: IUser['_id']): Promise<void> => {
    /* Implementation Hidden */
};

export async function deleteMessage(message: IMessage, user: IUser): Promise<void> {
    /* Implementation Hidden */
}

async function deleteThreadMessage(message: IThreadMessage, user: IUser, room: IRoom | null): Promise<void> {
    /* Implementation Hidden */
}

```