## File: ee/packages/federation-matrix/src/events/message.ts

```typescript
import { FederationMatrix, Message, MeteorService } from '@rocket.chat/core-services';
import type { IUser, IRoom, FileAttachmentProps } from '@rocket.chat/core-typings';
import { type FileMessageType, type MessageType, type FileMessageContent, type EventID, federationSDK } from '@rocket.chat/federation-sdk';
import { Logger } from '@rocket.chat/logger';
import { Users, Rooms, Messages } from '@rocket.chat/models';

import { fileTypes } from '../FederationMatrix';
import { toInternalMessageFormat, toInternalQuoteMessageFormat } from '../helpers/message.parsers';
import { MatrixMediaService } from '../services/MatrixMediaService';

const logger = new Logger('federation-matrix:message');

async function getThreadMessageId(threadRootEventId: EventID): Promise<{ tmid: string; tshow: boolean } | undefined> {
    /* Implementation Hidden */
}

async function handleMediaMessage(
	url: string,
	fileInfo: FileMessageContent['info'],
	msgtype: MessageType,
	messageBody: string,
	user: IUser,
	room: IRoom,
	matrixRoomId: string,
	eventId: EventID,
	thread?: { tmid: string; tshow: boolean },
): Promise<{
	fromId: string;
	rid: string;
	msg: string;
	federation_event_id: string;
	thread?: { tmid: string; tshow: boolean };
	attachments: [FileAttachmentProps];
}> {
    /* Implementation Hidden */
}

export function message() {
    /* Implementation Hidden */
}

```