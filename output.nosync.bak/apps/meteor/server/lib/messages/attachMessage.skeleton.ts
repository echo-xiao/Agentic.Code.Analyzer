## File: apps/meteor/server/lib/messages/attachMessage.ts

```typescript
import { getUserDisplayName } from '@rocket.chat/core-typings';
import type { IMessage, IRoom, MessageAttachment } from '@rocket.chat/core-typings';

import { settings } from '../../../app/settings/server/cached';
import { getUserAvatarURL } from '../../../app/utils/server/getUserAvatarURL';
import { roomCoordinator } from '../rooms/roomCoordinator';

export const attachMessage = function (
	message: IMessage,
	room: IRoom,
): {
	text: string;
	author_name?: string;
	author_icon: string;
	message_link: string;
	attachments?: MessageAttachment[];
	ts: Date;
} {
    /* Implementation Hidden */
};

```