## File: apps/meteor/server/lib/messages/updateMessage.ts

```typescript
import { AppEvents, Apps } from '@rocket.chat/apps';
import { Message } from '@rocket.chat/core-services';
import type { IMessage, IUser, AtLeast } from '@rocket.chat/core-typings';
import { Messages, Rooms } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { afterSaveMessage } from '../../../app/lib/server/lib/afterSaveMessage';
import { notifyOnRoomChangedById } from '../../../app/lib/server/lib/notifyListener';
import { validateCustomMessageFields } from '../../../app/lib/server/lib/validateCustomMessageFields';
import { settings } from '../../../app/settings/server';

export const updateMessage = async function (
	{
		parseUrls,
		...message
	}: (AtLeast<IMessage, '_id' | 'rid' | 'msg' | 'customFields'> | AtLeast<IMessage, '_id' | 'rid' | 'content'>) & {
		parseUrls?: boolean;
	},
	user: IUser,
	originalMsg?: IMessage,
	previewUrls?: string[],
): Promise<void> {
    /* Implementation Hidden */
};

```